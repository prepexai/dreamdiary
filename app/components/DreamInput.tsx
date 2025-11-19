'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

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
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="relative">
        <label
          htmlFor="dream"
          className={`absolute left-4 transition-all duration-300 pointer-events-none font-serif ${
            isFocused || dream
              ? '-top-3 text-xs bg-background px-2'
              : 'top-4 text-base text-gray-500'
          }`}
        >
          Describe your dream
        </label>
        <textarea
          id="dream"
          value={dream}
          onChange={(e) => setDream(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={isLoading}
          rows={6}
          className="w-full px-4 py-4 border-2 border-black bg-transparent resize-none focus:outline-none focus:ring-0 transition-all duration-300 font-sans text-base disabled:opacity-50"
          placeholder=""
        />
      </div>
      
      <motion.button
        type="submit"
        disabled={!dream.trim() || isLoading}
        className="mt-6 w-full py-4 bg-black text-white font-serif text-lg tracking-wide uppercase disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:bg-gray-900"
        whileHover={{ scale: dream.trim() && !isLoading ? 1.02 : 1 }}
        whileTap={{ scale: dream.trim() && !isLoading ? 0.98 : 1 }}
      >
        {isLoading ? 'Interpreting...' : 'Interpret Dream'}
      </motion.button>
    </motion.form>
  );
}

