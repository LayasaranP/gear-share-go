
import React from 'react';
import { MapPin, MessageCircle, User } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="text-2xl font-bold text-blue-600 mb-4">
              EquipShare
            </div>
            <p className="text-gray-600 mb-4">
              The trusted marketplace for specialized equipment sharing. Connect, share, and build stronger communities.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>

          {/* For Renters */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">For Renters</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-blue-600">Browse Equipment</a></li>
              <li><a href="#" className="hover:text-blue-600">How to Rent</a></li>
              <li><a href="#" className="hover:text-blue-600">Safety Guidelines</a></li>
              <li><a href="#" className="hover:text-blue-600">Insurance Options</a></li>
            </ul>
          </div>

          {/* For Owners */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">For Owners</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-blue-600">List Equipment</a></li>
              <li><a href="#" className="hover:text-blue-600">Pricing Guide</a></li>
              <li><a href="#" className="hover:text-blue-600">Equipment Protection</a></li>
              <li><a href="#" className="hover:text-blue-600">Owner Resources</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-blue-600">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-600">Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-600">Dispute Resolution</a></li>
              <li><a href="#" className="hover:text-blue-600">Community Guidelines</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 text-sm">
            © 2024 EquipShare. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm text-gray-600 mt-4 md:mt-0">
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600">Terms of Service</a>
            <a href="#" className="hover:text-blue-600">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
