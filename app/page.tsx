import Hero from "./components/hero/Hero";
import ProblemSection from "./components/problem/ProblemSection";
import WorkflowSection from "./components/workflow/WorkflowSection";
import CapabilitiesSection from "./components/capabilities/CapabilitiesSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemSection />
      <WorkflowSection />
      <CapabilitiesSection />
    </main>
  );
}