import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Stack } from '../../Stack';
import { Box } from '../../Box';
import { Diagram } from '../';

test('Diagram renders', () => {
  const component = renderer.create(
    <Grommet>
      <Stack>
        <Box direction='row'>
          <Box id='1' pad='medium' />
          <Box id='2' pad='medium' />
        </Box>
        <Diagram connections={[{ fromId: '1', toId: '2' }]} />
      </Stack>
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
