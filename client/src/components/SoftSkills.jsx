const SoftSkills = () => {
    const skillGroups = [
      {
        title: "Communication & Empathy",
        skills: [
          "Active Listening",
          "Clear Communication",
          "Empathy & Understanding",
          "Client Relationship Building",
          "Cross-functional Collaboration"
        ]
      },
      {
        title: "Adaptability & Growth",
        skills: [
          "Continuous Learning",
          "Adaptability to Change",
          "Creative Problem-Solving",
          "Self-awareness",
          "Growth Mindset"
        ]
      },
      {
        title: "Leadership & Reliability",
        skills: [
          "Calm Under Pressure",
          "Intentional Decision Making",
          "Reliability & Consistency",
          "Mentoring & Coaching",
          "Humble Leadership"
        ]
      }
    ];
  
    return (
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Soft Skills
            </h2>
            <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The human skills that drive meaningful collaboration and lasting impact
            </p>
          </div>
  
          <div className="grid md:grid-cols-3 gap-8">
            {skillGroups.map((group, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 shadow-soft hover-lift"
              >
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  {group.title}
                </h3>
                <ul className="space-y-4">
                  {group.skills.map((skill, skillIndex) => (
                    <li
                      key={skillIndex}
                      className="flex items-center text-muted-foreground"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default SoftSkills;