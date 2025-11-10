
import { useState, useEffect } from 'react';

export const useTypingEffect = (text: string, speed: number = 50, onComplete?: () => void) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (text.length === 0) return;
    
    setDisplayedText('');
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(prev => prev + text.charAt(i));
      i++;
      if (i > text.length -1) {
        clearInterval(intervalId);
        if (onComplete) {
          onComplete();
        }
      }
    }, speed);

    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed]);

  return displayedText;
};
