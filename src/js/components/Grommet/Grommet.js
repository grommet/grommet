import React, { Component } from 'react';
import MobileDetect from 'mobile-detect';

import { colorIsDark } from 'grommet-styles';

import { ResponsiveContext, ThemeContext } from '../../contexts';
import { deepMerge, getBreakpoint, getDeviceBreakpoint } from '../../utils';
import { base as baseTheme } from '../../themes';

import { withDocs } from '../hocs';

import { StyledGrommet } from './StyledGrommet';

const wrapWithHocs = withDocs('Grommet');

class GrommetImpl extends Component {
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

    if (userAgent) {
      const md = new MobileDetect(userAgent);
      if (md.phone()) {
        return getDeviceBreakpoint('phone', theme);
      }
      if (md.tablet()) {
        return getDeviceBreakpoint('tablet', theme);
      }
      return getDeviceBreakpoint('computer', theme);
    }
    return undefined;
  }

  render() {
    const { children, ...rest } = this.props;
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
          <StyledGrommet {...rest}>{children}</StyledGrommet>
        </ResponsiveContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

export const Grommet = wrapWithHocs(GrommetImpl);
