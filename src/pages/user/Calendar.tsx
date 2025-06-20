
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { ArrowLeft, Calendar as CalendarIcon, Clock, User } from 'lucide-react';
import Header from '@/components/Header';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const [bookings] = useState([
    {
      id: 1,
      equipment: 'Power Drill',
      renter: 'John Doe',
      startDate: '2024-01-22',
      endDate: '2024-01-24',
      time: '9:00 AM - 5:00 PM',
      status: 'confirmed',
      amount: 25.00,
    },
    {
      id: 2,
      equipment: 'Circular Saw',
      renter: 'Jane Smith',
      startDate: '2024-01-25',
      endDate: '2024-01-26',
      time: '10:00 AM - 4:00 PM',
      status: 'pending',
      amount: 40.00,
    },
    {
      id: 3,
      equipment: 'Generator',
      renter: 'Bob Johnson',
      startDate: '2024-01-28',
      endDate: '2024-01-30',
      time: '8:00 AM - 6:00 PM',
      status: 'confirmed',
      amount: 80.00,
    },
  ]);

  const getBookingsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return bookings.filter(booking => 
      dateStr >= booking.startDate && dateStr <= booking.endDate
    );
  };

  const selectedDateBookings = selectedDate ? getBookingsForDate(selectedDate) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button asChild variant="outline" className="mb-4">
            <Link to="/user-dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Booking Calendar</h1>
          <p className="text-gray-600 mt-2">View and manage your equipment bookings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-2 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Calendar View
            </h3>
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </Card>

          {/* Selected Date Bookings */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              {selectedDate ? selectedDate.toDateString() : 'Select a date'}
            </h3>
            {selectedDateBookings.length > 0 ? (
              <div className="space-y-4">
                {selectedDateBookings.map((booking) => (
                  <div key={booking.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{booking.equipment}</h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {booking.renter}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {booking.time}
                      </div>
                      <p className="font-medium text-blue-600">${booking.amount}/day</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No bookings for this date</p>
            )}
          </Card>
        </div>

        {/* Upcoming Bookings */}
        <Card className="p-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Upcoming Bookings</h3>
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{booking.equipment}</h4>
                  <p className="text-sm text-gray-600">Renter: {booking.renter}</p>
                  <p className="text-sm text-gray-600">
                    {booking.startDate} to {booking.endDate}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-600">${booking.amount}/day</p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;
