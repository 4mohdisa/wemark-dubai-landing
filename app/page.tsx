'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Send, Shield, Star, CheckCircle, Building, TrendingUp, Award, Users, MapPin, Phone, Mail } from 'lucide-react';
import { Roboto, Merriweather } from 'next/font/google';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import LeadModal from '../components/LeadModal';

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '700'],
});

const merriweather = Merriweather({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '700'],
  style: ['normal', 'italic'],
});

export default function Home() {
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '' });
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leadErrors, setLeadErrors] = useState<{ [key: string]: string }>({});
  const [contactErrors, setContactErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  const validateLeadForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!leadForm.name.trim()) newErrors.name = 'Name is required';
    if (!leadForm.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadForm.email)) newErrors.email = 'Invalid email format';
    if (!leadForm.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^[\+]?[\d\s\-\(\)]+$/.test(leadForm.phone)) newErrors.phone = 'Invalid phone format';
    
    setLeadErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateContactForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!contactForm.name.trim()) newErrors.name = 'Name is required';
    if (!contactForm.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) newErrors.email = 'Invalid email format';
    if (!contactForm.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^[\+]?[\d\s\-\(\)]+$/.test(contactForm.phone)) newErrors.phone = 'Invalid phone format';
    if (!contactForm.message.trim()) newErrors.message = 'Message is required';
    
    setContactErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateLeadForm()) return;
    
    setIsSubmitting(true);
    
    // Lead form submission
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...leadForm,
          message: '', // Lead form doesn't have message field
          formType: 'Hero Lead Form'
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        // Lead form submission successful
        setSubmitted(true);
        
        // Google Analytics tracking
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'generate_lead', {
            event_category: 'Form Submission',
            event_label: 'Hero Lead Form',
            value: 1
          });
        }
      } else {
        // Lead form submission failed
        alert('There was an error submitting your form. Please try again.');
      }
    } catch (error) {
      // Lead form submission error
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateContactForm()) return;
    
    setIsContactSubmitting(true);
    
    // Contact form submission
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...contactForm,
          formType: 'Contact Form'
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        // Contact form submission successful
        alert('Thank you! We will contact you within 2 hours.');
        
        // Reset form
        setContactForm({ name: '', email: '', phone: '', message: '' });
        
        // Google Analytics tracking
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'generate_lead', {
            event_category: 'Form Submission',
            event_label: 'Contact Form',
            value: 1
          });
        }
      } else {
        // Contact form submission failed
        alert('There was an error submitting your form. Please try again.');
      }
    } catch (error) {
      // Contact form submission error
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsContactSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen bg-white overflow-x-hidden ${roboto.className}`}>
      <Navigation onOpenModal={() => setIsModalOpen(true)} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-24 pb-16">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/19756845/pexels-photo-19756845.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080"
            alt="Luxury Dubai skyline with modern skyscrapers showcasing premium real estate investment opportunities"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:items-center">
            {/* Left Column - Headlines & Benefits */}
            <div className="text-white order-1 mt-8 lg:mt-0">

              <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6 leading-tight ${merriweather.className} italic`} data-macaly="hero-title">
                Tax-Free Dubai Investments With High Returns
              </h1>

              <p className="text-lg sm:text-xl mb-6 lg:mb-8 text-gray-200 leading-relaxed" data-macaly="hero-subtitle">
                Secure prime Dubai property before prices rise. Exclusive access to Dubai's most profitable investments.
              </p>

              {/* Key Benefits */}
              <div className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
                <div className="flex items-start">
                  <CheckCircle size={20} className="text-accent mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-base lg:text-lg leading-relaxed">High returns on premium Dubai properties</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle size={20} className="text-accent mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-base lg:text-lg leading-relaxed">Exclusive off-plan deals in Marina, Downtown & Palm</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle size={20} className="text-accent mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-base lg:text-lg leading-relaxed">Tax-free investment returns for international investors</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle size={20} className="text-accent mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-base lg:text-lg leading-relaxed">Successful investments completed</span>
                </div>
              </div>
            </div>

            {/* Right Column - Lead Form */}
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 lg:p-8 shadow-2xl border border-white/20 order-2 mt-12 lg:mt-0 mb-8 lg:mb-0">
              <div className="text-center mb-6">
                <h2 className={`text-2xl md:text-3xl font-bold text-navy mb-3 ${merriweather.className} italic`}>
                  Get VIP Access
                </h2>
                <p className="text-gray-600 text-lg">
                  Unlock exclusive Dubai property deals
                </p>
              </div>

              {!submitted ? (
                <form onSubmit={handleLeadSubmit} className="space-y-4" suppressHydrationWarning={true}>
                  <div>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      className={`w-full px-4 py-4 border rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-lg ${
                        leadErrors.name ? 'border-red-500' : 'border-gray-200'
                      } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={isSubmitting}
                      required
                      data-macaly="lead-name-input"
                    />
                    {leadErrors.name && <p className="text-red-500 text-sm mt-1">{leadErrors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                      className={`w-full px-4 py-4 border rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-lg ${
                        leadErrors.email ? 'border-red-500' : 'border-gray-200'
                      } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={isSubmitting}
                      required
                      data-macaly="lead-email-input"
                    />
                    {leadErrors.email && <p className="text-red-500 text-sm mt-1">{leadErrors.email}</p>}
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      className={`w-full px-4 py-4 border rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-lg ${
                        leadErrors.phone ? 'border-red-500' : 'border-gray-200'
                      } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={isSubmitting}
                      required
                      data-macaly="lead-phone-input"
                    />
                    {leadErrors.phone && <p className="text-red-500 text-sm mt-1">{leadErrors.phone}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary premium-button flex items-center justify-center bg-navy hover:bg-gray-800"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="loading-spinner mr-3"></div>
                        Processing...
                      </>
                    ) : (
                      '🚀 Get My Investment Portfolio'
                    )}
                  </button>
                  
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mt-3">
                      🔒 100% Privacy Guaranteed. No spam ever. Exclusive offers released monthly.
                    </p>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600 mb-4">Your VIP access request has been received.</p>
                  <p className="text-sm text-gray-500">Our Dubai investment specialist will contact you within 2 hours.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <ChevronDown size={32} className="text-white" />
          </div>
        </div>
      </section>

      {/* Trusted Partners - Moved closer to hero */}
      <section className="py-12 bg-light-gray border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <p className="text-gray-600 font-semibold">Trusted Developer Partners</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 items-center justify-center opacity-80">
            {[
              { name: 'DAMAC', logo: 'https://www.wemark.ae/Developers_logo/DAMAC%20Properties.png' },
              { name: 'Emaar', logo: 'https://www.wemark.ae/Developers_logo/Emaar%20Properties.png' },
              { name: 'Sobha', logo: 'https://www.wemark.ae/Developers_logo/Sobha%20Realty.png' },
              { name: 'Binghatti', logo: 'https://www.wemark.ae/Developers_logo/Binghatti.png' },
              { name: 'Meraas', logo: 'https://www.wemark.ae/Developers_logo/Meraas.png' },
              { name: 'Samana', logo: 'https://www.wemark.ae/Developers_logo/Samana%20Developers.png' },
              { name: 'Nakheel', logo: 'https://www.wemark.ae/Developers_logo/Nakheel.png' },
              { name: 'Danube', logo: 'https://www.wemark.ae/Developers_logo/Danube%20Properties.png' }
            ].map((partner) => (
              <div key={partner.name} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-center">
                <img
                  src={partner.logo}
                  alt={`${partner.name} - Trusted Dubai property developer partner of Wemark Real Estate`}
                  className="max-h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold text-navy mb-6 ${merriweather.className} italic`}>
              Why Dubai Investors Choose Wemark
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Dubai's fastest-growing luxury real estate company with proven results
            </p>
          </div>

          {/* Key Benefits Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mt-16">
            <div className="bg-light-gray rounded-2xl p-8">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-6">
                <Building size={32} className="text-white" />
              </div>
              <h3 className={`text-2xl font-bold text-navy mb-4 ${merriweather.className} italic`}>Prime Locations Only</h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Dubai Marina waterfront towers</li>
                <li>• Downtown luxury residences</li>
                <li>• Palm Jumeirah exclusive villas</li>
                <li>• Business Bay premium apartments</li>
              </ul>
              <div className="mt-6">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="text-accent font-semibold hover:text-navy transition-colors"
                >
                  View Available Properties →
                </button>
              </div>
            </div>

            <div className="bg-light-gray rounded-2xl p-8">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp size={32} className="text-white" />
              </div>
              <h3 className={`text-2xl font-bold text-navy mb-4 ${merriweather.className} italic`}>Strong Growth Potential</h3>
              <ul className="space-y-3 text-gray-700">
                <li>• High growth potential investments</li>
                <li>• Flexible payment plans available</li>
                <li>• Capital appreciation opportunities</li>
                <li>• Rental yield optimization</li>
              </ul>
              <div className="mt-6">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="text-accent font-semibold hover:text-navy transition-colors"
                >
                  Calculate My Returns →
                </button>
              </div>
            </div>

            <div className="bg-light-gray rounded-2xl p-8">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Shield size={32} className="text-white" />
              </div>
              <h3 className={`text-2xl font-bold text-navy mb-4 ${merriweather.className} italic`}>Expert Support</h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Dedicated investment advisor</li>
                <li>• Legal & financing assistance</li>
                <li>• Property management services</li>
                <li>• 24/7 investor support</li>
              </ul>
              <div className="mt-6">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="text-accent font-semibold hover:text-navy transition-colors"
                >
                  Get Expert Consultation →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-5xl font-bold text-navy mb-6 ${merriweather.className} italic`} data-macaly="services-title">
              Your Investment Options
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto" data-macaly="services-subtitle">
              Choose from Dubai's most profitable property investment strategies
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            
            {/* Off-Plan Properties */}
            <div className="bg-light-gray rounded-3xl p-8 lg:p-12">
              <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center mb-6">
                <Building size={32} className="text-white" />
              </div>
              <h3 className={`text-2xl md:text-3xl font-bold text-navy mb-4 ${merriweather.className} italic`} data-macaly="offplan-title">Off-Plan Properties</h3>
              <p className="text-lg text-gray-700 mb-6" data-macaly="offplan-description">
                Get early access to Dubai's newest developments at pre-launch prices
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />Below market value pricing</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />Flexible payment plans (1-5% down)</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />Capital appreciation during construction</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />Premium developers: DAMAC, Emaar, Sobha</li>
              </ul>
            </div>

            {/* Ready Properties */}
            <div className="bg-light-gray rounded-3xl p-8 lg:p-12">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-6">
                <Award size={32} className="text-white" />
              </div>
              <h3 className={`text-2xl md:text-3xl font-bold text-navy mb-4 ${merriweather.className} italic`} data-macaly="ready-title">Ready-to-Move Properties</h3>
              <p className="text-lg text-gray-700 mb-6" data-macaly="ready-description">
                Immediate rental income from luxury properties in prime locations
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />Instant rental income generation</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />Fully furnished luxury units</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />Strong annual rental yields</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />Complete property management</li>
              </ul>
            </div>
          </div>

          {/* Developer Partners */}
          <div className="text-center">
            <h3 className={`text-2xl font-bold text-navy mb-8 ${merriweather.className} italic`}>Exclusive Developer Partners</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
              {[
                { name: 'DAMAC', logo: 'https://www.wemark.ae/Developers_logo/DAMAC%20Properties.png' },
                { name: 'Emaar', logo: 'https://www.wemark.ae/Developers_logo/Emaar%20Properties.png' },
                { name: 'Sobha', logo: 'https://www.wemark.ae/Developers_logo/Sobha%20Realty.png' },
                { name: 'Binghatti', logo: 'https://www.wemark.ae/Developers_logo/Binghatti.png' },
                { name: 'Meraas', logo: 'https://www.wemark.ae/Developers_logo/Meraas.png' },
                { name: 'Samana', logo: 'https://www.wemark.ae/Developers_logo/Samana%20Developers.png' },
                { name: 'Nakheel', logo: 'https://www.wemark.ae/Developers_logo/Nakheel.png' },
                { name: 'Danube', logo: 'https://www.wemark.ae/Developers_logo/Danube%20Properties.png' }
              ].map((partner, index) => (
                <div key={index} className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-accent transition-colors flex items-center justify-center">
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`}
                    className="w-20 h-12 object-contain"
                    data-macaly={`partner-${index}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Wemark Section - NEW */}
      <section className="py-20 bg-light-gray" id="about-wemark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold text-navy mb-6 ${merriweather.className} italic`}>
              About Wemark
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Bringing Adelaide's real estate expertise to Dubai's dynamic property market
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <img
                src="https://www.wemark.ae/founders.jpg"
                alt="Wemark team collaborating in modern conference room discussing Dubai property investment opportunities"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
                loading="lazy"
              />
                
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Founded in Adelaide with over 15 years of trusted real estate expertise, Wemark has become South Australia's 
                  most respected property investment company. Now we're bringing that same commitment to excellence to Dubai's 
                  booming property market.
                </p>
                
                <p>
                  Our mission is simple: help Adelaide investors secure high return, tax free Dubai property investments through 
                  expert guidance and exclusive developer partnerships. We understand the unique needs of Australian investors 
                  looking to diversify internationally.
                </p>
                
                <p>
                  From your first inquiry to property handover, we promise complete transparency, efficient processes, and 
                  dedicated support. Our team combines deep Adelaide market knowledge with on ground Dubai expertise to deliver 
                  exceptional results for every client.
                </p>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">Many</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">High</div>
                  <div className="text-sm text-gray-600">Growth Focus</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">Extensive</div>
                  <div className="text-sm text-gray-600">Experience</div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://wemark.com.au" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary premium-button bg-navy hover:bg-gray-800"
                  onClick={() => {
                    if (typeof gtag !== 'undefined') {
                      gtag('event', 'click', {
                        event_category: 'About Section',
                        event_label: 'Visit Wemark Australia'
                      });
                    }
                  }}
                >
                  Visit Wemark Australia
                </a>
                <a 
                  href="https://wemark.ae" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary premium-button bg-navy hover:bg-gray-800"
                  onClick={() => {
                    if (typeof gtag !== 'undefined') {
                      gtag('event', 'click', {
                        event_category: 'About Section',
                        event_label: 'Visit Wemark Dubai'
                      });
                    }
                  }}
                >
                  Visit Wemark Dubai
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>      

      {/* Testimonials Section */}
      <section className="py-20" id="testimonials">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold text-navy mb-6 ${merriweather.className} italic`}>
              Success Stories
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Real results from real investors who trusted Wemark with their Dubai investments
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4">
                  <Star size={24} className="text-accent fill-current" />
                </div>
                <div>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Excellent Returns</div>
                </div>
              </div>
              
              <blockquote className="text-gray-700 mb-6 leading-relaxed italic">
                "Wemark delivered exceptional results on our Downtown Dubai investment. Excellent returns achieved ahead of schedule. 
                Professional, transparent, and highly recommended for serious property investors."
              </blockquote>
              
              <div className="border-t pt-4">
                <div className="font-bold text-navy">Sarah Al-Mansouri</div>
                <div className="text-sm text-gray-600">Private Investor</div>
                <div className="text-sm text-accent font-semibold">AED 2.8M Investment</div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mr-4">
                  <Star size={24} className="text-green-600 fill-current" />
                </div>
                <div>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Strong Capital Growth</div>
                </div>
              </div>
              
              <blockquote className="text-gray-700 mb-6 leading-relaxed italic">
                "Outstanding service and market insight. Our Palm Jumeirah villa exceeded all expectations with strong 
                capital appreciation. Best investment decision we ever made."
              </blockquote>
              
              <div className="border-t pt-4">
                <div className="font-bold text-navy">James Mitchell</div>
                <div className="text-sm text-gray-600">International Investor</div>
                <div className="text-sm text-accent font-semibold">AED 8.5M Investment</div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mr-4">
                  <Star size={24} className="text-blue-600 fill-current" />
                </div>
                <div>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Strong Rental Yield</div>
                </div>
              </div>
              
              <blockquote className="text-gray-700 mb-6 leading-relaxed italic">
                "Wemark's expertise in Dubai's market is unmatched. They guided us to the perfect off-plan opportunity. 
                Now earning strong rental yields annually with excellent property management."
              </blockquote>
              
              <div className="border-t pt-4">
                <div className="font-bold text-navy">Maria Rodriguez</div>
                <div className="text-sm text-gray-600">Property Developer</div>
                <div className="text-sm text-accent font-semibold">AED 12M Portfolio</div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">★★★★★</div>
                  <div className="text-sm text-gray-600">Top Rated</div>
                </div>
                <div className="h-8 w-px bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">Many</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
                <div className="h-8 w-px bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">★★★★★</div>
                  <div className="text-sm text-gray-600">Reviews</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA After Testimonials */}
          <div className="mt-12 text-center">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center bg-accent text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-navy transition-all shadow-lg"
            >
              Join Our Success Stories
              <ChevronDown size={20} className="ml-2 rotate-[-90deg]" />
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* Secondary Lead Form - Before Final CTA */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 mb-16" suppressHydrationWarning={true}>
            <div className="text-center mb-8">
              <h3 className={`text-3xl md:text-4xl font-bold text-navy mb-4 ${merriweather.className} italic`}>
                Ready to Start Investing?
              </h3>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Join many Australians securing profitable Dubai investments with our expert team
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleLeadSubmit} className="space-y-4 max-w-md mx-auto" suppressHydrationWarning={true}>
                <div>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    className={`w-full px-4 py-4 border rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-lg ${
                      leadErrors.name ? 'border-red-500' : 'border-gray-200'
                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                    required
                  />
                  {leadErrors.name && <p className="text-red-500 text-sm mt-1">{leadErrors.name}</p>}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    className={`w-full px-4 py-4 border rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-lg ${
                      leadErrors.email ? 'border-red-500' : 'border-gray-200'
                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                    required
                  />
                  {leadErrors.email && <p className="text-red-500 text-sm mt-1">{leadErrors.email}</p>}
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    className={`w-full px-4 py-4 border rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-lg ${
                      leadErrors.phone ? 'border-red-500' : 'border-gray-200'
                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                    required
                  />
                  {leadErrors.phone && <p className="text-red-500 text-sm mt-1">{leadErrors.phone}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary premium-button flex items-center justify-center bg-navy hover:bg-gray-800"
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner mr-3"></div>
                      Processing...
                    </>
                  ) : (
                    '🚀 Get My Investment Portfolio'
                  )}
                </button>
                
                <div className="text-center">
                  <p className="text-xs text-gray-500 mt-3">
                    🔒 RERA Licensed • 100% Privacy Guaranteed • 2hr Response Time
                  </p>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Perfect!</h4>
                <p className="text-gray-600 mb-4">Your Dubai investment consultation is confirmed.</p>
                <p className="text-sm text-gray-500">Our Dubai specialist will contact you within 2 hours with exclusive opportunities.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Final CTA Section - Improved */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${merriweather.className} italic`}>
            Your Dubai Investment Journey Starts Here
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join many Australians securing profitable Dubai investments with our expert team
          </p>

          {/* Key Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <TrendingUp size={32} className="text-accent mx-auto mb-3" />
              <div className="text-3xl font-bold text-accent mb-2">High</div>
              <div className="text-white font-semibold">Growth Potential</div>
              <div className="text-gray-400 text-sm">Premium Properties</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <Shield size={32} className="text-accent mx-auto mb-3" />
              <div className="text-3xl font-bold text-accent mb-2">0%</div>
              <div className="text-white font-semibold">Tax on Profits</div>
              <div className="text-gray-400 text-sm">International Investors</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <CheckCircle size={32} className="text-accent mx-auto mb-3" />
              <div className="text-3xl font-bold text-accent mb-2">2hrs</div>
              <div className="text-white font-semibold">Response Time</div>
              <div className="text-gray-400 text-sm">Guaranteed Service</div>
            </div>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-primary premium-button text-xl px-12 py-5 shadow-2xl bg-navy hover:bg-white hover:text-navy"
          >
            🚀 Secure My Dubai Investment Now
          </button>

          <p className="text-gray-400 text-sm mt-6">
            Free consultation • No obligation • RERA licensed advisors
          </p>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-lg border-t border-gray-200 lg:hidden">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-accent text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-navy transition-all shadow-lg flex items-center justify-center"
        >
          🚀 Get VIP Access Now
        </button>
      </div>

      {/* Contact Section */}
      <section className="py-20 bg-light-gray" id="contact">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold text-navy mb-6 ${merriweather.className} italic`}>
              Get In Touch
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Connect with Dubai's most trusted real estate investment specialists
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Office Information */}
            <div className="space-y-8">
              {/* Dubai Office */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mr-6">
                    <span className="text-white text-2xl font-bold">🇦🇪</span>
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold text-navy ${merriweather.className} italic`}>Dubai Office</h3>
                    <p className="text-gray-600">Middle East Headquarters</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin size={20} className="text-accent mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Park Lane Tower 615, Business Bay, Dubai, United Arab Emirates</p>
                      <p className="text-gray-600 text-sm">Prime Business District Location</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone size={20} className="text-accent mr-3 flex-shrink-0" />
                    <div>
                      <a href="tel:+61426786664" className="font-semibold text-gray-900 hover:text-accent transition-colors">
                        +61 426 786 664
                      </a>
                      <p className="text-gray-600 text-sm">24/7 Investment Hotline</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail size={20} className="text-accent mr-3 flex-shrink-0" />
                    <div>
                      <a href="mailto:dubai@wemark.com.au" className="font-semibold text-gray-900 hover:text-accent transition-colors">
                        dubai@wemark.com.au
                      </a>
                      <p className="text-gray-600 text-sm">Investment Inquiries</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Australia Office */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mr-6">
                    <span className="text-white text-2xl font-bold">🇦🇺</span>
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold text-navy ${merriweather.className} italic`}>Australia Office</h3>
                    <p className="text-gray-600">International Operations</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin size={20} className="text-accent mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">3/392 Main N Rd, Blair Athol SA 5084, Australia</p>
                      <p className="text-gray-600 text-sm">Adelaide Business Hub</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone size={20} className="text-accent mr-3 flex-shrink-0" />
                    <div>
                      <a href="tel:+61872001444" className="font-semibold text-gray-900 hover:text-accent transition-colors">
                        +61 (08) 7200 1444
                      </a>
                      <p className="text-gray-600 text-sm">Australian Investors</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail size={20} className="text-accent mr-3 flex-shrink-0" />
                    <div>
                      <a href="mailto:we@wemark.com.au" className="font-semibold text-gray-900 hover:text-accent transition-colors">
                        we@wemark.com.au
                      </a>
                      <p className="text-gray-600 text-sm">Australian Operations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="mb-8">
                <h3 className={`text-2xl font-bold text-navy mb-3 ${merriweather.className} italic`}>
                  Quick Contact
                </h3>
                <p className="text-gray-600">
                  Get instant access to exclusive Dubai property opportunities
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-6" suppressHydrationWarning={true}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className={`w-full px-4 py-4 border rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none ${
                        contactErrors.name ? 'border-red-500' : 'border-gray-200'
                      } ${isContactSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={isContactSubmitting}
                      required
                    />
                    {contactErrors.name && <p className="text-red-500 text-sm mt-1">{contactErrors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className={`w-full px-4 py-4 border rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none ${
                        contactErrors.email ? 'border-red-500' : 'border-gray-200'
                      } ${isContactSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={isContactSubmitting}
                      required
                    />
                    {contactErrors.email && <p className="text-red-500 text-sm mt-1">{contactErrors.email}</p>}
                  </div>
                </div>
                
                <div>
                  <input
                    type="tel"
                    placeholder="Your phone number"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className={`w-full px-4 py-4 border rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none ${
                      contactErrors.phone ? 'border-red-500' : 'border-gray-200'
                    } ${isContactSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isContactSubmitting}
                    required
                  />
                  {contactErrors.phone && <p className="text-red-500 text-sm mt-1">{contactErrors.phone}</p>}
                </div>
                
                <div>
                  <textarea
                    placeholder="Tell us about your investment goals and budget range..."
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className={`w-full px-4 py-4 border rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none resize-none ${
                      contactErrors.message ? 'border-red-500' : 'border-gray-200'
                    } ${isContactSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isContactSubmitting}
                    required
                  />
                  {contactErrors.message && <p className="text-red-500 text-sm mt-1">{contactErrors.message}</p>}
                </div>
                
                <button
                  type="submit"
                  disabled={isContactSubmitting}
                  className={`w-full bg-navy text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center ${
                    isContactSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isContactSubmitting ? (
                    <>
                      <div className="loading-spinner mr-3"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} className="mr-3" />
                      Send Message
                    </>
                  )}
                </button>
                
                <p className="text-xs text-gray-500 text-center">
                  🔒 Your information is secure and will never be shared. Response within 2 hours guaranteed.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer onOpenModal={() => setIsModalOpen(true)} />
      
      {/* Lead Modal */}
      <LeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}