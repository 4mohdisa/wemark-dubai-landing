import { Metadata } from 'next';
import { Roboto, Merriweather } from 'next/font/google';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

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

export const metadata: Metadata = {
  title: 'Terms of Service - Wemark Real Estate Dubai | Legal Terms & Conditions',
  description: 'Read the terms of service for Wemark Real Estate Dubai property investment services. Legal terms, conditions, and user agreements for our real estate services.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfService() {
  return (
    <div className={`min-h-screen bg-white ${roboto.className}`}>
      <Navigation />
      
      {/* Header Section */}
      <section className="pt-32 pb-16 bg-light-gray">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className={`text-4xl md:text-6xl font-bold text-navy mb-6 text-center ${merriweather.className} italic`}>
            Terms of Service
          </h1>
          <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto">
            Please read these terms carefully before using our real estate investment services.
          </p>
          <div className="text-center mt-8">
            <p className="text-gray-600">Last updated: January 12, 2025</p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none">
            
            <h2 className={`text-3xl font-bold text-navy mb-6 ${merriweather.className} italic`}>Acceptance of Terms</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              By accessing and using Wemark Real Estate services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>

            <h2 className={`text-3xl font-bold text-navy mb-6 ${merriweather.className} italic`}>Our Services</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Wemark Real Estate provides:
            </p>
            <ul className="text-gray-700 mb-8 space-y-2">
              <li>Real estate investment consultation services</li>
              <li>Property sales and marketing for Dubai properties</li>
              <li>Investment advisory services</li>
              <li>Property management and rental services</li>
              <li>Market research and analysis</li>
            </ul>

            <h2 className={`text-3xl font-bold text-navy mb-6 ${merriweather.className} italic`}>User Responsibilities</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              When using our services, you agree to:
            </p>
            <ul className="text-gray-700 mb-8 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Respect intellectual property rights</li>
              <li>Use our services for lawful purposes only</li>
              <li>Maintain the confidentiality of any account credentials</li>
            </ul>

            <h2 className={`text-3xl font-bold text-navy mb-6 ${merriweather.className} italic`}>Investment Disclaimers</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
              <p className="text-gray-700 mb-4 leading-relaxed">
                <strong>Important:</strong> All investment opportunities involve risk. Past performance does not guarantee future results.
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>Property values can fluctuate and may go down as well as up</li>
                <li>Rental yields are not guaranteed and may vary</li>
                <li>Currency exchange rates may affect international investments</li>
                <li>You should seek independent financial advice before investing</li>
              </ul>
            </div>

            <h2 className={`text-3xl font-bold text-navy mb-6 ${merriweather.className} italic`}>Limitation of Liability</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Wemark Real Estate shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Our liability is limited to the fees paid for our services.
            </p>

            <h2 className={`text-3xl font-bold text-navy mb-6 ${merriweather.className} italic`}>Professional Standards</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We are licensed and regulated by:
            </p>
            <ul className="text-gray-700 mb-8 space-y-2">
              <li>Real Estate Regulatory Authority (RERA) - Dubai</li>
              <li>Dubai Department of Economic Development (DED)</li>
              <li>Consumer Protection Act - Australia (for Australian operations)</li>
            </ul>

            <h2 className={`text-3xl font-bold text-navy mb-6 ${merriweather.className} italic`}>Intellectual Property</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              All content on our website and materials, including text, graphics, logos, and images, are owned by Wemark Real Estate or our licensors and are protected by copyright and trademark laws.
            </p>

            <h2 className={`text-3xl font-bold text-navy mb-6 ${merriweather.className} italic`}>Termination</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Either party may terminate the service relationship at any time with reasonable notice. Upon termination, these terms shall continue to apply to any ongoing obligations or disputes.
            </p>

            <h2 className={`text-3xl font-bold text-navy mb-6 ${merriweather.className} italic`}>Governing Law</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              These terms are governed by the laws of the United Arab Emirates for UAE-based transactions and Australian law for Australian-based transactions. Any disputes will be resolved in the appropriate jurisdiction.
            </p>

            <h2 className={`text-3xl font-bold text-navy mb-6 ${merriweather.className} italic`}>Contact Information</h2>
            <div className="bg-light-gray rounded-2xl p-8 mb-8">
              <p className="text-gray-700 mb-4 leading-relaxed">
                If you have questions about these terms of service, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> legal@wemark.ae</p>
                <p><strong>Phone:</strong> +61 426 786 664</p>
                <p><strong>Dubai Office:</strong> OF401 - 50, Bardab - Mankhool, Dubai, UAE</p>
                <p><strong>Australia Office:</strong> 3/392 Main N Rd, Blair Athol SA 5084, Australia</p>
              </div>
            </div>

            <h2 className={`text-3xl font-bold text-navy mb-6 ${merriweather.className} italic`}>Changes to Terms</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services constitutes acceptance of the modified terms.
            </p>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}