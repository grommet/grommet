import React from 'react';

import { StyledText } from './StyledText';

const Text = ({ color, tag, as, a11yTitle, ...rest }) => (
  <StyledText
    as={!as && tag ? tag : as}
    colorProp={color}
    aria-label={a11yTitle}
    {...rest}
  />
);

Text.defaultProps = {
  level: 1,
};

let TextDoc;
if (process.env.NODE_ENV !== 'production') {
  TextDoc = require('./doc').doc(Text); // eslint-disable-line global-require
}
const TextWrapper = TextDoc || Text;

export { TextWrapper as Text };
