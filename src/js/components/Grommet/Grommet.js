import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { createGlobalStyle } from 'styled-components';

import {
  ContainerTargetContext,
  ResponsiveContext,
  ThemeContext,
} from '../../contexts';

import {
  deepMerge,
  backgroundIsDark,
  deviceResponsive,
  getBreakpoint,
  normalizeColor,
  useForwardedRef,
} from '../../utils';
import { base as baseTheme } from '../../themes';
import { StyledGrommet } from './StyledGrommet';
import { RootsContext } from '../../contexts/RootsContext';
import { OptionsContext } from '../../contexts/OptionsContext';
import { format, MessageContext } from '../../contexts/MessageContext';
import defaultMessages from '../../languages/default.json';
import { GrommetPropTypes } from './propTypes';
import { AnalyticsProvider } from '../../contexts/AnalyticsContext';

const FullGlobalStyle = createGlobalStyle`
  body { margin: 0; }
`;

const defaultOptions = {};

const Grommet = forwardRef((props, ref) => {
  const {
    children,
    full,
    containerTarget = typeof document === 'object' ? document.body : undefined,
    theme: themeProp,
    options = defaultOptions,
    messages: messagesProp,
    onAnalytics,
    ...rest
  } = props;
  const { background, dir, themeMode, userAgent } = props;
  const [stateResponsive, setResponsive] = useState();

  const theme = useMemo(() => {
    const nextTheme = deepMerge(baseTheme, themeProp || {});

    // if user provides specific menu alignment, we don't want
    // the defaults to be included at all (can cause issues with controlMirror)
    // override merged value with themeProp value
    if (
      themeProp &&
      themeProp.menu &&
      themeProp.menu.drop &&
      themeProp.menu.drop.align
    ) {
      delete nextTheme.menu.drop.align;
      nextTheme.menu.drop.align = themeProp.menu.drop.align;
    }
    const {
      colors: { background: themeBackground },
    } = nextTheme.global;

    nextTheme.dark = (themeMode || nextTheme.defaultMode) === 'dark';

    if (
      themeMode === 'auto' &&
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      nextTheme.dark = true;
    }

    const color = normalizeColor(background || themeBackground, nextTheme);
    nextTheme.dark = backgroundIsDark(color, nextTheme);
    nextTheme.baseBackground = background || themeBackground;
    // This allows DataTable to intelligently set the background of a pinned
    // header or footer.
    nextTheme.background = nextTheme.baseBackground;

    if (dir) {
      nextTheme.dir = dir;
    }

    return nextTheme;
  }, [background, dir, themeMode, themeProp]);

  const messages = useMemo(() => {
    // combine the passed in messages, if any, with the default
    // messages and format function.
    const nextMessages = deepMerge(
      defaultMessages,
      messagesProp?.messages || {},
    );
    return {
      messages: nextMessages,
      format: (opts) => {
        const message = messagesProp?.format && messagesProp.format(opts);
        return typeof message !== 'undefined'
          ? message
          : format(opts, nextMessages);
      },
    };
  }, [messagesProp]);

  useEffect(() => {
    const onResize = () => {
      setResponsive(getBreakpoint(document.body.clientWidth, theme));
    };
    window.addEventListener('resize', onResize);
    onResize();
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [theme]);

  const responsive =
    stateResponsive ||
    deviceResponsive(userAgent, theme) ||
    theme.global.deviceBreakpoints.tablet;

  const grommetRef = useForwardedRef(ref);

  // track open FocusedContainers in a global array to manage
  // focus event listeners for trapFocus
  const roots = useRef([]);
  useEffect(() => {
    if (grommetRef.current) roots.current.push(grommetRef.current);
  }, [grommetRef]);
  const rootsContextValue = useMemo(() => ({ roots }), []);

  return (
    <ThemeContext.Provider value={theme}>
      <ResponsiveContext.Provider value={responsive}>
        <RootsContext.Provider value={rootsContextValue}>
          <ContainerTargetContext.Provider value={containerTarget}>
            <OptionsContext.Provider value={options}>
              <MessageContext.Provider value={messages}>
                <AnalyticsProvider onAnalytics={onAnalytics}>
                  <StyledGrommet full={full} {...rest} ref={grommetRef}>
                    {children}
                  </StyledGrommet>
                  {full && <FullGlobalStyle />}
                </AnalyticsProvider>
              </MessageContext.Provider>
            </OptionsContext.Provider>
          </ContainerTargetContext.Provider>
        </RootsContext.Provider>
      </ResponsiveContext.Provider>
    </ThemeContext.Provider>
  );
});

Grommet.displayName = 'Grommet';
Grommet.propTypes = GrommetPropTypes;

export { Grommet };
