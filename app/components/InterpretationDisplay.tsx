'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface InterpretationDisplayProps {
  interpretation: string;
  onClose: () => void;
}

export default function InterpretationDisplay({ interpretation, onClose }: InterpretationDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as any }}
        className="bg-background border-2 border-black max-w-2xl w-full max-h-[80vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="p-8 md:p-12">
          <h2 className="font-serif text-3xl md:text-4xl mb-8 text-center tracking-wide">
            Your Dream Interpreted
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="font-sans text-base md:text-lg leading-relaxed whitespace-pre-wrap">
              {interpretation}
            </p>
          </div>

          {/* Decorative divider */}
          <div className="mt-8 flex justify-center">
            <div className="w-16 h-px bg-black" />
          </div>

          <button
            onClick={onClose}
            className="mt-8 w-full py-3 border-2 border-black font-serif text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-300"
          >
            Interpret Another Dream
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

