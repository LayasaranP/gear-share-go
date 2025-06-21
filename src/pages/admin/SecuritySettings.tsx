
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Shield, Lock, Key, AlertTriangle, Users, Eye, Settings, CheckCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Header from '@/components/Header';

const SecuritySettings = () => {
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorRequired: true,
    passwordComplexity: true,
    sessionTimeout: 30,
    loginAttempts: 5,
    emailVerification: true,
    autoSuspendSuspicious: true,
    ipWhitelisting: false,
    auditLogging: true
  });

  const securityAlerts = [
    { id: 1, type: 'critical', message: '3 failed login attempts from suspicious IP', time: '10 min ago', ip: '192.168.1.100' },
    { id: 2, type: 'warning', message: 'Unusual activity detected on user account', time: '1 hour ago', user: 'john.doe@email.com' },
    { id: 3, type: 'info', message: 'Security policy updated successfully', time: '2 hours ago', admin: 'Admin User' }
  ];

  const accessLogs = [
    { id: 1, user: 'admin@equipshare.com', action: 'User Management Access', timestamp: '2024-01-20 14:30', ip: '192.168.1.1', status: 'Success' },
    { id: 2, user: 'moderator@equipshare.com', action: 'Equipment Review', timestamp: '2024-01-20 14:25', ip: '192.168.1.2', status: 'Success' },
    { id: 3, user: 'unknown', action: 'Failed Login Attempt', timestamp: '2024-01-20 14:20', ip: '192.168.1.100', status: 'Failed' },
    { id: 4, user: 'admin@equipshare.com', action: 'Security Settings Update', timestamp: '2024-01-20 14:15', ip: '192.168.1.1', status: 'Success' }
  ];

  const handleSettingChange = (setting: keyof typeof securitySettings, value: boolean | number) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: value
    }));
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
          <h1 className="text-3xl font-bold text-gray-900">Security Settings</h1>
          <p className="text-gray-600 mt-2">Manage platform security policies and monitor threats</p>
        </div>

        {/* Security Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Security Score</p>
                <p className="text-2xl font-bold text-green-600">94%</p>
              </div>
              <Shield className="w-8 h-8 text-green-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Sessions</p>
                <p className="text-2xl font-bold text-blue-600">1,247</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Blocked IPs</p>
                <p className="text-2xl font-bold text-red-600">23</p>
              </div>
              <Lock className="w-8 h-8 text-red-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed Logins</p>
                <p className="text-2xl font-bold text-orange-600">156</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Security Policies */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Security Policies
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-600">Require 2FA for all admin accounts</p>
                </div>
                <Switch
                  checked={securitySettings.twoFactorRequired}
                  onCheckedChange={(checked) => handleSettingChange('twoFactorRequired', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Password Complexity</p>
                  <p className="text-sm text-gray-600">Enforce strong password requirements</p>
                </div>
                <Switch
                  checked={securitySettings.passwordComplexity}
                  onCheckedChange={(checked) => handleSettingChange('passwordComplexity', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Verification</p>
                  <p className="text-sm text-gray-600">Require email verification for new accounts</p>
                </div>
                <Switch
                  checked={securitySettings.emailVerification}
                  onCheckedChange={(checked) => handleSettingChange('emailVerification', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-Suspend Suspicious Activity</p>
                  <p className="text-sm text-gray-600">Automatically suspend accounts with suspicious behavior</p>
                </div>
                <Switch
                  checked={securitySettings.autoSuspendSuspicious}
                  onCheckedChange={(checked) => handleSettingChange('autoSuspendSuspicious', checked)}
                />
              </div>
              <div className="space-y-2">
                <label className="font-medium">Session Timeout (minutes)</label>
                <Input
                  type="number"
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                  className="w-32"
                />
              </div>
              <div className="space-y-2">
                <label className="font-medium">Max Login Attempts</label>
                <Input
                  type="number"
                  value={securitySettings.loginAttempts}
                  onChange={(e) => handleSettingChange('loginAttempts', parseInt(e.target.value))}
                  className="w-32"
                />
              </div>
            </div>
          </Card>

          {/* Security Alerts */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Security Alerts
            </h3>
            <div className="space-y-3">
              {securityAlerts.map((alert) => (
                <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                  alert.type === 'critical' ? 'bg-red-50 border-red-500' :
                  alert.type === 'warning' ? 'bg-orange-50 border-orange-500' :
                  'bg-blue-50 border-blue-500'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{alert.message}</p>
                      <p className="text-sm text-gray-600">{alert.time}</p>
                      {alert.ip && <p className="text-xs text-gray-500">IP: {alert.ip}</p>}
                      {alert.user && <p className="text-xs text-gray-500">User: {alert.user}</p>}
                    </div>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Access Logs */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Key className="w-5 h-5" />
            Recent Access Logs
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accessLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell>{log.ip}</TableCell>
                  <TableCell>
                    <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      log.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {log.status === 'Success' ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                      {log.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default SecuritySettings;
