import React from 'react';
import { Heart } from '@/components/UI';
import styles from './loader.module.css';

export interface LoaderProps {
  variant?: 'romantic' | 'simple' | 'inline'
}

export const Loader: React.FC<LoaderProps> = ({ variant = 'romantic'}) => {
  if (variant === 'inline') {
    return <span className={styles.inlineSpinner}/>
  }

return (
    <div className={styles.container}>
      {variant === 'romantic' && (
        <div className={styles.heartsPair}>
          <Heart className={styles.blueHeart} fill="currentColor" size={28} />
          <Heart className={styles.pinkHeart} fill="currentColor" size={28} />
        </div>
      )}
      {variant === 'simple' && <div className={styles.momentum} />}
    </div>
  );
};
