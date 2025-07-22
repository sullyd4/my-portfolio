import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import projectClearlink from "@/assets/project-clearlink.jpg";
import projectTodo from "@/assets/project-todo.jpg";
import projectSsAutos from "@/assets/project-ss-autos.jpg";

const Projects = () => {
  const projects = [
    {
      title: "ClearLink Project",
      description: "A comprehensive project demonstrating modern web development techniques and seamless user experience.",
      stack: "React + Tailwind CSS",
      image: projectClearlink,
      liveUrl: "https://ornate-kitten-6261cc.netlify.app/",
      githubUrl: "https://github.com/sullyd4/clearlink-project"
    },
    {
      title: "To-Do App with Calendar",
      description: "An intuitive task management application featuring a fully integrated calendar to help users organize their schedules.",
      stack: "MERN Stack",
      image: projectTodo,
      liveUrl: "https://exquisite-dolphin-ab400e.netlify.app/",
      githubUrl: "https://github.com/sullyd4/todo-app"
    },
    {
      title: "S&S Autos Landing Page",
      description: "A professional landing page for an automotive business, complete with user sign-in and sign-up functionality.",
      stack: "React + CSS",
      image: projectSsAutos,
      liveUrl: "https://helpful-caramel-6cb159.netlify.app/",
      githubUrl: "https://github.com/sullyd4/s-autos-frontend"
    }
  ];

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
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
              className="bg-card rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={`${project.title} preview`}
                    className="w-full h-64 lg:h-80 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                
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
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <Button className="btn-primary">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Live
                        </Button>
                      </a>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="btn-outline">
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </Button>
                      </a>
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