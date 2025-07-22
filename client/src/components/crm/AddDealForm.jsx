import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AddDealForm = ({ onDealAdded }) => {
  const [formData, setFormData] = useState({ title: '', value: '', stage: 'Prospecting', contact: '' });
  const [contacts, setContacts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch contacts when the dialog is opened
  useEffect(() => {
    if (isOpen) {
      const fetchContacts = async () => {
        try {
          const res = await api.get('/contacts');
          setContacts(res.data);
        } catch (err) {
          console.error("Failed to fetch contacts", err);
        }
      };
      fetchContacts();
    }
  }, [isOpen]);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSelectChange = (name, value) => setFormData({ ...formData, [name]: value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/deals', formData);
      onDealAdded(res.data);
      setIsOpen(false);
      setFormData({ title: '', value: '', stage: 'Prospecting', contact: '' });
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add New Deal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Deal</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new deal.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input id="title" name="title" value={formData.title} onChange={onChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="value" className="text-right">Value ($)</Label>
              <Input id="value" name="value" type="number" value={formData.value} onChange={onChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contact" className="text-right">Contact</Label>
              <Select onValueChange={(value) => onSelectChange('contact', value)} value={formData.contact}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a contact" />
                </SelectTrigger>
                <SelectContent>
                  {contacts.map(contact => (
                    <SelectItem key={contact._id} value={contact._id}>
                      {contact.firstName} {contact.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stage" className="text-right">Stage</Label>
              <Select onValueChange={(value) => onSelectChange('stage', value)} defaultValue="Prospecting">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Prospecting">Prospecting</SelectItem>
                  <SelectItem value="Proposal">Proposal</SelectItem>
                  <SelectItem value="Negotiation">Negotiation</SelectItem>
                  <SelectItem value="Closed-Won">Closed-Won</SelectItem>
                  <SelectItem value="Closed-Lost">Closed-Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Deal</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDealForm;