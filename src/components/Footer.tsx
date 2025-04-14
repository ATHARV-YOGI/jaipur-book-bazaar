
import { Link } from 'react-router-dom';
import { Phone, Mail, BookOpen } from 'lucide-react';
import { mockSiteContent } from '@/data/mockData';

const Footer = () => {
  const { about, contact } = mockSiteContent;

  return (
    <footer className="bg-bookBrown text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* About Section */}
          <div>
            <div className="flex items-center mb-4">
              <BookOpen className="w-6 h-6 mr-2" />
              <h3 className="text-xl font-playfair font-bold">About Us</h3>
            </div>
            <p className="mb-4">{about}</p>
            <Link to="/about" className="text-bookBeige hover:text-bookBeige-light underline">
              Learn more about us
            </Link>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4">Contact Us</h3>
            <p className="mb-4">{contact.message}</p>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-8">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Atharv Yogi</p>
                  <p>{contact.atharv.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p>{contact.atharv.email}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Yogesh Sharma</p>
                  <p>{contact.yogesh.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Vivek Sharma</p>
                  <p>{contact.vivek.phone}</p>
                </div>
              </div>
            </div>
            
            <Link to="/contact" className="block mt-4 text-bookBeige hover:text-bookBeige-light underline">
              Contact page
            </Link>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-bookBrown-light text-center">
          <p>&copy; {new Date().getFullYear()} Old Books Market. All rights reserved.</p>
          <p className="text-sm mt-2">Made with ❤️ for Jaipur students</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
