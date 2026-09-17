import Hero from "./components/hero/Hero";
import ProblemSection from "./components/problem/ProblemSection";
import WorkflowSection from "./components/workflow/WorkflowSection";
import PosShowcase from "./components/pos/PosShowcase";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemSection />
      <WorkflowSection />
      <PosShowcase />
    </main>
  );
}