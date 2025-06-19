
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ContactFormProps {
  type: 'email' | 'phone';
  onClose: () => void;
}

const ContactForm = ({ type, onClose }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Message sent successfully!",
        description: `We'll get back to you ${type === 'email' ? 'via email' : 'by phone'} within 24 hours.`,
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {type === 'email' ? 'Send Email' : 'Request Phone Call'}
          </h2>
          <p className="text-gray-600 mt-2">
            {type === 'email' 
              ? 'Send us a detailed message and we\'ll respond within 24 hours.'
              : 'Provide your details and we\'ll call you back within 2 hours.'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              placeholder="What can we help you with?"
            />
          </div>

          <div>
            <Label htmlFor="message">
              {type === 'email' ? 'Message' : 'Preferred call time and additional details'}
            </Label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={type === 'email' 
                ? "Describe your issue or question in detail..."
                : "When would be the best time to call you? Any specific topics to discuss?"
              }
            />
          </div>

          <div className="flex gap-3">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading 
                ? 'Sending...' 
                : type === 'email' 
                  ? 'Send Email' 
                  : 'Request Call'
              }
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ContactForm;
