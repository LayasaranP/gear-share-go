
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Package, Calendar, MessageCircle, MapPin, Clock, DollarSign, Search, Filter, Grid, List } from 'lucide-react';
import Header from '@/components/Header';

const MyBookings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('date');

  const bookings = [
    {
      id: 1,
      equipment: 'Heavy Duty Excavator',
      owner: 'Construction Pro LLC',
      startDate: '2024-01-20',
      endDate: '2024-01-25',
      status: 'confirmed',
      price: 450,
      location: 'Austin, TX',
      image: '/placeholder.svg',
      messages: 2
    },
    {
      id: 2,
      equipment: 'Power Drill Set',
      owner: 'Mike Johnson',
      startDate: '2024-01-15',
      endDate: '2024-01-16',
      status: 'completed',
      price: 25,
      location: 'Austin, TX',
      image: '/placeholder.svg',
      messages: 0
    },
    {
      id: 3,
      equipment: 'Generator 5000W',
      owner: 'Sarah Wilson',
      startDate: '2024-01-25',
      endDate: '2024-01-27',
      status: 'pending',
      price: 120,
      location: 'Round Rock, TX',
      image: '/placeholder.svg',
      messages: 1
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusActions = (status: string, booking: any) => {
    switch (status) {
      case 'pending':
        return (
          <div className="flex gap-2">
            <Button size="sm" variant="outline">Cancel</Button>
            <Button size="sm">
              <MessageCircle className="w-4 h-4 mr-1" />
              Contact Owner
            </Button>
          </div>
        );
      case 'confirmed':
        return (
          <div className="flex gap-2">
            <Button size="sm" variant="outline">View Details</Button>
            <Button size="sm">
              <MessageCircle className="w-4 h-4 mr-1" />
              Message
            </Button>
          </div>
        );
      case 'completed':
        return (
          <div className="flex gap-2">
            <Button size="sm" variant="outline">Leave Review</Button>
            <Button size="sm" variant="outline">Book Again</Button>
          </div>
        );
      default:
        return null;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.equipment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your equipment rentals</p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Sort by Date</SelectItem>
                <SelectItem value="price">Sort by Price</SelectItem>
                <SelectItem value="status">Sort by Status</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Booking Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Bookings ({bookings.length})</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming ({bookings.filter(b => b.status === 'confirmed').length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({bookings.filter(b => b.status === 'pending').length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({bookings.filter(b => b.status === 'completed').length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {filteredBookings.map((booking) => (
                <Card key={booking.id} className={`overflow-hidden hover:shadow-lg transition-shadow ${
                  viewMode === 'list' ? 'flex' : ''
                }`}>
                  <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-video'} bg-gray-200 relative`}>
                    <Package className="absolute inset-0 w-12 h-12 text-gray-400 m-auto" />
                    <Badge className={`absolute top-4 right-4 ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </Badge>
                  </div>
                  <div className="p-6 flex-1">
                    <h3 className="text-lg font-semibold mb-2">{booking.equipment}</h3>
                    <p className="text-sm text-gray-600 mb-2">by {booking.owner}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {booking.startDate} - {booking.endDate}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {booking.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2" />
                        ${booking.price}/day
                      </div>
                      {booking.messages > 0 && (
                        <div className="flex items-center text-sm text-blue-600">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          {booking.messages} unread message{booking.messages > 1 ? 's' : ''}
                        </div>
                      )}
                    </div>

                    {getStatusActions(booking.status, booking)}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Similar structure for other tabs */}
          <TabsContent value="upcoming" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBookings.filter(b => b.status === 'confirmed').map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  {/* Same card structure as above */}
                  <div className="aspect-video bg-gray-200 relative">
                    <Package className="absolute inset-0 w-12 h-12 text-gray-400 m-auto" />
                    <Badge className={`absolute top-4 right-4 ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{booking.equipment}</h3>
                    <p className="text-sm text-gray-600 mb-2">by {booking.owner}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {booking.startDate} - {booking.endDate}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {booking.location}
                      </div>
                    </div>
                    {getStatusActions(booking.status, booking)}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBookings.filter(b => b.status === 'pending').map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <div className="aspect-video bg-gray-200 relative">
                    <Package className="absolute inset-0 w-12 h-12 text-gray-400 m-auto" />
                    <Badge className={`absolute top-4 right-4 ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{booking.equipment}</h3>
                    <p className="text-sm text-gray-600 mb-2">by {booking.owner}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {booking.startDate} - {booking.endDate}
                      </div>
                    </div>
                    {getStatusActions(booking.status, booking)}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBookings.filter(b => b.status === 'completed').map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <div className="aspect-video bg-gray-200 relative">
                    <Package className="absolute inset-0 w-12 h-12 text-gray-400 m-auto" />
                    <Badge className={`absolute top-4 right-4 ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{booking.equipment}</h3>
                    <p className="text-sm text-gray-600 mb-2">by {booking.owner}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {booking.startDate} - {booking.endDate}
                      </div>
                    </div>
                    {getStatusActions(booking.status, booking)}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyBookings;
