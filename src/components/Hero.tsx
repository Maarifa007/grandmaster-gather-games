
import { Play, Heart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-slate-100 py-20 overflow-hidden">
      {/* Enhanced Chess Clock SVG Overlay */}
      <div className="absolute top-0 right-10 opacity-15 w-32 h-32">
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
          <rect x="22" y="32" width="60" height="40" rx="5" fill="rgba(0,0,0,0.1)"/>
          
          {/* Main clock body */}
          <rect x="20" y="30" width="60" height="40" rx="5" fill="url(#clockGradient)" stroke="#1F2937" strokeWidth="2"/>
          
          {/* Clock faces with bezels */}
          <circle cx="35" cy="50" r="10" fill="url(#faceGradient)" stroke="#374151" strokeWidth="1.5"/>
          <circle cx="65" cy="50" r="10" fill="url(#faceGradient)" stroke="#374151" strokeWidth="1.5"/>
          
          {/* Inner clock face details */}
          <circle cx="35" cy="50" r="8" fill="none" stroke="#6B7280" strokeWidth="0.5"/>
          <circle cx="65" cy="50" r="8" fill="none" stroke="#6B7280" strokeWidth="0.5"/>
          
          {/* Hour markers */}
          <circle cx="35" cy="45" r="0.5" fill="#374151"/>
          <circle cx="40" cy="50" r="0.5" fill="#374151"/>
          <circle cx="35" cy="55" r="0.5" fill="#374151"/>
          <circle cx="30" cy="50" r="0.5" fill="#374151"/>
          
          <circle cx="65" cy="45" r="0.5" fill="#374151"/>
          <circle cx="70" cy="50" r="0.5" fill="#374151"/>
          <circle cx="65" cy="55" r="0.5" fill="#374151"/>
          <circle cx="60" cy="50" r="0.5" fill="#374151"/>
          
          {/* Clock hands with shadows */}
          <line x1="35" y1="50" x2="35" y2="45" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="35" y1="50" x2="38" y2="50" stroke="#1F2937" strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="35" cy="50" r="1" fill="#1F2937"/>
          
          <line x1="65" y1="50" x2="65" y2="42" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="65" y1="50" x2="70" y2="50" stroke="#1F2937" strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="65" cy="50" r="1" fill="#1F2937"/>
          
          {/* Top button with 3D effect */}
          <ellipse cx="50" cy="22" rx="6" ry="3" fill="url(#clockGradient)" stroke="#1F2937" strokeWidth="1"/>
          <rect x="44" y="20" width="12" height="8" rx="2" fill="url(#clockGradient)" stroke="#1F2937" strokeWidth="1"/>
          
          {/* Side ridged edges for grip */}
          <line x1="18" y1="35" x2="18" y2="65" stroke="#1F2937" strokeWidth="1"/>
          <line x1="17" y1="37" x2="17" y2="63" stroke="#374151" strokeWidth="0.5"/>
          <line x1="82" y1="35" x2="82" y2="65" stroke="#1F2937" strokeWidth="1"/>
          <line x1="83" y1="37" x2="83" y2="63" stroke="#374151" strokeWidth="0.5"/>
          
          {/* Bottom base */}
          <rect x="22" y="68" width="56" height="4" rx="2" fill="#1F2937"/>
        </svg>
      </div>

      {/* Rook SVG Overlay */}
      <div className="absolute bottom-0 left-4 opacity-5 w-24 h-24">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="20" y="70" width="60" height="20" stroke="currentColor" strokeWidth="2" fill="none"/>
          <rect x="25" y="30" width="50" height="40" stroke="currentColor" strokeWidth="2" fill="none"/>
          <rect x="20" y="25" width="10" height="10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <rect x="35" y="25" width="10" height="10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <rect x="55" y="25" width="10" height="10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <rect x="70" y="25" width="10" height="10" stroke="currentColor" strokeWidth="1" fill="none"/>
        </svg>
      </div>

      <div className="container mx-auto px-4">
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
              <a 
                href="/register" 
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg text-lg font-medium transition-transform hover:-translate-y-1"
              >
                <span className="mr-2">♟</span>
                Register Now — $15 Entry
              </a>
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
          
          <div className="relative h-[500px] overflow-hidden">
            {/* Floating Chess Pieces */}
            <div className="absolute inset-0">
              {/* Row 1 - Top */}
              <div className="absolute top-12 left-16 text-6xl text-green-600 animate-bounce opacity-80">
                ♔
              </div>
              <div className="absolute top-16 right-8 text-5xl text-amber-500 animate-pulse opacity-85" style={{animationDelay: '1.5s'}}>
                ♗
              </div>
              <div className="absolute top-8 left-40 text-4xl text-amber-800 animate-pulse opacity-70" style={{animationDelay: '3.5s'}}>
                ♜
              </div>
              <div className="absolute top-20 right-32 text-5xl text-green-500 animate-bounce opacity-75" style={{animationDelay: '4s'}}>
                ♞
              </div>
              
              {/* Row 2 - Upper Middle */}
              <div className="absolute top-32 right-20 text-5xl text-amber-600 animate-pulse opacity-90" style={{animationDelay: '0.5s'}}>
                ♕
              </div>
              <div className="absolute top-40 left-32 text-4xl text-amber-700 animate-pulse opacity-80" style={{animationDelay: '2.5s'}}>
                ♙
              </div>
              <div className="absolute top-28 left-8 text-3xl text-green-400 animate-bounce opacity-65" style={{animationDelay: '4.5s'}}>
                ♟
              </div>
              <div className="absolute top-36 right-4 text-4xl text-amber-500 animate-pulse opacity-75" style={{animationDelay: '5s'}}>
                ♚
              </div>
              
              {/* Row 3 - Center */}
              <div className="absolute top-56 left-20 text-5xl text-green-700 animate-bounce opacity-80" style={{animationDelay: '1.8s'}}>
                ♛
              </div>
              <div className="absolute top-52 right-24 text-4xl text-amber-600 animate-pulse opacity-70" style={{animationDelay: '2.2s'}}>
                ♝
              </div>
              <div className="absolute top-60 left-48 text-3xl text-green-600 animate-bounce opacity-85" style={{animationDelay: '5.5s'}}>
                ♜
              </div>
              
              {/* Row 4 - Lower Middle */}
              <div className="absolute bottom-40 left-8 text-4xl text-green-700 animate-bounce opacity-70" style={{animationDelay: '1s'}}>
                ♖
              </div>
              <div className="absolute bottom-32 left-24 text-3xl text-green-500 animate-bounce opacity-60" style={{animationDelay: '3s'}}>
                ♗
              </div>
              <div className="absolute bottom-36 right-12 text-4xl text-amber-700 animate-pulse opacity-80" style={{animationDelay: '3.8s'}}>
                ♘
              </div>
              <div className="absolute bottom-44 right-40 text-3xl text-green-800 animate-bounce opacity-65" style={{animationDelay: '6s'}}>
                ♟
              </div>
              
              {/* Row 5 - Bottom */}
              <div className="absolute bottom-20 right-16 text-6xl text-green-800 animate-bounce opacity-75" style={{animationDelay: '2s'}}>
                ♘
              </div>
              <div className="absolute bottom-16 left-12 text-4xl text-amber-600 animate-pulse opacity-75" style={{animationDelay: '4.2s'}}>
                ♙
              </div>
              <div className="absolute bottom-12 left-36 text-3xl text-green-600 animate-bounce opacity-70" style={{animationDelay: '6.5s'}}>
                ♞
              </div>
              <div className="absolute bottom-8 right-28 text-4xl text-amber-800 animate-pulse opacity-85" style={{animationDelay: '7s'}}>
                ♚
              </div>
              
              {/* Additional scattered pieces for density */}
              <div className="absolute top-48 left-4 text-3xl text-green-400 animate-pulse opacity-60" style={{animationDelay: '7.5s'}}>
                ♟
              </div>
              <div className="absolute top-24 left-60 text-3xl text-amber-500 animate-bounce opacity-65" style={{animationDelay: '8s'}}>
                ♙
              </div>
              <div className="absolute bottom-28 left-52 text-3xl text-green-700 animate-pulse opacity-70" style={{animationDelay: '8.5s'}}>
                ♝
              </div>
            </div>
            
            {/* Background gradient circle for visual interest */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-100/30 to-amber-100/30 rounded-full transform scale-150 -translate-y-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
