import { Play, Heart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-slate-100 py-20 overflow-hidden">
      {/* Enhanced Chess Clock SVG Overlay - Fixed positioning */}
      <div className="absolute top-10 right-10 opacity-20 w-40 h-40 z-0">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Main clock body with gradient and shadow */}
          <defs>
            <linearGradient id="clockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#374151" />
              <stop offset="50%" stopColor="#4B5563" />
              <stop offset="100%" stopColor="#1F2937" />
            </linearGradient>
            <linearGradient id="faceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9FAFB" />
              <stop offset="100%" stopColor="#E5E7EB" />
            </linearGradient>
          </defs>
          
          {/* Clock shadow */}
          <rect x="22" y="32" width="56" height="36" rx="4" fill="rgba(0,0,0,0.1)"/>
          
          {/* Main clock body */}
          <rect x="20" y="30" width="56" height="36" rx="4" fill="url(#clockGradient)" stroke="#1F2937" strokeWidth="1.5"/>
          
          {/* Clock faces with bezels */}
          <circle cx="33" cy="48" r="8" fill="url(#faceGradient)" stroke="#374151" strokeWidth="1"/>
          <circle cx="63" cy="48" r="8" fill="url(#faceGradient)" stroke="#374151" strokeWidth="1"/>
          
          {/* Inner clock face details */}
          <circle cx="33" cy="48" r="6.5" fill="none" stroke="#6B7280" strokeWidth="0.3"/>
          <circle cx="63" cy="48" r="6.5" fill="none" stroke="#6B7280" strokeWidth="0.3"/>
          
          {/* Hour markers */}
          <circle cx="33" cy="43" r="0.4" fill="#374151"/>
          <circle cx="38" cy="48" r="0.4" fill="#374151"/>
          <circle cx="33" cy="53" r="0.4" fill="#374151"/>
          <circle cx="28" cy="48" r="0.4" fill="#374151"/>
          
          <circle cx="63" cy="43" r="0.4" fill="#374151"/>
          <circle cx="68" cy="48" r="0.4" fill="#374151"/>
          <circle cx="63" cy="53" r="0.4" fill="#374151"/>
          <circle cx="58" cy="48" r="0.4" fill="#374151"/>
          
          {/* Clock hands */}
          <line x1="33" y1="48" x2="33" y2="43" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="33" y1="48" x2="36" y2="48" stroke="#1F2937" strokeWidth="1" strokeLinecap="round"/>
          <circle cx="33" cy="48" r="0.5" fill="#1F2937"/>
          
          <line x1="63" y1="48" x2="63" y2="41" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="63" y1="48" x2="68" y2="48" stroke="#1F2937" strokeWidth="1" strokeLinecap="round"/>
          <circle cx="63" cy="48" r="0.5" fill="#1F2937"/>
          
          {/* Top button with 3D effect */}
          <ellipse cx="48" cy="22" rx="4" ry="2" fill="url(#clockGradient)" stroke="#1F2937" strokeWidth="0.8"/>
          <rect x="44" y="20" width="8" height="6" rx="1.5" fill="url(#clockGradient)" stroke="#1F2937" strokeWidth="0.8"/>
          
          {/* Side ridged edges for grip */}
          <line x1="18" y1="33" x2="18" y2="63" stroke="#1F2937" strokeWidth="0.8"/>
          <line x1="17" y1="35" x2="17" y2="61" stroke="#374151" strokeWidth="0.4"/>
          <line x1="78" y1="33" x2="78" y2="63" stroke="#1F2937" strokeWidth="0.8"/>
          <line x1="79" y1="35" x2="79" y2="61" stroke="#374151" strokeWidth="0.4"/>
          
          {/* Bottom base */}
          <rect x="22" y="64" width="52" height="3" rx="1.5" fill="#1F2937"/>
        </svg>
      </div>

      {/* Simplified Rook SVG Overlay - Better positioning */}
      <div className="absolute bottom-10 left-10 opacity-10 w-32 h-32 z-0">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="25" y="70" width="50" height="15" stroke="#374151" strokeWidth="1.5" fill="#F3F4F6"/>
          <rect x="30" y="35" width="40" height="35" stroke="#374151" strokeWidth="1.5" fill="#F3F4F6"/>
          <rect x="25" y="30" width="8" height="8" stroke="#374151" strokeWidth="1" fill="#F3F4F6"/>
          <rect x="36" y="30" width="8" height="8" stroke="#374151" strokeWidth="1" fill="#F3F4F6"/>
          <rect x="56" y="30" width="8" height="8" stroke="#374151" strokeWidth="1" fill="#F3F4F6"/>
          <rect x="67" y="30" width="8" height="8" stroke="#374151" strokeWidth="1" fill="#F3F4F6"/>
        </svg>
      </div>

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
            {/* GSCI Hero Image */}
            <img 
              src="/assets/gsci_hero.png" 
              alt="GSCI Tournament Chess Board" 
              className="w-full h-full object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
