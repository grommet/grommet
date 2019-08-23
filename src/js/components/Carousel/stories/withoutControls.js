import React from 'react';
import { storiesOf } from '@storybook/react';

import SimpleCarousel from './Simple';

const WithoutControls = () => {
  return <SimpleCarousel controls={false} play={1500} />;
};

storiesOf('Carousel', module).add('Without Controls', () => (
  <WithoutControls />
));
