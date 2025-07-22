import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import AddInteractionForm from '@/components/crm/AddInteractionForm';

const ContactDetailPage = () => {
  const { contactId } = useParams();
  const [contact, setContact] = useState(null);
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const contactRes = await api.get(`/contacts/${contactId}`);
        setContact(contactRes.data);

        const interactionsRes = await api.get(`/interactions/contact/${contactId}`);
        setInteractions(interactionsRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchContactDetails();
  }, [contactId]);

  const handleInteractionAdded = (newInteraction) => {
    setInteractions([newInteraction, ...interactions]);
  };

  if (!contact) {
    return (
        <div className="container mx-auto py-12 px-4 text-center">
            <h1 className="text-2xl font-bold">Loading contact details...</h1>
        </div>
    )
  }

  return (
    <div>
      <Link to="/contacts" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to All Contacts
      </Link>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column: Contact Details */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{contact.firstName} {contact.lastName}</CardTitle>
              <CardDescription>{contact.company}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Email</h4>
                <p className="text-muted-foreground">{contact.email}</p>
              </div>
              <div>
                <h4 className="font-semibold">Phone</h4>
                <p className="text-muted-foreground">{contact.phone || 'N/A'}</p>
              </div>
              <div>
                <h4 className="font-semibold">Status</h4>
                <p className="text-muted-foreground">{contact.status}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Interactions */}
        <div className="md:col-span-2">
            <AddInteractionForm contactId={contactId} onInteractionAdded={handleInteractionAdded} />
            
            <Card>
                <CardHeader>
                    <CardTitle>Interaction History</CardTitle>
                </CardHeader>
                <CardContent>
                    {interactions.length > 0 ? (
                        <ul className="space-y-4">
                            {interactions.map(interaction => (
                                <li key={interaction._id} className="border-b pb-4">
                                    <p className="font-semibold">{interaction.type}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(interaction.createdAt).toLocaleString()}
                                    </p>
                                    <p className="mt-2">{interaction.notes}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No interactions logged yet.</p>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailPage;