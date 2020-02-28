import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import { cleanup, render, fireEvent } from '@testing-library/react';

import { CaretDown } from 'grommet-icons';
import { createPortal, expectPortal } from '../../../utils/portal';

import { Grommet } from '../..';
import { Select } from '..';

describe('Select', () => {
  beforeEach(createPortal);

  afterEach(cleanup);

  test('basic', () => {
    const component = renderer.create(
      <Select id="test-select" options={['one', 'two']} />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('opens', done => {
    window.scrollTo = jest.fn();
    const { getByPlaceholderText, container } = render(
      <Select
        placeholder="test select"
        id="test-select"
        options={['one', 'two']}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-select__drop')).toBeNull();

    fireEvent.click(getByPlaceholderText('test select'));

    expect(container.firstChild).toMatchSnapshot();
    expectPortal('test-select__drop').toMatchSnapshot();

    setTimeout(() => {
      expect(document.activeElement).toMatchSnapshot();
      done();
    }, 100);
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
    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-select__drop')).toBeNull();

    fireEvent.click(getByPlaceholderText('test select'));

    expect(container.firstChild).toMatchSnapshot();
    expectPortal('test-select__drop').toMatchSnapshot();
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
      />,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByPlaceholderText('test select'));

    expectPortal('test-select__drop').toMatchSnapshot();

    setTimeout(() => {
      jest.runAllTimers();

      expect(document.activeElement).toMatchSnapshot();

      document.activeElement.value = 'a';
      fireEvent.input(document.activeElement);

      expect(onSearch).toBeCalledWith('a');
    }, 200);
  });

  // NOTE: This isn't really a test for Select
  // test('closes drop on esc', () => {
  //   const onClose = jest.fn();
  //   const component = mount(
  //     <Select id='test-select' options={['one', 'two']} onClose={onClose} />
  //   );
  //
  //   fireEvent.keyDown(
  //     component.getDOMNode(),
  //     { key: 'Down', keyCode: 40, which: 40 }
  //   );
  //
  //   expectPortal('test-select__drop').toMatchSnapshot();
  //   expect(component.getDOMNode()).toMatchSnapshot();
  //
  //   fireEvent.keyDown(
  //     document.getElementById('test-select__drop'),
  //     { key: 'Esc', keyCode: 27, which: 27 }
  //   );
  //
  //   expect(onClose).toBeCalled();
  //   expect(document.getElementById('test-select__drop')).toBeNull();
  //   expect(component.getDOMNode()).toMatchSnapshot();
  // });

  test('select an option', () => {
    window.scrollTo = jest.fn();
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

    // checks it select has a value assigned to it after option is selected
    expect(select.value).toEqual('one');
    expect(onChange).toBeCalled();
    expect(window.scrollTo).toBeCalled();
  });

  test('select an option with complex options', () => {
    window.scrollTo = jest.fn();
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
    expect(onChange).toBeCalled();
    expect(window.scrollTo).toBeCalled();
  });

  test('select an option with enter', () => {
    window.scrollTo = jest.fn();
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

  test('multiple', () => {
    const component = renderer.create(
      <Select
        id="test-select"
        multiple
        options={['one', 'two']}
        selected={[]}
        value={[]}
      />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('multiple values', () => {
    const { getByPlaceholderText, container } = render(
      <Select
        id="test-select"
        placeholder="test select"
        multiple
        options={['one', 'two']}
        selected={[0, 1]}
        value={['one', 'two']}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByPlaceholderText('test select'));

    expect(container.firstChild).toMatchSnapshot();
    expectPortal('test-select__drop').toMatchSnapshot();
  });

  test('select another option', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText, container } = render(
      <Select
        id="test-select"
        placeholder="test select"
        multiple
        options={['one', 'two']}
        onChange={onChange}
        value={['two']}
        selected={[1]}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByPlaceholderText('test select'));

    fireEvent.click(
      document.getElementById('test-select__drop').querySelector('button'),
    );
    expect(onChange).toBeCalled();
  });

  test('deselect an option', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText, container } = render(
      <Select
        id="test-select"
        placeholder="test select"
        multiple
        options={['one', 'two']}
        onChange={onChange}
        value={['one']}
        selected={[0]}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByPlaceholderText('test select'));

    fireEvent.click(
      document.getElementById('test-select__drop').querySelector('button'),
    );
    expect(onChange).toBeCalled();
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
    expect(document.getElementById('test-select__drop')).toBeNull();
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
    document.activeElement.value = 'a';
    fireEvent.input(document.activeElement);

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
});
