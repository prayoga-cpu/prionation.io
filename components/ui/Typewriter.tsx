"use client";

import { useState, useEffect } from "react";

export function Typewriter({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 2000,
}: {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}) {
  // Start with the first word fully rendered (this is also the SSR output) so the
  // hero headline is visually complete on first paint; the loop then pauses and
  // begins deleting. Starting empty made the page keep changing (worse Speed
  // Index) and left the line blank before JS ran.
  const [text, setText] = useState(() => words[0] ?? "");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeedState, setTypingSpeedState] = useState(typingSpeed);

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1),
      );

      setTypingSpeedState(isDeleting ? deletingSpeed : typingSpeed);

      if (!isDeleting && text === fullText) {
        setTypingSpeedState(pauseTime);
        setIsDeleting(true);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeedState(typingSpeed);
      }
    };

    const timer = setTimeout(handleType, typingSpeedState);
    return () => clearTimeout(timer);
  }, [
    text,
    isDeleting,
    loopNum,
    typingSpeedState,
    words,
    typingSpeed,
    deletingSpeed,
    pauseTime,
  ]);

  const longestWord = words.reduce((a, b) => (a.length > b.length ? a : b), "");

  return (
    <span className="grid grid-cols-1 grid-rows-1 items-start whitespace-pre-wrap text-center justify-items-center">
      {/* Ghost text to preserve space */}
      <span className="invisible opacity-0 pointer-events-none row-start-1 col-start-1" aria-hidden="true">
        {longestWord}
        <span className="ml-2">|</span>
      </span>
      
      <span className="row-start-1 col-start-1">
        {text}
        <span className="font-sans ml-2 text-white font-extralight animate-pulse">
          |
        </span>
      </span>
    </span>
  );
}
