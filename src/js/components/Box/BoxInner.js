import React, { Children, Component } from 'react';

import { backgroundIsDark, removeKeys } from '../../utils';
import { ThemeContext } from '../../contexts';

import { BoxGap } from './BoxGap';
import { boxProps } from './doc';

class BoxInner extends Component {
  static contextType = ThemeContext;

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
    delete rest.focus;
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
              <BoxGap
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

    if (background) {
      const dark = backgroundIsDark(background, theme);
      contents = (
        <ThemeContext.Provider value={{ ...theme, dark }}>
          {contents}
        </ThemeContext.Provider>
      );
    }

    const BoxTag = tag;

    return (
      <BoxTag
        aria-label={a11yTitle}
        ref={forwardRef}
        {...removeKeys(rest, boxProps)}
      >
        {contents}
      </BoxTag>
    );
  }
}

const ForwardedBox = React.forwardRef((props, ref) => (
  <BoxInner forwardRef={ref} {...props} />
));

export { ForwardedBox as BoxInner };
