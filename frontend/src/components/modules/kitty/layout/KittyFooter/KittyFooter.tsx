import React from 'react';
import styles from './KittyFooter.module.css';

export const KittyFooter: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.signature}>
        Твій особистий простір, створений коханим ♥
      </p>
    </footer>
  );
};
