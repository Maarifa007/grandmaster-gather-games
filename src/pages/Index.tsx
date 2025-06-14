
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturesSection from '@/components/FeaturesSection';
import UpcomingTournaments from '@/components/UpcomingTournaments';
import DonationBanner from '@/components/DonationBanner';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <FeaturesSection />
      <UpcomingTournaments />
      <DonationBanner />
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
