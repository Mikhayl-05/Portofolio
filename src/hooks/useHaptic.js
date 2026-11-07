import { useCallback } from 'react';

export function useHaptic() {
  const triggerHaptic = useCallback((type = 'light') => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return;
    if (!('vibrate' in navigator)) return;

    try {
      switch (type) {
        case 'light':
          navigator.vibrate(12);
          break;
        case 'medium':
          navigator.vibrate(24);
          break;
        case 'heavy':
          navigator.vibrate(45);
          break;
        case 'success':
          navigator.vibrate([15, 30, 25]);
          break;
        case 'surprise':
          navigator.vibrate([20, 20, 20, 20, 40]);
          break;
        default:
          navigator.vibrate(12);
      }
    } catch {}
  }, []);

  return { triggerHaptic };
}

