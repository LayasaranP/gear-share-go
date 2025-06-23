
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import ListingWizard from '@/components/ListingWizard';

const ListEquipment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleListingSubmit = async (listingData: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('New listing created:', listingData);
    
    toast({
      title: "Equipment listed successfully!",
      description: "Your equipment is now available for rent on EquipShare.",
    });

    // Navigate to my listings page
    setTimeout(() => navigate('/my-listings'), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ListingWizard onSubmit={handleListingSubmit} />
    </div>
  );
};

export default ListEquipment;
