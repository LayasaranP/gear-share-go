
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, DollarSign, TrendingUp, CreditCard, AlertCircle, Download, Eye } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Header from '@/components/Header';

const FinancialOverview = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const financialStats = {
    totalRevenue: 156750.80,
    monthlyRevenue: 31200.50,
    pendingPayouts: 8945.25,
    completedTransactions: 2847,
    averageTransactionValue: 125.40,
    platformCommission: 12540.60
  };

  const recentTransactions = [
    { id: 'TXN001', date: '2024-01-20', amount: 245.50, type: 'Rental Payment', status: 'Completed', user: 'John Doe', equipment: 'Power Drill Set' },
    { id: 'TXN002', date: '2024-01-20', amount: 89.75, type: 'Platform Fee', status: 'Completed', user: 'Jane Smith', equipment: 'Lawn Mower' },
    { id: 'TXN003', date: '2024-01-19', amount: 320.00, type: 'Rental Payment', status: 'Pending', user: 'Bob Johnson', equipment: 'Excavator Mini' },
    { id: 'TXN004', date: '2024-01-19', amount: 156.25, type: 'Security Deposit', status: 'Held', user: 'Alice Brown', equipment: 'Concrete Mixer' },
    { id: 'TXN005', date: '2024-01-18', amount: 67.80, type: 'Refund', status: 'Processed', user: 'Mike Wilson', equipment: 'Pressure Washer' }
  ];

  const filteredTransactions = recentTransactions.filter(transaction =>
    transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.equipment.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-3xl font-bold text-gray-900">Financial Overview</h1>
          <p className="text-gray-600 mt-2">Monitor payments, transactions, and financial metrics</p>
        </div>

        {/* Financial Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">${financialStats.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-green-600">+18.2% from last month</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-blue-600">${financialStats.monthlyRevenue.toLocaleString()}</p>
                <p className="text-sm text-blue-600">Current month</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Payouts</p>
                <p className="text-2xl font-bold text-orange-600">${financialStats.pendingPayouts.toLocaleString()}</p>
                <p className="text-sm text-orange-600">Awaiting processing</p>
              </div>
              <CreditCard className="w-8 h-8 text-orange-600" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Transactions</p>
                <p className="text-2xl font-bold text-purple-600">{financialStats.completedTransactions.toLocaleString()}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Transaction Value</p>
                <p className="text-2xl font-bold text-indigo-600">${financialStats.averageTransactionValue}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Platform Commission</p>
                <p className="text-2xl font-bold text-teal-600">${financialStats.platformCommission.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Equipment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>${transaction.amount}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.user}</TableCell>
                  <TableCell>{transaction.equipment}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : transaction.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : transaction.status === 'Held'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
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

export default FinancialOverview;
