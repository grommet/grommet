import React, { Children, Component } from 'react';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';

import { ThemeContext as IconThemeContext } from 'grommet-icons/contexts';

import { ThemeContext } from '../../contexts';
import { backgroundIsDark } from '../../utils';
import { defaultProps } from '../../default-props';

import { withForwardRef } from '../hocs';

import { StyledBox, StyledBoxGap } from './StyledBox';

class Box extends Component {
  static defaultProps = {
    direction: 'column',
    margin: 'none',
    pad: 'none',
    responsive: true,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // Since Box can change the background color for its contents,
    // we update the theme to indicate whether the current context is `dark`
    // and what icon theme to use.
    const { background, theme: propsTheme } = nextProps;
    const { theme: stateTheme, priorTheme } = prevState;

    let { dark } = propsTheme;
    if (background) {
      dark = backgroundIsDark(background, propsTheme);
    }

    if (dark === propsTheme.dark && stateTheme) {
      return { theme: undefined, priorTheme: undefined };
    }
    if (
      dark !== propsTheme.dark &&
      (!stateTheme || dark !== stateTheme.dark || propsTheme !== priorTheme)
    ) {
      return {
        theme: {
          ...propsTheme,
          dark,
          icon: dark ? propsTheme.iconThemes.dark : propsTheme.iconThemes.light,
        },
        priorTheme: propsTheme,
      };
    }
    return null;
  }

  state = {};

  render() {
    const {
      a11yTitle,
      children,
      direction,
      elevation, // munged to avoid styled-components putting it in the DOM
      fill, // munged to avoid styled-components putting it in the DOM
      forwardRef,
      gap,
      overflow, // munged to avoid styled-components putting it in the DOM
      responsive,
      tag,
      as,
      theme: propsTheme,
      wrap, // munged to avoid styled-components putting it in the DOM,
      width, // munged to avoid styled-components putting it in the DOM
      height, // munged to avoid styled-components putting it in the DOM
      ...rest
    } = this.props;
    const { theme: stateTheme, priorTheme } = this.state;

    let contents = children;
    if (gap) {
      contents = [];
      let firstIndex;
      Children.forEach(children, (child, index) => {
        if (child) {
          if (firstIndex === undefined) {
            firstIndex = index;
          } else {
            contents.push(
              <StyledBoxGap
                key={index}
                gap={gap}
                directionProp={direction}
                responsive={responsive}
              />,
            );
          }
        }
        contents.push(child);
      });
    }

    let content = (
      <StyledBox
        as={!as && tag ? tag : as}
        aria-label={a11yTitle}
        ref={forwardRef}
        directionProp={direction}
        elevationProp={elevation}
        fillProp={fill}
        overflowProp={overflow}
        wrapProp={wrap}
        widthProp={width}
        heightProp={height}
        responsive={responsive}
        priorTheme={priorTheme}
        {...rest}
      >
        {contents}
      </StyledBox>
    );

    if (stateTheme) {
      if (stateTheme.dark !== propsTheme.dark && stateTheme.icon) {
        content = (
          <IconThemeContext.Provider value={stateTheme.icon}>
            {content}
          </IconThemeContext.Provider>
        );
      }
      content = (
        <ThemeContext.Provider value={stateTheme}>
          {content}
        </ThemeContext.Provider>
      );
    }

    return content;
  }
}

Object.setPrototypeOf(Box.defaultProps, defaultProps);

let BoxDoc;
if (process.env.NODE_ENV !== 'production') {
  BoxDoc = require('./doc').doc(Box); // eslint-disable-line global-require
}
const BoxWrapper = compose(
  withTheme,
  withForwardRef,
)(BoxDoc || Box);

export { BoxWrapper as Box };
