import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsData } from '../data/projects'; // Import from the new data file
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const project = projectsData.find(p => p.id === projectId);

  if (!project) {
    // ... (return Project Not Found)
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <Link to="/projects" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to All Projects
      </Link>
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-primary">{project.title}</CardTitle>
          <CardDescription className="text-lg">{project.stack}</CardDescription>
        </CardHeader>
        <CardContent>
          <img src={project.image} alt={project.title} className="w-full rounded-lg mb-8 shadow-md" />
          <p className="text-lg text-foreground leading-relaxed mb-8">{project.description}</p>
          <div className="flex gap-4">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectDetailPage;