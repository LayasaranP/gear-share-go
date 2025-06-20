
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Package, DollarSign, AlertTriangle, TrendingUp, Shield, FileText, BarChart3 } from 'lucide-react';
import Header from '@/components/Header';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your EquipShare platform</p>
        </div>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">2,547</p>
                <p className="text-sm text-green-600">+12% this month</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Listings</p>
                <p className="text-2xl font-bold text-gray-900">8,392</p>
                <p className="text-sm text-green-600">+8% this month</p>
              </div>
              <Package className="w-8 h-8 text-green-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$47,582</p>
                <p className="text-sm text-green-600">+15% this month</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Reports</p>
                <p className="text-2xl font-bold text-gray-900">7</p>
                <p className="text-sm text-red-600">Needs attention</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </Card>
        </div>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="text-center">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">User Management</h3>
              <p className="text-gray-600 mb-4">Manage user accounts and permissions</p>
              <Button asChild className="w-full">
                <Link to="/admin/user-management">Manage Users</Link>
              </Button>
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-center">
              <Package className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Equipment Oversight</h3>
              <p className="text-gray-600 mb-4">Review and moderate equipment listings</p>
              <Button asChild className="w-full">
                <Link to="/admin/equipment-oversight">Review Listings</Link>
              </Button>
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-center">
              <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Reports & Issues</h3>
              <p className="text-gray-600 mb-4">Handle user reports and disputes</p>
              <Button asChild className="w-full">
                <Link to="/admin/reports-issues">View Reports</Link>
              </Button>
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">System Analytics</h3>
              <p className="text-gray-600 mb-4">View platform performance metrics</p>
              <Button asChild className="w-full">
                <Link to="/admin/system-analytics">View Analytics</Link>
              </Button>
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-center">
              <DollarSign className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Financial Overview</h3>
              <p className="text-gray-600 mb-4">Monitor payments and transactions</p>
              <Button className="w-full">View Finances</Button>
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-center">
              <Shield className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Security Settings</h3>
              <p className="text-gray-600 mb-4">Manage platform security and policies</p>
              <Button className="w-full">Security Panel</Button>
            </div>
          </Card>
        </div>

        {/* System Management */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">System Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Advanced Analytics</h3>
                <p className="text-gray-600 mb-4">Deep dive into platform metrics and insights</p>
                <Button asChild className="w-full">
                  <Link to="/admin/system-analytics">View Analytics</Link>
                </Button>
              </div>
            </Card>
            <Card className="p-6">
              <div className="text-center">
                <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Admin Logs</h3>
                <p className="text-gray-600 mb-4">Track all administrative actions and changes</p>
                <Button asChild className="w-full">
                  <Link to="/admin/logs">View Logs</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Admin Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent User Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">New user registration: John Doe</p>
                  <p className="text-sm text-gray-600">5 minutes ago</p>
                </div>
                <Button size="sm" variant="outline">View</Button>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">Equipment listing flagged for review</p>
                  <p className="text-sm text-gray-600">1 hour ago</p>
                </div>
                <Button size="sm" variant="outline">Review</Button>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">High-value transaction completed</p>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
                <Button size="sm" variant="outline">View</Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">System Alerts</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium text-red-600">7 pending user reports</p>
                  <p className="text-sm text-gray-600">Requires immediate attention</p>
                </div>
                <Button size="sm" variant="destructive">Handle</Button>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium text-orange-600">Server performance alert</p>
                  <p className="text-sm text-gray-600">Response time increased</p>
                </div>
                <Button size="sm" variant="outline">Check</Button>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-green-600">Backup completed successfully</p>
                  <p className="text-sm text-gray-600">Daily backup at 2:00 AM</p>
                </div>
                <Button size="sm" variant="outline">View</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
