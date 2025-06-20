
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Upload, CheckCircle, AlertCircle, FileText, Camera } from 'lucide-react';
import Header from '@/components/Header';

const KYCVerification = () => {
  const [verificationStatus] = useState({
    identity: 'verified',
    address: 'pending',
    income: 'not_started',
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    identity: 'drivers_license.pdf',
    address: null,
    income: null,
  });

  const handleFileUpload = (type: string) => {
    console.log(`Uploading file for ${type}`);
    // Handle file upload logic
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'verified':
        return 'Verified';
      case 'pending':
        return 'Under Review';
      default:
        return 'Not Started';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button asChild variant="outline" className="mb-4">
            <Link to="/user-dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">KYC Verification</h1>
          <p className="text-gray-600 mt-2">Complete your identity verification to increase trust</p>
        </div>

        {/* Verification Progress */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Verification Progress</h3>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-gray-600">1 of 3 completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '33%' }}></div>
          </div>
        </Card>

        <div className="space-y-6">
          {/* Identity Verification */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {getStatusIcon(verificationStatus.identity)}
                <div>
                  <h3 className="text-lg font-semibold">Identity Verification</h3>
                  <p className="text-gray-600">Upload a government-issued ID</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(verificationStatus.identity)}`}>
                {getStatusText(verificationStatus.identity)}
              </span>
            </div>
            
            {uploadedFiles.identity ? (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Uploaded: {uploadedFiles.identity}</p>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Upload your driver's license, passport, or state ID</p>
                <Button onClick={() =>handleFileUpload('identity')}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
              </div>
            )}
          </Card>

          {/* Address Verification */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {getStatusIcon(verificationStatus.address)}
                <div>
                  <h3 className="text-lg font-semibold">Address Verification</h3>
                  <p className="text-gray-600">Upload a utility bill or bank statement</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(verificationStatus.address)}`}>
                {getStatusText(verificationStatus.address)}
              </span>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Document must show your name and address (dated within 3 months)</p>
              <Button onClick={() => handleFileUpload('address')}>
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </div>
          </Card>

          {/* Income Verification */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {getStatusIcon(verificationStatus.income)}
                <div>
                  <h3 className="text-lg font-semibold">Income Verification</h3>
                  <p className="text-gray-600">Upload tax returns or pay stubs (optional)</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(verificationStatus.income)}`}>
                {getStatusText(verificationStatus.income)}
              </span>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">This helps increase trust with potential renters</p>
              <Button onClick={() => handleFileUpload('income')} variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </div>
          </Card>
        </div>

        {/* Benefits */}
        <Card className="p-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Verification Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium">Increased Trust</h4>
              <p className="text-sm text-gray-600">Verified users receive more bookings</p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium">Higher Earnings</h4>
              <p className="text-sm text-gray-600">Command premium rates</p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium">Priority Support</h4>
              <p className="text-sm text-gray-600">Get faster customer service</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default KYCVerification;
