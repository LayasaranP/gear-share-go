
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Package, Edit, Trash2, Eye, DollarSign } from 'lucide-react';
import Header from '@/components/Header';

const MyListings = () => {
  const [listings] = useState([
    {
      id: 1,
      name: 'Power Drill',
      category: 'Tools',
      price: '$25/day',
      status: 'Active',
      views: 45,
      bookings: 12,
      image: '/placeholder.svg',
    },
    {
      id: 2,
      name: 'Circular Saw',
      category: 'Tools',
      price: '$40/day',
      status: 'Active',
      views: 32,
      bookings: 8,
      image: '/placeholder.svg',
    },
    {
      id: 3,
      name: 'Generator',
      category: 'Power Equipment',
      price: '$80/day',
      status: 'Rented',
      views: 67,
      bookings: 15,
      image: '/placeholder.svg',
    },
  ]);

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
              <p className="text-gray-600 mt-2">Manage your equipment listings</p>
            </div>
            <Button asChild>
              <Link to="/list-equipment">Add New Listing</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{listing.name}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      listing.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : listing.status === 'Rented'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {listing.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{listing.category}</p>
                <p className="text-xl font-bold text-blue-600 mb-4">{listing.price}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-gray-400" />
                    <span>{listing.views} views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span>{listing.bookings} bookings</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyListings;
