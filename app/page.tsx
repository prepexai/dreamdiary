'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Capacitor } from '@capacitor/core';
import OvalLabel from './components/OvalLabel';
import DreamInput from './components/DreamInput';
import InterpretationDisplay from './components/InterpretationDisplay';
import LoadingAnimation from './components/LoadingAnimation';
import MysticalBackground from './components/MysticalBackground';

export default function Home() {
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInterpretDream = async (dream: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = Capacitor.isNativePlatform() 
        ? 'https://dreamdiary.co/api/interpret' 
        : '/api/interpret';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dream }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to interpret dream');
      }

      setInterpretation(data.interpretation);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setInterpretation(null);
    setError(null);
  };

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
      {/* Mystical Background */}
      <MysticalBackground />

      {/* Hero Section */}
      <div className="relative z-10 w-full max-w-6xl mx-auto text-center mb-8 md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl mb-6 tracking-tighter">
            Dream Diary
          </h1>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-32 h-0.5 bg-black mx-auto mb-8"
          />
          <p className="font-serif italic text-lg md:text-2xl text-gray-800 max-w-2xl mx-auto leading-relaxed tracking-wide">
            Unlock the esoteric wisdom of your subconscious.
          </p>
        </motion.div>
      </div>

      {/* Main Interaction Area */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <OvalLabel>
          <div className="w-full flex flex-col h-full justify-center">
            <div className="text-center mb-6">
              <h2 className="font-serif text-2xl md:text-3xl mb-2 tracking-wide">
                Somnium
              </h2>
              <p className="font-sans text-xs md:text-sm text-gray-500 uppercase tracking-[0.2em]">
                Tell us your dream
              </p>
            </div>
            
            <DreamInput onSubmit={handleInterpretDream} isLoading={isLoading} />

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-red-800 text-center font-serif text-sm italic"
              >
                {error}
              </motion.div>
            )}
          </div>
        </OvalLabel>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="relative z-10 mt-16 text-center"
      >
        <p className="font-sans text-[10px] md:text-xs text-gray-400 tracking-[0.3em] uppercase">
          Est. 2024 · Artificial Intuition
        </p>
      </motion.footer>

      {/* Loading Animation */}
      <AnimatePresence>
        {isLoading && <LoadingAnimation />}
      </AnimatePresence>

      {/* Interpretation Modal */}
      <AnimatePresence>
        {interpretation && (
          <InterpretationDisplay
            interpretation={interpretation}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
