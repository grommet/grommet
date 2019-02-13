import React, { Children, Component } from 'react';
import { compose } from 'recompose';

import { withForwardRef, withDocs } from '../hocs';
import { ThemeContext } from '../../contexts';
import { defaultProps } from '../../default-props';
import { backgroundIsDark } from '../../utils';

import { StyledBox, StyledBoxGap } from './StyledBox';

const wrapWithHocs = compose(
  withForwardRef,
  withDocs('Box'),
);

class BoxImpl extends Component {
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

    if (background) {
      const dark = backgroundIsDark(background, theme);
      if (dark !== theme.dark) {
        content = (
          <ThemeContext.Provider value={{ ...theme, dark }}>
            {content}
          </ThemeContext.Provider>
        );
      }
    }

    return content;
  }
}

Object.setPrototypeOf(BoxImpl.defaultProps, defaultProps);

export const Box = wrapWithHocs(BoxImpl);
