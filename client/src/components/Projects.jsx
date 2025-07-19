import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import projectCoaching from "@/assets/project-coaching.jpg";
import projectEcommerce from "@/assets/project-ecommerce.jpg";
import projectTaskManager from "@/assets/project-taskmanager.jpg";
import { useEffect, useState } from "react";

const Projects = () => {
  const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // We will replace this with a fetch to our API later
                const dummyProjects = [
                    {
                      title: "Empower – Coaching Platform",
                      description: "A comprehensive coaching platform that connects trainers with clients, featuring progress tracking, workout planning, and nutrition guidance.",
                      stack: "React + Firebase + Node.js",
                      image: projectCoaching,
                      liveUrl: "#",
                      githubUrl: "#"
                    },
                    {
                      title: "EcoShop – Sustainable Commerce",
                      description: "An e-commerce platform focused on sustainable products, with smart recommendations and carbon footprint tracking for conscious consumers.",
                      stack: "React + Express + MongoDB",
                      image: projectEcommerce,
                      liveUrl: "#",
                      githubUrl: "#"
                    },
                    {
                      title: "FlowTask – Project Management",
                      description: "A minimalist project management tool designed for small teams, featuring kanban boards, time tracking, and collaborative workflows.",
                      stack: "React + TypeScript + Firebase",
                      image: projectTaskManager,
                      liveUrl: "#",
                      githubUrl: "#"
                    }
                  ];
                setProjects(dummyProjects);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of purposeful applications that solve real problems
          </p>
        </div>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl overflow-hidden shadow-soft hover-lift transition-smooth"
            >
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    className="w-full h-64 lg:h-80 object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:hidden"></div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
                        {project.title}
                      </h3>
                      <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                        {project.stack}
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {project.description}
                    </p>

                    <div className="flex gap-4 pt-4">
                      <Button className="btn-primary">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Live
                      </Button>
                      <Button variant="outline" className="btn-outline">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;