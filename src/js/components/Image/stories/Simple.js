import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Image } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const Simple = () => (
  <MnetUIBase theme={mnet}>
    <Image src="//v2.grommet.io/assets/IMG_4245.jpg" />
  </MnetUIBase>
);

storiesOf('Image', module).add('Simple', () => <Simple />);
