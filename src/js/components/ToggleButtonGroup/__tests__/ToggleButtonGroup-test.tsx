import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
        <ToggleButtonGroup options={['Option 1', 'Option 2', 'Option 3']} />
      </Grommet>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('string options', () => {
    const { container } = render(
      <Grommet>
        <ToggleButtonGroup options={['one', 'two']} value="one" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('object options', () => {
    const { container } = render(
      <Grommet>
        <ToggleButtonGroup
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
        <ToggleButtonGroup options={['one', 'two']} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('select 1 option', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Grommet>
        <ToggleButtonGroup
          options={['one', 'two', 'three']}
          onChange={onChange}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    // Simulate a click event on the radio button
    fireEvent.click(screen.getByRole('radio', { name: 'two' }));
    expect(onChange).toHaveBeenCalledWith(['two']);
  });

  test('select 2 options', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Grommet>
        <ToggleButtonGroup
          options={['one', 'two', 'three']}
          onChange={onChange}
          multiple
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    // Simulate a click event on the buttons
    fireEvent.click(screen.getByRole('button', { name: 'two' }));
    fireEvent.click(screen.getByRole('button', { name: 'three' }));
    expect(onChange).toHaveBeenCalledWith(['two', 'three']);
  });
});
