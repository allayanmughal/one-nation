import React, { Suspense } from 'react';
import Hero from './Hero';
import dynamic from 'next/dynamic';

const HomeViewBelowFold = dynamic(() => import('./HomeViewBelowFold'), { ssr: false });

export default function HomeView({ projects }) {
  return (
    <div className="relative overflow-hidden bg-light-bg dark:bg-dark-bg text-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* 1. Hero Banner — loads immediately */}
      <Hero />

      {/* 2-6. Below-fold sections — lazy loaded after hero is visible */}
      <Suspense fallback={null}>
        <HomeViewBelowFold projects={projects} />
      </Suspense>
    </div>
  );
}
