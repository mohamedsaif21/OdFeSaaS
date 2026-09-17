import Hero from "./components/hero/Hero";
import PosShowcase from "./components/pos/PosShowcase";
import KitchenShowcase from "./components/kitchen/KitchenShowcase";

export default function Home() {
  return (
    <main>
      <Hero />
      <PosShowcase />
      <KitchenShowcase />
    </main>
  );
}