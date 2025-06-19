
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, Package, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';

const EquipmentOversight = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockEquipment = [
    { id: 1, name: 'Power Drill', owner: 'John Doe', status: 'Approved', category: 'Tools', price: '$25/day', flagged: false },
    { id: 2, name: 'Circular Saw', owner: 'Jane Smith', status: 'Pending', category: 'Tools', price: '$40/day', flagged: false },
    { id: 3, name: 'Generator', owner: 'Bob Johnson', status: 'Flagged', category: 'Power Equipment', price: '$80/day', flagged: true },
    { id: 4, name: 'Ladder', owner: 'Alice Brown', status: 'Approved', category: 'Tools', price: '$15/day', flagged: false },
  ];

  const filteredEquipment = mockEquipment.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.owner.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-3xl font-bold text-gray-900">Equipment Oversight</h1>
          <p className="text-gray-600 mt-2">Review and moderate equipment listings</p>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search equipment by name or owner..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Equipment</th>
                  <th className="text-left py-3 px-4">Owner</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-left py-3 px-4">Price</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEquipment.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Package className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          {item.flagged && (
                            <div className="flex items-center gap-1 text-red-600 text-xs">
                              <AlertTriangle className="w-3 h-3" />
                              Flagged
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{item.owner}</td>
                    <td className="py-3 px-4">{item.category}</td>
                    <td className="py-3 px-4">{item.price}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'Approved'
                            ? 'bg-green-100 text-green-800'
                            : item.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        {item.status === 'Pending' || item.status === 'Flagged' ? (
                          <>
                            <Button size="sm" variant="default">
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="destructive">
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </>
                        ) : (
                          <Button size="sm" variant="destructive">
                            Remove
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EquipmentOversight;
