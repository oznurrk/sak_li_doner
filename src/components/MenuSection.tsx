import { CategoryTabs } from "@/components/CategoryTabs";
import { OrderButtons } from "@/components/OrderButtons";
import { ProductCard } from "@/components/ProductCard";
import type { PublicMenuGroup } from "@/types/menu";

type MenuSectionProps = {
  groups: PublicMenuGroup[];
};

export function MenuSection({ groups }: MenuSectionProps) {
  return (
    <section id="menu" className="scroll-mt-20" aria-labelledby="menu-baslik">
      <CategoryTabs
        categories={groups.map((group) => ({
          id: group.id,
          name: group.name,
        }))}
      />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8 sm:py-12">
        <header className="max-w-2xl">
          <h2
            id="menu-baslik"
            className="text-3xl font-semibold tracking-tight text-cream"
          >
            Menü
          </h2>
        </header>

        {groups.length === 0 ? (
          <div className="max-w-xl">
            <p className="text-base leading-relaxed text-cream-soft">
              Menü şu anda güncelleniyor. Sipariş vermek için arayabilir veya
              WhatsApp üzerinden yazabilirsiniz.
            </p>
            <div className="mt-4">
              <OrderButtons />
            </div>
          </div>
        ) : (
          groups.map((group) => (
            <section
              key={group.id}
              id={group.id}
              aria-labelledby={`${group.id}-baslik`}
              className="scroll-mt-36"
            >
              <h3
                id={`${group.id}-baslik`}
                className="text-2xl font-semibold text-cream"
              >
                {group.name}
              </h3>
              <ul
                className={
                  group.layout === "compact"
                    ? "mt-4 grid grid-cols-1 gap-4 min-[430px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    : "mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
                }
              >
                {group.items.map((item) => (
                  <li key={item.id} className="min-w-0">
                    <ProductCard
                      item={item}
                      compact={group.layout === "compact"}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>
    </section>
  );
}
