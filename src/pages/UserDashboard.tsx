
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User, Package, MessageCircle, Settings, PlusCircle, Eye, Wallet, CreditCard, Calendar, Bell, Shield, DollarSign, Clock, AlertCircle, TrendingUp, Star } from 'lucide-react';
import Header from '@/components/Header';

const UserDashboard = () => {
  const user = {
    name: "John Smith",
    email: "john.smith@example.com",
    avatar: "/placeholder.svg",
    joinDate: "March 2024"
  };

  const recentRentals = [
    { id: 1, equipment: "Power Drill", renter: "Mike Johnson", date: "Jan 15", image: "/placeholder.svg", rating: 5 },
    { id: 2, equipment: "Circular Saw", renter: "Sarah Wilson", date: "Jan 12", image: "/placeholder.svg", rating: 4 },
    { id: 3, equipment: "Generator", renter: "Tom Brown", date: "Jan 10", image: "/placeholder.svg", rating: 5 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-2 border-white">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-blue-500 text-white text-lg">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">Welcome back, {user.name}! 👋</h1>
                <p className="text-blue-100">Ready to manage your equipment listings?</p>
                <p className="text-sm text-blue-200 mt-1">Member since {user.joinDate}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Listings</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +2 this week
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Rentals</p>
                <p className="text-2xl font-bold text-gray-900">47</p>
                <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +5 this month
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Inquiries</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-sm text-orange-600 flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3" />
                  Needs response
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <MessageCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">$2,450</p>
                <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +15% this month
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Prominent Add Equipment Section */}
        <Card className="mb-8 border-2 border-dashed border-blue-300 bg-blue-50">
          <div className="p-6 text-center">
            <PlusCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">List New Equipment</h3>
            <p className="text-gray-600 mb-4">Expand your inventory and increase your earnings</p>
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link to="/list-equipment">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Equipment
              </Link>
            </Button>
            <p className="text-xs text-gray-500 mt-2">💡 Tip: Equipment with detailed photos rent 3x faster</p>
          </div>
        </Card>

        {/* Recently Rented Section */}
        <Card className="mb-8">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recently Rented Equipment</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentRentals.map((rental) => (
                <div key={rental.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{rental.equipment}</p>
                    <p className="text-sm text-gray-600">Rented by {rental.renter}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-gray-500">{rental.rating}/5</span>
                      <span className="text-xs text-gray-500">• {rental.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Quick Action Shortcuts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/messages" className="block">
              <div className="text-center">
                <div className="p-3 bg-orange-100 rounded-lg w-fit mx-auto mb-3">
                  <MessageCircle className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-1">Respond to Messages</h3>
                <p className="text-sm text-gray-600">3 unread inquiries</p>
                <div className="mt-2">
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                    Action needed
                  </span>
                </div>
              </div>
            </Link>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/calendar" className="block">
              <div className="text-center">
                <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-3">
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-1">Check Calendar</h3>
                <p className="text-sm text-gray-600">View upcoming bookings</p>
                <div className="mt-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    5 bookings this week
                  </span>
                </div>
              </div>
            </Link>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/wallet" className="block">
              <div className="text-center">
                <div className="p-3 bg-green-100 rounded-lg w-fit mx-auto mb-3">
                  <Wallet className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-1">Withdraw Earnings</h3>
                <p className="text-sm text-gray-600">$2,450 available</p>
                <div className="mt-2">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                    Ready to withdraw
                  </span>
                </div>
              </div>
            </Link>
          </Card>
        </div>

        {/* Equipment Status Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Equipment Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Available</span>
                </div>
                <span className="font-medium">8 items</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Currently Rented</span>
                </div>
                <span className="font-medium">3 items</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Under Maintenance</span>
                </div>
                <span className="font-medium">1 item</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Performance Insights</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Average Rating</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-medium">4.8/5</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Response Rate</span>
                <span className="font-medium text-green-600">95%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Booking Rate</span>
                <span className="font-medium text-blue-600">78%</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Management Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="text-center">
              <Package className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">My Listings</h3>
              <p className="text-gray-600 mb-4">Manage your equipment listings</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/my-listings">View Listings</Link>
              </Button>
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-center">
              <CreditCard className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Transactions</h3>
              <p className="text-gray-600 mb-4">View your payment history</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/transactions">View Transactions</Link>
              </Button>
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-center">
              <Settings className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Account Settings</h3>
              <p className="text-gray-600 mb-4">Manage your profile and preferences</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/account/settings">Settings</Link>
              </Button>
            </div>
          </Card>
        </div>

        {/* Account Management */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="text-center">
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">KYC Verification</h3>
              <p className="text-gray-600 mb-4">Complete your identity verification</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/account/kyc-verification">Verify Identity</Link>
              </Button>
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-center">
              <Bell className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Notifications</h3>
              <p className="text-gray-600 mb-4">Manage your notification settings</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/notifications">View Notifications</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
