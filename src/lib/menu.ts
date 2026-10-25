import { getPriceLabel } from "@/lib/price";
import type {
  MenuCategory,
  MenuItem,
  PublicMenuGroup,
  PublicMenuItem,
} from "@/types/menu";

function toPublicItem(item: MenuItem): PublicMenuItem {
  const price = getPriceLabel(item);

  return {
    id: item.id,
    name: item.name,
    description: item.description,
    image: item.image,
    imageIsSample: item.imageIsSample,
    badge: item.badge,
    priceLabel: price.label,
    priceConfirmed: price.confirmed,
  };
}

/** Satışa açık ürünü olan kategorileri, sıralı şekilde döndürür. */
export function getPublicMenu(
  items: MenuItem[],
  categories: MenuCategory[],
): PublicMenuGroup[] {
  const knownCategories = new Set(categories.map((category) => category.id));

  for (const item of items) {
    if (!knownCategories.has(item.category)) {
      throw new Error(
        `Ürün "${item.id}" bilinmeyen kategoriye bağlı: ${item.category}`,
      );
    }
  }

  const buckets = new Map<
    string,
    PublicMenuGroup & { sortOrder: number; source: MenuItem[] }
  >();

  for (const category of categories.slice().sort((a, b) => a.sortOrder - b.sortOrder)) {
    const categoryItems = items.filter(
      (item) => item.available && item.category === category.id,
    );

    if (categoryItems.length === 0) {
      continue;
    }

    const current = buckets.get(category.displayGroup);

    if (!current) {
      buckets.set(category.displayGroup, {
        id: category.displayGroup,
        name: category.displayName,
        layout: category.layout,
        items: [],
        sortOrder: category.sortOrder,
        source: categoryItems,
      });
      continue;
    }

    current.source.push(...categoryItems);
  }

  return [...buckets.values()]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((group) => ({
      id: group.id,
      name: group.name,
      layout: group.layout,
      items: group.source
        .slice()
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map(toPublicItem),
    }));
}
