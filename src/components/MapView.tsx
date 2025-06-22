
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Heart, Star, List, Map, ZoomIn, ZoomOut, Locate } from 'lucide-react';
import { mockEquipment, Equipment, calculateDistance } from '@/services/equipmentData';
import { savedEquipmentService } from '@/services/localStorage';

interface MapViewProps {
  searchQuery?: string;
  dateRange?: { start: string; end: string };
}

const MapView: React.FC<MapViewProps> = ({ searchQuery = '', dateRange }) => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [searchRadius, setSearchRadius] = useState(25);
  const [filteredEquipment, setFilteredEquipment] = useState<Equipment[]>(mockEquipment);
  const [savedItems, setSavedItems] = useState<string[]>([]);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          // Default to San Francisco if location access denied
          setUserLocation({ lat: 37.7749, lng: -122.4194 });
        }
      );
    }

    // Load saved equipment
    const saved = savedEquipmentService.getSaved();
    setSavedItems(saved.map(item => item.equipmentId));
  }, []);

  useEffect(() => {
    // Filter equipment based on search, location, and dates
    let filtered = mockEquipment;

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (userLocation) {
      filtered = filtered.filter(item => {
        const distance = calculateDistance(
          userLocation.lat, userLocation.lng,
          item.location.lat, item.location.lng
        );
        return distance <= searchRadius;
      });
    }

    setFilteredEquipment(filtered);
  }, [searchQuery, userLocation, searchRadius, dateRange]);

  const toggleSaveEquipment = (equipmentId: string) => {
    if (savedEquipmentService.isSaved(equipmentId)) {
      savedEquipmentService.remove(equipmentId);
      setSavedItems(prev => prev.filter(id => id !== equipmentId));
    } else {
      savedEquipmentService.save(equipmentId);
      setSavedItems(prev => [...prev, equipmentId]);
    }
  };

  const MapPin_Component = ({ equipment, onClick }: { equipment: Equipment; onClick: () => void }) => (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer"
      style={{
        left: `${((equipment.location.lng + 122.4194) / 0.5) * 100}%`,
        top: `${((37.8749 - equipment.location.lat) / 0.2) * 100}%`
      }}
      onClick={onClick}
    >
      <div className="bg-teal-600 text-white px-2 py-1 rounded-lg shadow-lg text-xs font-medium hover:bg-teal-700 transition-colors">
        ${equipment.price}/{equipment.priceUnit}
      </div>
      <div className="w-3 h-3 bg-teal-600 transform rotate-45 mx-auto -mt-1"></div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col">
      {/* Header Controls */}
      <div className="p-4 border-b bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Equipment Map</h2>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'map' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('map')}
            >
              <Map className="w-4 h-4 mr-2" />
              Map
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4 mr-2" />
              List
            </Button>
          </div>
        </div>

        {/* Search Radius Control */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Search Radius:</span>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="5"
              max="100"
              value={searchRadius}
              onChange={(e) => setSearchRadius(Number(e.target.value))}
              className="w-32"
            />
            <span className="text-sm text-gray-600 w-12">{searchRadius}km</span>
          </div>
          <Badge variant="secondary">{filteredEquipment.length} items</Badge>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Map View */}
        {viewMode === 'map' && (
          <div className="flex-1 relative">
            {/* Mock Map Background */}
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-gray-200 opacity-20">
                <svg width="100%" height="100%" className="opacity-30">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ddd" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Equipment Pins */}
              {filteredEquipment.map((equipment) => (
                <MapPin_Component
                  key={equipment.id}
                  equipment={equipment}
                  onClick={() => setSelectedEquipment(equipment)}
                />
              ))}

              {/* User Location Pin */}
              {userLocation && (
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                  style={{
                    left: `${((userLocation.lng + 122.4194) / 0.5) * 100}%`,
                    top: `${((37.8749 - userLocation.lat) / 0.2) * 100}%`
                  }}
                >
                  <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                </div>
              )}

              {/* Map Controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button variant="outline" size="sm">
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Locate className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Equipment Preview Card */}
            {selectedEquipment && (
              <Card className="absolute bottom-4 left-4 right-4 p-4 shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{selectedEquipment.name}</h3>
                        <p className="text-sm text-gray-600">{selectedEquipment.brand} • {selectedEquipment.category}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {selectedEquipment.location.city}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSaveEquipment(selectedEquipment.id)}
                        className={savedItems.includes(selectedEquipment.id) ? 'text-red-500' : 'text-gray-400'}
                      >
                        <Heart className={`w-4 h-4 ${savedItems.includes(selectedEquipment.id) ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{selectedEquipment.rating}</span>
                        <span className="text-lg font-bold text-teal-600 ml-2">
                          ${selectedEquipment.price}/{selectedEquipment.priceUnit}
                        </span>
                      </div>
                      <Button size="sm">View Details</Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEquipment.map((equipment) => (
                <Card key={equipment.id} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{equipment.name}</h3>
                      <p className="text-sm text-gray-600">{equipment.brand}</p>
                      <Badge variant="secondary" className="mt-1">{equipment.category}</Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSaveEquipment(equipment.id)}
                      className={savedItems.includes(equipment.id) ? 'text-red-500' : 'text-gray-400'}
                    >
                      <Heart className={`w-4 h-4 ${savedItems.includes(equipment.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{equipment.location.city}</span>
                    <Star className="w-3 h-3 text-yellow-500 fill-current ml-2" />
                    <span className="text-xs text-gray-500">{equipment.rating}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-teal-600">
                      ${equipment.price}/{equipment.priceUnit}
                    </span>
                    <Button size="sm">View Details</Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;
