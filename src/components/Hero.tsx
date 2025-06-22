
import { Play, Heart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-slate-100 py-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 z-10 relative">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              <Zap className="h-4 w-4 mr-2" />
              USCF Rated Tournaments
            </div>
            
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Daily Rated Blitz Tournaments — For Cash
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Win real cash prizes in officially rated USCF blitz events. Hosted online. Powered by purpose.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-medium transition-transform hover:-translate-y-1 shadow-lg"
              >
                <span className="mr-2">♟</span>
                Register Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-green-200 text-green-700 hover:bg-green-50 px-8 py-4 text-lg transition-transform hover:-translate-y-1"
              >
                <Heart className="h-5 w-5 mr-2" />
                Donate Today
              </Button>
            </div>
            
            <p className="text-sm text-gray-500">
              70% to prizes. 30% funds nonprofit chess outreach.
            </p>
            
            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">$50K+</div>
                <div className="text-sm text-gray-600">Raised for Charity</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">2,500+</div>
                <div className="text-sm text-gray-600">Players Worldwide</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">150+</div>
                <div className="text-sm text-gray-600">Tournaments Hosted</div>
              </div>
            </div>
          </div>
          
          <div className="relative h-[500px] overflow-hidden flex items-center justify-center">
            <img 
              src="/lovable-uploads/017e2bc5-dedd-42bc-a849-2239a28d9a19.png" 
              alt="Speed Chess - Chess clock with chess pieces" 
              className="w-[110%] h-full object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
