import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import { cleanup } from '@testing-library/react';

import { Collapsible } from '..';
import { Box } from '../../Box';
import { Grommet } from '../../Grommet';

describe('Collapsible', () => {
  afterEach(cleanup);

  test('direction', () => {
    const component = renderer.create(
      <Grommet>
        <Collapsible direction="horizontal">
          <Box background="dark-1">Box Body</Box>
        </Collapsible>
        <Collapsible direction="vertical">
          <Box background="dark-1">Box Body</Box>
        </Collapsible>
      </Grommet>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('open', () => {
    const component = renderer.create(
      <Grommet>
        <Collapsible open={false}>
          <Box background="dark-1">Box Body</Box>
        </Collapsible>
        <Collapsible open>
          <Box background="dark-1">Box Body</Box>
        </Collapsible>
      </Grommet>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
