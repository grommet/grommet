import React, { useCallback, useContext, useEffect, useRef } from 'react';

export const AnalyticsContext = React.createContext(() => {});

export const useAnalytics = () => useContext(AnalyticsContext);

export const AnalyticsProvider = ({ onAnalytics, children }) => {
  const lastUrlRef = useRef();

  const sendAnalytics = useCallback(
    (data) => onAnalytics && onAnalytics(data),
    [onAnalytics],
  );

  useEffect(() => {
    let observer;
    if (onAnalytics) {
      observer = new window.MutationObserver(() => {
        const url = window?.location?.href;
        const previousUrl = lastUrlRef.current;
        if (url !== previousUrl) {
          lastUrlRef.current = url;
          sendAnalytics({ type: 'pageView', url, previousUrl });
        }
      });
      observer.observe(document, { subtree: true, childList: true });
    }

    return () => observer?.disconnect();
  }, [sendAnalytics, onAnalytics]);

  return (
    <AnalyticsContext.Provider value={sendAnalytics}>
      {children}
    </AnalyticsContext.Provider>
  );
};
