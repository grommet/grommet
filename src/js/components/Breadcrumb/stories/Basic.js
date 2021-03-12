import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box } from 'mnet-ui-base';
import { Breadcrumb } from '../Breadcrumb';

const BasicBreadcrumb = ({ data }) => {
  return (
    <Box align="center" pad="large">
      <Breadcrumb data={data} onValueSelect={_ => console.log(_)} />
    </Box>
  );
};

storiesOf('Breadcrumb', module).add('Basic', () =>
  <BasicBreadcrumb data={['Value 1', 'Value 2', 'Value 3', 'Value 4']} />,
);
storiesOf('Breadcrumb', module).add('Object Data', () =>
  <BasicBreadcrumb data={[
    { label: 'Value 1', id: '1' },
    { label: 'Value 2', id: '2' },
    { label: 'Value 3', id: '3' },
    { label: 'Value 4', id: '4' },
  ]}
  />,
);
