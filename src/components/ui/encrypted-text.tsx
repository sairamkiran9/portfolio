import React, { useState, useEffect } from 'react';

interface EncryptedTextProps {
  text: string;
  encryptedClassName?: string;
  revealedClassName?: string;
  revealDelayMs?: number;
}

export function EncryptedText({
  text,
  encryptedClassName = "text-neutral-500",
  revealedClassName = "dark:text-white text-black",
  revealDelayMs = 50
}: EncryptedTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);

  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRevealing && currentIndex < text.length) {
      interval = setInterval(() => {
        setDisplayText(prev => {
          const revealed = text.slice(0, currentIndex + 1);
          const encrypted = Array.from({ length: text.length - currentIndex - 1 }, () => 
            chars[Math.floor(Math.random() * chars.length)]
          ).join('');
          return revealed + encrypted;
        });
        
        if (Math.random() > 0.7) {
          setCurrentIndex(prev => prev + 1);
        }
      }, revealDelayMs);
    } else if (!isRevealing) {
      interval = setInterval(() => {
        setDisplayText(Array.from({ length: text.length }, () => 
          chars[Math.floor(Math.random() * chars.length)]
        ).join(''));
      }, 100);
    } else {
      setDisplayText(text);
    }

    return () => clearInterval(interval);
  }, [text, currentIndex, isRevealing, revealDelayMs, chars]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealing(true);
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  return (
    <span className={currentIndex >= text.length ? revealedClassName : encryptedClassName}>
      {displayText}
    </span>
  );
}