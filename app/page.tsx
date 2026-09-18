import Hero from "./components/hero/Hero";
import ProblemSection from "./components/problem/ProblemSection";
import WorkflowSection from "./components/workflow/WorkflowSection";
import CapabilitiesSection from "./components/capabilities/CapabilitiesSection";
import RolesSection from "./components/roles/RolesSection";
import CustomerExperienceSection from "./components/cx/CustomerExperienceSection";
import HowItWorksSection from "./components/how/HowItWorksSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemSection />
      <WorkflowSection />
      <CapabilitiesSection />
      <RolesSection />
      <CustomerExperienceSection />
      <HowItWorksSection />
    </main>
  );
}