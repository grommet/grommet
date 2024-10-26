import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';

import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';

import { Grommet } from '../../Grommet';
import { Add, Subtract } from 'grommet-icons';
import { ToggleGroup } from '..';

describe('ToggleGroup', () => {
  test('should have no accessibility violations', async () => {
    const { container, asFragment } = render(
      <Grommet>
        <ToggleGroup options={['Option 1', 'Option 2', 'Option 3']} />
      </Grommet>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders without props', () => {
    const { asFragment } = render(
      <Grommet>
        <ToggleGroup />
      </Grommet>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('renders without grommet wrapper', () => {
    const { asFragment } = render(<ToggleGroup />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('string options', () => {
    const { asFragment } = render(
      <Grommet>
        <ToggleGroup options={['one', 'two']} />
      </Grommet>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('object options', () => {
    const { asFragment } = render(
      <Grommet>
        <ToggleGroup
          options={[
            { label: 'One', value: 'one' },
            { label: 'Two', value: 'two' },
          ]}
        />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Should render defaultValue as active when options is array of strings', () => {
    render(
      <Grommet>
        <ToggleGroup options={['one', 'two']} defaultValue="one" />
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
        <ToggleGroup
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

    const { asFragment } = render(
      <Grommet>
        <ToggleGroup options={['one', 'two', 'three']} />
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
    expect(asFragment()).toMatchSnapshot();
  });

  test('Should put tab focus on active button when value', async () => {
    const user = userEvent.setup();

    const { asFragment } = render(
      <Grommet>
        <ToggleGroup options={['one', 'two', 'three']} defaultValue="three" />
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
    expect(asFragment()).toMatchSnapshot();
  });

  test('should allow caller to clear a value in controlled scenarios', () => {
    const App = () => {
      const [singleControlled, setSingleControlled] = React.useState<
        string | string[] | undefined
      >('c2');

      return (
        <Grommet>
          <ToggleGroup
            defaultValue="c2"
            value={singleControlled}
            onToggle={({ value }) => {
              if (value === singleControlled) setSingleControlled('');
              else setSingleControlled(value);
            }}
            options={['one', 'two', 'three']}
          />
        </Grommet>
      );
    };

    render(<App />);

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

  test('Should call onToggle in uncontrolled scenarios', () => {
    const onToggle = jest.fn();
    const { asFragment } = render(
      <Grommet>
        <ToggleGroup options={['one', 'two', 'three']} onToggle={onToggle} />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();

    // Simulate a click event on the radio button
    fireEvent.click(screen.getByRole('radio', { name: 'two' }));
    expect(onToggle).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'two' }),
    );
  });

  test('Should move to next button when right/down arrow key is pressed and loop', async () => {
    const user = userEvent.setup();
    render(
      <Grommet>
        <ToggleGroup options={['one', 'two', 'three']} />
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
        <ToggleGroup options={['one', 'two', 'three']} />
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
    const { asFragment } = render(
      <Grommet>
        <ToggleGroup
          options={[
            { icon: <Add />, value: 'one' },
            { icon: <Subtract />, value: 'two' },
          ]}
          defaultValue="one"
        />
      </Grommet>,
    );

    const activeToggleButton = screen.getByRole('radio', {
      name: /add/i,
    });

    // Assert that the aria-checked attribute of the active toggle button is true
    expect(activeToggleButton).toHaveAttribute('aria-checked', 'true');
    expect(asFragment()).toMatchSnapshot();
  });

  test('icon with tooltip', async () => {
    const { getByText } = render(
      <Grommet>
        <ToggleGroup
          options={[
            { icon: <Add />, value: 'one', tip: 'add' },
            {
              icon: <Subtract />,
              value: 'two',
              tip: 'Subtract',
            },
          ]}
          defaultValue="one"
        />
      </Grommet>,
    );

    const addButton = screen.getByRole('radio', { name: /Add/i });
    fireEvent.mouseOver(addButton);
    const tooltip = getByText(/add/i);
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).not.toBeNull();
    expect(tooltip?.parentNode?.parentNode).toMatchSnapshot();

    fireEvent.mouseOut(addButton);
    // Wait for any necessary updates to the DOM
    await waitFor(() => {
      expect(screen.queryByText(/add/i)).toBeNull(); // Use queryByText for checking null
    });
  });

  test('string options with multiple prop', () => {
    const { asFragment } = render(
      <Grommet>
        <ToggleGroup multiple options={['one', 'two']} />
      </Grommet>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('Should render when options is array of objects with multiple prop', () => {
    const { asFragment } = render(
      <Grommet>
        <ToggleGroup
          multiple
          options={[
            { label: 'One', value: 'one' },
            { label: 'Two', value: 'two' },
          ]}
        />
      </Grommet>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('Should call onToggle in uncontrolled scenarios with multiple prop', () => {
    const onToggle = jest.fn();
    const { asFragment } = render(
      <Grommet>
        <ToggleGroup
          options={['one', 'two', 'three']}
          onToggle={onToggle}
          multiple
        />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();

    // Simulate a click event on the buttons
    fireEvent.click(screen.getByRole('button', { name: 'two' }));
    fireEvent.click(screen.getByRole('button', { name: 'three' }));
    expect(onToggle).toHaveBeenCalledWith(
      expect.objectContaining({ value: ['two', 'three'] }),
    );
  });

  test('Should render defaultValue as active with multiple prop', () => {
    render(
      <Grommet>
        <ToggleGroup
          options={[
            { label: 'Choice 1', value: 'c1' },
            { label: 'Choice 2', value: 'c2' },
            { label: 'Choice 3', value: 'c3' },
          ]}
          multiple
          defaultValue={['c2', 'c3']}
        />
      </Grommet>,
    );
    const activeToggleButton = screen.getByRole('button', {
      name: /Choice 2/i,
    });
    // Assert that the active toggle button exists
    expect(activeToggleButton).toBeInTheDocument();
    // Assert that the aria-checked attribute of the active toggle button is true
    expect(activeToggleButton).toHaveAttribute('aria-pressed', 'true');
  });

  test('Should put tab focus on first button when no value with multiple prop', async () => {
    const user = userEvent.setup();

    const { asFragment } = render(
      <Grommet>
        <ToggleGroup multiple options={['one', 'two', 'three']} />
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
    expect(asFragment()).toMatchSnapshot();
  });

  test('Should put tab focus on active button when value with multiple prop', async () => {
    const user = userEvent.setup();

    const { asFragment } = render(
      <Grommet>
        <ToggleGroup
          options={['one', 'two', 'three']}
          defaultValue={['two', 'three']}
          multiple
        />
      </Grommet>,
    );

    const focusToggleButton = screen.getByRole('button', {
      name: /two/i,
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
    expect(asFragment()).toMatchSnapshot();
  });

  test('Should allow caller to clear all values in controlled scenarios with multiple prop', () => {
    render(
      <Grommet>
        <ToggleGroup multiple options={['one', 'two', 'three']} />
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
    expect(activeToggleButtonOne).toHaveAttribute('aria-pressed', 'true');
    expect(activeToggleButtonTwo).toHaveAttribute('aria-pressed', 'true');
    expect(activeToggleButtonThree).toHaveAttribute('aria-pressed', 'true');
    // click on one to clear value
    fireEvent.click(screen.getByRole('button', { name: 'one' }));
    fireEvent.click(screen.getByRole('button', { name: 'two' }));
    fireEvent.click(screen.getByRole('button', { name: 'three' }));
    // // Assert that the aria-checked attribute of the active toggle button is true
    expect(activeToggleButtonOne).toHaveAttribute('aria-pressed', 'false');
    expect(activeToggleButtonTwo).toHaveAttribute('aria-pressed', 'false');
    expect(activeToggleButtonThree).toHaveAttribute('aria-pressed', 'false');
  });

  test('Should move to next button when right/down arrow key is pressed and loop with multiple prop', async () => {
    const user = userEvent.setup();
    render(
      <Grommet>
        <ToggleGroup multiple options={['one', 'two', 'three']} />
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
    expect(toggleButtonTwo).toHaveAttribute('aria-pressed', 'true');
  });

  test('Should move to previous button left/up arrow key is pressed and loop with multiple prop', async () => {
    const user = userEvent.setup();
    render(
      <Grommet>
        <ToggleGroup multiple options={['one', 'two', 'three']} />
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
    expect(toggleButtonTwo).toHaveAttribute('aria-pressed', 'true');
    expect(toggleButtonThree).toHaveAttribute('aria-pressed', 'true');
  });

  test('custom theme', () => {
    const { asFragment } = render(
      <Grommet
        theme={{
          toggleGroup: {
            button: {
              iconOnly: {
                pad: {
                  horizontal: 'medium',
                  vertical: 'large',
                },
              },
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
        <ToggleGroup options={['one', 'two']} />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should allow divider to be set to false', () => {
    const { asFragment } = render(
      <Grommet
        theme={{
          toggleGroup: {
            divider: false,
          },
        }}
      >
        <ToggleGroup options={['one', 'two']} />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should allow rounding on individual buttons', () => {
    const { asFragment } = render(
      <Grommet
        theme={{
          toggleGroup: {
            button: {
              border: {
                radius: '2em',
              },
            },
          },
        }}
      >
        <ToggleGroup options={['one', 'two']} />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
