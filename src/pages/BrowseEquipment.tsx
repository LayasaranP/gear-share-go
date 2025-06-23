
import React, { useState } from 'react';
import { Search, Filter, MapPin, List, Map, SlidersHorizontal, Star, Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import Header from '@/components/Header';
import MapView from '@/components/MapView';
import EquipmentDetail from '@/components/EquipmentDetail';
import BookingRequestFlow, { BookingData } from '@/components/BookingRequestFlow';
import BookingConfirmation from '@/components/BookingConfirmation';
import { mockEquipment, Equipment } from '@/services/equipmentData';

type ViewMode = 'grid' | 'list' | 'map' | 'detail' | 'booking' | 'confirmation';

const BrowseEquipment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [bookingDates, setBookingDates] = useState<{ start: string; end: string } | null>(null);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  
  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [availabilityFilter, setAvailabilityFilter] = useState<string[]>([]);

  const categories = ['Construction Tools', 'Farming Equipment', 'Automotive Tools', 'Landscaping', 'Power Tools', 'Heavy Machinery'];
  const features = ['GPS Tracking', 'Delivery Available', 'Instant Booking', 'Verified Owner', 'Insurance Included'];
  const availabilityOptions = ['Available Now', 'Available This Week', 'Available This Month'];

  // Filter and search logic
  const filteredEquipment = mockEquipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategories.length === 0 || 
                           selectedCategories.includes(item.category);
    
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort equipment
  const sortedEquipment = [...filteredEquipment].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'distance': return Math.random() - 0.5; // Mock distance sorting
      default: return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedEquipment.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEquipment = sortedEquipment.slice(startIndex, startIndex + itemsPerPage);

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

  const clearAllFilters = () => {
    setSearchTerm('');
    setPriceRange([0, 1000]);
    setSelectedCategories([]);
    setSelectedFeatures([]);
    setAvailabilityFilter([]);
    setSortBy('relevance');
    setCurrentPage(1);
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
    setCurrentPage(1);
  };

  // Component returns for different view modes
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Equipment</h1>
          
          {/* Search and Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for equipment, brands, or categories..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
                {(selectedCategories.length > 0 || selectedFeatures.length > 0) && (
                  <Badge variant="secondary" className="ml-2">
                    {selectedCategories.length + selectedFeatures.length}
                  </Badge>
                )}
              </Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="distance">Nearest First</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => setViewMode('map')}
                className="flex items-center space-x-2"
              >
                <Map className="w-4 h-4" />
                <span>Map</span>
              </Button>
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
          </div>

          {/* Active Filters */}
          {(selectedCategories.length > 0 || selectedFeatures.length > 0 || searchTerm) && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-sm text-gray-600">Active filters:</span>
              {searchTerm && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="ml-1 text-xs">×</button>
                </Badge>
              )}
              {selectedCategories.map(category => (
                <Badge key={category} variant="secondary" className="flex items-center gap-1">
                  {category}
                  <button onClick={() => handleCategoryToggle(category)} className="ml-1 text-xs">×</button>
                </Badge>
              ))}
              {selectedFeatures.map(feature => (
                <Badge key={feature} variant="secondary" className="flex items-center gap-1">
                  {feature}
                  <button onClick={() => handleFeatureToggle(feature)} className="ml-1 text-xs">×</button>
                </Badge>
              ))}
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear all
              </Button>
            </div>
          )}

          {/* Filter Panel */}
          {showFilters && (
            <Card className="p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryToggle(category)}
                        />
                        <label htmlFor={`category-${category}`} className="text-sm">{category}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => {
                          setPriceRange([+e.target.value, priceRange[1]]);
                          setCurrentPage(1);
                        }}
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => {
                          setPriceRange([priceRange[0], +e.target.value]);
                          setCurrentPage(1);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Features</h3>
                  <div className="space-y-2">
                    {features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox
                          id={`feature-${feature}`}
                          checked={selectedFeatures.includes(feature)}
                          onCheckedChange={() => handleFeatureToggle(feature)}
                        />
                        <label htmlFor={`feature-${feature}`} className="text-sm">{feature}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Availability</h3>
                  <div className="space-y-2">
                    {availabilityOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`availability-${option}`}
                          checked={availabilityFilter.includes(option)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setAvailabilityFilter([...availabilityFilter, option]);
                            } else {
                              setAvailabilityFilter(availabilityFilter.filter(f => f !== option));
                            }
                            setCurrentPage(1);
                          }}
                        />
                        <label htmlFor={`availability-${option}`} className="text-sm">{option}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedEquipment.length)} of {sortedEquipment.length} results
            </p>
          </div>
        </div>

        {/* Equipment Grid/List */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8" 
          : "space-y-4 mb-8"
        }>
          {paginatedEquipment.map((item) => (
            <Card key={item.id} className={`overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${
              viewMode === 'list' ? 'flex' : ''
            }`}>
              <div 
                className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-video'} bg-gray-200 relative`}
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
              <div className="p-6 flex-1">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.brand}</p>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{item.location.city}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">${item.price}/{item.priceUnit}</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                      className="cursor-pointer"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {/* No Results State */}
        {sortedEquipment.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No equipment found matching your search criteria.</p>
            <div className="space-x-4">
              <Button variant="outline" onClick={clearAllFilters}>
                Clear All Filters
              </Button>
              <Button onClick={() => setSearchTerm('')}>
                Browse All Equipment
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseEquipment;
