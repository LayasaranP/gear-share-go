
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, Filter, Download, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import Header from '@/components/Header';

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const [transactions] = useState([
    { id: 1, type: 'income', description: 'Power Drill Rental', amount: 25.00, date: '2024-01-20', status: 'completed' },
    { id: 2, type: 'payout', description: 'Weekly Payout', amount: -245.50, date: '2024-01-15', status: 'completed' },
    { id: 3, type: 'income', description: 'Circular Saw Rental', amount: 40.00, date: '2024-01-18', status: 'completed' },
    { id: 4, type: 'fee', description: 'Platform Fee', amount: -2.50, date: '2024-01-18', status: 'completed' },
    { id: 5, type: 'income', description: 'Generator Rental', amount: 80.00, date: '2024-01-16', status: 'completed' },
    { id: 6, type: 'refund', description: 'Cancelled Booking Refund', amount: -15.00, date: '2024-01-14', status: 'completed' },
  ]);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || transaction.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getTransactionIcon = (type: string) => {
    return type === 'income' ? (
      <ArrowDownLeft className="w-4 h-4 text-green-600" />
    ) : (
      <ArrowUpRight className="w-4 h-4 text-red-600" />
    );
  };

  const getAmountColor = (amount: number) => {
    return amount > 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button asChild variant="outline" className="mb-4">
            <Link to="/user-dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Transaction History</h1>
          <p className="text-gray-600 mt-2">View all your payment records and transactions</p>
        </div>

        <Card className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search transactions..."
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
              <option value="all">All Transactions</option>
              <option value="income">Income</option>
              <option value="payout">Payouts</option>
              <option value="fee">Fees</option>
              <option value="refund">Refunds</option>
            </select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-600">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${getAmountColor(transaction.amount)}`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Transactions;
