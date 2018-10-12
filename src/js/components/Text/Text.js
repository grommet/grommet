import React from 'react';
import { compose } from 'recompose';

import { withTheme } from '../hocs';

import { StyledText } from './StyledText';

const styledComponents = {
  span: StyledText,
}; // tag -> styled component

const Text = ({ color, tag, ...rest }) => {
  let StyledComponent = styledComponents[tag];
  if (!StyledComponent) {
    StyledComponent = StyledText.withComponent(tag);
    styledComponents[tag] = StyledComponent;
  }

  return (
    <StyledComponent colorValue={color} {...rest} />
  );
};

Text.defaultProps = {
  level: 1,
  tag: 'span',
};

let TextDoc;
if (process.env.NODE_ENV !== 'production') {
  TextDoc = require('./doc').doc(Text); // eslint-disable-line global-require
}
const TextWrapper = compose(
  withTheme,
)(TextDoc || Text);

export { TextWrapper as Text };
