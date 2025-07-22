import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import ContactForm from './ContactForm'; // Import the new contact form

const Layout = () => {
  return (
    <div>
      <Header />
      <ContactForm /> {/* Add the form component here */}
      <main className="pt-20">
        <Outlet /> 
      </main>
    </div>
  );
};

export default Layout;