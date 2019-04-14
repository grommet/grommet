import React from 'react';
import { render } from 'react-dom';

import { Box, Grommet } from 'grommet';

import {
  Features,
  Footer,
  InstaXtreme,
  NavHeader,
  Section,
  Sign,
  Slider,
  Talents,
} from './components';

import { customTheme } from './theme';

export const App = () => (
  <Grommet theme={customTheme} full>
    <NavHeader />
    <Slider />
    <Box align="center" pad="large">
      <InstaXtreme size="xlarge" />
      <Sign />
      <Features />
    </Box>
    <Talents />
    <Section>
      <Footer />
    </Section>
  </Grommet>
);

render(<App />, document.getElementById('root'));
