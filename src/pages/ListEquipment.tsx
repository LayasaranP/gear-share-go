
import React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Upload, DollarSign, Calendar } from 'lucide-react';
import Header from '@/components/Header';

const ListEquipment = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    dailyRate: '',
    location: ''
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Equipment listing:', formData);
    // TODO: Implement actual listing creation
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">List Your Equipment</h1>
          <p className="text-gray-600">Share your equipment with the community and earn money</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Equipment Title</Label>
              <Input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
                className="mt-1"
                placeholder="e.g., Heavy Duty Excavator"
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                type="text"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                required
                className="mt-1"
                placeholder="e.g., Construction, Farming, Power Tools"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                required
                className="mt-1"
                placeholder="Describe your equipment, its condition, and any special instructions..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="dailyRate">Daily Rate ($)</Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="dailyRate"
                    type="number"
                    value={formData.dailyRate}
                    onChange={(e) => handleChange('dailyRate', e.target.value)}
                    required
                    className="pl-10"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  required
                  className="mt-1"
                  placeholder="City, State"
                />
              </div>
            </div>

            <div>
              <Label>Equipment Photos</Label>
              <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Upload photos of your equipment</p>
                <Button type="button" variant="outline">
                  Choose Files
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600">Availability calendar will be set up after listing creation</span>
            </div>

            <div className="pt-4 border-t">
              <Button type="submit" className="w-full md:w-auto">
                Create Listing
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ListEquipment;
