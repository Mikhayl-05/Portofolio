import { useState, useEffect } from 'react';

export function useTypewriter(text, stopAt = 0, speed = 95, initialDelay = 0) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    let del = false;
    let timer = null;
    let active = true;

    function tick() {
      if (!active) return;
      if (!del && i <= text.length) {
        setDisplayText(text.substring(0, i++));
        timer = setTimeout(tick, speed);
      } else if (del && i > stopAt) {
        setDisplayText(text.substring(0, i--));
        timer = setTimeout(tick, speed / 2);
      } else {
        del = !del;
        timer = setTimeout(tick, 700);
      }
    }

    const startTimer = setTimeout(() => {
      tick();
    }, initialDelay);

    return () => {
      active = false;
      clearTimeout(startTimer);
      if (timer) clearTimeout(timer);
    };
  }, [text, stopAt, speed, initialDelay]);

  return displayText;
}

