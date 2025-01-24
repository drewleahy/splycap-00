import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = [
  "SPACE/DEFENSE",
  "ENERGY",
  "FOOD",
  "HEALTH",
  "DATA",
  "MOVEMENT"
];

export const AnimatedWords = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <h2 className="text-[clamp(2.25rem,8vw,6rem)] font-bold tracking-tight text-white flex flex-col items-center gap-4">
            <div>FUTURE OF</div>
            <AnimatePresence mode="wait">
              {isVisible && (
                <motion.span
                  key={words[currentIndex]}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block min-w-[300px] border-b-4 border-white pb-2"
                >
                  {words[currentIndex]}
                </motion.span>
              )}
            </AnimatePresence>
          </h2>
        </div>
      </div>
    </section>
  );
};