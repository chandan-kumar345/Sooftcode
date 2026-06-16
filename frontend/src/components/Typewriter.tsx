"use client";

import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export default function Typewriter({
  words,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
}: TypewriterProps) {
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullWord = words[currentWordIdx];

    if (isDeleting) {
      // Deleting text
      timer = setTimeout(() => {
        setCurrentText(prev => prev.slice(0, -1));
      }, deletingSpeed);
    } else {
      // Typing text
      timer = setTimeout(() => {
        setCurrentText(fullWord.slice(0, currentText.length + 1));
      }, typingSpeed);
    }

    // Handle switching states
    if (!isDeleting && currentText === fullWord) {
      // Pause at complete word, then start deleting
      timer = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && currentText === '') {
      // Word completely erased, switch to next word
      setIsDeleting(false);
      setCurrentWordIdx(prev => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIdx, words, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className="inline-block relative">
      <span className="bg-gradient-to-r from-primary to-[#2563EB] bg-clip-text text-transparent">
        {currentText}
      </span>
      <span className="ml-1 w-[3px] h-[0.9em] bg-primary animate-pulse inline-block align-middle" />
    </span>
  );
}
