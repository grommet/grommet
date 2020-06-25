import React, { Component } from 'react';
import { createGlobalStyle } from 'styled-components';

import {
  ResponsiveContext,
  ThemeContext,
  ContainerTargetContext,
} from '../../contexts';

import {
  backgroundIsDark,
  deepMerge,
  getBreakpoint,
  getDeviceBreakpoint,
  normalizeColor,
} from '../../utils';
import { base as baseTheme } from '../../themes';
import { StyledGrommet } from './StyledGrommet';

const FullGlobalStyle = createGlobalStyle`
  body { margin: 0; }
`;

class Grommet extends Component {
  static displayName = 'Grommet';

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      background: backgroundProp,
      dir,
      theme = {},
      themeMode,
    } = nextProps;
    const { theme: stateTheme, themeProp, themeModeProp } = prevState;

    const nextTheme = deepMerge(baseTheme, theme);
    if (!stateTheme || theme !== themeProp || themeMode !== themeModeProp) {
      const {
        colors: { background: themeBackground },
      } = nextTheme.global;

      // get initial value for dark so we can normalize background color
      nextTheme.dark = (themeMode || theme.defaultMode) === 'dark';
      const color = normalizeColor(
        backgroundProp || themeBackground,
        nextTheme,
      );

      // After normalizing, we set nextTheme.dark once more.
      // It is necessary that we set it twice. We have to handle two cases:
      // 1. Caller passes in a color object or a color name that resolves an
      //    object. In this case, we want to set dark as line 38 shows. The
      //    second set, in line 46, is a no-op.
      // 2. Caller passes a specific color value or a color name that resolves
      //    to a specific color value. In this case, we want dark to be set
      //    based on that color, which line 46 will do.
      // The double set of nextTheme.dark allows us to handle both cases here
      // without having to duplicate color object + name + dark mode detection
      // code here that is already in normalizeColor and backgroundIsDark.
      nextTheme.dark = backgroundIsDark(color, nextTheme);
      nextTheme.baseBackground = backgroundProp || themeBackground;

      if (dir) {
        nextTheme.dir = dir;
      }
      return {
        theme: nextTheme,
        themeProp: theme,
        themeModeProp: themeMode,
      };
    }

    return null;
  }

  state = {};

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    const { theme, responsive } = this.state;

    const breakpoint = getBreakpoint(window.innerWidth, theme);

    if (breakpoint !== responsive) {
      this.setState({ responsive: breakpoint });
    }
  };

  deviceResponsive() {
    const { userAgent } = this.props;
    const { theme } = this.state;

    /*
     * Regexes provided for mobile and tablet detection are meant to replace
     * a full-featured specific library due to contributing a considerable size
     * into the bundle.
     *
     * User agents found https://deviceatlas.com/blog/list-of-user-agent-strings
     */
    if (userAgent) {
      if (
        /(tablet|ipad|playbook|silk)|(android(?!.*mobile))/i.test(userAgent)
      ) {
        return getDeviceBreakpoint('tablet', theme);
      }
      if (/Mobile|iPhone|Android/.test(userAgent)) {
        return getDeviceBreakpoint('phone', theme);
      }
      return getDeviceBreakpoint('computer', theme);
    }
    return undefined;
  }

  render() {
    const {
      children,
      full,
      containerTarget = typeof document === 'object'
        ? document.body
        : undefined,
      ...rest
    } = this.props;
    delete rest.theme;
    const { theme, responsive: stateResponsive } = this.state;

    // Value from state should be correct once we resize
    // On first render we try to guess otherwise set the default as a tablet
    const responsive =
      stateResponsive ||
      this.deviceResponsive() ||
      theme.global.deviceBreakpoints.tablet;

    return (
      <ThemeContext.Provider value={theme}>
        <ResponsiveContext.Provider value={responsive}>
          <ContainerTargetContext.Provider value={containerTarget}>
            <StyledGrommet full={full} {...rest}>
              {children}
            </StyledGrommet>
            {full && <FullGlobalStyle />}
          </ContainerTargetContext.Provider>
        </ResponsiveContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

let GrommetDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  GrommetDoc = require('./doc').doc(Grommet);
}
const GrommetWrapper = GrommetDoc || Grommet;

export { GrommetWrapper as Grommet };
