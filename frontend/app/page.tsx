'use client'

import Head from 'next/head';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>ChangeDAO - Decentralized Activism Platform</title>
        <meta name="description" content="Make social impact through decentralized activism" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <Hero />
      <Footer />
    </div>
  );
}