import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  ResponsiveContainerContext,
  ResponsiveContext,
  ThemeContext,
} from '../../contexts';
import { StyledResponsiveContainer } from './StyledResponsiveContainer';
import { deviceResponsive, getBreakpoint } from '../../utils';

const responsiveContainerValue = true;

export const ResponsiveContainer = ({ children }) => {
  const theme = useContext(ThemeContext);
  const ref = useRef(undefined);
  const [stateResponsive, setResponsive] = useState();

  useEffect(() => {
    const element = ref?.current;

    if (!element) return undefined;

    let resizeObserver;
    if (typeof window !== 'undefined' && window.ResizeObserver) {
      resizeObserver = new window.ResizeObserver((entries) => {
        window.requestAnimationFrame(() => {
          if (!Array.isArray(entries) || !entries.length) {
            return;
          }
          const size = entries[0]?.borderBoxSize?.[0]?.inlineSize;
          if (size) {
            setResponsive(getBreakpoint(size, theme));
          }
        });
      });

      resizeObserver.observe(element);
    } else {
      // fallback for server side rendering
      const { width } = element.getBoundingClientRect();
      setResponsive(getBreakpoint(width, theme));
    }
    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [theme]);

  const responsive =
    stateResponsive ||
    deviceResponsive(navigator.userAgent, theme) ||
    theme?.global?.deviceBreakpoints.tablet;

  return (
    <ResponsiveContext.Provider value={responsive}>
      <ResponsiveContainerContext.Provider value={responsiveContainerValue}>
        <StyledResponsiveContainer ref={ref}>
          {children}
        </StyledResponsiveContainer>
      </ResponsiveContainerContext.Provider>
    </ResponsiveContext.Provider>
  );
};
