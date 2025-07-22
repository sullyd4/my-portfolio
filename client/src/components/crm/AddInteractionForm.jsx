import React, { useState } from 'react';
import api from '../../services/api';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AddInteractionForm = ({ contactId, onInteractionAdded }) => {
  const [formData, setFormData] = useState({ type: 'Call', notes: '' });
  const { toast } = useToast();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSelectChange = (value) => setFormData({ ...formData, type: value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/interactions', { ...formData, contact: contactId });
      onInteractionAdded(res.data);
      setFormData({ type: 'Call', notes: '' }); // Reset form
      toast({ title: "Success!", description: "Interaction logged successfully." });
    } catch (err) {
      console.error(err.response.data);
      toast({ variant: "destructive", title: "Error", description: "Could not log interaction." });
    }
  };

  return (
    <Card className="mb-8">
        <CardHeader>
            <CardTitle>Log a New Interaction</CardTitle>
        </CardHeader>
        <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
                <Select onValueChange={onSelectChange} defaultValue="Call">
                    <SelectTrigger>
                        <SelectValue placeholder="Select interaction type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Call">Call</SelectItem>
                        <SelectItem value="Email">Email</SelectItem>
                        <SelectItem value="Meeting">Meeting</SelectItem>
                    </SelectContent>
                </Select>
                <Textarea
                    name="notes"
                    placeholder="Add your notes here..."
                    value={formData.notes}
                    onChange={onChange}
                    required
                />
                <Button type="submit">Log Interaction</Button>
            </form>
        </CardContent>
    </Card>
  );
};

export default AddInteractionForm;