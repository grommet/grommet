import React from 'react';
import 'jest-styled-components';
import { cleanup, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { Collapsible } from '..';
import { Grommet } from '../../Grommet';
import { Text } from '../../Text';

describe('Collapsible', () => {
  let App;

  beforeEach(() => {
    App = ({ ...props }) => (
      <Grommet>
        <Collapsible {...props}>
          <Text>Example</Text>
        </Collapsible>
      </Grommet>
    );
  });
  afterEach(cleanup);

  test('no accessibility violations', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('open', () => {
    const { container } = render(<App open />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('onClick open default', () => {
    const { container, rerender } = render(<App open />);
    expect(container.firstChild).toMatchSnapshot();
    rerender(<App open={false} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
