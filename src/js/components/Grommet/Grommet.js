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

  return (
    <ThemeContext.Provider value={theme}>
      <ResponsiveContext.Provider value={responsive}>
        <RootsContext.Provider value={[grommetRef.current]}>
          <ContainerTargetContext.Provider value={containerTarget}>
            <StyledGrommet full={full} {...rest} ref={grommetRef}>
              {children}
            </StyledGrommet>
            {full && <FullGlobalStyle />}
          </ContainerTargetContext.Provider>
        </RootsContext.Provider>
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
