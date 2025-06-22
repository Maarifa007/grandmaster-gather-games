
import Hero from '@/components/Hero';
import UpcomingTournaments from '@/components/UpcomingTournaments';
import FeaturesSection from '@/components/FeaturesSection';
import DonationBanner from '@/components/DonationBanner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBotV2 from '@/components/ChatBotV2';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <UpcomingTournaments />
      <FeaturesSection />
      <DonationBanner />
      <Footer />
      <ChatBotV2 />
    </div>
  );
};

export default Index;
