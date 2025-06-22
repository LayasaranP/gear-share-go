
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Heart, Star, MapPin, Shield, CheckCircle, Clock, 
  ChevronLeft, ChevronRight, ZoomIn, MessageCircle,
  Calendar as CalendarIcon, Truck, AlertCircle
} from 'lucide-react';
import { Equipment } from '@/services/equipmentData';
import { savedEquipmentService } from '@/services/localStorage';

interface EquipmentDetailProps {
  equipment: Equipment;
  onBack: () => void;
  onBookingRequest: (equipment: Equipment, dates: { start: string; end: string }) => void;
}

const EquipmentDetail: React.FC<EquipmentDetailProps> = ({ equipment, onBack, onBookingRequest }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDates, setSelectedDates] = useState<{ start: Date | undefined; end: Date | undefined }>({
    start: undefined,
    end: undefined
  });
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews' | 'location'>('overview');

  const mockImages = [equipment.image, equipment.image, equipment.image];
  const mockReviews = [
    { id: 1, user: 'John D.', rating: 5, comment: 'Excellent equipment, worked perfectly for my project!', date: '2024-01-15' },
    { id: 2, user: 'Sarah M.', rating: 4, comment: 'Good condition, owner was very helpful.', date: '2024-01-10' },
    { id: 3, user: 'Mike R.', rating: 5, comment: 'Would rent again, great value for money.', date: '2024-01-08' }
  ];

  const specifications = [
    { label: 'Model Year', value: '2022' },
    { label: 'Weight', value: '2,500 lbs' },
    { label: 'Power', value: '120 HP' },
    { label: 'Fuel Type', value: 'Diesel' },
    { label: 'Operating Hours', value: '450 hrs' },
    { label: 'Condition', value: 'Excellent' }
  ];

  const similarEquipment = [
    { id: '10', name: 'Compact Excavator', price: 380, image: '/placeholder.svg' },
    { id: '11', name: 'Mini Excavator', price: 280, image: '/placeholder.svg' },
    { id: '12', name: 'Track Loader', price: 420, image: '/placeholder.svg' }
  ];

  useEffect(() => {
    setIsSaved(savedEquipmentService.isSaved(equipment.id));
  }, [equipment.id]);

  const toggleSave = () => {
    if (isSaved) {
      savedEquipmentService.remove(equipment.id);
    } else {
      savedEquipmentService.save(equipment.id);
    }
    setIsSaved(!isSaved);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    if (!selectedDates.start || (selectedDates.start && selectedDates.end)) {
      setSelectedDates({ start: date, end: undefined });
    } else if (date < selectedDates.start) {
      setSelectedDates({ start: date, end: selectedDates.start });
    } else {
      setSelectedDates({ start: selectedDates.start, end: date });
    }
  };

  const isDateUnavailable = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return equipment.availability.unavailableDates.includes(dateString) || date < new Date();
  };

  const handleBookingRequest = () => {
    if (selectedDates.start && selectedDates.end) {
      onBookingRequest(equipment, {
        start: selectedDates.start.toISOString().split('T')[0],
        end: selectedDates.end.toISOString().split('T')[0]
      });
    }
  };

  const calculateTotalCost = () => {
    if (!selectedDates.start || !selectedDates.end) return 0;
    const days = Math.ceil((selectedDates.end.getTime() - selectedDates.start.getTime()) / (1000 * 60 * 60 * 24));
    return days * equipment.price;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold">{equipment.name}</h1>
            <p className="text-sm text-gray-600">{equipment.brand} • {equipment.category}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={toggleSave}>
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-current text-red-500' : 'text-gray-400'}`} />
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative aspect-video bg-gray-200">
                <img
                  src={mockImages[currentImageIndex]}
                  alt={equipment.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button variant="secondary" size="sm">
                    <ZoomIn className="w-4 h-4 mr-2" />
                    View Full Size
                  </Button>
                </div>
                {mockImages.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2"
                      onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      onClick={() => setCurrentImageIndex(Math.min(mockImages.length - 1, currentImageIndex + 1))}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
              <div className="flex gap-2 p-4">
                {mockImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-16 h-16 rounded-lg border-2 ${
                      index === currentImageIndex ? 'border-teal-500' : 'border-gray-200'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img src={mockImages[index]} alt="" className="w-full h-full object-cover rounded" />
                  </button>
                ))}
              </div>
            </Card>

            {/* Tabs */}
            <Card>
              <div className="border-b">
                <div className="flex">
                  {[
                    { key: 'overview', label: 'Overview' },
                    { key: 'specs', label: 'Specifications' },
                    { key: 'reviews', label: 'Reviews' },
                    { key: 'location', label: 'Location' }
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      className={`px-6 py-3 font-medium text-sm border-b-2 ${
                        activeTab === tab.key
                          ? 'border-teal-500 text-teal-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setActiveTab(tab.key as typeof activeTab)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <p className="text-gray-700">{equipment.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm">Verified Owner</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-500" />
                        <span className="text-sm">Insured</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-orange-500" />
                        <span className="text-sm">Instant Booking</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="w-5 h-5 text-purple-500" />
                        <span className="text-sm">Delivery Available</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-600">{spec.label}</span>
                        <span className="text-gray-900">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-3xl font-bold">{equipment.rating}</div>
                      <div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${star <= equipment.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">{mockReviews.length} reviews</p>
                      </div>
                    </div>
                    {mockReviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-100 pb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>{review.user[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{review.user}</p>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-3 h-3 ${star <= review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-xs text-gray-500 ml-auto">{review.date}</span>
                        </div>
                        <p className="text-sm text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'location' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span>{equipment.location.address}</span>
                    </div>
                    <div className="h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-600">Interactive map would be displayed here</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Similar Equipment */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Similar Equipment</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {similarEquipment.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="aspect-video bg-gray-200 rounded-lg mb-2"></div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-teal-600 font-semibold">${item.price}/day</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Booking */}
          <div className="space-y-6">
            {/* Owner Profile */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>{equipment.owner[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{equipment.owner}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm">4.9 • 47 reviews</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>
            </Card>

            {/* Pricing */}
            <Card className="p-6">
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-teal-600">${equipment.price}</span>
                  <span className="text-gray-600">/{equipment.priceUnit}</span>
                </div>
                <p className="text-sm text-gray-500">Plus applicable fees</p>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Select Dates</h4>
                <Calendar
                  mode="single"
                  selected={selectedDates.start}
                  onSelect={handleDateSelect}
                  disabled={isDateUnavailable}
                  className="rounded-md border"
                />
                {selectedDates.start && selectedDates.end && (
                  <div className="mt-3 p-3 bg-teal-50 rounded-lg">
                    <p className="text-sm font-medium text-teal-800">
                      {selectedDates.start.toLocaleDateString()} - {selectedDates.end.toLocaleDateString()}
                    </p>
                    <p className="text-sm text-teal-600">
                      {Math.ceil((selectedDates.end.getTime() - selectedDates.start.getTime()) / (1000 * 60 * 60 * 24))} days
                    </p>
                  </div>
                )}
              </div>

              {/* Cost Breakdown */}
              {selectedDates.start && selectedDates.end && (
                <div className="mb-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Rental Cost</span>
                    <span>${calculateTotalCost()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Service Fee</span>
                    <span>${Math.round(calculateTotalCost() * 0.1)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Insurance</span>
                    <span>${Math.round(calculateTotalCost() * 0.05)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${Math.round(calculateTotalCost() * 1.15)}</span>
                  </div>
                </div>
              )}

              {/* Booking Button */}
              <Button
                className="w-full"
                size="lg"
                onClick={handleBookingRequest}
                disabled={!selectedDates.start || !selectedDates.end}
              >
                Request to Book
              </Button>

              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                <AlertCircle className="w-4 h-4" />
                <span>You won't be charged yet</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetail;
