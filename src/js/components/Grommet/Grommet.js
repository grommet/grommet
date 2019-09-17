import React, { Component } from 'react';
// XXX TBD NOT SUPPORTED:
// import { createGlobalStyle } from 'styled-components';

import { colorIsDark } from 'grommet-styles';
import { ResponsiveContext, ThemeContext } from '../../contexts';
import { deepMerge, getBreakpoint, getDeviceBreakpoint } from '../../utils';
import { base as baseTheme } from '../../themes';
import { StyledGrommet } from './StyledGrommet';

/* ** XXX TBD NOT SUPPORTED {{{
const FullGlobalStyle = createGlobalStyle`
  body { margin: 0; }
`;
// ** XXX END TBD NOT SUPPORTED }}} */

class Grommet extends Component {
  static displayName = 'Grommet';

  static getDerivedStateFromProps(nextProps, prevState) {
    const { theme = {} } = nextProps;
    const { theme: stateTheme, themeProp } = prevState;

    const nextTheme = deepMerge(baseTheme, theme);
    if (!stateTheme || theme !== themeProp) {
      if (typeof theme.dark === 'undefined') {
        // calculate if background is dark or not
        // otherwise respect the property passed in the theme
        const { colors } = nextTheme.global;
        const color = colors.background;
        nextTheme.dark = color ? colorIsDark(color) : false;
      }
      return {
        theme: nextTheme,
        themeProp: theme,
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
    const { children, full, ...rest } = this.props;
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
          <StyledGrommet full={full} {...rest}>
            {children}
          </StyledGrommet>
          {/* XXX TBD NOT SUPPORTED */ null /* full && <FullGlobalStyle /> */}
        </ResponsiveContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

let GrommetDoc;
if (process.env.NODE_ENV !== 'production') {
  GrommetDoc = require('./doc').doc(Grommet); // eslint-disable-line global-require
}
const GrommetWrapper = GrommetDoc || Grommet;

export { GrommetWrapper as Grommet };
