import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { Grommet } from '../../Grommet';
import { Add } from 'grommet-icons';
import { ToggleButtonGroup } from '..';

describe('ToggleButtonGroup', () => {
  test('should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <ToggleButtonGroup
          name="test"
          options={['Option 1', 'Option 2', 'Option 3']}
        />
      </Grommet>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('string options', () => {
    const { container } = render(
      <Grommet>
        <ToggleButtonGroup name="test" options={['one', 'two']} value="one" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('object options', () => {
    const { container } = render(
      <Grommet>
        <ToggleButtonGroup
          name="test"
          options={[
            { id: 'onE', label: 'One', value: 'one' },
            { id: 'twO', label: 'Two', value: 'two' },
          ]}
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('icon with values', () => {
    const { container } = render(
      <Grommet>
        <ToggleButtonGroup
          name="test"
          options={[
            { icon: <Add />, value: 'one' },
            { icon: <Add />, value: 'two' },
          ]}
          defaultValue="one"
        />
      </Grommet>,
    );

    expect(container).toMatchSnapshot();
  });

  test('defaultValue', () => {
    const { container } = render(
      <Grommet>
        <ToggleButtonGroup
          name="test"
          options={['one', 'two']}
          defaultValue="one"
        />
      </Grommet>,
    );

    expect(container).toMatchSnapshot();
  });

  test('toggleButtonGroup theme values', () => {
    const { container } = render(
      <Grommet
        theme={{
          toggleButtonGroup: {
            button: {
              color: 'text-weak',
            },
            container: {
              round: 'xxsmall',
            },
            border: {
              color: 'brand',
            },
          },
        }}
      >
        <ToggleButtonGroup name="test" options={['one', 'two']} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
