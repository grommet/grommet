import React, { forwardRef } from 'react';

import { StyledText } from './StyledText';
import { Tip } from '../Tip';

const Text = forwardRef(
  (
    {
      color,
      tag,
      as,
      tip,
      // can't alphabetize a11yTitle before tip is defined
      a11yTitle = typeof tip === 'string' ? tip : undefined,
      ...rest
    },
    ref,
  ) => {
    const styledTextResult = (
      <StyledText
        as={!as && tag ? tag : as}
        colorProp={color}
        aria-label={a11yTitle}
        {...rest}
        ref={ref}
      />
    );

    if (tip) {
      if (typeof tip === 'string') {
        return <Tip content={tip}>{styledTextResult}</Tip>;
      }
      return <Tip {...tip}>{styledTextResult}</Tip>;
    }

    return styledTextResult;
  },
);

Text.displayName = 'Text';
Text.defaultProps = {
  level: 1,
};

let TextDoc;
if (process.env.NODE_ENV !== 'production') {
  TextDoc = require('./doc').doc(Text); // eslint-disable-line global-require
}
const TextWrapper = TextDoc || Text;

export { TextWrapper as Text };
