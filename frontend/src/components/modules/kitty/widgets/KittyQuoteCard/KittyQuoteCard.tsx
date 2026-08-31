'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw } from '@/components/UI';
import styles from './KittyQuoteCard.module.css';
import { quotesService, Quote } from '@/services/quotes.service';

const FALLBACK_QUOTE = 'Ти — мій найулюбленіший простір 🌸';

export const KittyQuoteCard: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentQuoteText, setCurrentQuoteText] = useState(FALLBACK_QUOTE);
  const [isChanging, setIsChanging] = useState(false);

  const getRandomText = useCallback((list: Quote[], currentText?: string): string => {
    if (list.length === 0) return FALLBACK_QUOTE;
    const filtered = list.filter((q) => q.text !== currentText);
    if (filtered.length === 0) return list[0].text;
    const randomIndex = Math.floor(Math.random() * filtered.length);
    return filtered[randomIndex].text;
  }, []);

  useEffect(() => {
    let isMounted = true;
    quotesService.getQuotes().then((data) => {
      if (isMounted && data.length > 0) {
        setQuotes(data);
        setCurrentQuoteText(getRandomText(data));
      }
    });
    return () => {
      isMounted = false;
    };
  }, [getRandomText]);

  const handleNextQuote = () => {
    if (quotes.length === 0) return;
    setIsChanging(true);
    setTimeout(() => {
      setCurrentQuoteText(getRandomText(quotes, currentQuoteText));
      setIsChanging(false);
    }, 200);
  };

  return (
    <div className={styles.quoteCard}>
      <div className={styles.quoteMark}>““</div>

      <div className={styles.quoteContent}>
        <p className={`${styles.quoteText} ${isChanging ? styles.changing : ''}`}>
          {currentQuoteText}
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

