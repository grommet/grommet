import React from 'react';
import { storiesOf } from '@storybook/react';
import { MnetUIBase, Heading } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';
import { deepMerge } from 'mnet-ui-base/utils';

const customlevel = deepMerge(mnet, {
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
    extend: props => `color: ${props.theme.global.colors.brand}`,
  },
});
const CustomHeading = () => (
  <MnetUIBase theme={customlevel}>
    <Heading level={5} size="small">
      Heading level 5 small
    </Heading>
    <Heading level={5} size="medium">
      Heading level 5 small
    </Heading>
    <Heading level={5} size="large">
      Heading level 5 small
    </Heading>
  </MnetUIBase>
);

storiesOf('Heading', module).add('Custom', () => <CustomHeading />);
