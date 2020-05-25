import React from 'react';
import { storiesOf } from '@storybook/react';

import { Image } from 'mnet-ui-base';

const Simple = () => (
  <>
    <Image src="//v2.grommet.io/assets/IMG_4245.jpg" />
  </>
);

storiesOf('Image', module).add('Simple', () => <Simple />);
