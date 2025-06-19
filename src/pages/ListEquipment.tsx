
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Upload, DollarSign, Calendar, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

const ListEquipment = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    dailyRate: '',
    location: ''
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
    console.log('Selected files:', files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Equipment listing created:', {
        ...formData,
        files: selectedFiles.map(f => f.name)
      });

      toast({
        title: "Equipment listed successfully!",
        description: "Your equipment is now available for rent on EquipShare.",
      });

      // Reset form
      setFormData({
        title: '',
        category: '',
        description: '',
        dailyRate: '',
        location: ''
      });
      setSelectedFiles([]);

      // Navigate to browse page to see listings
      setTimeout(() => navigate('/browse'), 1500);
    } catch (error) {
      toast({
        title: "Listing failed",
        description: "There was an error creating your listing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">List Your Equipment</h1>
          <p className="text-gray-600">Share your equipment with the community and start earning</p>
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
                    min="0"
                    step="0.01"
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
              <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Upload photos of your equipment</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Button type="button" variant="outline" asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Choose Files
                  </label>
                </Button>
                {selectedFiles.length > 0 && (
                  <div className="mt-4 text-left">
                    <p className="text-sm text-gray-600 mb-2">Selected files:</p>
                    <ul className="text-sm space-y-1">
                      {selectedFiles.map((file, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{file.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600">Availability calendar will be set up after listing creation</span>
            </div>

            <div className="pt-4 border-t">
              <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
                {isLoading ? 'Creating Listing...' : 'Create Listing'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ListEquipment;
