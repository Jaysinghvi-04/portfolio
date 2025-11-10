
import React from 'react';
import { useTypingEffect } from '../hooks/useTypingEffect';

interface TypingEffectProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, speed = 20, onComplete, className }) => {
  const displayedText = useTypingEffect(text, speed, onComplete);
  return <span className={className}>{displayedText}</span>;
};

export default TypingEffect;
