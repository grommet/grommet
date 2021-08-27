import { useRef, useState, useEffect } from 'react';

export const useScrollbarDetector = (onScrollbarChanged, targetRef) => {
  const ref = targetRef && targetRef.current;
  const observer = useRef(null);
  const [isScrollbarVisible, setIsScrollbarVisible] = useState(null);

  const detectScroll = () => {
    const { clientHeight, scrollHeight } = document.documentElement;
    const scrollbarVisible = scrollHeight > clientHeight;
    setIsScrollbarVisible(scrollbarVisible);
  };

  useEffect(() => {
    const target = targetRef?.current;
    // if we are already observing old element
    if (ref) {
      observer?.current?.unobserve(ref);
    }
    observer.current = new window.ResizeObserver(detectScroll);
    if (targetRef?.current) {
      observer?.current.observe(targetRef.current);
    }

    return () => {
      if (target) {
        observer?.current?.unobserve(target);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  useEffect(() => {
    if (isScrollbarVisible !== null) {
      onScrollbarChanged();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScrollbarVisible]);
};
