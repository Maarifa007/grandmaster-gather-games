
import { Shield, Globe, Heart, Zap, Trophy, Users } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "USCF Rated",
      description: "All tournaments are officially USCF rated, ensuring your games count towards your official rating."
    },
    {
      icon: Globe,
      title: "Multi-Platform",
      description: "Play on Chess.com or Lichess - choose your preferred platform for each tournament."
    },
    {
      icon: Heart,
      title: "Charity Focus",
      description: "Every tournament supports hospitals, libraries, and youth programs worldwide."
    },
    {
      icon: Zap,
      title: "Fast-Paced",
      description: "Blitz and rapid time controls keep the action exciting and tournaments moving quickly."
    },
    {
      icon: Trophy,
      title: "Prize Pools",
      description: "Competitive prize pools distributed to top performers in each tournament."
    },
    {
      icon: Users,
      title: "Global Community",
      description: "Connect with chess players from around the world in a competitive yet supportive environment."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Global Speed Chess?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience competitive chess while making a positive impact on communities worldwide.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-xl hover:bg-green-50 transition-colors duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <feature.icon className="h-8 w-8 text-green-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
