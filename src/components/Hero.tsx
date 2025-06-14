
import { Play, Heart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-green-50 via-white to-amber-50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              <Zap className="h-4 w-4 mr-2" />
              USCF Rated Tournaments
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Master Chess,
              <span className="text-green-700"> Support </span>
              <span className="text-amber-600">Charity</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Join the Global Speed Chess Initiative and compete in high-stakes blitz tournaments 
              while supporting hospitals, libraries, and youth programs worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 text-lg">
                <Play className="h-5 w-5 mr-2" />
                Play Now
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-green-200 text-green-700 hover:bg-green-50 px-8 py-4 text-lg">
                <Heart className="h-5 w-5 mr-2" />
                Donate Today
              </Button>
            </div>
            
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
          
          <div className="relative">
            <div className="bg-gradient-to-br from-green-600 to-amber-600 rounded-2xl p-8 transform rotate-3 shadow-2xl">
              <div className="bg-white rounded-xl p-6 transform -rotate-6">
                <div className="grid grid-cols-8 gap-1">
                  {/* Chess board pattern */}
                  {Array.from({ length: 64 }, (_, i) => {
                    const row = Math.floor(i / 8);
                    const col = i % 8;
                    const isLight = (row + col) % 2 === 0;
                    return (
                      <div
                        key={i}
                        className={`w-6 h-6 ${
                          isLight ? 'bg-amber-100' : 'bg-green-200'
                        }`}
                      />
                    );
                  })}
                </div>
                <div className="mt-4 text-center">
                  <div className="text-green-800 font-bold">Live Tournament</div>
                  <div className="text-sm text-gray-600">3+2 Blitz • USCF Rated</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
