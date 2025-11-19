'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface OvalLabelProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

export default function OvalLabel({ children, className = '', animate = true }: OvalLabelProps) {
  const Component = animate ? motion.div : 'div';
  
  const animationProps = animate ? {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
  } : {};

  return (
    <Component
      className={`relative ${className}`}
      {...animationProps}
    >
      {/* Outer oval border */}
      <div className="relative border-2 border-black rounded-[50%] px-8 py-12 md:px-16 md:py-20 lg:px-24 lg:py-28">
        {/* Inner content */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Decorative corner elements - Diptyque style */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-black opacity-30" />
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-black opacity-30" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-black opacity-30" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-black opacity-30" />
      </div>
    </Component>
  );
}

