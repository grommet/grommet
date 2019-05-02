import React, { Children, Component } from 'react';
import { compose } from 'recompose';

import { withForwardRef, withTheme } from '../hocs';
import { ThemeContext } from '../../contexts';
import { defaultProps } from '../../default-props';
import { backgroundIsDark } from '../../utils';

import { StyledBox, StyledBoxGap } from './StyledBox';

class Box extends Component {
  static contextType = ThemeContext;

  static displayName = 'Box';

  static defaultProps = {
    direction: 'column',
    margin: 'none',
    pad: 'none',
    responsive: true,
  };

  render() {
    const {
      a11yTitle,
      background,
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
      wrap, // munged to avoid styled-components putting it in the DOM,
      width, // munged to avoid styled-components putting it in the DOM
      height, // munged to avoid styled-components putting it in the DOM
      theme: propsTheme,
      ...rest
    } = this.props;
    const theme = this.context || propsTheme;
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
                // eslint-disable-next-line react/no-array-index-key
                key={`gap-${index}`}
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
        background={background}
        ref={forwardRef}
        directionProp={direction}
        elevationProp={elevation}
        fillProp={fill}
        overflowProp={overflow}
        wrapProp={wrap}
        widthProp={width}
        heightProp={height}
        responsive={responsive}
        {...rest}
      >
        {contents}
      </StyledBox>
    );

    // When a Box changes the darkness, it sets darkChanged so that StyledBox
    // can know what the underlying darkness is when deciding which elevation
    // to show.
    if (background || theme.darkChanged) {
      let dark = backgroundIsDark(background, theme);
      const darkChanged = dark !== undefined && dark !== theme.dark;
      if (darkChanged || theme.darkChanged) {
        dark = dark === undefined ? theme.dark : dark;
        content = (
          <ThemeContext.Provider value={{ ...theme, dark, darkChanged }}>
            {content}
          </ThemeContext.Provider>
        );
      }
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
