
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Camera, Upload, MapPin, Calendar, DollarSign, Package, CheckCircle, ArrowLeft, ArrowRight, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ListingData {
  // Basic Info
  title: string;
  category: string;
  subcategory: string;
  brand: string;
  model: string;
  year: string;
  description: string;
  
  // Specifications
  specifications: Record<string, string>;
  
  // Photos
  photos: File[];
  
  // Pricing
  dailyRate: string;
  weeklyRate: string;
  monthlyRate: string;
  securityDeposit: string;
  
  // Location
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Availability
  availabilityType: 'instant' | 'request';
  minimumRental: string;
  maximumRental: string;
  
  // Delivery
  deliveryAvailable: boolean;
  deliveryRadius: string;
  deliveryFee: string;
  
  // Additional Options
  features: string[];
  policies: string[];
}

const ListingWizard: React.FC<{ onSubmit: (data: ListingData) => void }> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ListingData>({
    title: '',
    category: '',
    subcategory: '',
    brand: '',
    model: '',
    year: '',
    description: '',
    specifications: {},
    photos: [],
    dailyRate: '',
    weeklyRate: '',
    monthlyRate: '',
    securityDeposit: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    availabilityType: 'instant',
    minimumRental: '1',
    maximumRental: '30',
    deliveryAvailable: false,
    deliveryRadius: '',
    deliveryFee: '',
    features: [],
    policies: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const categories = [
    { value: 'construction-tools', label: 'Construction Tools', subcategories: ['Drills', 'Saws', 'Hammers', 'Excavators'] },
    { value: 'power-tools', label: 'Power Tools', subcategories: ['Grinders', 'Sanders', 'Welders', 'Compressors'] },
    { value: 'farming-equipment', label: 'Farming Equipment', subcategories: ['Tractors', 'Tillers', 'Harvesting Tools'] },
    { value: 'automotive-tools', label: 'Automotive Tools', subcategories: ['Lifts', 'Diagnostic Tools', 'Wrenches'] },
    { value: 'landscaping', label: 'Landscaping', subcategories: ['Mowers', 'Trimmers', 'Leaf Blowers'] },
    { value: 'heavy-machinery', label: 'Heavy Machinery', subcategories: ['Forklifts', 'Bulldozers', 'Cranes'] }
  ];

  const availableFeatures = [
    'GPS Tracking', 'Delivery Available', 'Instant Booking', 'Insurance Included', 
    'Training Provided', '24/7 Support', 'Maintenance Included', 'Backup Equipment'
  ];

  const handleInputChange = (field: keyof ListingData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, photos: [...prev.photos, ...files] }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      toast({
        title: "Listing created successfully!",
        description: "Your equipment is now available for rent."
      });
    } catch (error) {
      toast({
        title: "Error creating listing",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Package className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Basic Information</h2>
              <p className="text-gray-600">Tell us about your equipment</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title">Equipment Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Heavy Duty Power Drill"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  placeholder="e.g., DeWalt, Caterpillar"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => handleInputChange('model', e.target.value)}
                  placeholder="e.g., DCD771C2"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your equipment, its condition, and any special instructions..."
                className="mt-1"
                rows={4}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Camera className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Equipment Photos</h2>
              <p className="text-gray-600">Upload high-quality photos of your equipment</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {formData.photos.map((photo, index) => (
                <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={URL.createObjectURL(photo)} 
                    alt={`Equipment ${index + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                  <button
                    onClick={() => {
                      const newPhotos = formData.photos.filter((_, i) => i !== index);
                      handleInputChange('photos', newPhotos);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Drag and drop photos or click to upload</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
              />
              <Button variant="outline" asChild>
                <label htmlFor="photo-upload" className="cursor-pointer">
                  Choose Photos
                </label>
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                💡 Tip: Equipment with multiple photos get 3x more views
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <DollarSign className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Pricing</h2>
              <p className="text-gray-600">Set competitive rates for your equipment</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="dailyRate">Daily Rate ($) *</Label>
                <Input
                  id="dailyRate"
                  type="number"
                  value={formData.dailyRate}
                  onChange={(e) => handleInputChange('dailyRate', e.target.value)}
                  placeholder="0.00"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="weeklyRate">Weekly Rate ($)</Label>
                <Input
                  id="weeklyRate"
                  type="number"
                  value={formData.weeklyRate}
                  onChange={(e) => handleInputChange('weeklyRate', e.target.value)}
                  placeholder="Auto-calculated"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="monthlyRate">Monthly Rate ($)</Label>
                <Input
                  id="monthlyRate"
                  type="number"
                  value={formData.monthlyRate}
                  onChange={(e) => handleInputChange('monthlyRate', e.target.value)}
                  placeholder="Auto-calculated"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="securityDeposit">Security Deposit ($)</Label>
                <Input
                  id="securityDeposit"
                  type="number"
                  value={formData.securityDeposit}
                  onChange={(e) => handleInputChange('securityDeposit', e.target.value)}
                  placeholder="0.00"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Pricing Tips</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Research similar equipment in your area</li>
                <li>• Consider offering weekly/monthly discounts</li>
                <li>• Factor in wear and maintenance costs</li>
              </ul>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Location & Delivery</h2>
              <p className="text-gray-600">Where is your equipment located?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="123 Main Street"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Austin"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="TX"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center space-x-3 mb-4">
                <Checkbox
                  id="deliveryAvailable"
                  checked={formData.deliveryAvailable}
                  onCheckedChange={(checked) => handleInputChange('deliveryAvailable', checked)}
                />
                <Label htmlFor="deliveryAvailable" className="font-medium">
                  Offer delivery service
                </Label>
              </div>

              {formData.deliveryAvailable && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                  <div>
                    <Label htmlFor="deliveryRadius">Delivery Radius (miles)</Label>
                    <Input
                      id="deliveryRadius"
                      type="number"
                      value={formData.deliveryRadius}
                      onChange={(e) => handleInputChange('deliveryRadius', e.target.value)}
                      placeholder="25"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="deliveryFee">Delivery Fee ($)</Label>
                    <Input
                      id="deliveryFee"
                      type="number"
                      value={formData.deliveryFee}
                      onChange={(e) => handleInputChange('deliveryFee', e.target.value)}
                      placeholder="50.00"
                      className="mt-1"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Availability & Features</h2>
              <p className="text-gray-600">Set your rental preferences</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-base font-medium">Booking Type</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      formData.availabilityType === 'instant'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleInputChange('availabilityType', 'instant')}
                  >
                    <h4 className="font-medium">Instant Book</h4>
                    <p className="text-sm text-gray-600">Renters can book immediately</p>
                  </div>
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      formData.availabilityType === 'request'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleInputChange('availabilityType', 'request')}
                  >
                    <h4 className="font-medium">Request to Book</h4>
                    <p className="text-sm text-gray-600">You review each request</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="minimumRental">Minimum Rental Period (days)</Label>
                  <Input
                    id="minimumRental"
                    type="number"
                    value={formData.minimumRental}
                    onChange={(e) => handleInputChange('minimumRental', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="maximumRental">Maximum Rental Period (days)</Label>
                  <Input
                    id="maximumRental"
                    type="number"
                    value={formData.maximumRental}
                    onChange={(e) => handleInputChange('maximumRental', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label className="text-base font-medium mb-3 block">Additional Features</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableFeatures.map(feature => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature}
                        checked={formData.features.includes(feature)}
                        onCheckedChange={() => handleFeatureToggle(feature)}
                      />
                      <Label htmlFor={feature} className="text-sm">{feature}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Eye className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Preview & Publish</h2>
              <p className="text-gray-600">Review your listing before publishing</p>
            </div>

            <Card className="p-6">
              <div className="flex gap-6">
                <div className="w-48 h-32 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  {formData.photos.length > 0 ? (
                    <img 
                      src={URL.createObjectURL(formData.photos[0])} 
                      alt="Equipment" 
                      className="w-full h-full object-cover rounded-lg" 
                    />
                  ) : (
                    <Package className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{formData.title}</h3>
                  <p className="text-gray-600 mb-3">{formData.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span>{formData.brand} {formData.model}</span>
                    <span>•</span>
                    <span>{formData.city}, {formData.state}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-blue-600">${formData.dailyRate}/day</span>
                    {formData.features.slice(0, 3).map(feature => (
                      <Badge key={feature} variant="secondary">{feature}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4">
                <h4 className="font-semibold mb-2">Pricing Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Daily Rate:</span>
                    <span>${formData.dailyRate}</span>
                  </div>
                  {formData.weeklyRate && (
                    <div className="flex justify-between">
                      <span>Weekly Rate:</span>
                      <span>${formData.weeklyRate}</span>
                    </div>
                  )}
                  {formData.securityDeposit && (
                    <div className="flex justify-between">
                      <span>Security Deposit:</span>
                      <span>${formData.securityDeposit}</span>
                    </div>
                  )}
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold mb-2">Listing Features</h4>
                <div className="space-y-1 text-sm">
                  <div>Booking: {formData.availabilityType === 'instant' ? 'Instant Book' : 'Request to Book'}</div>
                  <div>Min Rental: {formData.minimumRental} days</div>
                  <div>Delivery: {formData.deliveryAvailable ? 'Available' : 'Pickup only'}</div>
                  <div>Photos: {formData.photos.length} uploaded</div>
                </div>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Create New Listing</h1>
          <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Content */}
      <Card className="p-8 mb-8">
        {renderStep()}
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        {currentStep < totalSteps ? (
          <Button onClick={handleNext}>
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Publishing...' : 'Publish Listing'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ListingWizard;
