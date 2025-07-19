import { useEffect, useRef, useState } from "react";

const TechnicalSkills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const skills = [
    { name: "React", level: 90, color: "skill-react" },
    { name: "JavaScript", level: 88, color: "skill-javascript" },
    { name: "TypeScript", level: 85, color: "skill-typescript" },
    { name: "Node.js", level: 82, color: "skill-node" },
    { name: "HTML5", level: 92, color: "skill-html" },
    { name: "CSS3 / Tailwind", level: 90, color: "skill-css" },
    { name: "Firebase", level: 80, color: "skill-react" },
    { name: "MongoDB", level: 78, color: "skill-node" },
    { name: "Git & GitHub", level: 85, color: "skill-typescript" },
    { name: "Express.js", level: 80, color: "skill-node" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-gradient-subtle">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Technical Skills
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The tools and technologies I use to bring ideas to life
          </p>
        </div>

        <div className="space-y-8">
          {skills.map((skill, index) => (
            <div key={index} className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground text-lg">
                  {skill.name}
                </span>
                <span className="text-muted-foreground font-medium">
                  {skill.level}%
                </span>
              </div>
              <div className="skill-bar">
                <div
                  className="skill-progress"
                  style={{
                    width: isVisible ? `${skill.level}%` : '0%',
                    backgroundColor: `hsl(var(--${skill.color}))`,
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