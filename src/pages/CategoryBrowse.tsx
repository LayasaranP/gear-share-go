
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, Grid, List, SlidersHorizontal, MapPin, Star, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { mockEquipment, Equipment } from '@/services/equipmentData';

const CategoryBrowse = () => {
  const { category } = useParams<{ category: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [searchTerm, setSearchTerm] = useState('');

  const categoryName = category?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'All Equipment';
  
  const filteredEquipment = mockEquipment.filter(item => {
    const matchesCategory = !category || item.category.toLowerCase().includes(category.toLowerCase());
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const sortedEquipment = [...filteredEquipment].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'distance': return 0; // Mock sorting
      default: return 0;
    }
  });

  const categories = [
    { name: 'Construction Tools', count: '2,400+', path: 'construction-tools' },
    { name: 'Farming Equipment', count: '1,800+', path: 'farming-equipment' },
    { name: 'Automotive Tools', count: '3,200+', path: 'automotive-tools' },
    { name: 'Landscaping', count: '1,500+', path: 'landscaping' },
    { name: 'Power Tools', count: '4,100+', path: 'power-tools' },
    { name: 'Heavy Machinery', count: '900+', path: 'heavy-machinery' }
  ];

  const features = [
    'GPS Tracking', 'Delivery Available', 'Instant Booking', 'Verified Owner', 'Insurance Included'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link to="/browse" className="hover:text-blue-600">Browse</Link>
            <span>/</span>
            <span className="text-gray-900">{categoryName}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryName}</h1>
          <p className="text-gray-600">{filteredEquipment.length} equipment available</p>
        </div>

        {/* Category Navigation */}
        <div className="mb-6">
          <div className="flex gap-3 overflow-x-auto pb-2">
            <Link to="/browse">
              <Badge variant={!category ? "default" : "outline"} className="whitespace-nowrap">
                All Categories
              </Badge>
            </Link>
            {categories.map((cat) => (
              <Link key={cat.path} to={`/category/${cat.path}`}>
                <Badge 
                  variant={category === cat.path ? "default" : "outline"} 
                  className="whitespace-nowrap"
                >
                  {cat.name} ({cat.count})
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        {/* Search and Controls */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder={`Search in ${categoryName}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
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
                  <SelectItem value="distance">Nearest</SelectItem>
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
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
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
                          id={feature}
                          checked={selectedFeatures.includes(feature)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedFeatures([...selectedFeatures, feature]);
                            } else {
                              setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
                            }
                          }}
                        />
                        <label htmlFor={feature} className="text-sm">{feature}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Availability</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="available-now" />
                      <label htmlFor="available-now" className="text-sm">Available Now</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="instant-booking" />
                      <label htmlFor="instant-booking" className="text-sm">Instant Booking</label>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Results */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {sortedEquipment.map((item) => (
            <Card key={item.id} className={`overflow-hidden hover:shadow-lg transition-shadow ${
              viewMode === 'list' ? 'flex' : ''
            }`}>
              <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-video'} bg-gray-200 relative`}>
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
                <Button className="w-full mt-4">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results State */}
        {sortedEquipment.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No equipment found matching your criteria.</p>
            <div className="space-x-4">
              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setPriceRange([0, 1000]);
                setSelectedFeatures([]);
              }}>
                Clear Filters
              </Button>
              <Link to="/browse">
                <Button>Browse All Equipment</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryBrowse;
