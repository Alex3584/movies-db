import { useState, useEffect, useRef, MutableRefObject } from "react";

type HookReturnType = [MutableRefObject<null>, IntersectionObserverEntry?];

interface Options {
  threshold?: number;
  root?: Element;
  rootMargin?: string;
}

export function useIntersectionObserver(options: Options = {}): HookReturnType {
  const { threshold = 1.0, root = null, rootMargin = "0px" } = options;
  const targetRef = useRef(null);

  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  function callbackFn(entries: IntersectionObserverEntry[]) {
    const [entry] = entries;
    setEntry(entry);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFn, { threshold, root, rootMargin });
    const currentRef = targetRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return function () {
      if (currentRef) {
        observer.disconnect();
      }
    };
  }, [threshold, root, rootMargin]);

  return [targetRef, entry];
}
