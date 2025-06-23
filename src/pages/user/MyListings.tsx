
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Package, Edit, Trash2, Eye, DollarSign, TrendingUp, Calendar, MapPin, Search, Filter, Grid, List, BarChart3, Settings } from 'lucide-react';
import Header from '@/components/Header';

const MyListings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedListings, setSelectedListings] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('recent');

  const listings = [
    {
      id: 1,
      name: 'Heavy Duty Power Drill',
      category: 'Power Tools',
      price: 25,
      priceUnit: 'day',
      status: 'Active',
      views: 145,
      bookings: 12,
      earnings: 380,
      rating: 4.8,
      location: 'Austin, TX',
      availability: 'Available',
      image: '/placeholder.svg',
      lastBooked: '2 days ago'
    },
    {
      id: 2,
      name: 'Professional Circular Saw',
      category: 'Power Tools',
      price: 40,
      priceUnit: 'day',
      status: 'Active',
      views: 89,
      bookings: 8,
      earnings: 320,
      rating: 4.9,
      location: 'Austin, TX',
      availability: 'Available',
      image: '/placeholder.svg',
      lastBooked: '5 days ago'
    },
    {
      id: 3,
      name: '5000W Generator',
      category: 'Power Equipment',
      price: 80,
      priceUnit: 'day',
      status: 'Rented',
      views: 203,
      bookings: 15,
      earnings: 1200,
      rating: 4.7,
      location: 'Round Rock, TX',
      availability: 'Rented until Jan 25',
      image: '/placeholder.svg',
      lastBooked: 'Currently rented'
    },
    {
      id: 4,
      name: 'Compact Excavator',
      category: 'Heavy Machinery',
      price: 450,
      priceUnit: 'day',
      status: 'Under Maintenance',
      views: 67,
      bookings: 5,
      earnings: 2250,
      rating: 4.6,
      location: 'Austin, TX',
      availability: 'Maintenance',
      image: '/placeholder.svg',
      lastBooked: '1 week ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Rented': return 'bg-blue-100 text-blue-800';
      case 'Under Maintenance': return 'bg-orange-100 text-orange-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSelectListing = (id: number) => {
    setSelectedListings(prev => 
      prev.includes(id) 
        ? prev.filter(listingId => listingId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedListings(
      selectedListings.length === filteredListings.length 
        ? [] 
        : filteredListings.map(listing => listing.id)
    );
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || listing.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesCategory = categoryFilter === 'all' || listing.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalEarnings = listings.reduce((sum, listing) => sum + listing.earnings, 0);
  const totalViews = listings.reduce((sum, listing) => sum + listing.views, 0);
  const totalBookings = listings.reduce((sum, listing) => sum + listing.bookings, 0);

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Listings</h1>
              <p className="text-gray-600 mt-2">Manage your equipment listings and track performance</p>
            </div>
            <Button asChild size="lg">
              <Link to="/list-equipment">Add New Listing</Link>
            </Button>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-green-600">${totalEarnings}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +12% this month
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-blue-600">{totalViews}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +8% this week
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-purple-600">{totalBookings}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +15% this month
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Listings</p>
                <p className="text-2xl font-bold text-orange-600">{listings.filter(l => l.status === 'Active').length}</p>
                <p className="text-sm text-gray-500">of {listings.length} total</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search listings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="rented">Rented</SelectItem>
                <SelectItem value="under maintenance">Under Maintenance</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Power Tools">Power Tools</SelectItem>
                <SelectItem value="Power Equipment">Power Equipment</SelectItem>
                <SelectItem value="Heavy Machinery">Heavy Machinery</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="earnings">Highest Earnings</SelectItem>
                <SelectItem value="views">Most Views</SelectItem>
                <SelectItem value="bookings">Most Bookings</SelectItem>
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

          {/* Bulk Actions */}
          {selectedListings.length > 0 && (
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium">
                {selectedListings.length} listing{selectedListings.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Edit Selected</Button>
                <Button size="sm" variant="outline">Update Availability</Button>
                <Button size="sm" variant="destructive">Delete Selected</Button>
              </div>
            </div>
          )}
        </Card>

        {/* Listings Grid/List */}
        <div className="mb-6">
          {/* Select All Checkbox */}
          <div className="flex items-center gap-3 mb-4 p-4 bg-white rounded-lg border">
            <Checkbox
              checked={selectedListings.length === filteredListings.length && filteredListings.length > 0}
              onCheckedChange={handleSelectAll}
            />
            <span className="text-sm font-medium">Select All ({filteredListings.length} listings)</span>
          </div>

          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
            : "space-y-4"
          }>
            {filteredListings.map((listing) => (
              <Card key={listing.id} className={`overflow-hidden hover:shadow-lg transition-shadow ${
                viewMode === 'list' ? 'flex' : ''
              }`}>
                <div className="relative">
                  <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-video'} bg-gray-200 flex items-center justify-center relative`}>
                    <Package className="w-12 h-12 text-gray-400" />
                    <Checkbox
                      className="absolute top-3 left-3 bg-white"
                      checked={selectedListings.includes(listing.id)}
                      onCheckedChange={() => handleSelectListing(listing.id)}
                    />
                    <Badge className={`absolute top-3 right-3 ${getStatusColor(listing.status)}`}>
                      {listing.status}
                    </Badge>
                  </div>
                </div>
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold">{listing.name}</h3>
                    <Button size="sm" variant="ghost">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{listing.category}</p>
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {listing.location}
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-semibold text-blue-600">${listing.price}/{listing.priceUnit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Views:</span>
                      <span className="font-medium">{listing.views}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Bookings:</span>
                      <span className="font-medium">{listing.bookings}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Earnings:</span>
                      <span className="font-medium text-green-600">${listing.earnings}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rating:</span>
                      <span className="font-medium">⭐ {listing.rating}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <BarChart3 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyListings;
