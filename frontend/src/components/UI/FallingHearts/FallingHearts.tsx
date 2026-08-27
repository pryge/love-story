'use client';

import React, { useState, useEffect } from 'react';
import { Heart } from '@/components/UI';
import styles from './FallingHearts.module.css';

interface HeartProps {
  id: number;
  left: number;
  size: number;
  blur: number;
  opacity: number;
  duration: number;
  delay: number;
  swayDuration: number;
}

const generateHearts = (count: number): HeartProps[] => {
  if (typeof window === 'undefined') return [];
  return Array.from({ length: count }).map((_, index) => {
    const size = Math.floor(Math.random() * 20) + 14;
    const blurLevels = [0, 0, 0, 1.5, 3.5, 5];
    const blur = blurLevels[Math.floor(Math.random() * blurLevels.length)];
    const opacity = Math.random() * 0.55 + 0.25;
    const left = Math.random() * 100;
    const duration = Math.random() * 7 + 6;
    const delay = Math.random() * 8;
    const swayDuration = Math.random() * 3 + 2;

    return {
      id: index,
      left,
      size,
      blur,
      opacity,
      duration,
      delay,
      swayDuration,
    };
  });
};

export const FallingHearts: React.FC<{ count?: number }> = ({ count = 20 }) => {
  const [hearts, setHearts] = useState<HeartProps[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHearts(generateHearts(count));
    }, 0);
    return () => clearTimeout(timer);
  }, [count]);

  if (hearts.length === 0) return null;


  return (
    <div className={styles.container}>
      {hearts.map((h) => (
        <Heart
          key={h.id}
          className={styles.heart}
          fill="currentColor"
          style={{
            left: `${h.left}%`,
            width: `${h.size}px`,
            height: `${h.size}px`,
            filter: `blur(${h.blur}px)`,
            opacity: h.opacity,
            animationDuration: `${h.duration}s, ${h.swayDuration}s`,
            animationDelay: `${h.delay}s, 0s`,
          }}
        />
      ))}
    </div>
  );
};
