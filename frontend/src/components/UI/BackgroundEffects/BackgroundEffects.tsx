'use client';

import React, { useState, useEffect } from 'react';

import styles from './BackgroundEffects.module.css';

export type BgVariant = 'sparkles';

interface BackgroundEffectsProps {
  variant?: BgVariant;
}

interface SparkleParticle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const generateSparkles = (count: number = 25): SparkleParticle[] => {
  if (typeof window === 'undefined') return [];
  return Array.from({ length: count }).map((_, index) => {
    const duration = Math.random() * 10 + 8;
    const delay = -Math.random() * duration;

    return {
      id: index,
      left: Math.random() * 100,
      size: Math.floor(Math.random() * 8) + 4,
      duration,
      delay,
      opacity: Math.random() * 0.6 + 0.3,
    };
  });
};

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = () => {
  const [sparkles, setSparkles] = useState<SparkleParticle[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSparkles(generateSparkles(25));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container} aria-hidden="true">
      <div className={styles.sparklesWrapper}>
        {sparkles.map((s) => (
          <div
            key={s.id}
            className={styles.sparkleItem}
            style={{
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDuration: `${s.duration}s, 2s`,
              animationDelay: `${s.delay}s, 0s`,
              ['--sparkle-opacity' as string]: s.opacity,
            }}
          />
        ))}
      </div>
    </div>
  );
};

