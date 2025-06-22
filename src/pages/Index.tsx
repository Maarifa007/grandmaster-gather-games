
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturesSection from '@/components/FeaturesSection';
import UpcomingTournaments from '@/components/UpcomingTournaments';
import DonationBanner from '@/components/DonationBanner';
import Footer from '@/components/Footer';
import ChatBotV2 from '@/components/ChatBotV2';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <FeaturesSection />
      <UpcomingTournaments />
      <DonationBanner />
      <Footer />
      <ChatBotV2 />
    </div>
  );
};

export default Index;
