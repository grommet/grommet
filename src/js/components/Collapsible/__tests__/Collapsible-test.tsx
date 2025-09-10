import React from 'react';
import 'jest-styled-components';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';

import { Collapsible } from '..';
import { Grommet } from '../../Grommet';
import { Text } from '../../Text';

describe('Collapsible', () => {
  test('no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
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
      <Grommet>
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
      <Grommet>
        <Collapsible open>
          <Text>Example</Text>
        </Collapsible>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    rerender(
      <Grommet>
        <Collapsible open={false}>
          <Text>Example</Text>
        </Collapsible>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should keep mount content', () => {
    render(
      <Grommet>
        <Collapsible open={false} unmount={false}>
          <Text>Example</Text>
        </Collapsible>
      </Grommet>,
    );

    const collapsibleContent = screen.getByText('Example');
    expect(collapsibleContent).toBeInTheDocument();
  });
});
