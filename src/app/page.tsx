import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MenuSection } from "@/components/MenuSection";
import { menuCategories, menuItems } from "@/data/menu";
import { getPublicMenu } from "@/lib/menu";

export default function HomePage() {
  const groups = getPublicMenu(menuItems, menuCategories);

  return (
    <>
      <Header />
      <main id="icerik" className="flex-1">
        <Hero />
        <MenuSection groups={groups} />
      </main>
      <Footer />
    </>
  );
}
