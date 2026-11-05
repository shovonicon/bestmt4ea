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

function sortRows(rows: HTMLTableRowElement[], key: string, type: string, dir: Dir) {
  const factor = dir === 'asc' ? 1 : -1;
  return [...rows].sort((a, b) => {
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

export function initRankTable(root: HTMLElement): void {
  const table = root.querySelector<HTMLTableElement>('table');
  const tbody = table?.querySelector('tbody');
  if (!table || !tbody) return;

  const headers = Array.from(table.querySelectorAll<HTMLTableCellElement>('th[data-sort-key]'));
  const search = root.querySelector<HTMLInputElement>('[data-table-search]');
  const empty = root.querySelector<HTMLElement>('[data-table-empty]');
  const count = root.querySelector<HTMLElement>('[data-table-count]');
  const rows = () => Array.from(tbody.querySelectorAll<HTMLTableRowElement>('tr[data-row]'));

  const filters: Record<string, string> = {};

  const renumber = () => {
    let n = 0;
    rows().forEach((row) => {
      const chip = row.querySelector<HTMLElement>('[data-rank-chip]');
      if (!chip) return;
      if (row.hidden) return;
      n += 1;
      chip.textContent = `#${n}`;
    });
  };

  const matches = (row: HTMLTableRowElement): boolean => {
    for (const [group, value] of Object.entries(filters)) {
      if (value === 'all') continue;
      const cell = row.dataset[group] ?? '';
      if (value === 'low-dd' || value === 'prop-safe') {
        // Drawdown thresholds. A row with no drawdown figure never matches.
        const dd = toNumber(row.dataset.dd);
        const limit = value === 'prop-safe' ? 10 : 20;
        if (dd == null || dd > limit) return false;
      } else if (!cell.split(' ').includes(value)) {
        return false;
      }
    }
    const query = (search?.value ?? '').toLowerCase().trim();
    if (query && !(row.dataset.search ?? row.textContent ?? '').toLowerCase().includes(query)) {
      return false;
    }
    return true;
  };

  const applyFilters = () => {
    let visible = 0;
    rows().forEach((row) => {
      const show = matches(row);
      row.hidden = !show;
      if (show) visible += 1;
    });
    if (empty) empty.hidden = visible !== 0;
    if (count) count.textContent = String(visible);
    renumber();
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
    renumber();
  };

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
  applyFilters();

  initCompare(root, rows);
}

/* ---------------------------------------------------------------- compare */

function initCompare(root: HTMLElement, rows: () => HTMLTableRowElement[]): void {
  const drawer = document.querySelector<HTMLElement>('[data-compare-drawer]');
  if (!drawer || root.querySelector('[data-compare-check]') == null) return;

  const metrics: MetricConfig[] = JSON.parse(root.dataset.compareMetrics ?? '[]');
  const bar = drawer.querySelector<HTMLElement>('[data-compare-bar]')!;
  const label = drawer.querySelector<HTMLElement>('[data-compare-label]')!;
  const openBtn = drawer.querySelector<HTMLButtonElement>('[data-compare-open]')!;
  const clearBtn = drawer.querySelector<HTMLButtonElement>('[data-compare-clear]')!;
  const dialog = drawer.querySelector<HTMLDialogElement>('dialog')!;
  const out = drawer.querySelector<HTMLElement>('[data-compare-output]')!;
  const closeBtn = drawer.querySelector<HTMLButtonElement>('[data-compare-close]')!;

  const selected = new Map<string, CompareItem>();

  const itemFor = (row: HTMLTableRowElement): CompareItem => ({
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
    const items = [...selected.values()];
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
        selected.set(id, itemFor(row));
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
