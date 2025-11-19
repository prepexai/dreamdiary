'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OvalLabel from './components/OvalLabel';
import DreamInput from './components/DreamInput';
import InterpretationDisplay from './components/InterpretationDisplay';
import LoadingAnimation from './components/LoadingAnimation';

export default function Home() {
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInterpretDream = async (dream: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/interpret', {
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
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      {/* Hero Section */}
      <div className="w-full max-w-6xl mx-auto text-center mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tight">
            Dream Diary
          </h1>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-24 h-px bg-black mx-auto mb-6"
          />
          <p className="font-sans text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Unlock the secrets of your subconscious. Share your dreams and discover their hidden meanings
            through the lens of ancient wisdom and modern insight.
          </p>
        </motion.div>
      </div>

      {/* Main Interaction Area */}
      <div className="w-full max-w-4xl mx-auto">
        <OvalLabel>
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl md:text-3xl mb-3">
              What did you dream?
            </h2>
            <p className="font-sans text-sm text-gray-600">
              Describe your dream in as much detail as you remember
            </p>
          </div>
          
          <DreamInput onSubmit={handleInterpretDream} isLoading={isLoading} />

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 border-2 border-red-600 bg-red-50 text-red-800 text-center font-sans text-sm"
            >
              {error}
            </motion.div>
          )}
        </OvalLabel>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-16 text-center"
      >
        <p className="font-sans text-xs text-gray-500 tracking-wider uppercase">
          Powered by AI · Inspired by the Subconscious
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
