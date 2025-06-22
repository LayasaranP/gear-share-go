
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, ChevronRight, Calendar, MapPin, Shield, 
  CreditCard, Clock, AlertCircle, CheckCircle, Truck
} from 'lucide-react';
import { Equipment } from '@/services/equipmentData';

interface BookingRequestFlowProps {
  equipment: Equipment;
  dates: { start: string; end: string };
  onBack: () => void;
  onConfirm: (bookingData: BookingData) => void;
}

interface BookingData {
  equipment: Equipment;
  dates: { start: string; end: string };
  deliveryOption: 'pickup' | 'delivery';
  deliveryAddress?: string;
  insurance: 'basic' | 'premium' | 'none';
  paymentMethod: string;
  specialRequests: string;
  agreedToTerms: boolean;
}

const BookingRequestFlow: React.FC<BookingRequestFlowProps> = ({ 
  equipment, 
  dates, 
  onBack, 
  onConfirm 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<Partial<BookingData>>({
    equipment,
    dates,
    deliveryOption: 'pickup',
    insurance: 'basic',
    paymentMethod: '',
    specialRequests: '',
    agreedToTerms: false
  });

  const totalSteps = 4;
  const days = Math.ceil((new Date(dates.end).getTime() - new Date(dates.start).getTime()) / (1000 * 60 * 60 * 24));
  const basePrice = days * equipment.price;
  
  const calculateTotalCost = () => {
    let total = basePrice;
    
    // Delivery fee
    if (bookingData.deliveryOption === 'delivery') {
      total += 75;
    }
    
    // Insurance
    if (bookingData.insurance === 'basic') {
      total += Math.round(basePrice * 0.05);
    } else if (bookingData.insurance === 'premium') {
      total += Math.round(basePrice * 0.12);
    }
    
    // Service fee
    total += Math.round(basePrice * 0.1);
    
    return total;
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirm = () => {
    if (bookingData.agreedToTerms && bookingData.paymentMethod) {
      onConfirm(bookingData as BookingData);
    }
  };

  const stepTitles = [
    'Delivery & Pickup',
    'Insurance & Protection',
    'Payment & Details',
    'Review & Confirm'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Request Booking</h1>
              <p className="text-sm text-gray-600">{equipment.name}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center justify-between">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i + 1 <= currentStep ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {i + 1}
                </div>
                <div className="flex-1 px-2">
                  <div className={`h-1 rounded-full ${
                    i + 1 < currentStep ? 'bg-teal-600' : 'bg-gray-200'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 text-center">
            <h2 className="font-medium">{stepTitles[currentStep - 1]}</h2>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Delivery & Pickup */}
            {currentStep === 1 && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">How would you like to get the equipment?</h3>
                <RadioGroup
                  value={bookingData.deliveryOption}
                  onValueChange={(value: 'pickup' | 'delivery') => 
                    setBookingData({ ...bookingData, deliveryOption: value })
                  }
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-teal-100 rounded-lg">
                          <MapPin className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                          <p className="font-medium">Pickup at Location</p>
                          <p className="text-sm text-gray-600">{equipment.location.address}</p>
                          <p className="text-sm text-green-600 font-medium">Free</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Truck className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Delivery Service</p>
                          <p className="text-sm text-gray-600">We'll deliver to your location</p>
                          <p className="text-sm text-blue-600 font-medium">$75</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {bookingData.deliveryOption === 'delivery' && (
                  <div className="mt-4">
                    <Label htmlFor="address">Delivery Address</Label>
                    <Input
                      id="address"
                      placeholder="Enter your delivery address"
                      value={bookingData.deliveryAddress || ''}
                      onChange={(e) => setBookingData({ ...bookingData, deliveryAddress: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                )}
              </Card>
            )}

            {/* Step 2: Insurance */}
            {currentStep === 2 && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Protection Plan</h3>
                <RadioGroup
                  value={bookingData.insurance}
                  onValueChange={(value: 'basic' | 'premium' | 'none') => 
                    setBookingData({ ...bookingData, insurance: value })
                  }
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="none" id="none" />
                    <Label htmlFor="none" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">No Protection</p>
                          <p className="text-sm text-gray-600">You're responsible for all damages</p>
                        </div>
                        <p className="text-sm text-green-600 font-medium">Free</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 border-teal-200 bg-teal-50">
                    <RadioGroupItem value="basic" id="basic" />
                    <Label htmlFor="basic" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Basic Protection</p>
                          <p className="text-sm text-gray-600">Coverage up to $5,000</p>
                          <Badge variant="secondary" className="mt-1">Recommended</Badge>
                        </div>
                        <p className="text-sm text-teal-600 font-medium">${Math.round(basePrice * 0.05)}</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="premium" id="premium" />
                    <Label htmlFor="premium" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Premium Protection</p>
                          <p className="text-sm text-gray-600">Full coverage + roadside assistance</p>
                        </div>
                        <p className="text-sm text-blue-600 font-medium">${Math.round(basePrice * 0.12)}</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </Card>
            )}

            {/* Step 3: Payment & Details */}
            {currentStep === 3 && (
              <Card className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                  <RadioGroup
                    value={bookingData.paymentMethod}
                    onValueChange={(value) => setBookingData({ ...bookingData, paymentMethod: value })}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                        <CreditCard className="w-4 h-4" />
                        Credit/Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="cursor-pointer">PayPal</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="requests">Special Requests or Questions</Label>
                  <Textarea
                    id="requests"
                    placeholder="Any special requirements or questions for the owner..."
                    value={bookingData.specialRequests}
                    onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
                    className="mt-1"
                    rows={4}
                  />
                </div>
              </Card>
            )}

            {/* Step 4: Review & Confirm */}
            {currentStep === 4 && (
              <Card className="p-6 space-y-6">
                <h3 className="text-lg font-semibold">Review Your Booking</h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                    <div>
                      <p className="font-semibold">{equipment.name}</p>
                      <p className="text-sm text-gray-600">{equipment.brand}</p>
                      <p className="text-sm text-gray-500">By {equipment.owner}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-600">Dates</p>
                      <p>{dates.start} to {dates.end}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">Duration</p>
                      <p>{days} days</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">Pickup/Delivery</p>
                      <p className="capitalize">{bookingData.deliveryOption}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">Protection</p>
                      <p className="capitalize">{bookingData.insurance} plan</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={bookingData.agreedToTerms}
                      onCheckedChange={(checked) => 
                        setBookingData({ ...bookingData, agreedToTerms: checked as boolean })
                      }
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the rental terms and conditions
                    </Label>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <AlertCircle className="w-4 h-4" />
                    <span>Your booking request will be sent to the owner for approval</span>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar - Booking Summary */}
          <div>
            <Card className="p-6 sticky top-6">
              <h3 className="font-semibold mb-4">Booking Summary</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>${equipment.price} × {days} days</span>
                  <span>${basePrice}</span>
                </div>
                
                {bookingData.deliveryOption === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Delivery fee</span>
                    <span>$75</span>
                  </div>
                )}
                
                {bookingData.insurance !== 'none' && (
                  <div className="flex justify-between">
                    <span>Protection plan</span>
                    <span>${bookingData.insurance === 'basic' ? Math.round(basePrice * 0.05) : Math.round(basePrice * 0.12)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>${Math.round(basePrice * 0.1)}</span>
                </div>
                
                <div className="border-t pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${calculateTotalCost()}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{dates.start} - {dates.end}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{equipment.location.city}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          {currentStep < totalSteps ? (
            <Button onClick={nextStep}>
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleConfirm}
              disabled={!bookingData.agreedToTerms || !bookingData.paymentMethod}
              className="bg-teal-600 hover:bg-teal-700"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Confirm Booking Request
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingRequestFlow;

export type { BookingData };
