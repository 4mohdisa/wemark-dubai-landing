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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className={`min-h-screen bg-white ${roboto.className}`}>
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
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

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Headlines & Benefits */}
            <div className="text-white">
              <div className="mb-6">
                <span className="inline-block bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Dubai's #1 Luxury Real Estate
                </span>
              </div>

              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${merriweather.className} italic`} data-macaly="hero-title">
                Tax-Free Dubai Investments With 25% Returns
              </h1>

              <p className="text-xl mb-8 text-gray-200 leading-relaxed" data-macaly="hero-subtitle">
                Secure prime Dubai property before prices rise. Exclusive access to Dubai's most profitable investments.
              </p>

              {/* Key Benefits */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle size={24} className="text-accent mr-4 flex-shrink-0" />
                  <span className="text-lg">Up to 25% ROI guaranteed on premium properties</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle size={24} className="text-accent mr-4 flex-shrink-0" />
                  <span className="text-lg">Exclusive off-plan deals in Marina, Downtown & Palm</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle size={24} className="text-accent mr-4 flex-shrink-0" />
                  <span className="text-lg">Tax-free investment returns for international investors</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle size={24} className="text-accent mr-4 flex-shrink-0" />
                  <span className="text-lg">500+ successful investments completed</span>
                </div>
              </div>

              {/* Trust Element */}
              <div className="mb-8">
                <p className="text-sm text-gray-300 mb-2">Trusted by 500+ international investors</p>
                <div className="text-yellow-400 text-lg">
                  ★★★★★ <span className="text-white text-sm ml-2">4.9/5 rating • 127 reviews</span>
                </div>
              </div>
            </div>

            {/* Right Column - Lead Form */}
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
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
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-lg"
                      required
                      data-macaly="lead-name-input"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-lg"
                      required
                      data-macaly="lead-email-input"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-lg"
                      required
                      data-macaly="lead-phone-input"
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
          <div className="grid grid-cols-4 lg:grid-cols-8 gap-6 items-center justify-center opacity-70">
            {['DAMAC', 'Emaar', 'Sobha', 'Binghatti', 'Meraas', 'Samana', 'Nakheel', 'Danube'].map((partner) => (
              <div key={partner} className="bg-white rounded-lg p-4 shadow-sm text-center">
                <span className="text-navy font-bold text-sm">{partner}</span>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building size={32} className="text-accent" />
              </div>
              <div className="text-4xl font-bold text-navy mb-2" data-macaly="stat-properties">500+</div>
              <div className="text-gray-600 font-semibold">Properties Sold</div>
              <div className="text-sm text-gray-500 mt-2">Verified transactions</div>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp size={32} className="text-green-600" />
              </div>
              <div className="text-4xl font-bold text-navy mb-2" data-macaly="stat-roi">25%</div>
              <div className="text-gray-600 font-semibold">Average ROI</div>
              <div className="text-sm text-gray-500 mt-2">Guaranteed returns</div>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award size={32} className="text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-navy mb-2" data-macaly="stat-experience">15+</div>
              <div className="text-gray-600 font-semibold">Years Experience</div>
              <div className="text-sm text-gray-500 mt-2">Market expertise</div>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={32} className="text-purple-600" />
              </div>
              <div className="text-4xl font-bold text-navy mb-2" data-macaly="stat-advisors">50+</div>
              <div className="text-gray-600 font-semibold">Expert Advisors</div>
              <div className="text-sm text-gray-500 mt-2">Licensed professionals</div>
            </div>
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
                <a href="#contact" className="text-accent font-semibold hover:text-navy transition-colors">
                  View Available Properties →
                </a>
              </div>
            </div>

            <div className="bg-light-gray rounded-2xl p-8">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp size={32} className="text-white" />
              </div>
              <h3 className={`text-2xl font-bold text-navy mb-4 ${merriweather.className} italic`}>Guaranteed Returns</h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Up to 25% ROI on investments</li>
                <li>• Flexible payment plans available</li>
                <li>• Capital appreciation guarantee</li>
                <li>• Rental yield optimization</li>
              </ul>
              <div className="mt-6">
                <a href="#contact" className="text-accent font-semibold hover:text-navy transition-colors">
                  Calculate My Returns →
                </a>
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

      {/* About/Stats Section */}
      <section id="about" className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-5xl font-bold text-navy mb-6 ${merriweather.className} italic`} data-macaly="about-title">
              Why Dubai Investors Choose Wemark
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto" data-macaly="about-subtitle">
              Dubai's fastest-growing luxury real estate company with proven results
            </p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { number: '500+', label: 'Properties Sold', icon: Building },
              { number: '25%', label: 'Average ROI', icon: TrendingUp },
              { number: '15+', label: 'Years Experience', icon: Award },
              { number: '50+', label: 'Expert Advisors', icon: Users }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon size={28} className="text-white" />
                  </div>
                  <div className={`text-3xl font-bold text-navy mb-2 ${merriweather.className}`} data-macaly={`stat-${index}-number`}>
                    {stat.number}
                  </div>
                  <p className="text-gray-600 font-medium" data-macaly={`stat-${index}-label`}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Key Benefits Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Building size={36} className="text-white" />
              </div>
              <h3 className={`text-2xl font-bold text-navy mb-4 ${merriweather.className} italic`}>Prime Locations Only</h3>
              <ul className="text-gray-700 space-y-2 text-left max-w-sm mx-auto">
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" />Dubai Marina waterfront towers</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" />Downtown luxury residences</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" />Palm Jumeirah exclusive villas</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" />Business Bay premium apartments</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-navy rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp size={36} className="text-white" />
              </div>
              <h3 className={`text-2xl font-bold text-navy mb-4 ${merriweather.className} italic`}>Guaranteed Returns</h3>
              <ul className="text-gray-700 space-y-2 text-left max-w-sm mx-auto">
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" />Up to 25% ROI on investments</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" />Flexible payment plans available</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" />Capital appreciation guarantee</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" />Rental yield optimization</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Award size={36} className="text-white" />
              </div>
              <h3 className={`text-2xl font-bold text-navy mb-4 ${merriweather.className} italic`}>Expert Support</h3>
              <ul className="text-gray-700 space-y-2 text-left max-w-sm mx-auto">
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" />Dedicated investment advisor</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" />Legal & financing assistance</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" />Property management services</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" />24/7 investor support</li>
              </ul>
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
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />Up to 30% below market value</li>
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
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />8-12% annual rental yields</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />Complete property management</li>
              </ul>
            </div>
          </div>

          {/* Developer Partners */}
          <div className="text-center">
            <h3 className={`text-2xl font-bold text-navy mb-8 ${merriweather.className} italic`}>Exclusive Developer Partners</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
              {['DAMAC', 'Emaar', 'Sobha', 'Binghatti', 'Meraas', 'Samana', 'Nakheel', 'Danube'].map((partner, index) => (
                <div key={index} className="bg-white border-2 border-gray-100 rounded-xl p-4 hover:border-accent transition-colors">
                  <span className={`text-navy font-bold ${merriweather.className}`} data-macaly={`partner-${index}`}>{partner}</span>
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
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent rounded-full flex items-center justify-center shadow-xl">
                <span className="text-white font-bold text-lg">15+</span>
              </div>
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
                  <div className="text-2xl font-bold text-accent">500+</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">25%</div>
                  <div className="text-sm text-gray-600">Avg ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">15+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
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

      {/* Our Team Section */}
      <section className="py-20" id="team">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold text-navy mb-6 ${merriweather.className} italic`}>
              Our Team
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Meet the dedicated professionals behind Wemark's success in Dubai's luxury real estate market
            </p>
          </div>

          {/* Principals */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className={`text-2xl font-bold text-navy mb-2 ${merriweather.className} italic`}>Principals</h3>
              <div className="w-16 h-1 bg-accent mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="text-center">
                  <div className="relative mb-6">
                    <img
                      src="https://www.wemark.ae/teams/Parm.png"
                      alt="Parm Singh, Principal and Founder of Wemark Real Estate Dubai"
                      className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
                      loading="lazy"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <Star size={16} className="text-white" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-navy mb-2">Parm Singh</h4>
                  <p className="text-accent font-semibold mb-4">Principal & Founder</p>
                  <p className="text-gray-700 text-sm leading-relaxed mb-6">
                    Leading our team with vision and expertise, driving excellence in real estate services across Australia and Dubai.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <a href="mailto:parm@wemark.ae" className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-all">
                      <Mail size={16} />
                    </a>
                    <a href="#" className="w-10 h-10 bg-blue-600/10 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                      <Users size={16} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="text-center">
                  <div className="relative mb-6">
                    <img
                      src="https://www.wemark.ae/teams/kamal.png"
                      alt="Kamal Singh, Director Dubai of Wemark Real Estate"
                      className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
                      loading="lazy"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <Award size={16} className="text-white" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-navy mb-2">Kamal Singh</h4>
                  <p className="text-accent font-semibold mb-4">Director (Dubai)</p>
                  <p className="text-gray-700 text-sm leading-relaxed mb-6">
                    Leading our team with vision and expertise, driving excellence in real estate services across Australia and Dubai.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <a href="mailto:kamal@wemark.ae" className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-all">
                      <Mail size={16} />
                    </a>
                    <a href="#" className="w-10 h-10 bg-blue-600/10 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                      <Users size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Banner after Principals */}
            <div className="mt-12 bg-light-gray rounded-2xl p-6 text-center border border-gray-100">
              <p className="text-gray-700 mb-4 font-semibold">
                Want to work with our expert leadership team? Book a free consultation today.
              </p>
              <a 
                href="#contact" 
                className="inline-flex items-center bg-accent text-white px-8 py-3 rounded-xl font-semibold hover:bg-navy transition-all"
              >
                Get VIP Access
                <ChevronDown size={16} className="ml-2 rotate-[-90deg]" />
              </a>
            </div>
          </div>

          {/* Australia Team */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className={`text-2xl font-bold text-navy mb-2 ${merriweather.className} italic`}>Australia Team</h3>
              <div className="w-16 h-1 bg-accent mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                { name: "Chirag Chavda", title: "Sales Manager", image: "https://www.wemark.ae/teams/chirag.png" },
                { name: "Satwinder Kaur", title: "Property Consultant", image: "https://www.wemark.ae/teams/satwinder.png" },
                { name: "Sunraj Singh", title: "Property Consultant", image: "https://www.wemark.ae/teams/sunraj.png" },
                { name: "Ravin Amingad", title: "Property Consultant", image: "https://www.wemark.ae/teams/ravin.jpg" },
                { name: "Mohammed Isa", title: "Property Consultant", image: "https://www.wemark.ae/teams/Mohammed.png" },
                { name: "Yazdan Shah", title: "Property Consultant", image: "https://www.wemark.ae/teams/Yazdan.png" },
                { name: "Faith Figueroa", title: "Administration Assistant", image: "https://www.wemark.ae/teams/Faith.png" },
                { name: "Sukhpreet Bala", title: "Property Consultant", image: "https://www.wemark.ae/teams/Sukhpreet.png" },
                { name: "Christene Pineda", title: "Administration Assistant", image: "https://www.wemark.ae/teams/Christene.png" },
                { name: "Gundeep Singh", title: "Property Consultant", image: "https://www.wemark.ae/teams/gundeep.png" },
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <div className="text-center">
                    <img
                      src={member.image}
                      alt={`${member.name}, ${member.title} at Wemark Real Estate Australia`}
                      className="w-20 h-20 rounded-full mx-auto object-cover shadow-lg mb-4"
                      loading="lazy"
                    />
                    <h4 className="text-lg font-bold text-navy mb-1">{member.name}</h4>
                    <p className="text-accent font-medium text-sm">{member.title}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Banner after Australia Team */}
            <div className="mt-12 bg-light-gray rounded-2xl p-6 text-center border border-gray-100">
              <p className="text-gray-700 mb-4 font-semibold">
                Want to work with our expert Australia team? Book a free consultation today.
              </p>
              <a 
                href="#contact" 
                className="inline-flex items-center bg-accent text-white px-8 py-3 rounded-xl font-semibold hover:bg-navy transition-all"
              >
                Get VIP Access
                <ChevronDown size={16} className="ml-2 rotate-[-90deg]" />
              </a>
            </div>
          </div>

          {/* Dubai Team */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h3 className={`text-2xl font-bold text-navy mb-2 ${merriweather.className} italic`}>Dubai Team</h3>
              <div className="w-16 h-1 bg-accent mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="text-center">
                  <img
                    src="https://www.wemark.ae/teams/Desiree.png"
                    alt="Desiree Janer, Office Manager and HR at Wemark Real Estate Dubai"
                    className="w-20 h-20 rounded-full mx-auto object-cover shadow-lg mb-4"
                    loading="lazy"
                  />
                  <h4 className="text-lg font-bold text-navy mb-1">Desiree Janer</h4>
                  <p className="text-accent font-medium text-sm">Office Manager/HR</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="text-center">
                  <img
                    src="https://www.wemark.ae/teams/Sukrant.png"
                    alt="Sukrant Sandhu, Property Consultant at Wemark Real Estate Dubai"
                    className="w-20 h-20 rounded-full mx-auto object-cover shadow-lg mb-4"
                    loading="lazy"
                  />
                  <h4 className="text-lg font-bold text-navy mb-1">Sukrant Sandhu</h4>
                  <p className="text-accent font-medium text-sm">Property Consultant</p>
                </div>
              </div>
            </div>

            {/* Final CTA Banner after Dubai Team */}
            <div className="mt-12 bg-gradient-to-r from-accent to-navy rounded-2xl p-8 text-center text-white">
              <h4 className={`text-2xl font-bold mb-4 ${merriweather.className} italic`}>
                Ready to Work With Dubai's Best?
              </h4>
              <p className="text-blue-100 mb-6 text-lg">
                Our expert team is standing by to help you secure your Dubai property investment today.
              </p>
              <a 
                href="#contact" 
                className="inline-flex items-center bg-white text-navy px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
              >
                🚀 Get VIP Access Now
              </a>
            </div>
          </div>

          {/* Team Stats */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-accent mb-2">15</div>
                <div className="text-gray-700 font-semibold">Team Members</div>
                <div className="text-sm text-gray-500">Across 2 Countries</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">50+</div>
                <div className="text-gray-700 font-semibold">Years Combined</div>
                <div className="text-sm text-gray-500">Industry Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">500+</div>
                <div className="text-gray-700 font-semibold">Happy Clients</div>
                <div className="text-sm text-gray-500">Satisfied Investors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">24/7</div>
                <div className="text-gray-700 font-semibold">Support</div>
                <div className="text-sm text-gray-500">Always Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Parm Singh",
                "jobTitle": "Principal & Founder",
                "worksFor": {
                  "@type": "Organization",
                  "name": "Wemark Real Estate"
                },
                "email": "parm@wemark.ae",
                "image": "https://images.pexels.com/photos/33363536/pexels-photo-33363536.jpeg"
              },
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Kamal Singh",
                "jobTitle": "Director (Dubai)",
                "worksFor": {
                  "@type": "Organization",
                  "name": "Wemark Real Estate"
                },
                "email": "kamal@wemark.ae",
                "image": "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg"
              }
            ])
          }}
        />
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
                  <div className="text-sm text-gray-500 mt-1">22% ROI in 18 months</div>
                </div>
              </div>
              
              <blockquote className="text-gray-700 mb-6 leading-relaxed italic">
                "Wemark delivered exceptional results on our Downtown Dubai investment. 22% ROI in just 18 months. 
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
                  <div className="text-sm text-gray-500 mt-1">28% Capital Appreciation</div>
                </div>
              </div>
              
              <blockquote className="text-gray-700 mb-6 leading-relaxed italic">
                "Outstanding service and market insight. Our Palm Jumeirah villa exceeded all expectations with 28% 
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
                  <div className="text-sm text-gray-500 mt-1">15% Annual Rental Yield</div>
                </div>
              </div>
              
              <blockquote className="text-gray-700 mb-6 leading-relaxed italic">
                "Wemark's expertise in Dubai's market is unmatched. They guided us to the perfect off-plan opportunity. 
                Now earning 15% rental yield annually with excellent property management."
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
                  <div className="text-3xl font-bold text-accent">4.9/5</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
                <div className="h-8 w-px bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">500+</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
                <div className="h-8 w-px bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">127</div>
                  <div className="text-sm text-gray-600">5-Star Reviews</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA After Testimonials */}
          <div className="mt-12 text-center">
            <a 
              href="#contact" 
              className="inline-flex items-center bg-accent text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-navy transition-all shadow-lg"
            >
              Join Our Success Stories
              <ChevronDown size={20} className="ml-2 rotate-[-90deg]" />
            </a>
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
                Join hundreds of Australians securing high-ROI Dubai investments with our expert team
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
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-lg"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-lg"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-lg"
                    required
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
            Join hundreds of Australians securing high-ROI Dubai investments with our expert team
          </p>

          {/* Key Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <TrendingUp size={32} className="text-accent mx-auto mb-3" />
              <div className="text-3xl font-bold text-accent mb-2">25%</div>
              <div className="text-white font-semibold">Average ROI</div>
              <div className="text-gray-400 text-sm">Tax-Free Returns</div>
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
            className="btn-primary premium-button text-xl px-12 py-5 shadow-2xl bg-white text-black hover:bg-gray-100"
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
                      <p className="font-semibold text-gray-900">OF401 - 50, Bardab - Mankhool, Dubai, UAE</p>
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
                      <a href="mailto:dubai@wemark.ae" className="font-semibold text-gray-900 hover:text-accent transition-colors">
                        dubai@wemark.ae
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
                      <a href="mailto:australia@wemark.ae" className="font-semibold text-gray-900 hover:text-accent transition-colors">
                        australia@wemark.ae
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
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className={`w-full px-4 py-4 border border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none ${
                      isContactSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={isContactSubmitting}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className={`w-full px-4 py-4 border border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none ${
                      isContactSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={isContactSubmitting}
                    required
                  />
                </div>
                
                <input
                  type="tel"
                  placeholder="Your phone number"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  className={`w-full px-4 py-4 border border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none ${
                    isContactSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isContactSubmitting}
                  required
                />
                
                <textarea
                  placeholder="Tell us about your investment goals and budget range..."
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className={`w-full px-4 py-4 border border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none resize-none ${
                    isContactSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isContactSubmitting}
                  required
                />
                
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

      <Footer />
    </div>
  );
}