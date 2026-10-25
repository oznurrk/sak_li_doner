type CategoryTabsProps = {
  categories: Array<{ id: string; name: string }>;
};

export function CategoryTabs({ categories }: CategoryTabsProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Menü kategorileri"
      className="sticky top-[var(--site-header-height)] z-30 border-b border-line bg-ink"
    >
      <ul className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3">
        {categories.map((category) => (
          <li key={category.id} className="shrink-0">
            <a
              href={`#${category.id}`}
              className="inline-flex min-h-11 items-center rounded-full border border-line bg-ink-raised px-4 text-sm font-medium text-cream hover:border-gold hover:text-gold"
            >
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
