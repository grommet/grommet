import React, { useEffect, useState } from 'react';
import { ResponsiveContainerContext, ResponsiveContext } from '../../contexts';
import { deviceResponsive, getBreakpoint } from '../../utils/responsive';

// The value of ResponsiveContainerContext
// when we're within a responsive container
const responsiveContainerValue = true;

export const ResponsiveContainerProvider = ({ container, theme, children }) => {
  const [value, setValue] = useState(
    () =>
      deviceResponsive(navigator.userAgent, theme) ||
      theme?.global?.deviceBreakpoints.tablet,
  );

  useEffect(() => {
    if (!container) return undefined;

    // Track what breakpoint width of the container is at
    // and update the ResponsiveContext value accordingly.
    let resizeObserver;
    if (typeof window !== 'undefined' && window.ResizeObserver) {
      resizeObserver = new window.ResizeObserver((entries) => {
        window.requestAnimationFrame(() => {
          if (!Array.isArray(entries) || !entries.length) {
            return;
          }
          const size = entries[0]?.borderBoxSize?.[0]?.inlineSize;
          if (size) {
            setValue(getBreakpoint(size, theme));
          }
        });
      });
      resizeObserver.observe(container);
    }
    // Initial size for ResponsiveContext in responsive container mode.
    // Also is a fallback for server side rendering
    const containerWidth = container.getBoundingClientRect().width;
    setValue(getBreakpoint(containerWidth, theme));

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [container, theme]);

  return (
    <ResponsiveContainerContext.Provider value={responsiveContainerValue}>
      <ResponsiveContext.Provider value={value}>
        {children}
      </ResponsiveContext.Provider>
    </ResponsiveContainerContext.Provider>
  );
};
