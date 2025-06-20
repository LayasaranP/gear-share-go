
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Wallet, CreditCard, DollarSign, TrendingUp, Download } from 'lucide-react';
import Header from '@/components/Header';

const Wallet = () => {
  const [payoutInfo] = useState({
    balance: 2450.75,
    pendingPayouts: 320.50,
    totalEarnings: 8950.25,
    lastPayout: '2024-01-15',
    bankAccount: '**** **** **** 1234',
    payoutSchedule: 'Weekly',
  });

  const [recentPayouts] = useState([
    { id: 1, amount: 245.50, date: '2024-01-15', status: 'Completed', method: 'Bank Transfer' },
    { id: 2, amount: 180.75, date: '2024-01-08', status: 'Completed', method: 'Bank Transfer' },
    { id: 3, amount: 320.25, date: '2024-01-01', status: 'Completed', method: 'Bank Transfer' },
  ]);

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
          <h1 className="text-3xl font-bold text-gray-900">Wallet & Payouts</h1>
          <p className="text-gray-600 mt-2">Manage your earnings and payout settings</p>
        </div>

        {/* Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available Balance</p>
                <p className="text-2xl font-bold text-green-600">${payoutInfo.balance}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Payouts</p>
                <p className="text-2xl font-bold text-orange-600">${payoutInfo.pendingPayouts}</p>
              </div>
              <Wallet className="w-8 h-8 text-orange-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-blue-600">${payoutInfo.totalEarnings}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payout Settings */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Payout Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Bank Account</label>
                <p className="text-lg">{payoutInfo.bankAccount}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Payout Schedule</label>
                <p className="text-lg">{payoutInfo.payoutSchedule}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Last Payout</label>
                <p className="text-lg">{payoutInfo.lastPayout}</p>
              </div>
              <Button className="w-full">
                <CreditCard className="w-4 h-4 mr-2" />
                Update Payout Method
              </Button>
            </div>
          </Card>

          {/* Recent Payouts */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Payouts</h3>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
            <div className="space-y-4">
              {recentPayouts.map((payout) => (
                <div key={payout.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">${payout.amount}</p>
                    <p className="text-sm text-gray-600">{payout.date}</p>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {payout.status}
                    </span>
                    <p className="text-sm text-gray-600 mt-1">{payout.method}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
