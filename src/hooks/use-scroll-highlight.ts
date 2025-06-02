
import { useState, useEffect, useRef } from 'react';

export const useScrollHighlight = () => {
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const elementRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    elementRefs.current.forEach((element, index) => {
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setHighlightedIndex(index);
              // Auto-remove highlight after animation
              setTimeout(() => {
                setHighlightedIndex(null);
              }, 2000);
            }
          },
          {
            threshold: 0.7,
            rootMargin: '-20% 0px -20% 0px'
          }
        );

        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const setElementRef = (index: number) => (el: HTMLElement | null) => {
    elementRefs.current[index] = el;
  };

  return { highlightedIndex, setElementRef };
};
