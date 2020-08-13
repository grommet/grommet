import React, { forwardRef } from 'react';

import { Anchor } from '../Anchor';

export const SkipLink = forwardRef(({ id, label, ...rest }, ref) => (
  <Anchor href={`#${id}`} ref={ref} label={label} {...rest} />
));
