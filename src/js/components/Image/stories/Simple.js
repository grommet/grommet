import React from 'react';

import { Grommet, Image } from 'grommet';
import { grommet } from 'grommet/themes';

export const Simple = () => (
  <Grommet theme={grommet}>
    <Image src="//v2.grommet.io/assets/IMG_4245.jpg" />
  </Grommet>
);

export default {
  title: 'Media/Image/Simple',
};
