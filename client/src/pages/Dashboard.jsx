import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import AddContactForm from '@/components/AddContactForm';
import EditContactForm from '@/components/EditContactForm';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
        // If token is invalid (e.g., 401 Unauthorized), log the user out
        if (err.response && err.response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
        }
      }
    };
    fetchContacts();
  }, [navigate]);

  const handleContactAdded = (newContact) => {
    setContacts([...contacts, newContact]);
  };

  const handleContactUpdated = (updatedContact) => {
    setContacts(contacts.map(c => c._id === updatedContact._id ? updatedContact : c));
  };

  const handleDeleteContact = async (id) => {
    try {
      await api.delete(`/contacts/${id}`);
      setContacts(contacts.filter(c => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <AddContactForm onContactAdded={handleContactAdded} />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>My Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          {contacts.length > 0 ? (
            <ul className="divide-y">
              {contacts.map(contact => (
                <li key={contact._id} className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{contact.firstName} {contact.lastName}</p>
                    <p className="text-sm text-muted-foreground">{contact.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <EditContactForm contact={contact} onContactUpdated={handleContactUpdated} />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the contact.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteContact(contact._id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
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