'use client';

import { useState, useCallback } from 'react';

export type GiftFlowStep =
  | 'CONSOLE'
  | 'GATE'
  | 'TEASER'
  | 'LETTER'
  | 'REVEAL'
  | 'HEARTS_COUNTER'
  | 'FINAL';

const STEPS_ORDER: GiftFlowStep[] = [
  'CONSOLE',
  'GATE',
  'TEASER',
  'LETTER',
  'REVEAL',
  'HEARTS_COUNTER',
  'FINAL',
];

export function useGiftFlowMachine() {
  const [currentStep, setCurrentStep] = useState<GiftFlowStep>('CONSOLE');

  const next = useCallback(() => {
    setCurrentStep((prev) => {
      const idx = STEPS_ORDER.indexOf(prev);
      if (idx < STEPS_ORDER.length - 1) {
        return STEPS_ORDER[idx + 1];
      }
      return prev;
    });
  }, []);

  const goTo = useCallback((step: GiftFlowStep) => {
    setCurrentStep(step);
  }, []);

  return { currentStep, next, goTo };
}
