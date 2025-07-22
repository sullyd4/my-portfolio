import { Button } from "@/components/ui/button";
import solomonPortrait from "@/assets/solomon-portrait.jpg";
import { ExternalLink } from "lucide-react";
import { Link } from 'react-router-dom';
import { useContactForm } from '../context/ContactFormContext'; // Import the hook

const Hero = () => {
  const { openForm } = useContactForm(); // Get the openForm function from the context

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Hello, I'm{" "}
                <span className="text-primary">
                  Solomon Daini
                </span>
              </h1>
              <h2 className="text-2xl lg:text-3xl font-medium text-muted-foreground">
                Full-Stack Developer
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              I build purposeful applications with a focus on creating sustainable and intuitive digital solutions that empower and support real human needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* --- FIX #1: Added onClick handler --- */}
              <Button size="lg" className="btn-primary px-8 py-6 text-lg font-medium" onClick={openForm}>
                Hire Me
              </Button>
              
              {/* --- FIX #2: Correctly structured the Link and Button --- */}
              <Link to="/projects">
                <Button variant="outline" size="lg" className="btn-outline px-8 py-6 text-lg font-medium">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Projects
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-medium">
                <img 
                  src={solomonPortrait} 
                  alt="Solomon Daini - Full-Stack Developer" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;