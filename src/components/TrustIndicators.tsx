
import React from 'react';
import { Shield, Check, User, MessageCircle } from 'lucide-react';

const trustFeatures = [
  {
    icon: Shield,
    title: 'Verified Equipment',
    description: 'Every item is verified with serial numbers and documentation'
  },
  {
    icon: Check,
    title: 'ID Verification',
    description: 'All users complete identity verification and background checks'
  },
  {
    icon: User,
    title: 'Two-Way Reviews',
    description: 'Transparent rating system builds trust in the community'
  },
  {
    icon: MessageCircle,
    title: 'Secure Communication',
    description: 'Built-in messaging keeps all coordination in one place'
  }
];

const TrustIndicators = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Built on Trust
          </h2>
          <p className="text-xl text-gray-300">
            Safety and security features that protect every transaction
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustFeatures.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gray-800 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">
            Insurance Protection Available
          </h3>
          <p className="text-gray-300 mb-6">
            Optional coverage protects both equipment owners and renters during every rental period.
          </p>
          <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Learn About Insurance
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
