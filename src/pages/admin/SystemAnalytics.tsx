
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingUp, Users, Package, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import Header from '@/components/Header';

const SystemAnalytics = () => {
  const revenueData = [
    { month: 'Jan', revenue: 12500, bookings: 156 },
    { month: 'Feb', revenue: 15200, bookings: 189 },
    { month: 'Mar', revenue: 18700, bookings: 234 },
    { month: 'Apr', revenue: 22100, bookings: 276 },
    { month: 'May', revenue: 26800, bookings: 335 },
    { month: 'Jun', revenue: 31200, bookings: 390 },
  ];

  const categoryData = [
    { name: 'Tools', value: 45, color: '#8884d8' },
    { name: 'Power Equipment', value: 30, color: '#82ca9d' },
    { name: 'Construction', value: 15, color: '#ffc658' },
    { name: 'Gardening', value: 10, color: '#ff7300' },
  ];

  const userGrowthData = [
    { month: 'Jan', newUsers: 45, totalUsers: 1250 },
    { month: 'Feb', newUsers: 67, totalUsers: 1317 },
    { month: 'Mar', newUsers: 89, totalUsers: 1406 },
    { month: 'Apr', newUsers: 123, totalUsers: 1529 },
    { month: 'May', newUsers: 156, totalUsers: 1685 },
    { month: 'Jun', newUsers: 189, totalUsers: 1874 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button asChild variant="outline" className="mb-4">
            <Link to="/admin-dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">System Analytics</h1>
          <p className="text-gray-600 mt-2">Platform performance metrics and insights</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-green-600">$31,200</p>
                <p className="text-sm text-green-600">+16.5% from last month</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-blue-600">1,874</p>
                <p className="text-sm text-blue-600">+11.2% growth</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-purple-600">390</p>
                <p className="text-sm text-purple-600">+23.8% this month</p>
              </div>
              <Package className="w-8 h-8 text-purple-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Order Value</p>
                <p className="text-2xl font-bold text-orange-600">$80</p>
                <p className="text-sm text-orange-600">+5.2% increase</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* User Growth Chart */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">User Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="newUsers" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Equipment Categories */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Equipment Categories</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Top Metrics */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Booking Success Rate</span>
                <span className="text-green-600 font-semibold">94.2%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Average Response Time</span>
                <span className="text-blue-600 font-semibold">2.3 hours</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">User Satisfaction</span>
                <span className="text-purple-600 font-semibold">4.8/5.0</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Platform Commission</span>
                <span className="text-orange-600 font-semibold">8.5%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SystemAnalytics;
