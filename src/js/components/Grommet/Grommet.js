import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import { createGlobalStyle } from 'styled-components';

import {
  ContainerTargetContext,
  ResponsiveContext,
  ThemeContext,
} from '../../contexts';

import {
  deepMerge,
  backgroundIsDark,
  getBreakpoint,
  getDeviceBreakpoint,
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

const deviceResponsive = (userAgent, theme) => {
  // log('--deviceResponsive', userAgent, theme);
  /*
   * Regexes provided for mobile and tablet detection are meant to replace
   * a full-featured specific library due to contributing a considerable size
   * into the bundle.
   *
   * User agents found https://deviceatlas.com/blog/list-of-user-agent-strings
   */
  if (userAgent) {
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobile))/i.test(userAgent)) {
      return getDeviceBreakpoint('tablet', theme);
    }
    if (/Mobile|iPhone|Android/.test(userAgent)) {
      return getDeviceBreakpoint('phone', theme);
    }
    return getDeviceBreakpoint('computer', theme);
  }
  return undefined;
};

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
  const [roots, setRoots] = useState([]);

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

  useEffect(() => {
    if (grommetRef.current) setRoots([grommetRef.current]);
  }, [grommetRef]);

  return (
    <ThemeContext.Provider value={theme}>
      <ResponsiveContext.Provider value={responsive}>
        <RootsContext.Provider value={roots}>
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
