import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil } from 'lucide-react';

const EditDealForm = ({ deal, onDealUpdated }) => {
  const [formData, setFormData] = useState({ title: '', value: '', stage: '', contact: '' });
  const [contacts, setContacts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Pre-fill the form with the deal's data when the component mounts
  useEffect(() => {
    if (deal) {
      setFormData({
        title: deal.title || '',
        value: deal.value || '',
        stage: deal.stage || 'Prospecting',
        contact: deal.contact?._id || '',
      });
    }
  }, [deal]);

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
      const res = await api.patch(`/deals/${deal._id}`, formData);
      onDealUpdated(res.data);
      setIsOpen(false);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Deal</DialogTitle>
          <DialogDescription>
            Update the details for this deal.
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
              <Select onValueChange={(value) => onSelectChange('stage', value)} value={formData.stage}>
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
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDealForm;