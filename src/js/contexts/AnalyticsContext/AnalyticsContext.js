import React, { useCallback, useContext, useEffect, useRef } from 'react';

export const AnalyticsContext = React.createContext(() => {});

export const useAnalytics = () => useContext(AnalyticsContext);

export const AnalyticsProvider = ({ onAnalytics, children }) => {
  const pathInfoRef = useRef({
    lastUrl: window.location.href,
    observer: undefined,
  });

  const sendAnalytics = useCallback(
    (data) => onAnalytics && onAnalytics(data),
    [onAnalytics],
  );

  useEffect(() => {
    let observer;
    if (onAnalytics) {
      observer = new window.MutationObserver(() => {
        const url = window.location.href;
        if (url !== pathInfoRef.current.lastUrl) {
          pathInfoRef.current.lastUrl = url;
          sendAnalytics({ type: 'pageView', data: url });
        }
      });
      observer.observe(document, { subtree: true, childList: true });
    }
    pathInfoRef.current.observer = observer;

    return () => observer?.disconnect();
  }, [sendAnalytics, onAnalytics]);

  return (
    <AnalyticsContext.Provider value={sendAnalytics}>
      {children}
    </AnalyticsContext.Provider>
  );
};
