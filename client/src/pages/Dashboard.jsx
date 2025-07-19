import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await api.get('/contacts');
        setContacts(res.data);
      } catch (err) {
        console.error(err);
        // If token is invalid or expired, redirect to login
        if (err.response.status === 401) {
            handleLogout();
        }
      }
    };
    fetchContacts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">CRM Dashboard</h1>
        <Button onClick={handleLogout} variant="outline">Logout</Button>
      </header>
      
      <Card>
        <CardHeader>
          <CardTitle>My Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          {contacts.length > 0 ? (
            <ul>
              {contacts.map(contact => (
                <li key={contact._id} className="border-b p-2">
                  {contact.firstName} {contact.lastName} - {contact.email}
                </li>
              ))}
            </ul>
          ) : (
            <p>No contacts found. Add one to get started!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;