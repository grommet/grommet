import React, { Component } from 'react';
import { compose } from 'recompose';

import { withTheme } from '../hocs';

import { StyledText } from './StyledText';

const styledComponents = {
  span: StyledText,
}; // tag -> styled component

class Text extends Component {
  static defaultProps = {
    level: 1,
    tag: 'span',
  };

  render() {
    const {
      color, // munged to avoid styled-components putting it in the DOM
      tag,
      ...rest
    } = this.props;

    let StyledComponent = styledComponents[tag];
    if (!StyledComponent) {
      StyledComponent = StyledText.withComponent(tag);
      styledComponents[tag] = StyledComponent;
    }

    return (
      <StyledComponent colorValue={color} {...rest} />
    );
  }
}

let TextDoc;
if (process.env.NODE_ENV !== 'production') {
  TextDoc = require('./doc').doc(Text); // eslint-disable-line global-require
}
const TextWrapper = compose(
  withTheme,
)(TextDoc || Text);

export { TextWrapper as Text };
