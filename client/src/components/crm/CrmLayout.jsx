import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, DollarSign } from 'lucide-react';

const CrmLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-background border-r">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold text-primary">CRM</h2>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          <NavLink to="/dashboard" className={({ isActive }) => `flex items-center p-2 rounded-md ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}>
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </NavLink>
          {/* We will add links to Contacts and Deals pages here later */}
          <NavLink to="/contacts" className={({ isActive }) => `flex items-center p-2 rounded-md ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}>
             <Users className="mr-3 h-5 w-5" />
             Contacts
          </NavLink>
          <NavLink to="/deals" className={({ isActive }) => `flex items-center p-2 rounded-md ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}>
             <DollarSign className="mr-3 h-5 w-5" />
             Deals
          </NavLink>
        </nav>
        <div className="p-4 mt-auto">
            <Button onClick={handleLogout} variant="outline" className="w-full">Logout</Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet /> {/* This is where the dashboard, contacts, and deals pages will be rendered */}
      </main>
    </div>
  );
};

export default CrmLayout;