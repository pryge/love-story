'use client';

import React, { useState, useEffect } from 'react';
import {
  getGreetingPartsByHour,
  RANDOM_MARGIN_NOTES,
  SECRET_EASTER_EGGS,
} from './kittyHeroGreeting.constants';
import { Heart, Sparkles, X } from '@/components/UI';
import styles from './KittyHeroGreeting.module.css';

export const KittyHeroGreeting: React.FC = () => {
  const [greeting] = useState(getGreetingPartsByHour);
  const [marginNote, setMarginNote] = useState<string>('');
  const [secretModal, setSecretModal] = useState<string | null>(null);

  useEffect(() => {
    const randomNote =
      RANDOM_MARGIN_NOTES[Math.floor(Math.random() * RANDOM_MARGIN_NOTES.length)];
    setMarginNote(randomNote);
  }, []);

  const handleOpenSecret = () => {
    const randomSecret =
      SECRET_EASTER_EGGS[Math.floor(Math.random() * SECRET_EASTER_EGGS.length)];
    setSecretModal(randomSecret);
  };

  return (
    <div className={styles.heroContainer}>
      <div className={styles.greetingCard}>
        <div className={styles.badgeRow}>
          <span className={styles.pillBadge} onClick={handleOpenSecret} title="Натисни для сюрпризу ✨">
            <Sparkles size={14} className={styles.badgeIcon} />
            Для найдорожчої у світі
            <Heart size={12} className={styles.heartPulse} />
          </span>

          {marginNote && (
            <span className={styles.marginNote}>
              ✏️ {marginNote}
            </span>
          )}
        </div>

        <h1 className={styles.title}>
          <span>{greeting.prefix}</span>{' '}
          <span className={styles.scriptAccent}>{greeting.accent}</span>
        </h1>

        {greeting.subtext && (
          <p className={styles.subtext}>{greeting.subtext}</p>
        )}
      </div>

      {secretModal && (
        <div className={styles.secretModalOverlay} onClick={() => setSecretModal(null)}>
          <div className={styles.secretModalBox} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setSecretModal(null)}
            >
              <X size={18} />
            </button>
            <div className={styles.secretIcon}>💖</div>
            <p className={styles.secretText}>{secretModal}</p>
            <span className={styles.secretSign}>— твій Олег ♥</span>
          </div>
        </div>
      )}
    </div>
  );
};
