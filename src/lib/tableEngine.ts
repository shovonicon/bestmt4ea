/**
 * Zero-dependency client-side behaviour for ranking tables.
 *
 * Markup contract (see ComparisonRegistry.astro / BrokerExcelTable.astro):
 *
 *   [data-rank-table]                        wrapper; owns one table + its controls
 *     [data-table-search]                    optional text input
 *     [data-filter-group][data-filter-value] pill buttons (one active per group)
 *     table
 *       th[data-sort-key][data-sort-type]    sortable header; holds a <button>
 *       tbody tr[data-row]                   one per item, with data-<key> values
 *         input[data-compare-check]          optional compare checkbox
 *   [data-compare-drawer]                    CompareDrawer.astro (page-wide)
 *
 * Missing values (empty or non-numeric) always sort last, in either direction —
 * a system with no published figure must never outrank one that has one.
 */

export const MAX_COMPARE = 3;

type Dir = 'asc' | 'desc';

interface CompareItem {
  id: string;
  name: string;
  href: string;
  values: Record<string, string>;
}

interface MetricConfig {
  key: string;
  label: string;
  /** Which end wins the row highlight. Omit for text rows. */
  better?: 'high' | 'low';
  suffix?: string;
  prefix?: string;
}

const toNumber = (raw: string | undefined): number | null => {
  if (raw == null || raw.trim() === '') return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
};

/** Rows may carry `data-tier`; a higher tier always sorts below a lower one, whatever the column. */
const tierOf = (row: HTMLElement) => Number(row.dataset.tier ?? 0) || 0;

function sortRows(rows: HTMLTableRowElement[], key: string, type: string, dir: Dir) {
  const factor = dir === 'asc' ? 1 : -1;
  return [...rows].sort((a, b) => {
    const tierDiff = tierOf(a) - tierOf(b);
    if (tierDiff !== 0) return tierDiff;
    const rawA = a.dataset[key];
    const rawB = b.dataset[key];
    if (type === 'numeric') {
      const numA = toNumber(rawA);
      const numB = toNumber(rawB);
      if (numA == null && numB == null) return 0;
      if (numA == null) return 1;
      if (numB == null) return -1;
      return (numA - numB) * factor;
    }
    const strA = (rawA ?? '').trim();
    const strB = (rawB ?? '').trim();
    if (!strA && !strB) return 0;
    if (!strA) return 1;
    if (!strB) return -1;
    return strA.localeCompare(strB) * factor;
  });
}

/** A per-column filter: pick values (text columns) or bound a range (numeric columns). */
type ColumnFilter =
  | { kind: 'set'; values: Set<string> }
  | { kind: 'range'; min: number | null; max: number | null };

