
import React, { useState, useEffect } from 'react';
import { MapPin, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

interface NearMeFilterProps {
  onLocationChange: (location: Location | null) => void;
}

const NearMeFilter: React.FC<NearMeFilterProps> = ({ onLocationChange }) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [manualLocation, setManualLocation] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      setShowManualInput(true);
      return;
    }

    setLoading(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          address: 'Current Location'
        };
        setLocation(newLocation);
        onLocationChange(newLocation);
        setLoading(false);
      },
      (error) => {
        console.log('Geolocation error:', error);
        setError('Unable to retrieve your location. Please enter manually.');
        setShowManualInput(true);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const handleManualLocation = () => {
    if (!manualLocation.trim()) return;

    // Mock geocoding for demo purposes
    const mockLocations: { [key: string]: Location } = {
      'san francisco': { lat: 37.7749, lng: -122.4194, address: 'San Francisco, CA' },
      'sacramento': { lat: 38.5816, lng: -121.4944, address: 'Sacramento, CA' },
      'oakland': { lat: 37.8044, lng: -122.2712, address: 'Oakland, CA' },
      'san jose': { lat: 37.3382, lng: -121.8863, address: 'San Jose, CA' },
      '94102': { lat: 37.7849, lng: -122.4094, address: 'San Francisco, CA 94102' },
      '95814': { lat: 38.5916, lng: -121.5044, address: 'Sacramento, CA 95814' }
    };

    const searchKey = manualLocation.toLowerCase();
    const foundLocation = mockLocations[searchKey] || mockLocations[Object.keys(mockLocations).find(key => key.includes(searchKey)) || ''];

    if (foundLocation) {
      setLocation(foundLocation);
      onLocationChange(foundLocation);
      setError('');
    } else {
      setError('Location not found. Try "San Francisco", "Sacramento", or a zip code.');
    }
  };

  const clearLocation = () => {
    setLocation(null);
    onLocationChange(null);
    setError('');
    setShowManualInput(false);
    setManualLocation('');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={handleGetCurrentLocation}
          disabled={loading}
          className="flex items-center gap-2"
        >
          <MapPin className="w-4 h-4" />
          {loading ? 'Getting Location...' : 'Near Me'}
        </Button>
        
        {!showManualInput && (
          <Button
            variant="ghost"
            onClick={() => setShowManualInput(true)}
            className="text-sm"
          >
            Enter manually
          </Button>
        )}
      </div>

      {showManualInput && (
        <Card className="p-4">
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Enter city or zip code"
                value={manualLocation}
                onChange={(e) => setManualLocation(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleManualLocation()}
              />
              <Button onClick={handleManualLocation}>Set</Button>
            </div>
            <p className="text-xs text-gray-500">
              Try: San Francisco, Sacramento, Oakland, San Jose, or zip codes like 94102
            </p>
          </div>
        </Card>
      )}

      {error && (
        <div className="flex items-start gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-orange-800">{error}</p>
        </div>
      )}

      {location && (
        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-800">{location.address}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={clearLocation}>
            Clear
          </Button>
        </div>
      )}
    </div>
  );
};

export default NearMeFilter;
