import { useEffect, useState } from 'react';

/**
 * A useState-like hook that transparently persists to localStorage and
 * keeps multiple tabs in sync via the `storage` event.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const readValue = (): T => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (err) {
      console.warn(`useLocalStorage: could not read "${key}"`, err);
      return initialValue;
    }
  };

  const [stored, setStored] = useState<T>(readValue);

  const setValue = (value: T | ((prev: T) => T)) => {
    setStored((prev) => {
      const next = value instanceof Function ? value(prev) : value;
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch (err) {
        console.warn(`useLocalStorage: could not write "${key}"`, err);
      }
      return next;
    });
  };

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setStored(JSON.parse(e.newValue) as T);
        } catch {
          /* ignore malformed values */
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key]);

  return [stored, setValue] as const;
}
