
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">♟</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Global Speed Chess</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#tournaments" className="text-gray-600 hover:text-green-700 font-medium">
                Tournaments
              </a>
              <Link to="/register" className="text-gray-600 hover:text-green-700 font-medium">
                Register
              </Link>
              <a href="#leaderboard" className="text-gray-600 hover:text-green-700 font-medium">
                Leaderboard
              </a>
              <a href="#donate" className="text-gray-600 hover:text-green-700 font-medium">
                Donate
              </a>
              <a href="#about" className="text-gray-600 hover:text-green-700 font-medium">
                About
              </a>
            </nav>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
              Sign In
            </Button>
            <Link to="/register">
              <Button className="bg-green-700 hover:bg-green-800 text-white">
                Register
              </Button>
            </Link>
          </div>
          
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white py-4">
            <nav className="flex flex-col space-y-4">
              <a href="#tournaments" className="text-gray-600 hover:text-green-700 font-medium">
                Tournaments
              </a>
              <Link to="/register" className="text-gray-600 hover:text-green-700 font-medium">
                Register
              </Link>
              <a href="#leaderboard" className="text-gray-600 hover:text-green-700 font-medium">
                Leaderboard
              </a>
              <a href="#donate" className="text-gray-600 hover:text-green-700 font-medium">
                Donate
              </a>
              <a href="#about" className="text-gray-600 hover:text-green-700 font-medium">
                About
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                  Sign In
                </Button>
                <Link to="/register">
                  <Button className="bg-green-700 hover:bg-green-800 text-white">
                    Register
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
