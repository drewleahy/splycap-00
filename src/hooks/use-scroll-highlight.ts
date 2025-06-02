
import { useState, useEffect, useRef } from 'react';

export const useScrollHighlight = () => {
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const elementRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    console.log('Setting up intersection observers for', elementRefs.current.length, 'elements');

    elementRefs.current.forEach((element, index) => {
      if (element) {
        console.log(`Setting up observer for element ${index}:`, element);
        
        const observer = new IntersectionObserver(
          ([entry]) => {
            console.log(`Element ${index} intersection:`, {
              isIntersecting: entry.isIntersecting,
              intersectionRatio: entry.intersectionRatio,
              boundingClientRect: entry.boundingClientRect,
              rootBounds: entry.rootBounds
            });
            
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
              console.log(`Highlighting element ${index}`);
              setHighlightedIndex(index);
              
              // Auto-remove highlight after animation
              setTimeout(() => {
                console.log(`Removing highlight from element ${index}`);
                setHighlightedIndex(null);
              }, 2000);
            }
          },
          {
            threshold: [0, 0.25, 0.5, 0.75, 1.0],
            rootMargin: '-10% 0px -10% 0px'
          }
        );

        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      console.log('Cleaning up intersection observers');
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const setElementRef = (index: number) => (el: HTMLElement | null) => {
    console.log(`Setting ref for element ${index}:`, el);
    elementRefs.current[index] = el;
  };

  return { highlightedIndex, setElementRef };
};
