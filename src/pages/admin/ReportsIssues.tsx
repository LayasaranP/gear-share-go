
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle, MessageCircle, Flag, Clock } from 'lucide-react';
import Header from '@/components/Header';

const ReportsIssues = () => {
  const mockReports = [
    {
      id: 1,
      type: 'Equipment Issue',
      reporter: 'John Doe',
      subject: 'Broken drill received',
      description: 'The power drill I rented was not working properly.',
      status: 'Open',
      priority: 'High',
      date: '2024-01-15',
    },
    {
      id: 2,
      type: 'User Behavior',
      reporter: 'Jane Smith',
      subject: 'Late return without notice',
      description: 'Renter did not return equipment on time and did not respond to messages.',
      status: 'In Progress',
      priority: 'Medium',
      date: '2024-01-14',
    },
    {
      id: 3,
      type: 'Payment Dispute',
      reporter: 'Bob Johnson',
      subject: 'Unauthorized charge',
      description: 'I was charged extra fees that were not mentioned in the agreement.',
      status: 'Resolved',
      priority: 'Low',
      date: '2024-01-13',
    },
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
          <h1 className="text-3xl font-bold text-gray-900">Reports & Issues</h1>
          <p className="text-gray-600 mt-2">Handle user reports and disputes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open Reports</p>
                <p className="text-2xl font-bold text-red-600">7</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-yellow-600">3</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved Today</p>
                <p className="text-2xl font-bold text-green-600">12</p>
              </div>
              <MessageCircle className="w-8 h-8 text-green-600" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-purple-600">2</p>
              </div>
              <Flag className="w-8 h-8 text-purple-600" />
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Reports</h3>
          <div className="space-y-4">
            {mockReports.map((report) => (
              <div key={report.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">{report.subject}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          report.priority === 'High'
                            ? 'bg-red-100 text-red-800'
                            : report.priority === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {report.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Type: {report.type}</span>
                      <span>Reporter: {report.reporter}</span>
                      <span>Date: {report.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        report.status === 'Open'
                          ? 'bg-red-100 text-red-800'
                          : report.status === 'In Progress'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {report.status}
                    </span>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    {report.status !== 'Resolved' && (
                      <Button size="sm">
                        Respond
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReportsIssues;
