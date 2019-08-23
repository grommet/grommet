import React from 'react';
import { storiesOf } from '@storybook/react';
import SimpleCarousel from './Simple';

const InitialChild = () => {
  return <SimpleCarousel initialChild={1} />;
};

storiesOf('Carousel', module).add('Initial Child', () => <InitialChild />);
