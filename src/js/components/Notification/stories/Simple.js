import React from 'react';

import { Grommet, Notification } from 'grommet';
import { grommet } from 'grommet/themes';

const SimpleNotification = () => (
  <Grommet theme={grommet}>
    <Notification>Hello</Notification>
  </Grommet>
);

export const Simple = () => <SimpleNotification />;

export default {
  title: 'Controls/Nav/Simple',
};
