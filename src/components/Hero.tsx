
import { Play, Heart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-slate-100 py-20 overflow-hidden">
      {/* Chess Clock SVG Overlay */}
      <div className="absolute top-0 right-10 opacity-10 w-32 h-32">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="20" y="30" width="60" height="40" rx="5" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="35" cy="50" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <circle cx="65" cy="50" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <line x1="35" y1="50" x2="35" y2="45" stroke="currentColor" strokeWidth="2"/>
          <line x1="35" y1="50" x2="38" y2="50" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="65" y1="50" x2="65" y2="42" stroke="currentColor" strokeWidth="2"/>
          <line x1="65" y1="50" x2="70" y2="50" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="45" y="20" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1" fill="none"/>
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
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
              Play. Win.
              <span className="text-green-700"> Do </span>
              <span className="text-amber-600">Good.</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Nightly USCF-Rated Blitz Tournaments with Cash Prizes supporting hospitals, 
              libraries, and youth programs worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg transition-transform hover:-translate-y-1 shadow-lg"
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
              {/* King */}
              <div className="absolute top-20 left-16 text-6xl text-green-600 animate-bounce opacity-80">
                ♔
              </div>
              
              {/* Queen */}
              <div className="absolute top-32 right-20 text-5xl text-amber-600 animate-pulse opacity-90" style={{animationDelay: '0.5s'}}>
                ♕
              </div>
              
              {/* Rook */}
              <div className="absolute bottom-40 left-8 text-4xl text-green-700 animate-bounce opacity-70" style={{animationDelay: '1s'}}>
                ♖
              </div>
              
              {/* Bishop */}
              <div className="absolute top-16 right-8 text-5xl text-amber-500 animate-pulse opacity-85" style={{animationDelay: '1.5s'}}>
                ♗
              </div>
              
              {/* Knight */}
              <div className="absolute bottom-20 right-16 text-6xl text-green-800 animate-bounce opacity-75" style={{animationDelay: '2s'}}>
                ♘
              </div>
              
              {/* Pawn */}
              <div className="absolute top-40 left-32 text-4xl text-amber-700 animate-pulse opacity-80" style={{animationDelay: '2.5s'}}>
                ♙
              </div>
              
              {/* Additional floating pieces */}
              <div className="absolute bottom-32 left-24 text-3xl text-green-500 animate-bounce opacity-60" style={{animationDelay: '3s'}}>
                ♗
              </div>
              
              <div className="absolute top-8 left-40 text-4xl text-amber-800 animate-pulse opacity-70" style={{animationDelay: '3.5s'}}>
                ♜
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