export function initRankTable(root: HTMLElement): void {
  const table = root.querySelector<HTMLTableElement>('table');
  const tbody = table?.querySelector('tbody');
  if (!table || !tbody) return;

  const headers = Array.from(table.querySelectorAll<HTMLTableCellElement>('th[data-sort-key]'));
  const search = root.querySelector<HTMLInputElement>('[data-table-search]');
  const empty = root.querySelector<HTMLElement>('[data-table-empty]');
  const count = root.querySelector<HTMLElement>('[data-table-count]');
  const clear = root.querySelector<HTMLButtonElement>('[data-table-clear]');
  const rows = () => Array.from(tbody.querySelectorAll<HTMLTableRowElement>('tr[data-row]'));

  const filters: Record<string, string> = {};
  const columnFilters = new Map<string, ColumnFilter>();

  /** The order and sort state the page was rendered with, so Clear all can restore it. */
  const initialOrder = rows();
  const initialSortHeader = headers.find((h) => h.hasAttribute('aria-sort')) ?? null;
  const initialSortDir = initialSortHeader?.getAttribute('aria-sort') ?? null;
  let sortChanged = false;

  const renumber = () => {
    let n = 0;
    rows().forEach((row) => {
      const chip = row.querySelector<HTMLElement>('[data-rank-chip]');
      if (!chip) return;
      if (row.hidden) return;
      n += 1;
      chip.textContent = chip.dataset.rankChip === 'plain' ? String(n) : `#${n}`;
      chip.dataset.pos = String(n);
    });
  };

  const matches = (row: HTMLTableRowElement): boolean => {
    for (const [key, filter] of columnFilters) {
      const raw = row.dataset[key] ?? '';
      if (filter.kind === 'set') {
        if (!filter.values.has(raw)) return false;
      } else {
        // A row with no figure never satisfies an active range.
        const value = toNumber(raw);
        if (value == null) return false;
        if (filter.min != null && value < filter.min) return false;
        if (filter.max != null && value > filter.max) return false;
      }
    }
    for (const [group, value] of Object.entries(filters)) {
      if (value === 'all') continue;
      const cell = row.dataset[group] ?? '';
      if (value === 'low-dd' || value === 'prop-safe') {
        // Drawdown thresholds. A row with no drawdown figure never matches.
        const dd = toNumber(row.dataset.dd);
        const limit = value === 'prop-safe' ? 10 : 20;
        if (dd == null || dd > limit) return false;
      } else if (!cell.split(/[\s/,]+/).includes(value)) {
        return false;
      }
    }
    const query = (search?.value ?? '').toLowerCase().trim();
    if (query && !(row.dataset.search ?? row.textContent ?? '').toLowerCase().includes(query)) {
      return false;
    }
    return true;
  };

  const hasActiveFilter = () =>
    columnFilters.size > 0 ||
    Boolean((search?.value ?? '').trim()) ||
    Object.values(filters).some((value) => value !== 'all');

  const applyFilters = () => {
    let visible = 0;
    rows().forEach((row) => {
      const show = matches(row);
      row.hidden = !show;
      if (show) visible += 1;
    });
    if (empty) empty.hidden = visible !== 0;
    if (count) count.textContent = String(visible);
    if (clear) clear.hidden = !(hasActiveFilter() || sortChanged);
    renumber();
  };

  const resetSort = () => {
    headers.forEach((h) => {
      h.removeAttribute('aria-sort');
      const icon = h.querySelector('[data-sort-icon]');
      if (icon) icon.textContent = '↕';
    });
    if (initialSortHeader && initialSortDir) {
      initialSortHeader.setAttribute('aria-sort', initialSortDir);
      const icon = initialSortHeader.querySelector('[data-sort-icon]');
      if (icon) icon.textContent = initialSortDir === 'ascending' ? '▲' : '▼';
    }
    initialOrder.forEach((row) => tbody.appendChild(row));
    sortChanged = false;
    resort();
  };

  const setSort = (th: HTMLTableCellElement, dir: Dir) => {
    headers.forEach((h) => {
      h.removeAttribute('aria-sort');
      const icon = h.querySelector('[data-sort-icon]');
      if (icon) icon.textContent = '↕';
    });
    th.setAttribute('aria-sort', dir === 'asc' ? 'ascending' : 'descending');
    const icon = th.querySelector('[data-sort-icon]');
    if (icon) icon.textContent = dir === 'asc' ? '▲' : '▼';

    const sorted = sortRows(
      rows(),
      th.dataset.sortKey as string,
      th.dataset.sortType ?? 'numeric',
      dir,
    );
    sorted.forEach((row) => tbody.appendChild(row));
    sortChanged = true;
    if (clear) clear.hidden = false;
    renumber();
  };

  /**
   * Re-apply the current order. Callers that change `data-tier` (the brokers page
   * country picker) dispatch `rank-table:resort` on the table root afterwards.
   */
  const resort = () => {
    const active = headers.find((h) => h.hasAttribute('aria-sort'));
    const sorted = active
      ? sortRows(
          rows(),
          active.dataset.sortKey as string,
          active.dataset.sortType ?? 'numeric',
          active.getAttribute('aria-sort') === 'ascending' ? 'asc' : 'desc',
        )
      : [...rows()].sort((a, b) => tierOf(a) - tierOf(b) || initialOrder.indexOf(a) - initialOrder.indexOf(b));
    sorted.forEach((row) => tbody.appendChild(row));
    renumber();
  };
  root.addEventListener('rank-table:resort', resort);

  headers.forEach((th) => {
    const trigger = th.querySelector<HTMLButtonElement>('button');
    trigger?.addEventListener('click', () => {
      const current = th.getAttribute('aria-sort');
      const first = (th.dataset.defaultDir as Dir) || 'desc';
      const dir: Dir = current
        ? current === 'ascending'
          ? 'desc'
          : 'asc'
        : first;
      setSort(th, dir);
    });
  });

  root.querySelectorAll<HTMLButtonElement>('[data-filter-group]').forEach((btn) => {
    const group = btn.dataset.filterGroup as string;
    if (btn.getAttribute('aria-pressed') === 'true') filters[group] = btn.dataset.filterValue ?? 'all';
    btn.addEventListener('click', () => {
      filters[group] = btn.dataset.filterValue ?? 'all';
      root.querySelectorAll<HTMLButtonElement>(`[data-filter-group="${group}"]`).forEach((b) => {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      applyFilters();
    });
  });

  search?.addEventListener('input', applyFilters);

  const columnFilterUi = initColumnFilters(table, rows, columnFilters, applyFilters);

  clear?.addEventListener('click', () => {
    if (search) search.value = '';
    root.querySelectorAll<HTMLButtonElement>('[data-filter-group]').forEach((btn) => {
      const isAll = (btn.dataset.filterValue ?? 'all') === 'all';
      btn.setAttribute('aria-pressed', String(isAll));
      if (isAll) filters[btn.dataset.filterGroup as string] = 'all';
    });
    columnFilters.clear();
    columnFilterUi.reset();
    resetSort();
    applyFilters();
    (search ?? clear).focus();
  });

  applyFilters();

  initCompare(root, rows);
}

/* ---------------------------------------------------------- column filters */

/**
 * Excel-style per-column filter menus. A `th[data-sort-key]` that holds a
 * `button[data-col-filter]` gets a panel: a checkbox list of the distinct values
 * (text columns) or min and max inputs (numeric columns). The panel lives on
 * <body> with fixed positioning, so the table's own horizontal scroll cannot clip
 * it. Escape closes it and returns focus to the button.
 */
function initColumnFilters(
  table: HTMLTableElement,
  rows: () => HTMLTableRowElement[],
  columnFilters: Map<string, ColumnFilter>,
  onChange: () => void,
): { reset: () => void } {
  const buttons = Array.from(table.querySelectorAll<HTMLButtonElement>('[data-col-filter]'));
  const resetters: Array<() => void> = [];
  let closeOpenPanel: (() => void) | null = null;

  buttons.forEach((btn) => {
    const th = btn.closest<HTMLTableCellElement>('th[data-sort-key]');
    if (!th) return;
    const key = th.dataset.sortKey as string;
    const kind = th.dataset.sortType === 'text' ? 'set' : 'range';
    const label = th.querySelector('.sort-btn span')?.textContent?.trim() ?? key;

    const panel = document.createElement('div');
    panel.className = 'col-filter-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', `Filter ${label}`);
    panel.hidden = true;
    document.body.appendChild(panel);

    const status = () => {
      const active = columnFilters.has(key);
      btn.dataset.active = String(active);
      btn.setAttribute('aria-label', active ? `Filter ${label} (active)` : `Filter ${label}`);
    };

    const checkboxes: HTMLInputElement[] = [];
    let minInput: HTMLInputElement | null = null;
    let maxInput: HTMLInputElement | null = null;

    const clearThis = () => {
      columnFilters.delete(key);
      checkboxes.forEach((c) => (c.checked = true));
      if (minInput) minInput.value = '';
      if (maxInput) maxInput.value = '';
      status();
    };

    const position = () => {
      const rect = btn.getBoundingClientRect();
      const width = panel.offsetWidth;
      const height = panel.offsetHeight;
      const left = Math.max(8, Math.min(rect.left, window.innerWidth - width - 8));
      // Below the button by default; flip above it when there is no room underneath.
      let top = rect.bottom + 6;
      if (top + height > window.innerHeight - 8 && rect.top - height - 6 >= 8) top = rect.top - height - 6;
      panel.style.left = `${left}px`;
      panel.style.top = `${top}px`;
    };

    const onDocPointer = (event: Event) => {
      const target = event.target as Node;
      if (!panel.contains(target) && !btn.contains(target)) close(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        close(true);
      }
    };
    const closeQuietly = () => close(false);

    function close(restoreFocus: boolean) {
      if (panel.hidden) return;
      panel.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
      document.removeEventListener('pointerdown', onDocPointer, true);
      window.removeEventListener('scroll', position, true);
      window.removeEventListener('resize', position);
      panel.removeEventListener('keydown', onKey);
      if (closeOpenPanel === closeQuietly) closeOpenPanel = null;
      if (restoreFocus) btn.focus();
    }

    const build = () => {
      const title = document.createElement('p');
      title.className = 'col-filter-title';
      title.textContent = label;
      panel.appendChild(title);

      if (kind === 'set') {
        const values = [...new Set(rows().map((r) => r.dataset[key] ?? ''))].sort((a, b) =>
          a === '' ? 1 : b === '' ? -1 : a.localeCompare(b),
        );
        const list = document.createElement('div');
        list.className = 'col-filter-list';
        values.forEach((value) => {
          const row = document.createElement('label');
          row.className = 'col-filter-option';
          const box = document.createElement('input');
          box.type = 'checkbox';
          box.value = value;
          box.checked = true;
          const text = document.createElement('span');
          text.textContent = value === '' ? '(none)' : value;
          row.appendChild(box);
          row.appendChild(text);
          list.appendChild(row);
          checkboxes.push(box);
          box.addEventListener('change', () => {
            const picked = checkboxes.filter((c) => c.checked).map((c) => c.value);
            if (picked.length === checkboxes.length) columnFilters.delete(key);
            else columnFilters.set(key, { kind: 'set', values: new Set(picked) });
            status();
            onChange();
          });
        });
        panel.appendChild(list);
      } else {
        const make = (text: string) => {
          const wrap = document.createElement('label');
          wrap.className = 'col-filter-range';
          const span = document.createElement('span');
          span.textContent = text;
          const input = document.createElement('input');
          input.type = 'number';
          input.step = 'any';
          input.inputMode = 'decimal';
          wrap.appendChild(span);
          wrap.appendChild(input);
          panel.appendChild(wrap);
          input.addEventListener('input', () => {
            const min = minInput && minInput.value !== '' ? Number(minInput.value) : null;
            const max = maxInput && maxInput.value !== '' ? Number(maxInput.value) : null;
            if (min == null && max == null) columnFilters.delete(key);
            else columnFilters.set(key, { kind: 'range', min, max });
            status();
            onChange();
          });
          return input;
        };
        minInput = make('Minimum');
        maxInput = make('Maximum');
      }

      const actions = document.createElement('div');
      actions.className = 'col-filter-actions';
      const resetBtn = document.createElement('button');
      resetBtn.type = 'button';
      resetBtn.textContent = 'Clear this filter';
      resetBtn.addEventListener('click', () => {
        clearThis();
        onChange();
      });
      const doneBtn = document.createElement('button');
      doneBtn.type = 'button';
      doneBtn.textContent = 'Done';
      doneBtn.addEventListener('click', () => close(true));
      actions.appendChild(resetBtn);
      actions.appendChild(doneBtn);
      panel.appendChild(actions);
    };

    const open = () => {
      closeOpenPanel?.();
      if (!panel.childElementCount) build();
      panel.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      position();
      document.addEventListener('pointerdown', onDocPointer, true);
      window.addEventListener('scroll', position, true);
      window.addEventListener('resize', position);
      panel.addEventListener('keydown', onKey);
      closeOpenPanel = closeQuietly;
      panel.querySelector<HTMLElement>('input')?.focus();
    };

    btn.addEventListener('click', () => (panel.hidden ? open() : close(true)));
    resetters.push(clearThis);
    status();
  });

  return { reset: () => resetters.forEach((fn) => fn()) };
}

/* ---------------------------------------------------------------- compare */

function initCompare(root: HTMLElement, rows: () => HTMLTableRowElement[]): void {
  const drawer = document.querySelector<HTMLElement>('[data-compare-drawer]');
  if (!drawer || root.querySelector('[data-compare-check]') == null) return;

  /** Read on use, so a page can change the rows (the brokers country row) after load. */
  const getMetrics = (): MetricConfig[] => JSON.parse(root.dataset.compareMetrics ?? '[]');
  const bar = drawer.querySelector<HTMLElement>('[data-compare-bar]')!;
  const label = drawer.querySelector<HTMLElement>('[data-compare-label]')!;
  const openBtn = drawer.querySelector<HTMLButtonElement>('[data-compare-open]')!;
  const clearBtn = drawer.querySelector<HTMLButtonElement>('[data-compare-clear]')!;
  const dialog = drawer.querySelector<HTMLDialogElement>('dialog')!;
  const out = drawer.querySelector<HTMLElement>('[data-compare-output]')!;
  const closeBtn = drawer.querySelector<HTMLButtonElement>('[data-compare-close]')!;

  const selected = new Map<string, HTMLTableRowElement>();

  const itemFor = (row: HTMLTableRowElement, metrics: MetricConfig[]): CompareItem => ({
    id: row.dataset.id ?? '',
    name: row.dataset.name ?? '',
    href: row.dataset.href ?? '#',
    values: Object.fromEntries(metrics.map((m) => [m.key, row.dataset[m.key] ?? ''])),
  });

  const sync = () => {
    const n = selected.size;
    bar.hidden = n === 0;
    label.textContent = `Compare (${n}/${MAX_COMPARE} selected)`;
    openBtn.disabled = n < 2;
    const full = n >= MAX_COMPARE;
    rows().forEach((row) => {
      const box = row.querySelector<HTMLInputElement>('[data-compare-check]');
      if (box) box.disabled = full && !box.checked;
    });
  };

  const fmt = (m: MetricConfig, raw: string) =>
    raw === '' ? '—' : `${m.prefix ?? ''}${raw}${m.suffix ?? ''}`;

  const render = () => {
    const metrics = getMetrics();
    const items = [...selected.values()].map((row) => itemFor(row, metrics));
    const head = `<tr><th scope="col"><span class="sr-only">Metric</span></th>${items
      .map(
        (i) =>
          `<th scope="col"><a href="${encodeURI(i.href)}">${escapeHtml(i.name)}</a></th>`,
      )
      .join('')}</tr>`;

    const body = metrics
      .map((m) => {
        const nums = items.map((i) => toNumber(i.values[m.key]));
        const valid = nums.filter((n): n is number => n != null);
        const best =
          m.better && valid.length > 1
            ? m.better === 'high'
              ? Math.max(...valid)
              : Math.min(...valid)
            : null;
        const cells = items
          .map((i, idx) => {
            const win = best != null && nums[idx] === best;
            return `<td${win ? ' data-best="true"' : ''}>${escapeHtml(fmt(m, i.values[m.key]))}</td>`;
          })
          .join('');
        return `<tr><th scope="row">${escapeHtml(m.label)}</th>${cells}</tr>`;
      })
      .join('');

    out.innerHTML = `<table class="data-table compare-table"><thead>${head}</thead><tbody>${body}</tbody></table>`;
  };

  rows().forEach((row) => {
    const box = row.querySelector<HTMLInputElement>('[data-compare-check]');
    box?.addEventListener('change', () => {
      const id = row.dataset.id ?? '';
      if (box.checked) {
        if (selected.size >= MAX_COMPARE) {
          box.checked = false;
          return;
        }
        selected.set(id, row);
      } else {
        selected.delete(id);
      }
      sync();
    });
  });

  clearBtn.addEventListener('click', () => {
    selected.clear();
    rows().forEach((row) => {
      const box = row.querySelector<HTMLInputElement>('[data-compare-check]');
      if (box) box.checked = false;
    });
    sync();
  });

  openBtn.addEventListener('click', () => {
    render();
    dialog.showModal();
  });
  closeBtn.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => openBtn.focus());
  // A name that points further down the same page should reveal it, not sit behind the dialog.
  out.addEventListener('click', (event) => {
    const link = (event.target as HTMLElement).closest('a');
    if (link?.getAttribute('href')?.startsWith('#')) dialog.close();
  });

  sync();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Wire every `[data-rank-table]` on the page. */
export function initAllRankTables(): void {
  document.querySelectorAll<HTMLElement>('[data-rank-table]').forEach(initRankTable);
}
