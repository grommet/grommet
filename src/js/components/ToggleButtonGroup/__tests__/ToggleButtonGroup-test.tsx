import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';

import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';

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
        <ToggleButtonGroup options={['one', 'two']} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('object options', () => {
    const { container } = render(
      <Grommet>
        <ToggleButtonGroup
          options={[
            { label: 'One', value: 'one' },
            { id: 'twO', label: 'Two', value: 'two' },
          ]}
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('Should render defaultValue as active when options is array of strings', () => {
    render(
      <Grommet>
        <ToggleButtonGroup options={['one', 'two']} defaultValue="one" />
      </Grommet>,
    );

    const activeToggleButton = screen.getByRole('radio', { name: /one/i });
    // Assert that the active toggle button exists
    expect(activeToggleButton).toBeInTheDocument();
    // Assert that the aria-checked attribute of the active toggle button is true
    expect(activeToggleButton).toHaveAttribute('aria-checked', 'true');
  });

  test('Should render defaultValue as active when options is array of objects', () => {
    render(
      <Grommet>
        <ToggleButtonGroup
          options={[
            { label: 'Choice 1', value: 'c1' },
            { label: 'Choice 2', value: 'c2' },
            { label: 'Choice 3', value: 'c3' },
          ]}
          defaultValue="c2"
        />
      </Grommet>,
    );
    const activeToggleButton = screen.getByRole('radio', {
      name: /Choice 2/i,
    });
    // Assert that the active toggle button exists
    expect(activeToggleButton).toBeInTheDocument();
    // Assert that the aria-checked attribute of the active toggle button is true
    expect(activeToggleButton).toHaveAttribute('aria-checked', 'true');
  });

  test('Should put tab focus on first button when no value', async () => {
    const user = userEvent.setup();

    const { container } = render(
      <Grommet>
        <ToggleButtonGroup options={['one', 'two', 'three']} />
      </Grommet>,
    );

    const focusToggleButton = screen.getByRole('radio', {
      name: /one/i,
    });

    expect(focusToggleButton).not.toHaveFocus();
    expect(document.body).toHaveFocus();

    await user.tab();
    expect(focusToggleButton).toHaveFocus();
    expect(document.body).not.toHaveFocus();

    expect(focusToggleButton).toHaveStyleRule(
      'box-shadow',
      '0 0 2px 2px #6FFFB0',
      {
        modifier: ':focus',
      },
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Should put tab focus on active button when value', async () => {
    const user = userEvent.setup();

    const { container } = render(
      <Grommet>
        <ToggleButtonGroup
          options={['one', 'two', 'three']}
          defaultValue="three"
        />
      </Grommet>,
    );

    const focusToggleButton = screen.getByRole('radio', {
      name: /three/i,
    });

    expect(focusToggleButton).not.toHaveFocus();
    expect(document.body).toHaveFocus();

    await user.tab();
    expect(focusToggleButton).toHaveFocus();
    expect(document.body).not.toHaveFocus();

    expect(focusToggleButton).toHaveStyleRule(
      'box-shadow',
      '0 0 2px 2px #6FFFB0',
      {
        modifier: ':focus',
      },
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Should allow caller to clear all values in controlled scenarios', () => {
    render(
      <Grommet>
        <ToggleButtonGroup options={['one', 'two', 'three']} />
      </Grommet>,
    );

    // click on one to make active
    fireEvent.click(screen.getByRole('radio', { name: 'one' }));

    const activeToggleButtonOne = screen.getByRole('radio', {
      name: /one/i,
    });

    // Assert that the aria-checked attribute of the active toggle button is true
    expect(activeToggleButtonOne).toHaveAttribute('aria-checked', 'true');
    // click on one to clear value
    fireEvent.click(screen.getByRole('radio', { name: 'one' }));
    // // Assert that the aria-checked attribute of the active toggle button is true
    expect(activeToggleButtonOne).toHaveAttribute('aria-checked', 'false');
  });

  test('Should call onChange in uncontrolled scenarios', () => {
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
    expect(onChange).toHaveBeenCalledWith('two');
  });

  test('Should move to next button when right/down arrow key is pressed and loop', async () => {
    const user = userEvent.setup();
    render(
      <Grommet>
        <ToggleButtonGroup options={['one', 'two', 'three']} />
      </Grommet>,
    );

    const toggleButtonOne = screen.getByRole('radio', {
      name: /one/i,
    });
    const toggleButtonTwo = screen.getByRole('radio', {
      name: /two/i,
    });

    await user.tab();
    await user.type(toggleButtonOne, '{arrowDown}');
    await user.type(toggleButtonTwo, '{arrowRight}');
    await user.type(toggleButtonTwo, '{enter}');
    expect(toggleButtonTwo).toHaveAttribute('aria-checked', 'true');
  });

  test('Should move to previous button left/up arrow key is pressed and loop', async () => {
    const user = userEvent.setup();
    render(
      <Grommet>
        <ToggleButtonGroup options={['one', 'two', 'three']} />
      </Grommet>,
    );

    const toggleButtonOne = screen.getByRole('radio', {
      name: /one/i,
    });
    const toggleButtonTwo = screen.getByRole('radio', {
      name: /two/i,
    });

    await user.tab();
    await user.type(toggleButtonOne, '{arrowLeft}');
    await user.type(toggleButtonTwo, '{arrowUp}');
    await user.type(toggleButtonTwo, '{enter}');
    expect(toggleButtonTwo).toHaveAttribute('aria-checked', 'true');
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

  test('string options with multiple prop', () => {
    const { container } = render(
      <Grommet>
        <ToggleButtonGroup multiple options={['one', 'two']} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('Should render when options is array of objects with multiple prop', () => {
    const { container } = render(
      <Grommet>
        <ToggleButtonGroup
          multiple
          options={[
            { id: 'onE', label: 'One', value: 'one' },
            { id: 'twO', label: 'Two', value: 'two' },
          ]}
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('Should call onChange in uncontrolled scenarios with multiple prop', () => {
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

  test('Should render defaultValue as active with multiple prop', () => {
    render(
      <Grommet>
        <ToggleButtonGroup
          options={[
            { label: 'Choice 1', value: 'c1' },
            { label: 'Choice 2', value: 'c2' },
            { label: 'Choice 3', value: 'c3' },
          ]}
          multiple
          defaultValue="c2"
        />
      </Grommet>,
    );
    const activeToggleButton = screen.getByRole('button', {
      name: /Choice 2/i,
    });
    // Assert that the active toggle button exists
    expect(activeToggleButton).toBeInTheDocument();
    // Assert that the aria-checked attribute of the active toggle button is true
    expect(activeToggleButton).toHaveAttribute('aria-checked', 'true');
  });

  test('Should put tab focus on first button when no value with multiple prop', async () => {
    const user = userEvent.setup();

    const { container } = render(
      <Grommet>
        <ToggleButtonGroup multiple options={['one', 'two', 'three']} />
      </Grommet>,
    );

    const focusToggleButton = screen.getByRole('button', {
      name: /one/i,
    });

    expect(focusToggleButton).not.toHaveFocus();
    expect(document.body).toHaveFocus();

    await user.tab();
    expect(focusToggleButton).toHaveFocus();
    expect(document.body).not.toHaveFocus();

    expect(focusToggleButton).toHaveStyleRule(
      'box-shadow',
      '0 0 2px 2px #6FFFB0',
      {
        modifier: ':focus',
      },
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Should put tab focus on active button when value with multiple prop', async () => {
    const user = userEvent.setup();

    const { container } = render(
      <Grommet>
        <ToggleButtonGroup
          options={['one', 'two', 'three']}
          defaultValue="three"
          multiple
        />
      </Grommet>,
    );

    const focusToggleButton = screen.getByRole('button', {
      name: /three/i,
    });

    expect(focusToggleButton).not.toHaveFocus();
    expect(document.body).toHaveFocus();

    await user.tab();
    expect(focusToggleButton).toHaveFocus();
    expect(document.body).not.toHaveFocus();

    expect(focusToggleButton).toHaveStyleRule(
      'box-shadow',
      '0 0 2px 2px #6FFFB0',
      {
        modifier: ':focus',
      },
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Should allow caller to clear all values in controlled scenarios with multiple prop', () => {
    render(
      <Grommet>
        <ToggleButtonGroup multiple options={['one', 'two', 'three']} />
      </Grommet>,
    );

    // click on all to make active
    fireEvent.click(screen.getByRole('button', { name: 'one' }));
    fireEvent.click(screen.getByRole('button', { name: 'two' }));
    fireEvent.click(screen.getByRole('button', { name: 'three' }));

    const activeToggleButtonOne = screen.getByRole('button', {
      name: /one/i,
    });
    const activeToggleButtonTwo = screen.getByRole('button', {
      name: /two/i,
    });
    const activeToggleButtonThree = screen.getByRole('button', {
      name: /three/i,
    });

    // Assert that the aria-checked attribute of the active toggle button is true
    expect(activeToggleButtonOne).toHaveAttribute('aria-checked', 'true');
    expect(activeToggleButtonTwo).toHaveAttribute('aria-checked', 'true');
    expect(activeToggleButtonThree).toHaveAttribute('aria-checked', 'true');
    // click on one to clear value
    fireEvent.click(screen.getByRole('button', { name: 'one' }));
    fireEvent.click(screen.getByRole('button', { name: 'two' }));
    fireEvent.click(screen.getByRole('button', { name: 'three' }));
    // // Assert that the aria-checked attribute of the active toggle button is true
    expect(activeToggleButtonOne).toHaveAttribute('aria-checked', 'false');
    expect(activeToggleButtonTwo).toHaveAttribute('aria-checked', 'false');
    expect(activeToggleButtonThree).toHaveAttribute('aria-checked', 'false');
  });

  test('Should move to next button when right/down arrow key is pressed and loop with multiple prop', async () => {
    const user = userEvent.setup();
    render(
      <Grommet>
        <ToggleButtonGroup multiple options={['one', 'two', 'three']} />
      </Grommet>,
    );

    const toggleButtonOne = screen.getByRole('button', {
      name: /one/i,
    });
    const toggleButtonTwo = screen.getByRole('button', {
      name: /two/i,
    });

    await user.tab();
    await user.type(toggleButtonOne, '{arrowDown}');
    await user.type(toggleButtonTwo, '{arrowRight}');
    await user.type(toggleButtonTwo, '{enter}');
    expect(toggleButtonTwo).toHaveAttribute('aria-checked', 'true');
  });

  test('Should move to previous button left/up arrow key is pressed and loop with multiple prop', async () => {
    const user = userEvent.setup();
    render(
      <Grommet>
        <ToggleButtonGroup multiple options={['one', 'two', 'three']} />
      </Grommet>,
    );

    const toggleButtonOne = screen.getByRole('button', {
      name: /one/i,
    });
    const toggleButtonTwo = screen.getByRole('button', {
      name: /two/i,
    });
    const toggleButtonThree = screen.getByRole('button', {
      name: /three/i,
    });

    await user.tab();
    await user.type(toggleButtonOne, '{arrowLeft}');
    await user.type(toggleButtonTwo, '{arrowUp}');
    await user.type(toggleButtonTwo, '{enter}');
    await user.type(toggleButtonThree, '{arrowLeft}');
    await user.type(toggleButtonThree, '{enter}');
    expect(toggleButtonTwo).toHaveAttribute('aria-checked', 'true');
    expect(toggleButtonThree).toHaveAttribute('aria-checked', 'true');
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
            divider: {
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
});
