
import { Crown, Trophy, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-green-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Crown className="h-8 w-8 text-amber-500" />
            <div>
              <h1 className="text-xl font-bold text-green-800">Global Speed Chess</h1>
              <p className="text-xs text-green-600">Initiative</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-green-700 hover:text-green-800 font-medium transition-colors">
              Home
            </a>
            <a href="/tournaments" className="text-green-700 hover:text-green-800 font-medium transition-colors">
              Tournaments
            </a>
            <a href="/dashboard" className="text-green-700 hover:text-green-800 font-medium transition-colors">
              Dashboard
            </a>
            <a href="/donate" className="text-green-700 hover:text-green-800 font-medium transition-colors">
              Donate
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button className="bg-green-700 hover:bg-green-800 text-white">
              <Trophy className="h-4 w-4 mr-2" />
              Register
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-green-100 pt-4">
            <nav className="flex flex-col space-y-3">
              <a href="/" className="text-green-700 hover:text-green-800 font-medium">Home</a>
              <a href="/tournaments" className="text-green-700 hover:text-green-800 font-medium">Tournaments</a>
              <a href="/dashboard" className="text-green-700 hover:text-green-800 font-medium">Dashboard</a>
              <a href="/donate" className="text-green-700 hover:text-green-800 font-medium">Donate</a>
              <div className="flex flex-col space-y-2 pt-2">
                <Button variant="outline" className="border-green-200 text-green-700">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
                <Button className="bg-green-700 hover:bg-green-800 text-white">
                  <Trophy className="h-4 w-4 mr-2" />
                  Register
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
