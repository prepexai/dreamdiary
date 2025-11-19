'use client';

import { motion } from 'framer-motion';
import { Moon, Star, Sparkles } from 'lucide-react';

export default function LoadingAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/90 backdrop-blur-sm z-[100] flex items-center justify-center"
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Rotating Moon & Stars Circle */}
        <div className="relative w-32 h-32 mb-8">
          {/* Central pulsing moon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Moon size={48} className="text-black" strokeWidth={1} />
          </motion.div>

          {/* Orbiting Stars */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
              <Star size={16} className="text-black fill-black" />
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4">
              <Sparkles size={16} className="text-black" />
            </div>
            <div className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2">
              <Star size={12} className="text-black" />
            </div>
             <div className="absolute right-0 top-1/2 translate-x-4 -translate-y-1/2">
              <Star size={12} className="text-black" />
            </div>
          </motion.div>
          
          {/* Outer dashed ring */}
          <motion.div 
            className="absolute inset-[-20px] border border-dashed border-black/30 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <motion.div
          className="font-serif text-xl md:text-2xl tracking-widest uppercase"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Divining
        </motion.div>
        
        <motion.p
          className="mt-4 font-serif italic text-sm text-gray-500"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Consulting the stars...
        </motion.p>
      </div>
    </motion.div>
  );
}
