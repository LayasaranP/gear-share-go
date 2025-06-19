
import React from 'react';
import { Search, Calendar, Check, Shield, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    icon: Search,
    title: 'Search & Discover',
    description: 'Find the equipment you need by location, category, and availability. Browse verified listings with detailed specs and photos.',
    details: ['Advanced search filters', 'Location-based results', 'Equipment specifications', 'Photo galleries']
  },
  {
    icon: Calendar,
    title: 'Book Safely',
    description: 'Select your dates, review terms, and book instantly or request approval. Secure payments and insurance options protect both parties.',
    details: ['Instant or approval booking', 'Secure payment processing', 'Insurance protection', 'Clear rental terms']
  },
  {
    icon: Check,
    title: 'Use & Return',
    description: 'Pick up or arrange delivery, use the equipment for your project, then return it on time. Rate your experience to build community trust.',
    details: ['Flexible pickup/delivery', 'Equipment inspection', 'On-time returns', 'Two-way reviews']
  }
];

const benefits = [
  {
    icon: DollarSign,
    title: 'Save Money',
    description: 'Access expensive equipment without the high cost of ownership'
  },
  {
    icon: Shield,
    title: 'Protected Rentals',
    description: 'Insurance coverage and verified users for peace of mind'
  },
  {
    icon: Users,
    title: 'Build Community',
    description: 'Connect with neighbors and local businesses in your area'
  }
];

const HowItWorksPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How EquipShare Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Rent and share specialized equipment in three simple steps. Join thousands of users who are saving money and building stronger communities.
          </p>
        </div>

        {/* Steps Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="p-8 text-center relative overflow-hidden">
                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-xl font-bold mb-6">
                  {index + 1}
                </div>
                
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <step.icon className="w-12 h-12 text-blue-600" />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {step.description}
                </p>
                
                {/* Details */}
                <ul className="text-left space-y-2">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>

                {/* Connector Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-blue-300"></div>
                    <div className="absolute -right-1 -top-1 w-0 h-0 border-l-4 border-l-blue-300 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose EquipShare?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 text-center">
                <benefit.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="p-8 bg-blue-50">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join our community of equipment sharers and start saving money while helping others access the tools they need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/browse')}
                className="bg-blue-600 text-white px-8 py-3 text-lg font-semibold hover:bg-blue-700"
              >
                Find Equipment
              </Button>
              <Button 
                onClick={() => navigate('/list-equipment')}
                variant="outline"
                className="border-blue-600 text-blue-600 px-8 py-3 text-lg font-semibold hover:bg-blue-50"
              >
                List Your Equipment
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HowItWorksPage;
