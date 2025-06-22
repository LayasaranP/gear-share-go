
import React, { useState } from 'react';
import { Search, Filter, MapPin, List, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import MapView from '@/components/MapView';
import EquipmentDetail from '@/components/EquipmentDetail';
import BookingRequestFlow, { BookingData } from '@/components/BookingRequestFlow';
import BookingConfirmation from '@/components/BookingConfirmation';
import { mockEquipment, Equipment } from '@/services/equipmentData';

type ViewMode = 'grid' | 'map' | 'detail' | 'booking' | 'confirmation';

const BrowseEquipment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [bookingDates, setBookingDates] = useState<{ start: string; end: string } | null>(null);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const filteredEquipment = mockEquipment.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEquipmentSelect = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setViewMode('detail');
  };

  const handleBookingRequest = (equipment: Equipment, dates: { start: string; end: string }) => {
    setSelectedEquipment(equipment);
    setBookingDates(dates);
    setViewMode('booking');
  };

  const handleBookingConfirm = (data: BookingData) => {
    setBookingData(data);
    setBookingId(`RNT-${Date.now()}`);
    setViewMode('confirmation');
  };

  const handleBackToGrid = () => {
    setViewMode('grid');
    setSelectedEquipment(null);
    setBookingDates(null);
  };

  const handleBackToDetail = () => {
    setViewMode('detail');
    setBookingDates(null);
  };

  if (viewMode === 'confirmation' && bookingData && bookingId) {
    return (
      <BookingConfirmation
        bookingData={bookingData}
        bookingId={bookingId}
        onViewAllBookings={() => setViewMode('grid')}
        onContactOwner={() => console.log('Contact owner')}
      />
    );
  }

  if (viewMode === 'booking' && selectedEquipment && bookingDates) {
    return (
      <BookingRequestFlow
        equipment={selectedEquipment}
        dates={bookingDates}
        onBack={handleBackToDetail}
        onConfirm={handleBookingConfirm}
      />
    );
  }

  if (viewMode === 'detail' && selectedEquipment) {
    return (
      <EquipmentDetail
        equipment={selectedEquipment}
        onBack={handleBackToGrid}
        onBookingRequest={handleBookingRequest}
      />
    );
  }

  if (viewMode === 'map') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-between p-4 bg-white border-b">
          <h1 className="text-xl font-semibold">Equipment Map</h1>
          <Button
            variant="outline"
            onClick={() => setViewMode('grid')}
          >
            <List className="w-4 h-4 mr-2" />
            List View
          </Button>
        </div>
        <MapView searchQuery={searchTerm} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Equipment</h1>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => setViewMode('map')}
                className="flex items-center space-x-2"
              >
                <Map className="w-4 h-4" />
                <span>Map View</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div 
                className="aspect-video bg-gray-200 relative"
                onClick={() => handleEquipmentSelect(item)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-2 py-1 rounded text-sm">
                  {item.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.brand}</p>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{item.location.city}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">${item.price}/{item.priceUnit}</span>
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1 text-sm text-gray-600">{item.rating}</span>
                  </div>
                </div>
                <Button 
                  className="w-full mt-4"
                  onClick={() => handleEquipmentSelect(item)}
                >
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseEquipment;
