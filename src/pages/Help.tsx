
import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import LiveChat from '@/components/LiveChat';
import ContactForm from '@/components/ContactForm';
import { useNavigate } from 'react-router-dom';

const Help = () => {
  const [showContactForm, setShowContactForm] = useState<'email' | 'phone' | null>(null);
  const navigate = useNavigate();

  const faqData = [
    {
      question: 'How do I rent equipment?',
      answer: 'Browse available equipment, select your dates, and submit a booking request. Once approved by the owner, you can proceed with payment.'
    },
    {
      question: 'What if equipment is damaged during rental?',
      answer: 'All rentals include damage protection. Report any issues immediately and our dispute resolution team will handle the situation fairly.'
    },
    {
      question: 'How do I get paid as an equipment owner?',
      answer: 'Payments are processed automatically after successful rental completion. Funds are typically available in your account within 2-3 business days.'
    },
    {
      question: 'Is there insurance coverage?',
      answer: 'Optional insurance is available for both owners and renters. Coverage details vary by equipment type and rental duration.'
    },
    {
      question: 'How do I verify my identity?',
      answer: 'Upload a government-issued ID and complete phone verification. This helps build trust in our community.'
    },
    {
      question: 'What are the booking fees?',
      answer: 'Renters pay a 3% service fee. Equipment owners pay a 5% processing fee on successful bookings.'
    }
  ];

  const handlePhoneCall = () => {
    // In a real app, this could initiate a call or open the phone app
    window.location.href = 'tel:+15551234567';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-gray-600">Get the support you need</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
            <p className="text-gray-600 text-sm mb-4">Get instant help from our support team</p>
            <p className="text-xs text-gray-500 mb-4">Click the chat button in the bottom right</p>
          </Card>

          <Card 
            className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
            onClick={handlePhoneCall}
          >
            <Phone className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
            <p className="text-gray-600 text-sm mb-4">Call us at (555) 123-4567</p>
            <Button variant="outline" size="sm">Call Now</Button>
          </Card>

          <Card 
            className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setShowContactForm('email')}
          >
            <Mail className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Email Support</h3>
            <p className="text-gray-600 text-sm mb-4">Send us a detailed message</p>
            <Button variant="outline" size="sm">Send Email</Button>
          </Card>

          <Card 
            className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate('/how-it-works')}
          >
            <FileText className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Documentation</h3>
            <p className="text-gray-600 text-sm mb-4">Browse our help articles</p>
            <Button variant="outline" size="sm">View Docs</Button>
          </Card>
        </div>

        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Contact Form Modal */}
        {showContactForm && (
          <ContactForm
            type={showContactForm}
            onClose={() => setShowContactForm(null)}
          />
        )}

        {/* Live Chat Component */}
        <LiveChat />
      </div>
    </div>
  );
};

export default Help;
