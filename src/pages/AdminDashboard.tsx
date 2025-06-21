
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 text-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Control Center</h1>
          <p className="text-slate-300 mt-2">Monitor and manage your EquipShare platform</p>
        </div>

        {/* System Health Overview */}
        <Card className="mb-8 bg-slate-800 border-slate-700">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-400" />
              System Health & Performance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-900 rounded-lg">
                  <Server className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Uptime</p>
                  <p className="text-lg font-semibold text-green-400">{systemHealth.uptime}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-900 rounded-lg">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Response Time</p>
                  <p className="text-lg font-semibold text-blue-400">{systemHealth.responseTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-900 rounded-lg">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Active Users</p>
                  <p className="text-lg font-semibold text-purple-400">{systemHealth.activeUsers}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-900 rounded-lg">
                  <Database className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Server Load</p>
                  <p className="text-lg font-semibold text-orange-400">{systemHealth.serverLoad}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Total Users</p>
                <p className="text-2xl font-bold text-white">2,547</p>
                <p className="text-sm text-green-400 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +12% this month
                </p>
              </div>
              <div className="p-3 bg-blue-900 rounded-lg">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Total Listings</p>
                <p className="text-2xl font-bold text-white">8,392</p>
                <p className="text-sm text-green-400 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +8% this month
                </p>
              </div>
              <div className="p-3 bg-green-900 rounded-lg">
                <Package className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Total Revenue</p>
                <p className="text-2xl font-bold text-white">$47,582</p>
                <p className="text-sm text-green-400 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +15% this month
                </p>
              </div>
              <div className="p-3 bg-purple-900 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Critical Alerts</p>
                <p className="text-2xl font-bold text-white">7</p>
                <p className="text-sm text-red-400 flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3" />
                  Needs attention
                </p>
              </div>
              <div className="p-3 bg-red-900 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </Card>
        </div>

        {/* Revenue Analytics Simulation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-slate-800 border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Revenue Trends (Last 6 Months)</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">January</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-green-400 rounded-full"></div>
                  </div>
                  <span className="text-white font-medium">$38,240</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">February</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="w-4/5 h-full bg-green-400 rounded-full"></div>
                  </div>
                  <span className="text-white font-medium">$41,820</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">March</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-green-400 rounded-full"></div>
                  </div>
                  <span className="text-white font-medium">$47,582</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-slate-800 border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Top Performing Categories</h3>
            <div className="space-y-4">
              {topPerformers.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div>
                    <p className="font-medium text-white">{category.category}</p>
                    <p className="text-sm text-slate-400">{category.rentals} rentals</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-400">{category.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* System Alerts */}
        <Card className="mb-8 bg-slate-800 border-slate-700">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">System Alerts & Notifications</h3>
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className={`flex items-center justify-between p-4 rounded-lg border-l-4 ${
                  alert.type === 'critical' ? 'bg-red-900/20 border-red-400' :
                  alert.type === 'warning' ? 'bg-orange-900/20 border-orange-400' :
                  'bg-blue-900/20 border-blue-400'
                }`}>
                  <div className="flex items-center gap-3">
                    {alert.type === 'critical' ? <XCircle className="w-5 h-5 text-red-400" /> :
                     alert.type === 'warning' ? <AlertTriangle className="w-5 h-5 text-orange-400" /> :
                     <CheckCircle className="w-5 h-5 text-blue-400" />}
                    <div>
                      <p className="text-white font-medium">{alert.message}</p>
                      <p className="text-sm text-slate-400">{alert.time}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant={alert.type === 'critical' ? 'destructive' : 'outline'}
                    className={alert.type !== 'critical' ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : ''}
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
          <Card className="p-6 bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
            <div className="text-center">
              <div className="p-3 bg-blue-900 rounded-lg w-fit mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">User Management</h3>
              <p className="text-slate-400 mb-4">Manage user accounts and permissions</p>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <Link to="/admin/user-management">Manage Users</Link>
              </Button>
            </div>
          </Card>
          <Card className="p-6 bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
            <div className="text-center">
              <div className="p-3 bg-green-900 rounded-lg w-fit mx-auto mb-4">
                <Package className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Equipment Oversight</h3>
              <p className="text-slate-400 mb-4">Review and moderate equipment listings</p>
              <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                <Link to="/admin/equipment-oversight">Review Listings</Link>
              </Button>
            </div>
          </Card>
          <Card className="p-6 bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
            <div className="text-center">
              <div className="p-3 bg-red-900 rounded-lg w-fit mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Reports & Issues</h3>
              <p className="text-slate-400 mb-4">Handle user reports and disputes</p>
              <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                <Link to="/admin/reports-issues">View Reports</Link>
              </Button>
            </div>
          </Card>
          <Card className="p-6 bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
            <div className="text-center">
              <div className="p-3 bg-purple-900 rounded-lg w-fit mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">System Analytics</h3>
              <p className="text-slate-400 mb-4">View platform performance metrics</p>
              <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                <Link to="/admin/system-analytics">View Analytics</Link>
              </Button>
            </div>
          </Card>
          <Card className="p-6 bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
            <div className="text-center">
              <div className="p-3 bg-orange-900 rounded-lg w-fit mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Financial Overview</h3>
              <p className="text-slate-400 mb-4">Monitor payments and transactions</p>
              <Button className="w-full bg-orange-600 hover:bg-orange-700">View Finances</Button>
            </div>
          </Card>
          <Card className="p-6 bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
            <div className="text-center">
              <div className="p-3 bg-indigo-900 rounded-lg w-fit mx-auto mb-4">
                <Shield className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Security Settings</h3>
              <p className="text-slate-400 mb-4">Manage platform security and policies</p>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Security Panel</Button>
            </div>
          </Card>
        </div>

        {/* System Management */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">Advanced System Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
              <div className="text-center">
                <div className="p-3 bg-green-900 rounded-lg w-fit mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">Advanced Analytics</h3>
                <p className="text-slate-400 mb-4">Deep dive into platform metrics and insights</p>
                <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                  <Link to="/admin/system-analytics">View Analytics</Link>
                </Button>
              </div>
            </Card>
            <Card className="p-6 bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
              <div className="text-center">
                <div className="p-3 bg-gray-700 rounded-lg w-fit mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">Admin Logs</h3>
                <p className="text-slate-400 mb-4">Track all administrative actions and changes</p>
                <Button asChild className="w-full bg-gray-600 hover:bg-gray-700">
                  <Link to="/admin/logs">View Logs</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-slate-800 border-slate-700">
            <h3 className="text-lg font-semibold mb-4 text-white">Recent Platform Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-slate-700">
                <div>
                  <p className="font-medium text-white">New user registration: John Doe</p>
                  <p className="text-sm text-slate-400">5 minutes ago</p>
                </div>
                <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">View</Button>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-700">
                <div>
                  <p className="font-medium text-white">Equipment listing flagged for review</p>
                  <p className="text-sm text-slate-400">1 hour ago</p>
                </div>
                <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">Review</Button>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-white">High-value transaction completed</p>
                  <p className="text-sm text-slate-400">2 hours ago</p>
                </div>
                <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">View</Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-slate-800 border-slate-700">
            <h3 className="text-lg font-semibold mb-4 text-white">Growth Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">User Growth Rate</span>
                <span className="text-green-400 font-semibold">+12%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Revenue Growth</span>
                <span className="text-green-400 font-semibold">+15%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Equipment Utilization</span>
                <span className="text-blue-400 font-semibold">78%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Customer Satisfaction</span>
                <span className="text-purple-400 font-semibold">4.8/5</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
