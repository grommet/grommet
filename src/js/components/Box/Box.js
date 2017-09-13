import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import { colorForName, colorIsDark } from '../utils';
import StyledBox from './StyledBox';

import { withTheme } from '../hocs';

import doc from './doc';

const styledComponents = {
  div: StyledBox,
}; // tag -> styled component

class Box extends Component {
  static contextTypes = {
    grommet: PropTypes.object.isRequired,
  }
  static childContextTypes = {
    grommet: PropTypes.object,
  }

  static defaultProps = {
    direction: 'column',
    tag: 'div',
  };

  getChildContext() {
    const { grommet = {} } = this.context;
    const { background, theme } = this.props;
    let dark = false;
    if (background) {
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
    return undefined;
  }

  render() {
    const {
      tag,
      ...rest
    } = this.props;

    let StyledComponent = styledComponents[tag];
    if (!StyledComponent) {
      StyledComponent = StyledBox.withComponent(tag);
      styledComponents[tag] = StyledComponent;
    }

    return (
      <StyledComponent {...rest} />
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Box);
}

export default compose(
  withTheme,
)(Box);
