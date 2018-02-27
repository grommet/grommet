import React from 'react';

import { Anchor } from '../Anchor';

const hiddenAnchor = {
  width: 0,
  height: 0,
  overflow: 'hidden',
  position: 'absolute',
};

const SkipLinkTarget = ({ label, ...rest }) => (
  <Anchor {...rest} tabIndex='-1' aria-hidden='true' style={hiddenAnchor}>
    {label}
  </Anchor>
);

export default SkipLinkTarget;
