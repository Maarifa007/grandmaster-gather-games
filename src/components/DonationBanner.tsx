
import { Heart, Target, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DonationBanner = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-green-700 to-amber-600">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-3 text-4xl">💝</span>
                Make a Direct Impact
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Your donations directly support hospitals, libraries, and youth programs. 
                Every dollar makes a difference in communities worldwide.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-green-50 rounded-lg transition-transform hover:-translate-y-1">
                  <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="font-bold text-green-800">100%</div>
                  <div className="text-sm text-green-600">Direct Impact</div>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg transition-transform hover:-translate-y-1">
                  <Globe className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                  <div className="font-bold text-amber-800">25+</div>
                  <div className="text-sm text-amber-600">Countries Helped</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  size="lg" 
                  className="bg-green-700 hover:bg-green-800 text-white transition-transform hover:-translate-y-1"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Donate Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-green-200 text-green-700 hover:bg-green-50 transition-transform hover:-translate-y-1"
                >
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-100 to-green-50 p-6 rounded-xl transition-transform hover:-translate-y-1 hover:shadow-md">
                <h3 className="font-bold text-green-800 mb-2">🏥 Hospital Equipment</h3>
                <p className="text-green-700">Funding medical equipment for underserved communities</p>
              </div>
              <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-6 rounded-xl transition-transform hover:-translate-y-1 hover:shadow-md">
                <h3 className="font-bold text-blue-800 mb-2">📚 Library Programs</h3>
                <p className="text-blue-700">Supporting literacy and educational initiatives</p>
              </div>
              <div className="bg-gradient-to-r from-amber-100 to-amber-50 p-6 rounded-xl transition-transform hover:-translate-y-1 hover:shadow-md">
                <h3 className="font-bold text-amber-800 mb-2">🎯 Youth Development</h3>
                <p className="text-amber-700">Chess education and mentorship programs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationBanner;
