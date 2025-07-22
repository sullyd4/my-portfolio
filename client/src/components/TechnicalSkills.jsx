import { useEffect, useRef, useState } from "react";

const TechnicalSkills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const skills = [
    { name: "React", level: 90, color: "#61DAFB" },
    { name: "JavaScript", level: 88, color: "#F7DF1E" },
    { name: "TypeScript", level: 85, color: "#3178C6" },
    { name: "Node.js", level: 82, color: "#339933" },
    { name: "HTML5", level: 92, color: "#E34F26" },
    { name: "CSS3 / Tailwind", level: 90, color: "#06B6D4" },
    { name: "Firebase", level: 80, color: "#FFCA28" },
    { name: "MongoDB", level: 78, color: "#47A248" },
    { name: "Git & GitHub", level: 85, color: "#181717" },
    { name: "Express.js", level: 80, color: "#000000" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 } // Lowered threshold to trigger animation sooner
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
            Technical Skills
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The tools and technologies I use to bring ideas to life
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="bg-card rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-foreground text-lg">
                  {skill.name}
                </span>
                <span className="text-sm text-muted-foreground font-medium">
                  {skill.level}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div 
                  className="bg-primary h-2.5 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: isVisible ? `${skill.level}%` : '0%',
                    backgroundColor: skill.color,
                    transitionDelay: `${index * 100}ms`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;