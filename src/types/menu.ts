export type MenuItem = {
  id: string;
  name: string;
  category: string;
  /** TL cinsinden taslak veya onaylı tutar. Bilinmiyorsa null. */
  price: number | null;
  /** Yalnızca işletmenin verdiği açıklama. Yoksa null. */
  description: string | null;
  /** public altındaki görsel yolu. Yoksa null. */
  image: string | null;
  /** true ise görsel gerçek ürün fotoğrafı değil, tasarım denemesidir. */
  imageIsSample: boolean;
  available: boolean;
  /** true ise tutar müşteri menüsünde satış fiyatı olarak gösterilmez. */
  needsConfirmation: boolean;
  /** İsteğe bağlı kısa etiket. Doğrulanmış bir etiket yoksa null. */
  badge: string | null;
  sortOrder: number;
};

export type MenuCategory = {
  id: string;
  name: string;
  sortOrder: number;
  /** Aynı görünen bölümde birleştirilecek kategoriler. */
  displayGroup: string;
  displayName: string;
  layout: "feature" | "compact";
};

export type PublicMenuItem = {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  imageIsSample: boolean;
  badge: string | null;
  priceLabel: string;
  priceConfirmed: boolean;
};

export type PublicMenuGroup = {
  id: string;
  name: string;
  layout: "feature" | "compact";
  items: PublicMenuItem[];
};
