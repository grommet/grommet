import React from 'react';
import 'jest-styled-components';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';
import { hpe } from 'grommet-theme-hpe';

import { Collapsible } from '..';
import { Grommet } from '../../Grommet';
import { Text } from '../../Text';

describe('Collapsible', () => {
  test('no accessibility violations', async () => {
    const { container } = render(
      <Grommet theme={hpe}>
        <Collapsible>
          <Text>Example</Text>
        </Collapsible>
      </Grommet>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('open', () => {
    const { container } = render(
      <Grommet theme={hpe}>
        <Collapsible open>
          <Text>Example</Text>
        </Collapsible>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('open outside grommet wrapper', () => {
    const { container } = render(
      <Collapsible open>
        <Text>Example</Text>
      </Collapsible>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('onClick open default', () => {
    const { container, rerender } = render(
      <Grommet theme={hpe}>
        <Collapsible open>
          <Text>Example</Text>
        </Collapsible>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    rerender(
      <Grommet theme={hpe}>
        <Collapsible open={false}>
          <Text>Example</Text>
        </Collapsible>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
