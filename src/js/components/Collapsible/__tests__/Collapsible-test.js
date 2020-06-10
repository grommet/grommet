import React from 'react';
import 'jest-styled-components';
import { cleanup, render } from '@testing-library/react';

import { Collapsible } from '..';
import { Box } from '../../Box';
import { Grommet } from '../../Grommet';
import { Text } from '../../Text';

describe('Collapsible', () => {
  afterEach(cleanup);

  test('open', () => {
    const { container } = render(
      <Grommet>
        <Collapsible open>
          <Box>Box Body</Box>
        </Collapsible>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('onClick open default', () => {
    let open = false;
    const { container, rerender } = render(
      <Grommet>
        <Collapsible open={open}>
          <Text>Example</Text>
        </Collapsible>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    open = !open;
    expect(open).toBe(true);
    rerender(
      <Grommet>
        <Collapsible open={open}>
          <Text>Example</Text>
        </Collapsible>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('direction vertical', () => {
    let open = false;
    const { container, rerender } = render(
      <Grommet>
        <Collapsible open={open} direction="vertical">
          <Box>
            <Text>Example</Text>
          </Box>
        </Collapsible>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    open = !open;
    expect(open).toBe(true);
    // Rerendering because props were updated. Want to render with new props
    rerender(
      <Grommet>
        <Collapsible open={open} direction="vertical">
          <Text>Example</Text>
        </Collapsible>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('direction horizontal', () => {
    let open = false;
    const { container, rerender } = render(
      <Grommet>
        <Collapsible open={open} direction="horizontal">
          <Text>Example</Text>
        </Collapsible>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    open = !open;
    expect(open).toBe(true);
    // Rerendering because props were updated. Want to render with new props
    rerender(
      <Grommet>
        <Collapsible open={open} direction="horizontal">
          <Text>Example</Text>
        </Collapsible>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
