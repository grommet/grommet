import React, { Component } from 'react';
import { ThemeContext as IconThemeContext } from 'grommet-icons/contexts';
import { compose } from 'recompose';

import { ResponsiveContext, ThemeContext } from '../../contexts';
import { base as baseTheme } from '../../themes/base';
import {
  colorIsDark, deepMerge, getBreakpoint, normalizeColor,
} from '../../utils';
import { withIconTheme } from '../hocs';

import { StyledGrommet } from './StyledGrommet';

// grommet-icons isn't aware of the grommet dark background context.
// Here, we reduce the grommet theme colors to the correct flat color
// namespace for grommet-icons.
const reduceIconTheme = (iconTheme, dark) => {
  const result = { ...iconTheme, colors: { ...iconTheme.colors } };
  Object.keys(result.colors).forEach((key) => {
    if (typeof result.colors[key] === 'object') {
      result.colors[key] = normalizeColor(
        result.colors[key][dark ? 'dark' : 'light'],
        { dark, global: { colors: result.colors } },
      );
    } else {
      result.colors[key] = normalizeColor(
        result.colors[key],
        { dark, global: { colors: result.colors } },
      );
    }
  });
  return result;
};

class Grommet extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { iconTheme, theme } = nextProps;
    const { theme: stateTheme, themeProp, iconThemeProp } = prevState;

    let nextTheme;
    if (theme && (theme !== themeProp || iconTheme !== iconThemeProp)) {
      // in case the supplied theme has global.colors but not icon.colors,
      // pre-merge the current base icon colors with the new theme colors.
      let iconColoredTheme = theme;
      if (!theme.icon || !theme.icon.colors) {
        iconColoredTheme = { ...theme };
        iconColoredTheme.icon = { ...(theme.icon || {}) };
        iconColoredTheme.icon.colors = deepMerge(
          baseTheme.icon.colors,
          (theme.global || {}).colors,
        );
      }
      nextTheme = deepMerge(baseTheme, iconColoredTheme);
    } else if (!theme && (themeProp || !stateTheme)) {
      nextTheme = baseTheme;
    }

    if (nextTheme) {
      const { colors } = (nextTheme.global || baseTheme.global);
      const color = colors.background;
      const dark = color ? colorIsDark(color) : false;
      const lightIconTheme = deepMerge(iconTheme, nextTheme.icon);
      const iconThemes = {
        dark: reduceIconTheme(deepMerge(lightIconTheme, {
          color: colors.text.dark,
        }), true),
        light: reduceIconTheme(lightIconTheme, false),
      };
      return {
        theme: {
          ...nextTheme,
          dark,
          icon: dark ? iconThemes.dark : iconThemes.light,
          iconThemes,
        },
        themeProp: theme,
        iconThemeProp: iconTheme,
      };
    }
    return null;
  }

  state = {}

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
  }

  render() {
    const { children, ...rest } = this.props;
    delete rest.theme;
    const { responsive, theme } = this.state;

    return (
      <ThemeContext.Provider value={theme}>
        <IconThemeContext.Provider value={theme.icon}>
          <ResponsiveContext.Provider value={responsive}>
            <StyledGrommet {...rest} theme={theme}>
              {children}
            </StyledGrommet>
          </ResponsiveContext.Provider>
        </IconThemeContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

let GrommetDoc;
if (process.env.NODE_ENV !== 'production') {
  GrommetDoc = require('./doc').doc(Grommet); // eslint-disable-line global-require
}
const GrommetWrapper = compose(
  withIconTheme,
)(GrommetDoc || Grommet);

export { GrommetWrapper as Grommet };
