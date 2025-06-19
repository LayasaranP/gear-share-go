
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const steps = [
  {
    icon: Search,
    title: 'Search & Discover',
    description: 'Find the equipment you need by location, category, and availability. Browse verified listings with detailed specs and photos.'
  },
  {
    icon: Calendar,
    title: 'Book Safely',
    description: 'Select your dates, review terms, and book instantly or request approval. Secure payments and insurance options protect both parties.'
  },
  {
    icon: Check,
    title: 'Use & Return',
    description: 'Pick up or arrange delivery, use the equipment for your project, then return it on time. Rate your experience to build community trust.'
  }
];

const HowItWorks = () => {
  const navigate = useNavigate();

  const handleFindEquipment = () => {
    navigate('/browse');
  };

  const handleListEquipment = () => {
    navigate('/list-equipment');
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            How EquipShare Works
          </h2>
          <p className="text-xl text-gray-600">
            Rent equipment in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              {/* Step Number */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-xl font-bold mb-6">
                {index + 1}
              </div>
              
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <step.icon className="w-12 h-12 text-blue-600" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-300 transform -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-blue-50 rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Ready to get started?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of users who are saving money and building stronger communities through equipment sharing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleFindEquipment}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Find Equipment
              </Button>
              <Button 
                onClick={handleListEquipment}
                variant="outline"
                className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                List Your Equipment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
