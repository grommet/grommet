import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import { colorForName, colorIsDark } from '../../utils';

import { withTheme } from '../hocs';

import StyledBox, { StyledBoxGap } from './StyledBox';

import doc from './doc';

const styledComponents = {
  div: StyledBox,
}; // tag -> styled component

class Box extends Component {
  static contextTypes = {
    grommet: PropTypes.object,
  }

  static childContextTypes = {
    grommet: PropTypes.object,
  }

  static defaultProps = {
    direction: 'column',
    margin: 'none',
    pad: 'none',
    responsive: true,
    tag: 'div',
  };

  getChildContext() {
    const { grommet } = this.context;
    const { background, theme } = this.props;
    if (background) {
      let dark = false;
      if (typeof background === 'object') {
        dark = background.dark;
      } else {
        const color = colorForName(background, theme);
        if (color) {
          dark = colorIsDark(color);
        }
      }
      return {
        grommet: { ...grommet, dark },
      };
    }
    return {};
  }

  render() {
    const {
      a11yTitle,
      children,
      direction,
      gap,
      responsive,
      tag,
      theme,
      ...rest
    } = this.props;

    let StyledComponent = styledComponents[tag];
    if (!StyledComponent) {
      StyledComponent = StyledBox.withComponent(tag);
      styledComponents[tag] = StyledComponent;
    }

    let contents = children;
    if (gap) {
      contents = [];
      let firstIndex;
      Children.forEach(children, (child, index) => {
        if (child) {
          if (firstIndex === undefined) {
            firstIndex = index;
          } else {
            contents.push((
              <StyledBoxGap
                key={index}
                gap={gap}
                direction={direction}
                responsive={responsive}
                theme={theme}
              />
            ));
          }
        }
        contents.push(child);
      });
    }

    return (
      <StyledComponent
        aria-label={a11yTitle}
        direction={direction}
        responsive={responsive}
        theme={theme}
        {...rest}
      >
        {contents}
      </StyledComponent>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Box);
}

export default compose(
  withTheme,
)(Box);
