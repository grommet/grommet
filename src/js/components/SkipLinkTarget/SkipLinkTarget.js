import React from 'react';
import styled from 'styled-components';

import { Link } from '../Link';

const HiddenAnchor = styled(Link)`
  width: 0;
  height: 0;
  overflow: hidden;
  position: absolute;
`;

export const SkipLinkTarget = ({ label, ...rest }) => (
  <HiddenAnchor {...rest} tabIndex="-1" aria-hidden="true">
    {label}
  </HiddenAnchor>
);
