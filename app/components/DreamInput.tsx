'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface DreamInputProps {
  onSubmit: (dream: string) => void;
  isLoading: boolean;
}

export default function DreamInput({ onSubmit, isLoading }: DreamInputProps) {
  const [dream, setDream] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dream.trim() && !isLoading) {
      onSubmit(dream);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="w-full relative mb-6 group">
        <textarea
          id="dream"
          value={dream}
          onChange={(e) => setDream(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={isLoading}
          rows={4}
          placeholder="I was flying over an ancient city..."
          className="w-full px-4 py-2 bg-transparent border-b border-black/20 focus:border-black resize-none focus:outline-none transition-all duration-500 font-serif text-center text-lg placeholder:text-gray-400 placeholder:italic placeholder:font-light"
        />
        
        {/* Animated underline/focus indicator could go here if desired, but sticking to minimal */}
      </div>
      
      <motion.button
        type="submit"
        disabled={!dream.trim() || isLoading}
        className="group relative overflow-hidden px-8 py-2 disabled:opacity-0 transition-all duration-500"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative z-10 font-sans text-xs tracking-[0.2em] uppercase border-b border-black pb-1 group-hover:border-transparent transition-colors duration-300">
          {isLoading ? 'Divining...' : 'Interpret'}
        </span>
        <div className="absolute bottom-0 left-0 w-full h-px bg-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </motion.button>
    </motion.form>
  );
}
