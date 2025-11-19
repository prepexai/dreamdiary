'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Star, Eye, Sparkles, Cloud, Sun } from 'lucide-react';

const ICONS = [
  { Icon: Star, weight: 2 },
  { Icon: Moon, weight: 1 },
  { Icon: Eye, weight: 1 },
  { Icon: Sparkles, weight: 2 },
  { Icon: Cloud, weight: 1 },
  { Icon: Sun, weight: 1 },
];

interface FloatingIcon {
  id: number;
  Icon: any;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  delay: number;
  duration: number;
}

export default function MysticalBackground() {
  const [icons, setIcons] = useState<FloatingIcon[]>([]);

  useEffect(() => {
    // Generate random positions for icons
    // We want them distributed but sparse
    const newIcons: FloatingIcon[] = [];
    const count = 15; // Number of floating elements

    for (let i = 0; i < count; i++) {
      const randomIcon = ICONS[Math.floor(Math.random() * ICONS.length)];
      newIcons.push({
        id: i,
        Icon: randomIcon.Icon,
        x: Math.random() * 100, // percent
        y: Math.random() * 100, // percent
        scale: 0.5 + Math.random() * 0.5,
        rotation: Math.random() * 360,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 20,
      });
    }
    setIcons(newIcons);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {icons.map((icon) => (
        <motion.div
          key={icon.id}
          className="absolute text-black/5" // Very subtle opacity
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
          }}
          initial={{ 
            opacity: 0, 
            scale: 0,
            rotate: icon.rotation 
          }}
          animate={{ 
            opacity: [0, 0.1, 0.05, 0.1, 0],
            scale: [icon.scale * 0.8, icon.scale * 1.2, icon.scale * 0.8],
            y: [0, -20, 0], // Float up and down slightly
            rotate: [icon.rotation, icon.rotation + 45, icon.rotation]
          }}
          transition={{
            duration: icon.duration,
            repeat: Infinity,
            delay: icon.delay,
            ease: "easeInOut"
          }}
        >
          <icon.Icon size={48} strokeWidth={1} />
        </motion.div>
      ))}
      
      {/* Add a vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0)_50%,rgba(0,0,0,0.05)_100%)]" />
    </div>
  );
}

