/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProgressBar() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
      setProgress(0);
    };

    // Add event listeners for navigation
    window.addEventListener('beforeunload', handleStart);
    
    // Use a custom event system since Next.js 13+ doesn't expose router events directly
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && link.href && !link.href.startsWith('javascript:') && !link.href.startsWith('#')) {
        const currentOrigin = window.location.origin;
        if (link.href.startsWith(currentOrigin) || link.href.startsWith('/')) {
          handleStart();
        }
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('beforeunload', handleStart);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // Complete the loader when pathname changes (route change is complete)
  useEffect(() => {
    if (isLoading) {
      handleComplete();
    }
  }, [pathname]);

  const handleComplete = () => {
    setProgress(100);
    setTimeout(() => {
      setIsLoading(false);
      setProgress(0);
    }, 0);
  };

  // Simulate smooth progress over time when loading
  useEffect(() => {
    if (isLoading && progress < 90) {
      const timer = setTimeout(() => {
        setProgress(prev => {
          // More gradual and smooth progress
          const increment = Math.random() * 8 + 2; // 2-10% increments
          return Math.min(prev + increment, 90);
        });
      }, 10); // Faster updates for smoother animation
      return () => clearTimeout(timer);
    }
  }, [isLoading, progress]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-green-500"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          exit={{ width: "100%" }}
          transition={{ 
            duration: 0.3, 
            ease: "easeOut",
            type: "spring",
            stiffness: 100,
            damping: 20
          }}
        />
      )}
    </AnimatePresence>
  );
} 