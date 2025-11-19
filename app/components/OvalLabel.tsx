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
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
  } : {};

  return (
    <Component
      className={`relative ${className} flex items-center justify-center p-4`}
      {...animationProps}
    >
      {/* The Oval Container */}
      <div className="relative w-full max-w-2xl aspect-[4/3] md:aspect-[16/10] flex items-center justify-center">
        
        {/* Main thick border */}
        <div className="absolute inset-0 border-[3px] border-black rounded-[50%] shadow-sm" />
        
        {/* Inner thin border */}
        <div className="absolute inset-2 border border-black rounded-[50%]" />
        
        {/* Ornamental top/bottom markers */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
            <div className="w-2 h-2 bg-black rounded-full" />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white px-2">
            <div className="w-2 h-2 bg-black rounded-full" />
        </div>

        {/* Content Container - centered in the oval */}
        <div className="relative z-10 px-12 py-16 md:px-20 md:py-24 text-center w-full h-full flex flex-col items-center justify-center overflow-hidden rounded-[50%]">
            {/* Background texture inside the oval */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
            
            <div className="relative z-20 w-full max-w-md">
                {children}
            </div>
        </div>
      </div>
    </Component>
  );
}
