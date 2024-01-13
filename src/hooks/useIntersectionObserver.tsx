import { useEffect, useRef } from 'react';

export default function useIntersectionObserver(callback: () => void) {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      },
      { threshold: 0.5 }, // Adjust the threshold as needed
    );

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [callback]);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && observer.current) {
      observer.current.observe(ref.current);
    }

    return () => {
      if (ref.current && observer.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.current.unobserve(ref.current);
      }
    };
  }, []);

  return ref;
}
