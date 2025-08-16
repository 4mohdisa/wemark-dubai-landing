'use client';

import { useState } from 'react';
import { CheckCircle, X, Send } from 'lucide-react';
import { Merriweather } from 'next/font/google';

const merriweather = Merriweather({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '700'],
  style: ['normal', 'italic'],
});

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

export default function LeadModal({ isOpen, onClose, title = "Get VIP Access", subtitle = "Unlock exclusive Dubai property deals" }: LeadModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^[\+]?[\d\s\-\(\)]+$/.test(formData.phone)) newErrors.phone = 'Invalid phone format';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    // Modal form submission

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formType: 'Modal Lead Form'
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        // Modal form submission successful
        setSubmitted(true);
        
        // Google Analytics tracking
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'generate_lead', {
            event_category: 'Form Submission',
            event_label: 'Modal Lead Form',
            value: 1
          });
        }
      } else {
        // Modal form submission failed
        // Show error message to user via UI feedback
      }
    } catch (error) {
      // Modal form submission error
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      // Reset form after a delay to avoid visual glitch
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', message: '' });
        setSubmitted(false);
        setErrors({});
      }, 300);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-fadeInUp">
        {/* Close Button */}
        <button
          onClick={handleClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
        >
          <X size={20} className="text-gray-600" />
        </button>

        {!submitted ? (
          <>
            <div className="text-center mb-6">
              <h3 className={`text-2xl md:text-3xl font-bold text-navy mb-3 ${merriweather.className} italic`}>
                {title}
              </h3>
              <p className="text-gray-600">
                {subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-4 border rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-lg ${
                    errors.name ? 'border-red-500' : 'border-gray-200'
                  } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting}
                  required
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-4 border rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-lg ${
                    errors.email ? 'border-red-500' : 'border-gray-200'
                  } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting}
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-4 border rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-lg ${
                    errors.phone ? 'border-red-500' : 'border-gray-200'
                  } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting}
                  required
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <textarea
                  placeholder="Tell us about your investment goals (optional)"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full px-4 py-4 border border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none resize-none ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  rows={3}
                  disabled={isSubmitting}
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary premium-button flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="loading-spinner mr-3"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Send size={20} className="mr-3" />
                    Get Instant VIP Access →
                  </>
                )}
              </button>
              
              <div className="text-center">
                <p className="text-xs text-gray-500 mt-3">
                  🔒 100% Privacy Guaranteed. Response within 2 hours.
                </p>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
            <h4 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h4>
            <p className="text-gray-600 mb-4">Your VIP access request has been received.</p>
            <p className="text-sm text-gray-500">Our Dubai investment specialist will contact you within 2 hours.</p>
            <button
              onClick={handleClose}
              className="mt-6 bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent-hover transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}