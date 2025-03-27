import { useState, useEffect, useRef, MutableRefObject } from "react";

type HookReturnType = [MutableRefObject<null>, IntersectionObserverEntry?];

interface Options {
  threshold?: number;
  root?: Element;
  rootMargin?: string;
  onIntersect?(): void;
}

export function useIntersectionObserver(options: Options = {}): HookReturnType {
  const { threshold = 1.0, root = null, rootMargin = "0px", onIntersect } = options;
  const targetRef = useRef(null);

  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          onIntersect?.();
        }

        setEntry(entry);
      },
      { threshold, root, rootMargin }
    );
    const currentRef = targetRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return function () {
      if (currentRef) {
        observer.disconnect();
      }
    };
  }, [onIntersect, threshold, root, rootMargin]);

  return [targetRef, entry];
}
