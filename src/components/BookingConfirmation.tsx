
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, Calendar, MapPin, MessageCircle, 
  Download, Share, Clock, Phone, Mail
} from 'lucide-react';
import { Equipment } from '@/services/equipmentData';
import { BookingData } from './BookingRequestFlow';

interface BookingConfirmationProps {
  bookingData: BookingData;
  bookingId: string;
  onViewAllBookings: () => void;
  onContactOwner: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  bookingData,
  bookingId,
  onViewAllBookings,
  onContactOwner
}) => {
  const { equipment, dates } = bookingData;
  const days = Math.ceil((new Date(dates.end).getTime() - new Date(dates.start).getTime()) / (1000 * 60 * 60 * 24));

  const handleAddToCalendar = () => {
    // Create calendar event
    const startDate = new Date(dates.start).toISOString().replace(/[-:]/g, '').split('.')[0];
    const endDate = new Date(dates.end).toISOString().replace(/[-:]/g, '').split('.')[0];
    const title = encodeURIComponent(`Equipment Rental: ${equipment.name}`);
    const details = encodeURIComponent(`Rental of ${equipment.name} from ${equipment.owner}`);
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}Z/${endDate}Z&details=${details}`;
    window.open(calendarUrl, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Equipment Rental Booking',
        text: `I've booked ${equipment.name} for ${dates.start} - ${dates.end}`,
        url: window.location.href
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Request Sent!</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Your rental request has been submitted successfully. The equipment owner will review and respond within 24 hours.
          </p>
        </div>

        {/* Booking Reference */}
        <Card className="mb-8 p-6 bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Booking Reference</p>
            <p className="text-2xl font-bold text-teal-600 font-mono">{bookingId}</p>
            <p className="text-sm text-gray-500 mt-2">Save this reference number for your records</p>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Details */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Booking Details</h2>
              
              <div className="flex items-start gap-4 mb-6">
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-xs text-center">Equipment Image</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{equipment.name}</h3>
                  <p className="text-gray-600">{equipment.brand} • {equipment.category}</p>
                  <p className="text-sm text-gray-500">Owned by {equipment.owner}</p>
                  <Badge variant="secondary" className="mt-2">Pending Approval</Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-gray-600 mb-1">Rental Period</p>
                  <div className="flex items-center gap-1 text-gray-900">
                    <Calendar className="w-4 h-4" />
                    <span>{dates.start} to {dates.end}</span>
                  </div>
                  <p className="text-gray-500">{days} days</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600 mb-1">Location</p>
                  <div className="flex items-center gap-1 text-gray-900">
                    <MapPin className="w-4 h-4" />
                    <span>{equipment.location.city}</span>
                  </div>
                  <p className="text-gray-500 capitalize">{bookingData.deliveryOption}</p>
                </div>
              </div>
            </Card>

            {/* Next Steps */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">What Happens Next?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-blue-600">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Owner Review</p>
                    <p className="text-sm text-gray-600">The equipment owner will review your request and contact details.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-blue-600">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Approval & Payment</p>
                    <p className="text-sm text-gray-600">Once approved, you'll receive payment instructions and rental agreement.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-blue-600">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Equipment Pickup/Delivery</p>
                    <p className="text-sm text-gray-600">Coordinate with the owner for equipment handover on your start date.</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Actions & Contact */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={handleAddToCalendar}
                >
                  <Calendar className="w-4 h-4 mr-3" />
                  Add to Calendar
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={onContactOwner}
                >
                  <MessageCircle className="w-4 h-4 mr-3" />
                  Contact Owner
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={handleShare}
                >
                  <Share className="w-4 h-4 mr-3" />
                  Share Booking
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                >
                  <Download className="w-4 h-4 mr-3" />
                  Download Receipt
                </Button>
              </div>
            </Card>

            {/* Owner Contact */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Equipment Owner</h2>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="font-medium">{equipment.owner[0]}</span>
                </div>
                <div>
                  <p className="font-semibold">{equipment.owner}</p>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <span>⭐ 4.9</span>
                    <span>•</span>
                    <span>47 reviews</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Owner
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </Card>

            {/* Important Information */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Important Information</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Response Time</p>
                    <p className="text-gray-600">Most owners respond within 2-4 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Cancellation Policy</p>
                    <p className="text-gray-600">Free cancellation up to 24 hours before pickup</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <Button 
            variant="outline" 
            onClick={onViewAllBookings}
            className="sm:w-auto"
          >
            View All Bookings
          </Button>
          <Button 
            className="sm:w-auto bg-teal-600 hover:bg-teal-700"
          >
            Browse More Equipment
          </Button>
        </div>

        {/* Support Contact */}
        <div className="text-center mt-8 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600">
            Need help with your booking? 
            <a href="#" className="text-teal-600 hover:underline ml-1">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
