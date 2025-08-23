'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Merriweather } from 'next/font/google';
import Link from 'next/link';

const merriweather = Merriweather({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '700'],
  style: ['normal', 'italic'],
});

interface NavigationProps {
  onOpenModal?: () => void;
}

export default function Navigation({ onOpenModal }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  const handleVIPClick = () => {
    setIsMenuOpen(false);
    if (onOpenModal) {
      onOpenModal();
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center shadow-lg">
              <span className={`text-white font-bold text-xl ${merriweather.className}`}>W</span>
            </div>
            <div className="ml-3">
              <h2 className={`text-xl font-bold text-navy tracking-wide ${merriweather.className}`} data-macaly="logo-title">WEMARK</h2>
              <p className="text-xs text-gray-600 font-medium tracking-widest">DUBAI REAL ESTATE</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/#about" className="text-navy hover:text-accent transition-colors font-medium">Properties</Link>
            <Link href="/#services" className="text-navy hover:text-accent transition-colors font-medium">Investment</Link>
            <Link href="/#testimonials" className="text-navy hover:text-accent transition-colors font-medium">Success Stories</Link>
            <button onClick={handleVIPClick} className="bg-navy text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all font-semibold">Get VIP Access</button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X size={24} className="text-accent" /> : <Menu size={24} className="text-accent" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-lg">
            <div className="px-6 py-6">
              <div className="flex flex-col space-y-4">
                <Link href="/#about" onClick={handleNavClick} className="text-navy hover:text-accent transition-colors font-medium">Properties</Link>
                <Link href="/#services" onClick={handleNavClick} className="text-navy hover:text-accent transition-colors font-medium">Investment</Link>
                <Link href="/#testimonials" onClick={handleNavClick} className="text-navy hover:text-accent transition-colors font-medium">Success Stories</Link>
                <button onClick={handleVIPClick} className="bg-navy text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all text-center font-semibold">Get VIP Access</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}