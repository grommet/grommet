import React from 'react';
import { Grommet, Heading } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

const customlevel = deepMerge(grommet, {
  heading: {
    level: {
      5: {
        small: {
          size: '12px',
          height: '16px',
        },
        medium: {
          size: '14px',
          height: '18px',
        },
        large: {
          size: '16px',
          height: '20px',
        },
      },
    },
    extend: (props) => `color: ${props.theme.global.colors.brand}`,
  },
});
export const Custom = () => (
  <Grommet theme={customlevel}>
    <Heading level={5} size="small">
      Heading level 5 small
    </Heading>
    <Heading level={5} size="medium">
      Heading level 5 small
    </Heading>
    <Heading level={5} size="large">
      Heading level 5 small
    </Heading>
  </Grommet>
);

export default {
  title: 'Type/Heading/Custom Themed/Custom',
};
