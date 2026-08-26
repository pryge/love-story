'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './AnimateIn.module.css';

export type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'fade';

interface AnimateInProps {
  children: React.ReactNode;
  direction?: AnimationDirection;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

export const AnimateIn: React.FC<AnimateInProps> = ({
  children,
  direction = 'down',
  delay = 0,
  duration = 0.85,
  className = '',
  threshold = 0.1,
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
      return true;
    }
    return false;
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  const getDirectionClass = () => {
    switch (direction) {
      case 'up':
        return styles.fromUp;
      case 'down':
        return styles.fromDown;
      case 'left':
        return styles.fromLeft;
      case 'right':
        return styles.fromRight;
      case 'fade':
      default:
        return styles.fromFade;
    }
  };

  return (
    <div
      ref={ref}
      className={`${styles.animateBox} ${getDirectionClass()} ${
        isVisible ? styles.visible : ''
      } ${className}`}
      style={{
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
};
