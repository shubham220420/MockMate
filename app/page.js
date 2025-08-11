"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Navbar from './dashboard/_components/Navbar';
import HeroSection from './dashboard/_components/HeroSection';
import Features from './dashboard/_components/Features';
import HowItWorks from './dashboard/_components/HowItWorks';
import Testimonials from './dashboard/_components/Testimonal';
import Footer from './dashboard/_components/Footer';
import CTA from './dashboard/_components/CTA';



export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen font-sans">
      <Navbar/>
      <HeroSection/>
      <Features/>
      <HowItWorks/>
      <Testimonials/>
      <CTA/>
      <Footer/>
       
    </div>
  );
}
