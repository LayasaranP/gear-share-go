
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, Filter, Download, User, Shield, AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';

const Logs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const [adminLogs] = useState([
    {
      id: 1,
      admin: 'Admin User',
      action: 'User Account Suspended',
      target: 'john.doe@example.com',
      timestamp: '2024-01-20 14:30:25',
      type: 'user_management',
      severity: 'high',
      details: 'Suspended due to policy violation',
    },
    {
      id: 2,
      admin: 'Admin User',
      action: 'Equipment Listing Approved',
      target: 'Power Drill #1234',
      timestamp: '2024-01-20 12:15:10',
      type: 'equipment_management',
      severity: 'low',
      details: 'Manual review completed',
    },
    {
      id: 3,
      admin: 'Super Admin',
      action: 'System Settings Updated',
      target: 'Commission Rate',
      timestamp: '2024-01-19 16:45:33',
      type: 'system_config',
      severity: 'medium',
      details: 'Changed from 8% to 8.5%',
    },
    {
      id: 4,
      admin: 'Admin User',
      action: 'Report Resolved',
      target: 'Report #5678',
      timestamp: '2024-01-19 11:20:15',
      type: 'report_management',
      severity: 'medium',
      details: 'Dispute resolved in favor of renter',
    },
    {
      id: 5,
      admin: 'Admin User',
      action: 'User Profile Updated',
      target: 'jane.smith@example.com',
      timestamp: '2024-01-18 09:30:42',
      type: 'user_management',
      severity: 'low',
      details: 'KYC verification status updated',
    },
  ]);

  const filteredLogs = adminLogs.filter(log => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.admin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || log.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'user_management':
        return <User className="w-4 h-4 text-blue-600" />;
      case 'equipment_management':
        return <Shield className="w-4 h-4 text-green-600" />;
      case 'system_config':
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'report_management':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Shield className="w-4 h-4 text-gray-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
          <h1 className="text-3xl font-bold text-gray-900">Admin Action Logs</h1>
          <p className="text-gray-600 mt-2">Track all administrative actions and changes</p>
        </div>

        <Card className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search logs by action, target, or admin..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Actions</option>
              <option value="user_management">User Management</option>
              <option value="equipment_management">Equipment Management</option>
              <option value="system_config">System Configuration</option>
              <option value="report_management">Report Management</option>
            </select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Logs
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Action</th>
                  <th className="text-left py-3 px-4">Admin</th>
                  <th className="text-left py-3 px-4">Target</th>
                  <th className="text-left py-3 px-4">Severity</th>
                  <th className="text-left py-3 px-4">Timestamp</th>
                  <th className="text-left py-3 px-4">Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {getActionIcon(log.type)}
                        <span className="font-medium">{log.action}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{log.admin}</td>
                    <td className="py-3 px-4">{log.target}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(log.severity)}`}>
                        {log.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{log.timestamp}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No logs found matching your criteria</p>
            </div>
          )}
        </Card>

        {/* Log Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <Card className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">156</p>
              <p className="text-sm text-gray-600">Total Actions Today</p>
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">12</p>
              <p className="text-sm text-gray-600">High Severity Actions</p>
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">3</p>
              <p className="text-sm text-gray-600">Active Admins</p>
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">98.5%</p>
              <p className="text-sm text-gray-600">System Uptime</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Logs;
