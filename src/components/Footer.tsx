
import { Crown, Heart, Mail, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Crown className="h-6 w-6 text-amber-500" />
              <div>
                <div className="font-bold">Global Speed Chess</div>
                <div className="text-sm text-gray-400">Initiative</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Competitive chess tournaments supporting hospitals, libraries, and youth programs worldwide.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Tournaments</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Upcoming Events</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Past Results</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Rankings</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Rules & Format</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Community</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Player Dashboard</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Donation Impact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Connect</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Mail className="h-4 w-4" />
                <span>info@globalspeedchess.org</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Globe className="h-4 w-4" />
                <span>globalspeedchess.org</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Heart className="h-4 w-4" />
                <span>501(c)(3) Non-Profit</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Global Speed Chess Initiative. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
