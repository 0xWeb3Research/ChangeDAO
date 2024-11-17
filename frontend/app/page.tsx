'use client'

import Head from 'next/head';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Footer } from '@/components/Footer';
import { useState } from 'react';

export default function Home() {
  const [petitionCount, setPetitionCount] = useState<number>(54219866);
  
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>ChangeDAO - Decentralized Activism Platform</title>
        <meta name="description" content="Make social impact through decentralized activism" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />
      <Hero petitionCount={petitionCount} />
      <Footer />
    </div>
  );
}