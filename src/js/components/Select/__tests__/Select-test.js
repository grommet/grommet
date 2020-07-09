import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import { cleanup, render, fireEvent, act } from '@testing-library/react';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { CaretDown, CaretUp, FormDown } from 'grommet-icons';
import { createPortal, expectPortal } from '../../../utils/portal';

import { Grommet } from '../..';
import { Select } from '..';

describe('Select', () => {
  window.scrollTo = jest.fn();
  beforeEach(createPortal);
  afterEach(cleanup);

  test('should not have accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <Select options={['one', 'two', 'three']} a11yTitle="test" />
      </Grommet>,
    );
    const results = await axe(container);
    expect(container.firstChild).toMatchSnapshot();
    expect(results).toHaveNoViolations();
  });

  test('basic', () => {
    const component = renderer.create(
      <Select id="test-select" options={['one', 'two']} a11yTitle="Select" />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('opens and closes', () => {
    jest.useFakeTimers();
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const { getByPlaceholderText, container } = render(
      <Select
        placeholder="test select"
        id="test-select"
        options={['one', 'two']}
        onOpen={onOpen}
        onClose={onClose}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-select__drop')).toBeNull();

    fireEvent.click(getByPlaceholderText('test select'));
    expect(container.firstChild).toMatchSnapshot();
    expectPortal('test-select__drop').toMatchSnapshot();
    // advance timers so the select opens
    jest.advanceTimersByTime(100);
    // verify that select is open
    expect(document.activeElement).toMatchSnapshot();
    /* called twice because of bug, issue #4283
    https://github.com/grommet/grommet/issues/4283
    Test should be changed to 'toHaveBeenCalledTimes(1)' when the bug is fixed
    */
    expect(onOpen).toHaveBeenCalledTimes(2);

    // closes select
    fireEvent.click(getByPlaceholderText('test select'));
    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-select__drop')).toBeNull();
    // advance timers so the select closes
    jest.advanceTimersByTime(100);
    // verify that select was closed
    expect(document.activeElement).toMatchSnapshot();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('0 value', () => {
    const component = renderer.create(
      <Select
        id="test-select"
        placeholder="test select"
        options={[0, 1]}
        value={0}
      />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('search', () => {
    jest.useFakeTimers();
    const onSearch = jest.fn();
    const { getByPlaceholderText, container } = render(
      <Select
        id="test-select"
        placeholder="test select"
        options={['one', 'two']}
        onSearch={onSearch}
        value="two"
      />,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByPlaceholderText('test select'));

    // advance timers so select can open
    act(() => {
      jest.advanceTimersByTime(200);
    });
    // snapshot on search box
    expectPortal('test-select__drop').toMatchSnapshot();
    expect(document.activeElement).toMatchSnapshot();
    // add content to search box
    fireEvent.change(document.activeElement, { target: { value: 'o' } });
    expect(document.activeElement).toMatchSnapshot();
    expect(onSearch).toBeCalledWith('o');
  });

  test('select an option with complex options', () => {
    const onChange = jest.fn();
    const { getByText, container } = render(
      <Select
        id="test-select"
        plain
        value={<span>one</span>}
        options={[{ test: 'one' }, { test: 'two' }]}
        onChange={onChange}
      >
        {option => <span>{option.test}</span>}
      </Select>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByText('one'));

    // pressing enter here nothing will happen
    fireEvent.click(
      document.getElementById('test-select__drop').querySelector('button'),
    );
    expect(onChange).toBeCalledWith(
      expect.objectContaining({ value: { test: 'one' } }),
    );
    expect(window.scrollTo).toBeCalled();
  });

  test('size', () => {
    const component = renderer.create(
      <Select
        id="test-select"
        size="large"
        options={['one', 'two']}
        selected={[]}
        value={[]}
        onChange={() => {}}
      />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  ['small', 'medium', 'large'].forEach(dropHeight => {
    test(`${dropHeight} drop container height`, () => {
      const { getByPlaceholderText } = render(
        <Select
          id="test-select"
          size="large"
          options={['one', 'two']}
          selected={[]}
          value={[]}
          onChange={() => {}}
          dropHeight={dropHeight}
          placeholder="test select"
        />,
      );
      fireEvent.click(getByPlaceholderText('test select'));
      expect(document.activeElement).toMatchSnapshot();
    });
  });

  test('onChange without valueKey', () => {
    const onChange = jest.fn();
    const Test = () => {
      const [value] = React.useState();
      return (
        <Select
          id="test-select"
          placeholder="test select"
          labelKey="name"
          value={value}
          options={[
            {
              id: 1,
              name: 'Value1',
            },
            {
              id: 2,
              name: 'Value2',
            },
          ]}
          onChange={onChange}
        />
      );
    };
    const { getByPlaceholderText, getByText, container } = render(
      <Grommet>
        <Test />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByPlaceholderText('test select'));

    expectPortal('test-select__drop').toMatchSnapshot();

    fireEvent.click(getByText('Value1'));
    expect(onChange).toBeCalledWith(
      expect.objectContaining({
        value: {
          id: 1,
          name: 'Value1',
        },
      }),
    );
  });

  test('onChange with valueKey string', () => {
    const onChange = jest.fn();
    const Test = () => {
      const [value] = React.useState();
      return (
        <Select
          id="test-select"
          placeholder="test select"
          labelKey="name"
          valueKey="id"
          value={value}
          options={[
            {
              id: 1,
              name: 'Value1',
            },
            {
              id: 2,
              name: 'Value2',
            },
          ]}
          onChange={onChange}
        />
      );
    };
    const { getByPlaceholderText, getByText, container } = render(
      <Grommet>
        <Test />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByPlaceholderText('test select'));

    expectPortal('test-select__drop').toMatchSnapshot();

    fireEvent.click(getByText('Value1'));
    expect(onChange).toBeCalledWith(
      expect.objectContaining({
        value: {
          id: 1,
          name: 'Value1',
        },
      }),
    );
  });

  test('disabled key', () => {
    jest.useFakeTimers();
    const Test = () => {
      const [value] = React.useState();
      return (
        <Select
          id="test-select"
          placeholder="test select"
          labelKey="name"
          valueKey="id"
          value={value}
          disabledKey="disabled"
          options={[
            {
              id: 1,
              name: 'Value1',
              disabled: true,
            },
            {
              id: 2,
              name: 'Value2',
              disabled: false,
            },
          ]}
        />
      );
    };
    const { getByPlaceholderText, container } = render(
      <Grommet>
        <Test />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByPlaceholderText('test select'));
    jest.advanceTimersByTime(200);
    expectPortal('test-select__drop').toMatchSnapshot();
  });

  test('complex options and children', () => {
    const { getByPlaceholderText, container } = render(
      <Select
        id="test-select"
        placeholder="test select"
        options={[{ test: 'one' }, { test: 'two' }]}
      >
        {option => <span>{option.test}</span>}
      </Select>,
    );
    // before opening
    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-select__drop')).toBeNull();

    fireEvent.click(getByPlaceholderText('test select'));

    // after opening
    expect(container.firstChild).toMatchSnapshot();
    expectPortal('test-select__drop').toMatchSnapshot();
  });

  test('select an option', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText, container } = render(
      <Select
        id="test-select"
        placeholder="test select"
        options={['one', 'two']}
        onChange={onChange}
      />,
    );
    const select = getByPlaceholderText('test select');
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByPlaceholderText('test select'));

    // pressing enter here nothing will happen
    fireEvent.click(
      document.getElementById('test-select__drop').querySelector('button'),
    );

    // checks if select has a value assigned to it after option is selected
    expect(select.value).toEqual('one');
    expect(onChange).toBeCalledWith(expect.objectContaining({ value: 'one' }));
    expect(window.scrollTo).toBeCalled();
  });

  test('select an option with enter', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText, container } = render(
      <Select
        id="test-select"
        placeholder="test select"
        options={['one', 'two']}
        onChange={onChange}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByPlaceholderText('test select'));
    // verify that keyboard navigation is working
    fireEvent.keyDown(document.getElementById('test-select__select-drop'), {
      key: 'Down',
      keyCode: 40,
      which: 40,
    });
    fireEvent.keyDown(document.getElementById('test-select__select-drop'), {
      key: 'Up',
      keyCode: 38,
      which: 38,
    });
    fireEvent.keyDown(document.getElementById('test-select__select-drop'), {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    });
    expect(onChange).toBeCalledWith(expect.objectContaining({ value: 'one' }));
    expect(window.scrollTo).toBeCalled();
  });

  test('disabled', () => {
    const { getByPlaceholderText, container } = render(
      <Select
        id="test-select"
        placeholder="test select"
        disabled
        options={['one', 'two']}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-select__drop')).toBeNull();

    fireEvent.click(getByPlaceholderText('test select'));

    expect(container.firstChild).toMatchSnapshot();
    // dropdown should still be null because select is disabled
    expect(document.getElementById('test-select__drop')).toBeNull();
  });

  test('empty results search', () => {
    const { getByPlaceholderText } = render(
      <Select
        id="test-select"
        placeholder="test select"
        options={[]}
        onSearch={() => {}}
        emptySearchMessage="no results"
      />,
    );
    fireEvent.click(getByPlaceholderText('test select'));
    // advance timers so that the select drop can open
    act(() => {
      jest.advanceTimersByTime(200);
    });
    fireEvent.change(document.activeElement, { target: { value: 'o' } });

    expect(document.activeElement).toMatchSnapshot();
  });

  test('open default state', () => {
    render(
      <Select
        open
        id="test-select"
        placeholder="test select"
        options={['one', 'two']}
      />,
    );

    expect(document.getElementById('test-select__drop')).not.toBeNull();
  });

  test('renders without icon', () => {
    const component = renderer.create(
      <Select id="test-select" options={['one', 'two']} icon={false} />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders custom icon', () => {
    const component = renderer.create(
      <Select id="test-select" options={['one', 'two']} icon={CaretDown} />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders default icon', () => {
    const component = renderer.create(
      <Select id="test-select" options={['one', 'two']} icon />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('modifies select control style on open', () => {
    const customTheme = {
      select: {
        control: {
          extend: {
            background: 'purple',
          },
          open: {
            background: 'lightgrey',
          },
        },
        container: {},
      },
    };

    const { container } = render(
      <Grommet theme={customTheme}>
        <Select
          data-testid="test-select-style-open"
          id="test-open-id"
          options={['morning', 'afternoon', 'evening']}
          placeholder="Select..."
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();

    const selectButton = container.querySelector('Button');
    let style;

    style = window.getComputedStyle(selectButton);
    expect(style.background).toBe('purple');

    fireEvent.click(selectButton);
    style = window.getComputedStyle(selectButton);
    expect(style.background).toBe('lightgrey');

    fireEvent.click(selectButton);
    style = window.getComputedStyle(selectButton);
    expect(style.background).toBe('purple');
  });

  test(`renders styled select options backwards compatible with legacy
      documentation (select.options.box)`, () => {
    const customTheme = {
      select: {
        options: {
          box: {
            background: 'lightblue',
          },
        },
      },
    };

    const { getByPlaceholderText, getByText, container } = render(
      <Grommet theme={customTheme}>
        <Select
          data-testid="test-select-style-options-1"
          id="test-options-style-id"
          options={['morning', 'afternoon', 'evening']}
          placeholder="Select..."
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();

    const selectButton = getByPlaceholderText('Select...');
    fireEvent.click(selectButton);

    const optionButton = getByText('morning').closest('button');
    const style = window.getComputedStyle(optionButton.firstChild);
    expect(style.background).toBe('lightblue');
  });

  test('renders styled select options using select.options.container', () => {
    const customTheme = {
      select: {
        options: {
          container: {
            background: 'lightgreen',
          },
        },
      },
    };

    const { getByPlaceholderText, getByText, container } = render(
      <Grommet theme={customTheme}>
        <Select
          data-testid="test-select-style-options-2"
          id="test-options-style-id"
          options={['morning', 'afternoon', 'evening']}
          placeholder="Select..."
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();

    const selectButton = getByPlaceholderText('Select...');
    fireEvent.click(selectButton);

    const optionButton = getByText('morning').closest('button');
    const style = window.getComputedStyle(optionButton.firstChild);
    expect(style.background).toBe('lightgreen');
  });

  test(`renders styled select options combining select.options.box &&
    select.options.container;
    select.options.container prioritized if conflict`, () => {
    const customTheme = {
      select: {
        options: {
          container: {
            background: 'lightgreen',
          },
          box: {
            background: 'lightblue',
            border: {
              side: 'bottom',
              size: 'small',
              color: 'blue',
            },
          },
        },
      },
    };

    const { getByPlaceholderText, getByText, container } = render(
      <Grommet theme={customTheme}>
        <Select
          data-testid="test-select-style-options-3"
          id="test-options-style-id"
          options={['morning', 'afternoon', 'evening']}
          placeholder="Select..."
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();

    const selectButton = getByPlaceholderText('Select...');
    fireEvent.click(selectButton);

    let style;
    const optionButton = getByText('morning').closest('button');

    style = window.getComputedStyle(optionButton.firstChild);
    expect(style.background).not.toBe('lightblue');

    style = window.getComputedStyle(optionButton.firstChild);
    expect(style.background).toBe('lightgreen');
    expect(style.borderBottom).toBe('2px solid blue');
  });

  test('applies custom global.hover theme to options', () => {
    const customTheme = {
      global: {
        hover: {
          background: {
            color: 'lightgreen',
          },
          color: {
            dark: 'lightgrey',
            light: 'brand',
          },
        },
      },
    };
    const { getByPlaceholderText, getByText, container } = render(
      <Grommet theme={customTheme}>
        <Select
          data-testid="applies-custom-hover-style"
          id="applies-custom-hover-style-id"
          options={['morning', 'afternoon', 'evening']}
          placeholder="Select..."
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();

    const selectButton = getByPlaceholderText('Select...');
    fireEvent.click(selectButton);

    const optionButton = getByText('afternoon').closest('button');
    fireEvent.mouseOver(optionButton);
    expect(optionButton).toMatchSnapshot();
  });

  test('renders custom up and down icons', () => {
    const customTheme = {
      select: {
        icons: {
          down: FormDown,
          up: CaretUp,
        },
      },
    };

    const { getByPlaceholderText, container } = render(
      <Grommet theme={customTheme}>
        <Select
          options={['morning', 'afternoon', 'evening']}
          placeholder="Select..."
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();

    const selectButton = getByPlaceholderText('Select...');
    fireEvent.click(selectButton);
    // Check that custom up icon is applied when open
    expect(container.firstChild).toMatchSnapshot();
  });

  test('select an option then select a different option', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <Select
        id="test-select"
        placeholder="test select"
        options={['one', 'two']}
        onChange={onChange}
      />,
    );
    const select = getByPlaceholderText('test select');
    fireEvent.click(getByPlaceholderText('test select'));
    // select first option
    fireEvent.click(
      document.getElementById('test-select__drop').querySelector('button'),
    );

    // checks if select has a value assigned to it after option is selected
    expect(select.value).toEqual('one');

    fireEvent.click(getByPlaceholderText('test select'));
    // select second option
    fireEvent.click(
      document
        .getElementById('test-select__drop')
        .querySelectorAll('button')[1],
    );

    // checks if select has a value assigned to it after option is selected
    expect(select.value).toEqual('two');
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  test('keyboard navigation with disabled option', () => {
    const { getByPlaceholderText } = render(
      <Select
        id="test-select"
        placeholder="test select"
        options={['one', 'two', 'three', 'four']}
        disabled={[1]}
        open
      />,
    );
    const select = getByPlaceholderText('test select');
    // should skip over disabled option
    fireEvent.keyDown(document.getElementById('test-select__select-drop'), {
      key: 'Down',
      keyCode: 40,
      which: 40,
    });
    fireEvent.keyDown(document.getElementById('test-select__select-drop'), {
      key: 'Down',
      keyCode: 40,
      which: 40,
    });
    fireEvent.keyDown(document.getElementById('test-select__select-drop'), {
      key: 'Up',
      keyCode: 38,
      which: 38,
    });
    // should skip oer disabled option
    fireEvent.keyDown(document.getElementById('test-select__select-drop'), {
      key: 'Up',
      keyCode: 38,
      which: 38,
    });

    fireEvent.keyDown(document.getElementById('test-select__select-drop'), {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    });

    expect(select.value).toEqual('one');
  });

  test('undefined option', () => {
    const { getByPlaceholderText } = render(
      <Grommet>
        <Select
          id="test-select"
          placeholder="test select"
          options={[undefined, 1, 2]}
        />
      </Grommet>,
    );
    const select = getByPlaceholderText('test select');
    fireEvent.click(getByPlaceholderText('test select'));
    fireEvent.click(
      document.getElementById('test-select__drop').querySelector('button'),
    );
    // if undefined value is selected select will have empty string value
    expect(select.value).toEqual('');
  });

  test('valueLabel', () => {
    const { container } = render(
      <Grommet>
        <Select
          id="test-select"
          placeholder="test select"
          options={[undefined, 1, 2]}
          valueLabel="test"
        />
      </Grommet>,
    );
    expect(container.firsChild).toMatchSnapshot();
  });

  test('selected', () => {
    const { container, getByPlaceholderText } = render(
      <Grommet>
        <Select
          options={['one', 'two']}
          placeholder="test select"
          id="test-select"
          selected={0}
        />
      </Grommet>,
    );
    const select = getByPlaceholderText('test select');
    expect(container.firstChild).toMatchSnapshot();
    expect(select.value).toEqual('one');
  });

  test('keyboard navigation timeout', () => {
    jest.useFakeTimers();
    const { container, getByPlaceholderText } = render(
      <Grommet>
        <Select
          id="test-select"
          placeholder="test select"
          options={['one', 'two', 'three']}
          disabled={[0]}
        />
      </Grommet>,
    );
    fireEvent.click(getByPlaceholderText('test select'));
    // key event to start keyboard navigation
    fireEvent.keyDown(document.getElementById('test-select__select-drop'), {
      key: 'Down',
      keyCode: 40,
      which: 40,
    });
    // advance timers to cause keyboard nav timeout
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Search timeout', () => {
    jest.useFakeTimers();
    const onSearch = jest.fn();
    const { container, getByPlaceholderText } = render(
      <Grommet>
        <Select
          id="test-select"
          placeholder="test select"
          options={['one', 'two']}
          onSearch={onSearch}
        />
      </Grommet>,
    );

    fireEvent.click(getByPlaceholderText('test select'));

    // advance timers so select can open & have focus
    act(() => {
      jest.advanceTimersByTime(200);
    });
    // add content to search box
    fireEvent.change(document.activeElement, { target: { value: 'o' } });
    expect(container.firstChild).toMatchSnapshot();
    // advance timers to cause search timeout
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(document.activeElement).toMatchSnapshot();
  });

  test('disabled option value', () => {
    jest.useFakeTimers();
    const { getByPlaceholderText } = render(
      <Grommet>
        <Select
          id="test-select"
          placeholder="test select"
          options={['one', 'two']}
          disabled={['one']}
        />
      </Grommet>,
    );
    fireEvent.click(getByPlaceholderText('test select'));
    expectPortal('test-select__drop').toMatchSnapshot();
  });
  window.scrollTo.mockRestore();
});
