
import React from 'react';
import Header from '@/components/Header';
import PlayerInfoBlock from '@/components/dashboard/PlayerInfoBlock';
import GSCRChart from '@/components/dashboard/GSCRChart';
import TournamentsSection from '@/components/dashboard/TournamentsSection';
import FinancialSummary from '@/components/dashboard/FinancialSummary';
import NotificationsCenter from '@/components/dashboard/NotificationsCenter';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <PlayerInfoBlock />
          <GSCRChart />
          <TournamentsSection />
          <FinancialSummary />
          <NotificationsCenter />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
