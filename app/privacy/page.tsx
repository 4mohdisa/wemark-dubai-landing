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
  title: 'Privacy Policy - Wemark Real Estate Dubai | Data Protection & Privacy',
  description: 'Learn how Wemark Real Estate protects your personal information and privacy when using our Dubai property investment services. Complete privacy policy and data protection details.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicy() {
  return (
    <div className={`min-h-screen bg-white ${roboto.className}`}>
      <Navigation />
      
      {/* Header Section */}
      <section className="pt-32 pb-16 bg-light-gray">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className={`text-4xl md:text-6xl font-bold text-navy mb-6 text-center ${merriweather.className} italic`}>
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your personal information.
          </p>
          <div className="text-center mt-8">
            <p className="text-gray-600">Last updated: January 12, 2025</p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none">
            
            <h2 className={`text-3xl font-bold text-navy mb-6 ${merriweather.className} italic`}>Information We Collect</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              At Wemark Real Estate, we collect information you provide directly to us when you:
            </p>
            <ul className="text-gray-700 mb-8 space-y-2">
              <li>Fill out contact forms or request property information</li>
              <li>Schedule consultations or property viewings</li>
              <li>Subscribe to our newsletter or property alerts</li>
              <li>Contact us via phone, email, or live chat</li>
              <li>Use our website and digital services</li>
            </ul>

            <h2 className={`text-3xl font-bold text-navy mb-6 ${merriweather.className} italic`}>How We Use Your Information</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="text-gray-700 mb-8 space-y-2">
              <li>Provide you with property investment opportunities and consultation services</li>
              <li>Respond to your inquiries and requests</li>
              <li>Send you property updates, market insights, and investment opportunities</li>
              <li>Improve our services and website functionality</li>
              <li>Comply with legal and regulatory requirements</li>
            </ul>

            <h2 className={`text-3xl font-bold text-navy mb-6 ${merriweather.className} italic`}>Information Sharing</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may share your information with:
            </p>
            <ul className="text-gray-700 mb-8 space-y-2">
              <li>Trusted partners and developers when relevant to your property interests</li>
              <li>Service providers who assist in our business operations</li>
              <li>Legal authorities when required by law</li>
            </ul>

            <h2 className={`text-3xl font-bold text-navy mb-6 ${merriweather.className} italic`}>Data Security</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes SSL encryption, secure servers, and regular security audits.
            </p>

            <h2 className={`text-3xl font-bold text-navy mb-6 ${merriweather.className} italic`}>Your Rights</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              You have the right to:
            </p>
            <ul className="text-gray-700 mb-8 space-y-2">
              <li>Access and review your personal information</li>
              <li>Request corrections to inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>File a complaint with relevant authorities</li>
            </ul>

            <h2 className={`text-3xl font-bold text-navy mb-6 ${merriweather.className} italic`}>Cookies and Tracking</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Our website uses cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings.
            </p>

            <h2 className={`text-3xl font-bold text-navy mb-6 ${merriweather.className} italic`}>Contact Information</h2>
            <div className="bg-light-gray rounded-2xl p-8 mb-8">
              <p className="text-gray-700 mb-4 leading-relaxed">
                If you have questions about this privacy policy or how we handle your information, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> privacy@wemark.ae</p>
                <p><strong>Phone:</strong> +61 426 786 664</p>
                <p><strong>Address:</strong> OF401 - 50, Bardab - Mankhool, Dubai, UAE</p>
              </div>
            </div>

            <h2 className={`text-3xl font-bold text-navy mb-6 ${merriweather.className} italic`}>Policy Updates</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              We may update this privacy policy from time to time. We will notify you of any significant changes by posting the new policy on our website and updating the &quot;Last updated&quot; date.
            </p>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}