
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, User, Check } from 'lucide-react';

const featuredListings = [
  {
    id: 1,
    title: 'Professional Excavator - CAT 320',
    image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=300&fit=crop',
    price: '$299',
    period: 'per day',
    location: 'Denver, CO',
    owner: 'Mike Johnson',
    rating: 4.9,
    verified: true,
    category: 'Heavy Machinery'
  },
  {
    id: 2,
    title: 'John Deere Tractor 5075E',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop',
    price: '$180',
    period: 'per day',
    location: 'Austin, TX',
    owner: 'Sarah Williams',
    rating: 5.0,
    verified: true,
    category: 'Farming'
  },
  {
    id: 3,
    title: 'Professional Welder - Lincoln Electric',
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop',
    price: '$85',
    period: 'per day',
    location: 'Phoenix, AZ',
    owner: 'Carlos Rodriguez',
    rating: 4.8,
    verified: true,
    category: 'Power Tools'
  },
  {
    id: 4,
    title: 'Commercial Mower - Zero Turn',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    price: '$120',
    period: 'per day',
    location: 'Atlanta, GA',
    owner: 'Jennifer Lee',
    rating: 4.7,
    verified: true,
    category: 'Landscaping'
  }
];

const FeaturedListings = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Featured Equipment
          </h2>
          <p className="text-xl text-gray-600">
            Top-rated equipment from trusted owners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredListings.map((listing) => (
            <Card key={listing.id} className="group cursor-pointer hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-white text-gray-900">
                    {listing.category}
                  </Badge>
                  {listing.verified && (
                    <div className="absolute top-3 right-3 bg-green-500 rounded-full p-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {listing.title}
                  </h3>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {listing.location}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <User className="w-4 h-4 mr-1" />
                    {listing.owner} • ⭐ {listing.rating}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-gray-900">
                        {listing.price}
                      </span>
                      <span className="text-sm text-gray-600 ml-1">
                        {listing.period}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
