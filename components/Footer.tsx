import { Merriweather } from 'next/font/google';
import Link from 'next/link';

const merriweather = Merriweather({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '700'],
  style: ['normal', 'italic'],
});

export default function Footer() {
  return (
    <>
      {/* Footer */}
      <footer className="bg-footer-bg text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 mb-12">
            {/* Logo & Description */}
            <div>
              <Link href="/" className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                  <span className={`text-navy font-bold text-xl ${merriweather.className}`}>W</span>
                </div>
                <div className="ml-3">
                  <h3 className={`text-xl font-bold tracking-wide ${merriweather.className} italic`} data-macaly="footer-logo-title">WEMARK</h3>
                  <p className="text-xs text-gray-400 font-medium tracking-widest">DUBAI REAL ESTATE</p>
                </div>
              </Link>
              <p className="text-gray-300 leading-relaxed" data-macaly="footer-description">
                Dubai's premier luxury real estate company specializing in high-return property investments across Dubai's most exclusive locations.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className={`text-xl font-bold mb-6 ${merriweather.className} italic`} data-macaly="footer-links-title">Investment Options</h3>
              <ul className="space-y-3">
                <li><Link href="/#services" className="text-gray-300 hover:text-accent transition-colors">Off-Plan Properties</Link></li>
                <li><Link href="/#services" className="text-gray-300 hover:text-accent transition-colors">Ready-to-Move Luxury</Link></li>
                <li><Link href="/#about" className="text-gray-300 hover:text-accent transition-colors">Prime Locations</Link></li>
                <li><Link href="/#testimonials" className="text-gray-300 hover:text-accent transition-colors">Success Stories</Link></li>
              </ul>
            </div>

            {/* Prime Areas */}
            <div>
              <h3 className={`text-xl font-bold mb-6 ${merriweather.className} italic`} data-macaly="footer-areas-title">Prime Investment Areas</h3>
              <ul className="space-y-3">
                <li><Link href="/#" className="text-gray-300 hover:text-accent transition-colors">Dubai Marina</Link></li>
                <li><Link href="/#" className="text-gray-300 hover:text-accent transition-colors">Downtown Dubai</Link></li>
                <li><Link href="/#" className="text-gray-300 hover:text-accent transition-colors">Palm Jumeirah</Link></li>
                <li><Link href="/#" className="text-gray-300 hover:text-accent transition-colors">Business Bay</Link></li>
                <li><Link href="/#" className="text-gray-300 hover:text-accent transition-colors">Dubai Hills Estate</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm" data-macaly="footer-copyright">
                © 2025 Wemark Real Estate. All rights reserved. Licensed Dubai Real Estate Company.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/privacy" className="text-gray-400 hover:text-accent transition-colors text-sm">Privacy Policy</Link>
                <Link href="/terms" className="text-gray-400 hover:text-accent transition-colors text-sm">Terms of Service</Link>
                <Link href="/#contact" className="text-gray-400 hover:text-accent transition-colors text-sm">RERA License</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-4 left-4 right-4 md:hidden z-50">
        <Link href="/#contact" className="block w-full bg-navy text-white px-6 py-4 rounded-xl font-semibold text-lg shadow-2xl backdrop-blur-sm border border-gray-700 hover:bg-gray-800 transition-colors text-center">
          🚀 Get VIP Property Access
        </Link>
      </div>
    </>
  );
}