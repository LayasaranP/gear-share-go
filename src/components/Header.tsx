
import React from 'react';
import { Search, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">
              EquipShare
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
              Browse Equipment
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
              How It Works
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
              List Your Equipment
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
              Help
            </a>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden md:flex">
              List Your Equipment
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Sign In</span>
            </Button>
            <Button className="md:hidden" variant="ghost" size="sm">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
