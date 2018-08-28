import React, { Component } from 'react';
import { compose } from 'recompose';

import { withTheme } from '../hocs';

import { StyledText } from './StyledText';
import { doc } from './doc';

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

const TextWrapper = compose(
  withTheme,
)(
  process.env.NODE_ENV !== 'production' ? doc(Text) : Text
);

export { TextWrapper as Text };
