import { useState, useEffect } from 'react';

export default function usePerformanceOptimizer(ref) {
  const [shouldPause, setShouldPause] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    let isIntersecting = true;
    let isHidden = document.hidden;

    const updateState = () => {
      setShouldPause(!isIntersecting || isHidden);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        updateState();
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);

    const handleVisibilityChange = () => {
      isHidden = document.hidden;
      updateState();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [ref]);

  return shouldPause;
}