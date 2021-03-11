import React from 'react';

import { Grommet, Tip } from 'grommet';

export const Test = () => (
  <Grommet
    theme={{
      tip: {
        drop: {
          background: 'red',
          elevation: 'large',
          margin: '21px',
          round: 'medium',
        },
      },
    }}
  >
    <Tip plain content="tooltip">
      Example
    </Tip>
  </Grommet>
);

Test.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Controls/Tip/Test',
};
