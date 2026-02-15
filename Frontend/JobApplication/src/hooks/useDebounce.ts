import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timer to update the value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // If the user types again before the delay finishes, 
    // this "cleanup" function runs and cancels the previous timer.
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}