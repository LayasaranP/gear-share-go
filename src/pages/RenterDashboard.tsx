
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';
import { Search, MapPin, Clock, Star, Heart, Package, MessageCircle, Calendar as CalendarIcon, Truck, CheckCircle, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';

const RenterDashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const user = {
    name: "Emma Wilson",
    email: "emma.wilson@example.com", 
    avatar: "/placeholder.svg",
    currentRentals: 2
  };

  const activeRentals = [
    { id: 1, equipment: "Power Drill", owner: "John Smith", pickup: "Jan 15", return: "Jan 18", status: "active", image: "/placeholder.svg" },
    { id: 2, equipment: "Pressure Washer", owner: "Mike Johnson", pickup: "Jan 16", return: "Jan 19", status: "active", image: "/placeholder.svg" }
  ];

  const upcomingPickups = [
    { id: 1, equipment: "Circular Saw", date: "Jan 20", time: "10:00 AM", location: "Downtown" },
    { id: 2, equipment: "Generator", date: "Jan 22", time: "2:00 PM", location: "North Side" }
  ];

  const pastRentals = [
    { id: 1, equipment: "Tile Cutter", owner: "Sarah Davis", date: "Dec 2023", rating: 0, reviewed: false },
    { id: 2, equipment: "Lawn Mower", owner: "Tom Brown", date: "Nov 2023", rating: 5, reviewed: true },
    { id: 3, equipment: "Paint Sprayer", owner: "Lisa Wilson", date: "Oct 2023", rating: 4, reviewed: true }
  ];

  const wishlistItems = [
    { id: 1, equipment: "Concrete Mixer", price: "$45/day", owner: "Mike Johnson", rating: 4.9 },
    { id: 2, equipment: "Chainsaw", price: "$35/day", owner: "Bob Smith", rating: 4.7 },
    { id: 3, equipment: "Welding Machine", price: "$60/day", owner: "Carl Davis", rating: 4.8 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <Card className="mb-8 bg-gradient-to-r from-teal-500 to-orange-500 text-white">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16 border-2 border-white">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-teal-600 text-white text-lg">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">Hey {user.name}! 🔧</h1>
                  <p className="text-teal-100">Ready for your next project?</p>
                  <p className="text-sm text-teal-200 mt-1">{user.currentRentals} active rentals</p>
                </div>
              </div>
              <div className="text-right">
                <Button variant="secondary" size="lg" asChild>
                  <Link to="/browse">
                    <Search className="w-4 h-4 mr-2" />
                    Find Equipment
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Search Bar */}
        <Card className="mb-8 border-2 border-teal-200">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="What equipment do you need today?" 
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <MapPin className="w-4 h-4 mr-2" />
                  Near Me
                </Button>
                <Button variant="outline">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Dates
                </Button>
                <Button className="bg-teal-600 hover:bg-teal-700">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Rentals</p>
                <p className="text-2xl font-bold text-teal-600">2</p>
              </div>
              <div className="p-3 bg-teal-100 rounded-lg">
                <Package className="w-6 h-6 text-teal-600" />
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Returns</p>
                <p className="text-2xl font-bold text-orange-600">1</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Messages</p>
                <p className="text-2xl font-bold text-blue-600">3</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Pickups</p>
                <p className="text-2xl font-bold text-purple-600">2</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Truck className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Calendar View */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Rental Calendar</h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border w-full"
            />
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                <span>Pickup dates</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>Return dates</span>
              </div>
            </div>
          </Card>

          {/* Active Rentals */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Active Rentals</h3>
            <div className="space-y-4">
              {activeRentals.map((rental) => (
                <div key={rental.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{rental.equipment}</p>
                    <p className="text-sm text-gray-600">From {rental.owner}</p>
                    <p className="text-xs text-gray-500">Return by {rental.return}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-600">Active</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Upcoming Pickups */}
        <Card className="mb-8">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Upcoming Pickups</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingPickups.map((pickup) => (
                <div key={pickup.id} className="flex items-center gap-3 p-4 border rounded-lg bg-purple-50">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Truck className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{pickup.equipment}</p>
                    <p className="text-sm text-gray-600">{pickup.date} at {pickup.time}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {pickup.location}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Saved Equipment/Wishlist */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Saved Equipment</h3>
              <Heart className="w-5 h-5 text-red-500" />
            </div>
            <div className="space-y-3">
              {wishlistItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-medium">{item.equipment}</p>
                    <p className="text-sm text-gray-600">By {item.owner}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-gray-500">{item.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-teal-600">{item.price}</p>
                    <Button size="sm" className="mt-1">Rent Now</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Past Rentals */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Rentals</h3>
            <div className="space-y-3">
              {pastRentals.map((rental) => (
                <div key={rental.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{rental.equipment}</p>
                    <p className="text-sm text-gray-600">From {rental.owner}</p>
                    <p className="text-xs text-gray-500">{rental.date}</p>
                  </div>
                  <div className="text-right">
                    {rental.reviewed ? (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{rental.rating}/5</span>
                      </div>
                    ) : (
                      <Button size="sm" variant="outline">
                        <Star className="w-3 h-3 mr-1" />
                        Review
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/browse" className="block text-center">
              <div className="p-3 bg-teal-100 rounded-lg w-fit mx-auto mb-3">
                <Search className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="font-semibold mb-1">Find More Equipment</h3>
              <p className="text-sm text-gray-600">Browse available tools and equipment</p>
            </Link>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/messages" className="block text-center">
              <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-3">
                <MessageCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-1">Messages</h3>
              <p className="text-sm text-gray-600">Chat with equipment owners</p>
            </Link>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/account/settings" className="block text-center">
              <div className="p-3 bg-gray-100 rounded-lg w-fit mx-auto mb-3">
                <Package className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="font-semibold mb-1">Account</h3>
              <p className="text-sm text-gray-600">Manage your profile and settings</p>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RenterDashboard;
