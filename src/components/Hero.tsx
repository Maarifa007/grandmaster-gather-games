import { Play, Heart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-slate-100 py-20 overflow-hidden">
      {/* Multiple Floating Chess Pieces */}
      
      {/* Rook - Bottom Left */}
      <div className="absolute bottom-10 left-10 opacity-25 w-32 h-32 z-0">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="25" y="70" width="50" height="15" stroke="#374151" strokeWidth="2" fill="#D1D5DB"/>
          <rect x="30" y="35" width="40" height="35" stroke="#374151" strokeWidth="2" fill="#D1D5DB"/>
          <rect x="25" y="30" width="8" height="8" stroke="#374151" strokeWidth="1.5" fill="#D1D5DB"/>
          <rect x="36" y="30" width="8" height="8" stroke="#374151" strokeWidth="1.5" fill="#D1D5DB"/>
          <rect x="56" y="30" width="8" height="8" stroke="#374151" strokeWidth="1.5" fill="#D1D5DB"/>
          <rect x="67" y="30" width="8" height="8" stroke="#374151" strokeWidth="1.5" fill="#D1D5DB"/>
        </svg>
      </div>

      {/* Bishop - Top Right */}
      <div className="absolute top-16 right-16 opacity-20 w-28 h-28 z-0 rotate-12">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="30" y="75" width="40" height="12" stroke="#4B5563" strokeWidth="2" fill="#CBD5E1"/>
          <ellipse cx="50" cy="65" rx="18" ry="12" stroke="#4B5563" strokeWidth="2" fill="#CBD5E1"/>
          <ellipse cx="50" cy="45" rx="14" ry="20" stroke="#4B5563" strokeWidth="2" fill="#CBD5E1"/>
          <circle cx="50" cy="25" r="8" stroke="#4B5563" strokeWidth="2" fill="#CBD5E1"/>
          <line x1="50" y1="17" x2="50" y2="12" stroke="#4B5563" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="46" cy="15" r="1.5" fill="#4B5563"/>
          <circle cx="54" cy="15" r="1.5" fill="#4B5563"/>
        </svg>
      </div>

      {/* Knight - Top Left */}
      <div className="absolute top-20 left-20 opacity-18 w-24 h-24 z-0 -rotate-6">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="25" y="75" width="50" height="12" stroke="#6B7280" strokeWidth="2" fill="#E2E8F0"/>
          <path d="M30 75 Q35 65 40 55 Q45 45 50 40 Q55 35 60 40 Q65 45 70 50 Q65 60 60 70 Q55 75 50 75 Z" 
                stroke="#6B7280" strokeWidth="2" fill="#E2E8F0"/>
          <circle cx="52" cy="45" r="2" fill="#6B7280"/>
          <path d="M48 50 Q52 52 56 50" stroke="#6B7280" strokeWidth="1.5" fill="none"/>
        </svg>
      </div>

      {/* Pawn - Middle Right */}
      <div className="absolute top-32 right-32 opacity-15 w-20 h-20 z-0 rotate-45">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="35" y="75" width="30" height="10" stroke="#9CA3AF" strokeWidth="2" fill="#D1D5DB"/>
          <rect x="40" y="65" width="20" height="15" stroke="#9CA3AF" strokeWidth="2" fill="#D1D5DB"/>
          <circle cx="50" cy="45" r="12" stroke="#9CA3AF" strokeWidth="2" fill="#D1D5DB"/>
        </svg>
      </div>

      {/* Queen - Bottom Right */}
      <div className="absolute bottom-16 right-20 opacity-22 w-36 h-36 z-0 -rotate-12">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="25" y="75" width="50" height="12" stroke="#374151" strokeWidth="2" fill="#D1D5DB"/>
          <ellipse cx="50" cy="60" rx="20" ry="15" stroke="#374151" strokeWidth="2" fill="#D1D5DB"/>
          <circle cx="50" cy="35" r="10" stroke="#374151" strokeWidth="2" fill="#D1D5DB"/>
          <circle cx="35" cy="25" r="4" stroke="#374151" strokeWidth="1.5" fill="#D1D5DB"/>
          <circle cx="42" cy="20" r="5" stroke="#374151" strokeWidth="1.5" fill="#D1D5DB"/>
          <circle cx="50" cy="18" r="6" stroke="#374151" strokeWidth="1.5" fill="#D1D5DB"/>
          <circle cx="58" cy="20" r="5" stroke="#374151" strokeWidth="1.5" fill="#D1D5DB"/>
          <circle cx="65" cy="25" r="4" stroke="#374151" strokeWidth="1.5" fill="#D1D5DB"/>
        </svg>
      </div>

      {/* Additional Small Pawn - Center Top */}
      <div className="absolute top-8 right-1/3 opacity-12 w-16 h-16 z-0 rotate-90">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="35" y="75" width="30" height="10" stroke="#9CA3AF" strokeWidth="1.5" fill="#E5E7EB"/>
          <rect x="40" y="65" width="20" height="15" stroke="#9CA3AF" strokeWidth="1.5" fill="#E5E7EB"/>
          <circle cx="50" cy="45" r="12" stroke="#9CA3AF" strokeWidth="1.5" fill="#E5E7EB"/>
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
