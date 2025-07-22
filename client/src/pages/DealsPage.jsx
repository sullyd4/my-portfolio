import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from 'lucide-react';
import AddDealForm from '@/components/crm/AddDealForm';
import EditDealForm from '@/components/crm/EditDealForm';
import { useToast } from "@/components/ui/use-toast"; // Import the useToast hook
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

const DealsPage = () => {
  const [deals, setDeals] = useState([]);
  const navigate = useNavigate();
  const { toast } = useToast(); // Initialize the toast function

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await api.get('/deals');
        setDeals(res.data);
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };
    fetchDeals();
  }, [navigate]);

  const handleDealAdded = () => {
    const fetchDeals = async () => {
        const res = await api.get('/deals');
        setDeals(res.data);
    };
    fetchDeals();
    toast({ title: "Success!", description: "New deal has been added." });
  };

  const handleDealUpdated = () => {
    const fetchDeals = async () => {
        const res = await api.get('/deals');
        setDeals(res.data);
    };
    fetchDeals();
    toast({ title: "Success!", description: "Deal has been updated." });
  };

  const handleDeleteDeal = async (id) => {
    try {
      await api.delete(`/deals/${id}`);
      setDeals(deals.filter(d => d._id !== id));
      toast({ title: "Success!", description: "Deal has been deleted." });
    } catch (err) {
      console.error(err);
      toast({ variant: "destructive", title: "Error", description: "Could not delete deal." });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Deals</h1>
        <AddDealForm onDealAdded={handleDealAdded} />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deals.length > 0 ? (
              deals.map(deal => (
                <TableRow key={deal._id}>
                  <TableCell className="font-medium">{deal.title}</TableCell>
                  <TableCell>{deal.contact ? `${deal.contact.firstName} ${deal.contact.lastName}` : 'N/A'}</TableCell>
                  <TableCell>${deal.value ? deal.value.toLocaleString() : '0'}</TableCell>
                  <TableCell>{deal.stage}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                        <EditDealForm deal={deal} onDealUpdated={handleDealUpdated} />
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
                                    This action cannot be undone. This will permanently delete the deal.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteDeal(deal._id)}>
                                    Delete
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="5" className="h-24 text-center">
                  No deals found. Add one to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DealsPage;