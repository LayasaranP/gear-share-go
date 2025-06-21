import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Package, DollarSign, AlertTriangle, TrendingUp, Shield, FileText, BarChart3, Activity, Server, Database, Zap, Clock, CheckCircle, XCircle } from 'lucide-react';
import Header from '@/components/Header';

const AdminDashboard = () => {
  const systemHealth = {
    uptime: "99.9%",
    responseTime: "125ms",
    activeUsers: 1234,
    serverLoad: "45%"
  };

  const recentAlerts = [
    { id: 1, type: "critical", message: "7 user reports require immediate attention", time: "5 min ago", action: "Handle Reports" },
    { id: 2, type: "warning", message: "Server response time increased to 180ms", time: "15 min ago", action: "Check Performance" },
    { id: 3, type: "info", message: "Daily backup completed successfully", time: "2 hours ago", action: "View Logs" }
  ];

  const topPerformers = [
    { category: "Power Tools", rentals: 1245, revenue: "$15,670" },
    { category: "Garden Equipment", rentals: 890, revenue: "$12,340" },
    { category: "Construction", rentals: 654, revenue: "$18,920" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Control Center</h1>
          <p className="text-gray-600 mt-2">Monitor and manage your EquipShare platform</p>
        </div>

        {/* System Health Overview */}
        <Card className="mb-8 bg-white border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-500" />
              System Health & Performance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Server className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Uptime</p>
                  <p className="text-lg font-semibold text-green-600">{systemHealth.uptime}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Response Time</p>
                  <p className="text-lg font-semibold text-blue-600">{systemHealth.responseTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Users</p>
                  <p className="text-lg font-semibold text-purple-600">{systemHealth.activeUsers}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Database className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Server Load</p>
                  <p className="text-lg font-semibold text-orange-600">{systemHealth.serverLoad}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-white border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">2,547</p>
                <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +12% this month
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-white border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Listings</p>
                <p className="text-2xl font-bold text-gray-900">8,392</p>
                <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +8% this month
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Package className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-white border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$47,582</p>
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
          <Card className="p-6 bg-white border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Critical Alerts</p>
                <p className="text-2xl font-bold text-gray-900">7</p>
                <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3" />
                  Needs attention
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Revenue Analytics Simulation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-white border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends (Last 6 Months)</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">January</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-900 font-medium">$38,240</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">February</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-4/5 h-full bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-900 font-medium">$41,820</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">March</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-900 font-medium">$47,582</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Categories</h3>
            <div className="space-y-4">
              {topPerformers.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{category.category}</p>
                    <p className="text-sm text-gray-600">{category.rentals} rentals</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">{category.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* System Alerts */}
        <Card className="mb-8 bg-white border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Alerts & Notifications</h3>
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className={`flex items-center justify-between p-4 rounded-lg border-l-4 ${
                  alert.type === 'critical' ? 'bg-red-50 border-red-500' :
                  alert.type === 'warning' ? 'bg-orange-50 border-orange-500' :
                  'bg-blue-50 border-blue-500'
                }`}>
                  <div className="flex items-center gap-3">
                    {alert.type === 'critical' ? <XCircle className="w-5 h-5 text-red-600" /> :
                     alert.type === 'warning' ? <AlertTriangle className="w-5 h-5 text-orange-600" /> :
                     <CheckCircle className="w-5 h-5 text-blue-600" />}
                    <div>
                      <p className="text-gray-900 font-medium">{alert.message}</p>
                      <p className="text-sm text-gray-600">{alert.time}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant={alert.type === 'critical' ? 'destructive' : 'outline'}
                  >
                    {alert.action}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-white border-gray-200 hover:shadow-md transition-shadow">
            <div className="text-center">
              <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">User Management</h3>
              <p className="text-gray-600 mb-4">Manage user accounts and permissions</p>
              <Button asChild className="w-full">
                <Link to="/admin/user-management">Manage Users</Link>
              </Button>
            </div>
          </Card>
          <Card className="p-6 bg-white border-gray-200 hover:shadow-md transition-shadow">
            <div className="text-center">
              <div className="p-3 bg-green-100 rounded-lg w-fit mx-auto mb-4">
                <Package className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Equipment Oversight</h3>
              <p className="text-gray-600 mb-4">Review and moderate equipment listings</p>
              <Button asChild className="w-full">
                <Link to="/admin/equipment-oversight">Review Listings</Link>
              </Button>
            </div>
          </Card>
          <Card className="p-6 bg-white border-gray-200 hover:shadow-md transition-shadow">
            <div className="text-center">
              <div className="p-3 bg-red-100 rounded-lg w-fit mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Reports & Issues</h3>
              <p className="text-gray-600 mb-4">Handle user reports and disputes</p>
              <Button asChild className="w-full">
                <Link to="/admin/reports-issues">View Reports</Link>
              </Button>
            </div>
          </Card>
          <Card className="p-6 bg-white border-gray-200 hover:shadow-md transition-shadow">
            <div className="text-center">
              <div className="p-3 bg-purple-100 rounded-lg w-fit mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">System Analytics</h3>
              <p className="text-gray-600 mb-4">View platform performance metrics</p>
              <Button asChild className="w-full">
                <Link to="/admin/system-analytics">View Analytics</Link>
              </Button>
            </div>
          </Card>
          <Card className="p-6 bg-white border-gray-200 hover:shadow-md transition-shadow">
            <div className="text-center">
              <div className="p-3 bg-orange-100 rounded-lg w-fit mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Financial Overview</h3>
              <p className="text-gray-600 mb-4">Monitor payments and transactions</p>
              <Button asChild className="w-full">
                <Link to="/admin/financial-overview">View Finances</Link>
              </Button>
            </div>
          </Card>
          <Card className="p-6 bg-white border-gray-200 hover:shadow-md transition-shadow">
            <div className="text-center">
              <div className="p-3 bg-indigo-100 rounded-lg w-fit mx-auto mb-4">
                <Shield className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Security Settings</h3>
              <p className="text-gray-600 mb-4">Manage platform security and policies</p>
              <Button asChild className="w-full">
                <Link to="/admin/security-settings">Security Panel</Link>
              </Button>
            </div>
          </Card>
        </div>

        {/* System Management */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Advanced System Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white border-gray-200 hover:shadow-md transition-shadow">
              <div className="text-center">
                <div className="p-3 bg-green-100 rounded-lg w-fit mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Advanced Analytics</h3>
                <p className="text-gray-600 mb-4">Deep dive into platform metrics and insights</p>
                <Button asChild className="w-full">
                  <Link to="/admin/system-analytics">View Analytics</Link>
                </Button>
              </div>
            </Card>
            <Card className="p-6 bg-white border-gray-200 hover:shadow-md transition-shadow">
              <div className="text-center">
                <div className="p-3 bg-gray-100 rounded-lg w-fit mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Admin Logs</h3>
                <p className="text-gray-600 mb-4">Track all administrative actions and changes</p>
                <Button asChild className="w-full">
                  <Link to="/admin/logs">View Logs</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-white border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Recent Platform Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-900">New user registration: John Doe</p>
                  <p className="text-sm text-gray-600">5 minutes ago</p>
                </div>
                <Button size="sm" variant="outline">View</Button>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-900">Equipment listing flagged for review</p>
                  <p className="text-sm text-gray-600">1 hour ago</p>
                </div>
                <Button size="sm" variant="outline">Review</Button>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-gray-900">High-value transaction completed</p>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
                <Button size="sm" variant="outline">View</Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Growth Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">User Growth Rate</span>
                <span className="text-green-600 font-semibold">+12%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Revenue Growth</span>
                <span className="text-green-600 font-semibold">+15%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Equipment Utilization</span>
                <span className="text-blue-600 font-semibold">78%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Customer Satisfaction</span>
                <span className="text-purple-600 font-semibold">4.8/5</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
