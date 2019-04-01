import * as React from 'react';
import DropButton from '../DropButton';

export default (
  <DropButton
    uxpId="dropButton0"
    label="Fancy Selector"
    dropAlign={{ top: 'bottom', right: 'right' }}
    dropContent={<Box pad="large" background="light-2" uxpId="0" />}
    fill
  />
);
