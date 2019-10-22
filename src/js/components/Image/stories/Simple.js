import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Image } from 'grommet';
import { grommet } from 'grommet/themes';

const Simple = () => (
  <Grommet theme={grommet}>
    <Image src="//v2.grommet.io/assets/IMG_4245.jpg" />
  </Grommet>
);

storiesOf('Image', module).add('Simple', () => <Simple />);
