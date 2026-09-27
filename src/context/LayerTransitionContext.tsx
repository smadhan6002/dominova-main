import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import LayerTransition from '../components/Common/LayerTransition';

interface LayerTransitionContextValue {
  triggerTransition: (label: string, action?: () => void) => void;
  isTransitioning: boolean;
}

const LayerTransitionContext = createContext<LayerTransitionContextValue | null>(null);

export const LayerTransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transitionActive, setTransitionActive] = useState(false);
  const [transitionLabel, setTransitionLabel] = useState('INITIALIZING SYSTEM LAYER');
  const isTransitioningRef = useRef(false);
  const actionTimerRef = useRef<number | null>(null);
  const finishTimerRef = useRef<number | null>(null);

  const triggerTransition = useCallback((label: string, action?: () => void) => {
    // Guard against duplicate triggers or overlapping animations
    if (isTransitioningRef.current) return;

    isTransitioningRef.current = true;
    setTransitionLabel(label);
    setTransitionActive(true);

    if (actionTimerRef.current) clearTimeout(actionTimerRef.current);
    if (finishTimerRef.current) clearTimeout(finishTimerRef.current);

    // Phase 1: At 420ms (screen is 100% occluded by cinematic emblem), execute layer/page state change
    actionTimerRef.current = window.setTimeout(() => {
      if (action) {
        action();
      }
    }, 420);

    // Phase 2: At 950ms (fade-out completes), unmount transition overlay and unlock
    finishTimerRef.current = window.setTimeout(() => {
      setTransitionActive(false);
      isTransitioningRef.current = false;
    }, 950);
  }, []);

  useEffect(() => {
    return () => {
      if (actionTimerRef.current) clearTimeout(actionTimerRef.current);
      if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
    };
  }, []);

  return (
    <LayerTransitionContext.Provider value={{ triggerTransition, isTransitioning: transitionActive }}>
      {children}
      <LayerTransition isActive={transitionActive} label={transitionLabel} />
    </LayerTransitionContext.Provider>
  );
};

export const useLayerTransition = () => {
  const context = useContext(LayerTransitionContext);
  if (!context) {
    throw new Error('useLayerTransition must be used within a LayerTransitionProvider');
  }
  return context;
};
