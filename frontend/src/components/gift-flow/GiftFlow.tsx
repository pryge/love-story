'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGiftFlowMachine } from './useGiftFlowMachine';
import { ConsoleLoader } from '@/components/common/ConsoleLoader/ConsoleLoader';
import { GateStep } from './steps/GateStep/GateStep';
import { TeaserStep } from './steps/TeaserStep/TeaserStep';
import { LetterStep } from './steps/LetterStep/LetterStep';
import { RevealStep } from './steps/RevealStep/RevealStep';
import { HeartsCounterStep } from './steps/HeartsCounterStep/HeartsCounterStep';
import { FinalStep } from './steps/FinalStep/FinalStep';

const stepVariants = {
  initial: { opacity: 0, y: 30, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -30, scale: 0.98 },
};

const stepTransition = {
  duration: 0.7,
  ease: [0.76, 0, 0.24, 1] as const,
};

export const GiftFlow: React.FC = () => {
  const { currentStep, next } = useGiftFlowMachine();

  return (
    <div style={{ minHeight: '100dvh', position: 'relative' }}>
      <AnimatePresence mode="wait">
        {currentStep === 'CONSOLE' && (
          <ConsoleLoader key="console" onComplete={next} />
        )}

        {currentStep === 'GATE' && (
          <motion.div
            key="gate"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={stepTransition}
            style={{ minHeight: '100dvh' }}
          >
            <GateStep onNext={next} />
          </motion.div>
        )}

        {currentStep === 'TEASER' && (
          <motion.div
            key="teaser"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={stepTransition}
            style={{ minHeight: '100dvh' }}
          >
            <TeaserStep onNext={next} />
          </motion.div>
        )}

        {currentStep === 'LETTER' && (
          <motion.div
            key="letter"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={stepTransition}
            style={{ minHeight: '100dvh' }}
          >
            <LetterStep onNext={next} />
          </motion.div>
        )}

        {currentStep === 'REVEAL' && (
          <motion.div
            key="reveal"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={stepTransition}
            style={{ minHeight: '100dvh' }}
          >
            <RevealStep onNext={next} />
          </motion.div>
        )}

        {currentStep === 'HEARTS_COUNTER' && (
          <motion.div
            key="hearts"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={stepTransition}
            style={{ minHeight: '100dvh' }}
          >
            <HeartsCounterStep onNext={next} />
          </motion.div>
        )}

        {currentStep === 'FINAL' && (
          <motion.div
            key="final"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={stepTransition}
            style={{ minHeight: '100dvh' }}
          >
            <FinalStep />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
