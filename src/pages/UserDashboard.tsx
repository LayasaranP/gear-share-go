
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Package, MessageCircle, Settings, PlusCircle, Eye, Wallet, CreditCard, Calendar, Bell, Shield } from 'lucide-react';
import Header from '@/components/Header';

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
          <p className="text-gray-600 mt-2">Manage your equipment listings and rentals</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Listings</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Rentals</p>
                <p className="text-2xl font-bold text-gray-900">47</p>
              </div>
              <Eye className="w-8 h-8 text-green-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Messages</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <MessageCircle className="w-8 h-8 text-orange-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Earnings</p>
                <p className="text-2xl font-bold text-gray-900">$2,450</p>
              </div>
              <User className="w-8 h-8 text-purple-600" />
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="text-center">
              <PlusCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">List New Equipment</h3>
              <p className="text-gray-600 mb-4">Add new equipment to your inventory</p>
              <Button asChild className="w-full">
                <Link to="/list-equipment">Add Equipment</Link>
              </Button>
            </div>
          </Card>
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
              <MessageCircle className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Messages</h3>
              <p className="text-gray-600 mb-4">Check your rental inquiries</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/messages">View Messages</Link>
              </Button>
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-center">
              <Wallet className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Wallet & Payouts</h3>
              <p className="text-gray-600 mb-4">Manage your earnings and payments</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/wallet">View Wallet</Link>
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
              <Calendar className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Calendar</h3>
              <p className="text-gray-600 mb-4">Manage your rental schedule</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/calendar">View Calendar</Link>
              </Button>
            </div>
          </Card>
        </div>

        {/* Account Management */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Account Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="text-center">
                <Settings className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Account Settings</h3>
                <p className="text-gray-600 mb-4">Manage your profile and preferences</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/account/settings">Account Settings</Link>
                </Button>
              </div>
            </Card>
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

        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">New rental inquiry for Power Drill</p>
                <p className="text-sm text-gray-600">2 hours ago</p>
              </div>
              <Button size="sm" variant="outline">View</Button>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">Equipment "Circular Saw" was rented</p>
                <p className="text-sm text-gray-600">1 day ago</p>
              </div>
              <Button size="sm" variant="outline">View</Button>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Payment received for Generator rental</p>
                <p className="text-sm text-gray-600">3 days ago</p>
              </div>
              <Button size="sm" variant="outline">View</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
