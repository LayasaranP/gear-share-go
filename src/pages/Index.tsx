
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import EquipmentCategories from '@/components/EquipmentCategories';
import FeaturedListings from '@/components/FeaturedListings';
import HowItWorks from '@/components/HowItWorks';
import TrustIndicators from '@/components/TrustIndicators';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <EquipmentCategories />
      <FeaturedListings />
      <HowItWorks />
      <TrustIndicators />
      <Footer />
    </div>
  );
};

export default Index;
