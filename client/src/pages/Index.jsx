import Hero from "@/components/Hero";
import About from "@/components/About";
import SoftSkills from "@/components/SoftSkills";
import TechnicalSkills from "@/components/TechnicalSkills";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <SoftSkills />
      <TechnicalSkills />
      <Projects />
      <Footer />
    </div>
  );
};

export default Index;