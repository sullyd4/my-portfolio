import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link to="/login" className="text-2xl font-bold text-primary">
          Solomon Daini
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <a href="/#home" className="text-muted-foreground hover:text-foreground transition-colors">Home</a>
          <a href="/#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
          <a href="/#skills" className="text-muted-foreground hover:text-foreground transition-colors">Skills</a>
          <a href="/#projects" className="text-muted-foreground hover:text-foreground transition-colors">Projects</a>
        </div>
        {/* --- CHANGE IS HERE --- */}
        <a href="/Solomon-Daini-Resume.pdf" download>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Resume
          </Button>
        </a>
      </nav>
    </header>
  );
};

export default Header;