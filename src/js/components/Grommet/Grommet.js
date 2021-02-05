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
} from '../../utils';
import { base as baseTheme } from '../../themes';
import { StyledGrommet } from './StyledGrommet';

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

const Grommet = forwardRef((props, ref) => {
  const {
    children,
    full,
    containerTarget = typeof document === 'object' ? document.body : undefined,
    theme: themeProp,
    ...rest
  } = props;

  const { background, dir, themeMode, userAgent } = props;

  const [stateResponsive, setResponsive] = useState();

  const theme = useMemo(() => {
    const nextTheme = deepMerge(baseTheme, themeProp || {});

    const {
      colors: { background: themeBackground },
    } = nextTheme.global;

    nextTheme.dark = (themeMode || nextTheme.defaultMode) === 'dark';
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

  useEffect(() => {
    const onResize = () => {
      setResponsive(getBreakpoint(window.innerWidth, theme));
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

  return (
    <ThemeContext.Provider value={theme}>
      <ResponsiveContext.Provider value={responsive}>
        <ContainerTargetContext.Provider value={containerTarget}>
          <StyledGrommet full={full} {...rest} ref={ref}>
            {children}
          </StyledGrommet>
          {full && <FullGlobalStyle />}
        </ContainerTargetContext.Provider>
      </ResponsiveContext.Provider>
    </ThemeContext.Provider>
  );
});

Grommet.displayName = 'Grommet';

let GrommetDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  GrommetDoc = require('./doc').doc(Grommet);
}
const GrommetWrapper = GrommetDoc || Grommet;

export { GrommetWrapper as Grommet };
