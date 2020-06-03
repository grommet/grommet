import React from 'react';
import 'jest-styled-components';
import { cleanup, render } from '@testing-library/react';

import { Collapsible, Box, Grommet } from '../..';

describe('Collapsible', () => {
  afterEach(cleanup);

  test('direction', () => {
    const { component } = render(
      <Grommet>
        <Collapsible direction="horizontal">
          <Box background="dark-1">Box Body</Box>
        </Collapsible>

        <Collapsible direction="vertical">
          <Box background="dark-1">Box Body</Box>
        </Collapsible>
      </Grommet>,
    );
    expect(component).toMatchSnapshot();
  });

  test('open', () => {
    const { component } = render(
      <Grommet>
        <Collapsible open="false">
          <Box background="dark-1">Box Body</Box>
        </Collapsible>

        <Collapsible open="true">
          <Box background="dark-1">Box Body</Box>
        </Collapsible>
      </Grommet>,
    );
    expect(component).toMatchSnapshot();
  });
});
