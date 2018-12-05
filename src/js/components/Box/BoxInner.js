import React, { Children, Component } from 'react';

import { backgroundIsDark, removeKeys } from '../../utils';
import { ThemeContext } from '../../contexts';

import { StyledBoxGap } from './StyledBox';
import { boxProps } from './doc';

class BoxInner extends Component {
  static displayName = 'Box';
  static contextType = ThemeContext;

  state = {
    backgroundChanged: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { background } = nextProps;
    const { previousBackground, backgroundChanged } = prevState;
    if (previousBackground !== background) {
      return {
        previousBackground: background,
        backgroundChanged: true,
      };
    }
    if (backgroundChanged) {
      return {
        backgroundChanged: false,
      };
    }
    return null;
  }

  render() {
    const {
      a11yTitle,
      as,
      background,
      children,
      direction,
      forwardRef,
      gap,
      responsive,
      tag = 'div',
      theme: propTheme,
      ...rest
    } = this.props;
    const { backgroundChanged } = this.state;
    const theme = this.context || propTheme;

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
                direction={direction}
                responsive={responsive}
              />,
            );
          }
        }
        contents.push(child);
      });
    }

    if (backgroundChanged && background) {
      const dark = backgroundIsDark(background, theme);
      contents = (
        <ThemeContext.Provider value={{ ...theme, dark }}>
          {contents}
        </ThemeContext.Provider>
      );
    }

    const Component = tag;

    return (
      <Component
        aria-label={a11yTitle}
        ref={forwardRef}
        {...removeKeys(rest, boxProps)}
      >
        {contents}
      </Component>
    );
  }
}

const ForwardedBox = React.forwardRef((props, ref) => (
  <BoxInner forwardRef={ref} {...props} />
));

export { ForwardedBox as BoxInner };
