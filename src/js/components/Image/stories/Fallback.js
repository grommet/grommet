import React from 'react';

import { Grommet, Image } from 'grommet';
import { grommet } from 'grommet/themes';

export const Fallback = () => (
  <Grommet theme={grommet}>
    <Image
      fallback="//v2.grommet.io/assets/IMG_4245.jpg"
      src="//v2.grommet.io/assets/IMG_4245_not_exists.jpg"
    />
  </Grommet>
);

export default {
  title: 'Media/Image/Fallback',
};
