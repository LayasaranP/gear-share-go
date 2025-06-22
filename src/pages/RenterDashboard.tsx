
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';
import { Search, MapPin, Clock, Star, Heart, Package, MessageCircle, Calendar as CalendarIcon, Truck, CheckCircle, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import NearMeFilter from '@/components/NearMeFilter';
import DateRangePicker from '@/components/DateRangePicker';
import { 
  mockEquipment, 
  Equipment, 
  fuzzySearch, 
  filterByLocation, 
  filterByDateRange 
} from '@/services/equipmentData';
import { 
  savedEquipmentService, 
  upcomingPickupsService, 
  recentRentalsService 
} from '@/services/localStorage';

const RenterDashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [filteredEquipment, setFilteredEquipment] = useState<Equipment[]>(mockEquipment);
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [dateRange, setDateRange] = useState<{start: string, end: string}>({start: '', end: ''});
  const [savedEquipment, setSavedEquipment] = useState<string[]>([]);
  const [upcomingPickups, setUpcomingPickups] = useState(upcomingPickupsService.getPickups());
  const [recentRentals, setRecentRentals] = useState(recentRentalsService.getRentals());
  
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

  useEffect(() => {
    // Load saved equipment on component mount
    const saved = savedEquipmentService.getSaved();
    setSavedEquipment(saved.map(item => item.equipmentId));
  }, []);

  useEffect(() => {
    // Apply all filters
    let filtered = mockEquipment;

    // Apply search filter
    if (searchQuery) {
      filtered = fuzzySearch(searchQuery, filtered);
    }

    // Apply location filter
    if (userLocation) {
      filtered = filterByLocation(filtered, userLocation.lat, userLocation.lng);
    }

    // Apply date range filter
    if (dateRange.start && dateRange.end) {
      filtered = filterByDateRange(filtered, dateRange.start, dateRange.end);
    }

    setFilteredEquipment(filtered);
  }, [searchQuery, userLocation, dateRange]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleLocationChange = (location: {lat: number, lng: number} | null) => {
    setUserLocation(location);
  };

  const handleDateChange = (startDate: string, endDate: string) => {
    setDateRange({start: startDate, end: endDate});
  };

  const toggleSaveEquipment = (equipmentId: string) => {
    if (savedEquipmentService.isSaved(equipmentId)) {
      savedEquipmentService.remove(equipmentId);
      setSavedEquipment(prev => prev.filter(id => id !== equipmentId));
    } else {
      savedEquipmentService.save(equipmentId);
      setSavedEquipment(prev => [...prev, equipmentId]);
    }
  };

  const handleCancelPickup = (pickupId: string) => {
    upcomingPickupsService.remove(pickupId);
    setUpcomingPickups(upcomingPickupsService.getPickups());
  };

  const handleRentAgain = (rental: any) => {
    // In a real app, this would navigate to booking form with pre-filled data
    console.log('Rent again:', rental);
  };

  const getSavedEquipmentData = () => {
    return mockEquipment.filter(equipment => savedEquipment.includes(equipment.id));
  };

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

        {/* Enhanced Search Section */}
        <Card className="mb-8 border-2 border-teal-200">
          <div className="p-6">
            <div className="space-y-4">
              <SearchBar onSearch={handleSearch} />
              
              <div className="flex flex-col md:flex-row gap-4">
                <NearMeFilter onLocationChange={handleLocationChange} />
                <DateRangePicker onDateChange={handleDateChange} />
                <Button 
                  className="bg-teal-600 hover:bg-teal-700"
                  onClick={() => console.log('Search executed with filters')}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Search Results */}
        {(searchQuery || userLocation || (dateRange.start && dateRange.end)) && (
          <Card className="mb-8">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Search Results ({filteredEquipment.length} items)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEquipment.slice(0, 6).map((equipment) => (
                  <div key={equipment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{equipment.name}</h4>
                        <p className="text-sm text-gray-600">{equipment.brand}</p>
                        <p className="text-sm text-teal-600">${equipment.price}/{equipment.priceUnit}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSaveEquipment(equipment.id)}
                        className={savedEquipment.includes(equipment.id) ? 'text-red-500' : 'text-gray-400'}
                      >
                        <Heart className={`w-4 h-4 ${savedEquipment.includes(equipment.id) ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{equipment.location.city}</span>
                      <Star className="w-3 h-3 text-yellow-500 fill-current ml-2" />
                      <span className="text-xs text-gray-500">{equipment.rating}</span>
                    </div>
                    <Button size="sm" className="w-full">Rent Now</Button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

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
            {upcomingPickups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingPickups.map((pickup) => (
                  <div key={pickup.id} className="flex items-center gap-3 p-4 border rounded-lg bg-purple-50">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Truck className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{pickup.equipmentName}</p>
                      <p className="text-sm text-gray-600">{pickup.pickupDate} at {pickup.pickupTime}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {pickup.location}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Reschedule</Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleCancelPickup(pickup.id)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No upcoming pickups scheduled</p>
            )}
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Saved Equipment */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Saved Equipment</h3>
              <Heart className="w-5 h-5 text-red-500" />
            </div>
            <div className="space-y-3">
              {getSavedEquipmentData().slice(0, 3).map((equipment) => (
                <div key={equipment.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-medium">{equipment.name}</p>
                    <p className="text-sm text-gray-600">By {equipment.owner}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-gray-500">{equipment.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-teal-600">${equipment.price}/{equipment.priceUnit}</p>
                    <Button size="sm" className="mt-1">Rent Now</Button>
                  </div>
                </div>
              ))}
              {getSavedEquipmentData().length === 0 && (
                <p className="text-gray-500 text-center py-4">No saved equipment yet</p>
              )}
            </div>
          </Card>

          {/* Recent Rentals */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Rentals</h3>
            <div className="space-y-3">
              {recentRentals.slice(0, 3).map((rental) => (
                <div key={rental.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{rental.equipmentName}</p>
                    <p className="text-sm text-gray-600">From {rental.owner}</p>
                    <p className="text-xs text-gray-500">{rental.startDate} to {rental.endDate}</p>
                  </div>
                  <div className="text-right space-y-1">
                    {rental.rating ? (
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
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleRentAgain(rental)}
                    >
                      Rent Again
                    </Button>
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
