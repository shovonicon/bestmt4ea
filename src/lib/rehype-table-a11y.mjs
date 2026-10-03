/**
 * Rehype plugin: make wide markdown tables keyboard-reachable.
 *
 * `global.css` gives `.prose-article table` `display: block` and
 * `overflow-x: auto`, so a table wider than the column becomes a scroll
 * container. A scroll container with no focusable content cannot be scrolled by
 * keyboard — axe reports it as `scrollable-region-focusable` (WCAG 2.1.1), and
 * on a 390px viewport that is exactly what happens to the comparison tables in
 * the longer posts.
 *
 * Adding `tabindex="0"` at build time fixes it without JavaScript, so the table
 * is reachable even when scripts never run. Tables in components keep their own
 * markup; this only touches tables coming from Markdown.
 *
 * No `role` or `aria-label` is added: ARIA forbids naming a `table` element, and
 * an unnamed landmark per table would be worse than no landmark.
 */

const MARKDOWN_TABLE = 'table';

function walk(node) {
  if (!node || typeof node !== 'object') return;

  if (node.type === 'element' && node.tagName === MARKDOWN_TABLE) {
    node.properties = node.properties ?? {};
    if (node.properties.tabIndex == null) node.properties.tabIndex = 0;
  }

  for (const child of node.children ?? []) walk(child);
}

export function rehypeTableAccessibility() {
  return (tree) => {
    walk(tree);
  };
}
