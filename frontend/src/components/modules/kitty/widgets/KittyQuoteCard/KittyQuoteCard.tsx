'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw } from '@/components/UI';
import styles from './KittyQuoteCard.module.css';
import { getRandomQuote, LOVE_QUOTES } from './kittyQuoteCard.constants';

export const KittyQuoteCard: React.FC = () => {
  const [quote, setQuote] = useState(() => LOVE_QUOTES[0]);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuote(getRandomQuote());
    }, 0);
    return () => clearTimeout(timer);
  }, []);


  const handleNextQuote = () => {
    setIsChanging(true);
    setTimeout(() => {
      setQuote(getRandomQuote(quote));
      setIsChanging(false);
    }, 200);
  };

  return (
    <div className={styles.quoteCard}>
      <div className={styles.quoteMark}>““</div>

      <div className={styles.quoteContent}>
        <p className={`${styles.quoteText} ${isChanging ? styles.changing : ''}`}>
          {quote}
        </p>
      </div>

      <div className={styles.cardFooter}>
        <span className={styles.authorTag}>— для моєї Каті</span>

        <button
          type="button"
          className={styles.actionBtn}
          onClick={handleNextQuote}
          title="Інша цитата"
        >
          <RefreshCw size={16} />
        </button>
      </div>
    </div>
  );
};

