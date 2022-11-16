import React from 'react';
import { act, render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';
import 'jest-styled-components';
import '@testing-library/jest-dom';

import { createPortal, expectPortal } from '../../../utils/portal';

import { Grommet } from '../..';
import { Select } from '..';

describe('Select Controlled', () => {
  window.scrollTo = jest.fn();
  beforeEach(createPortal);

  test('should not have accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <Select options={['one', 'two', 'three']} a11yTitle="test" multiple />
      </Grommet>,
    );
    const results = await axe(container, {
      rules: {
        /* This rule is flagged because Select is built using a
        TextInput within a DropButton. According to Dequeue and
        WCAG 4.1.2 "interactive controls must not have focusable
        descendants". Jest-axe is assuming that the input is focusable
        and since the input is a descendant of the button the rule is
        flagged. However, the TextInput is built so that it is read
        only and cannot receive focus. Select is accessible
        according to the WCAG specification, but jest-axe is flagging
        it so we are disabling this rule. */
        'nested-interactive': { enabled: false },
      },
    });
    expect(container.firstChild).toMatchSnapshot();
    expect(results).toHaveNoViolations();
  });

  test('multiple', () => {
    const { container } = render(
      <Select
        id="test-select"
        multiple
        options={['one', 'two']}
        selected={[]}
        value={[]}
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
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
    expect(onChange).toBeCalledWith(
      expect.objectContaining({ value: ['two', 'one'] }),
    );
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
    expect(onChange).toBeCalledWith(expect.objectContaining({ value: [] }));
  });

  test('deselect all options should remove clear selection', async () => {
    const user = userEvent.setup();

    render(
      <Select
        id="test-select"
        placeholder="test select"
        multiple
        options={['one', 'two']}
        clear
      />,
    );

    await user.click(screen.getByPlaceholderText('test select'));
    await user.click(screen.getByRole('option', { name: 'one' }));
    await user.click(screen.getByPlaceholderText('test select'));

    expect(screen.getByText('Clear selection')).toBeInTheDocument();

    await user.click(screen.getByRole('option', { name: 'one' }));
    await user.click(screen.getByPlaceholderText('test select'));

    expect(screen.queryByText('Clear selection')).not.toBeInTheDocument();
  });

  test('multiple onChange without valueKey', () => {
    const onChange = jest.fn();
    const Test = () => {
      const [value] = React.useState();
      return (
        <Select
          id="test-select"
          placeholder="test select"
          labelKey="name"
          value={value}
          multiple
          closeOnChange={false}
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
    const { getByPlaceholderText, getByText, container, asFragment } = render(
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
        value: [
          {
            id: 1,
            name: 'Value1',
          },
        ],
      }),
    );

    expectPortal('test-select__drop').toMatchSnapshot();

    fireEvent.click(getByText('Value2'));
    expect(onChange).toBeCalledWith(
      expect.objectContaining({
        value: [
          {
            id: 1,
            name: 'Value1',
          },
          {
            id: 2,
            name: 'Value2',
          },
        ],
      }),
    );

    expectPortal('test-select__drop').toMatchSnapshot();

    expect(asFragment()).toMatchSnapshot();
  });

  test('multiple onChange without labelKey', () => {
    const onChange = jest.fn();
    const Test = () => {
      const [value] = React.useState();
      return (
        <Select
          id="test-select"
          placeholder="test select"
          valueKey="id"
          value={value}
          multiple
          closeOnChange={false}
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
    const { getByPlaceholderText, getByText, asFragment } = render(
      <Grommet>
        <Test />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
    fireEvent.click(getByPlaceholderText('test select'));

    expectPortal('test-select__drop').toMatchSnapshot();

    fireEvent.click(getByText('1'));
    expect(onChange).toBeCalledWith(
      expect.objectContaining({
        value: [
          {
            id: 1,
            name: 'Value1',
          },
        ],
      }),
    );

    expectPortal('test-select__drop').toMatchSnapshot();

    fireEvent.click(getByText('2'));
    expect(onChange).toBeCalledWith(
      expect.objectContaining({
        value: [
          {
            id: 1,
            name: 'Value1',
          },
          {
            id: 2,
            name: 'Value2',
          },
        ],
      }),
    );

    expectPortal('test-select__drop').toMatchSnapshot();

    expect(asFragment()).toMatchSnapshot();
  });

  test('multiple onChange without valueKey or labelKey', () => {
    const onChange = jest.fn();
    const Test = () => {
      const [value] = React.useState();
      return (
        <Select
          id="test-select"
          placeholder="test select"
          value={value}
          multiple
          closeOnChange={false}
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
    const { getByPlaceholderText, getByText, asFragment } = render(
      <Grommet>
        <Test />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
    fireEvent.click(getByPlaceholderText('test select'));

    expectPortal('test-select__drop').toMatchSnapshot();

    fireEvent.click(getByText('1'));
    expect(onChange).toBeCalledWith(
      expect.objectContaining({
        value: [
          {
            id: 1,
            name: 'Value1',
          },
        ],
      }),
    );

    expectPortal('test-select__drop').toMatchSnapshot();

    fireEvent.click(getByText('2'));
    expect(onChange).toBeCalledWith(
      expect.objectContaining({
        value: [
          {
            id: 1,
            name: 'Value1',
          },
          {
            id: 2,
            name: 'Value2',
          },
        ],
      }),
    );

    expectPortal('test-select__drop').toMatchSnapshot();

    expect(asFragment()).toMatchSnapshot();
  });

  test('multiple onChange with valueKey string', () => {
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
          multiple
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
        value: [
          {
            id: 1,
            name: 'Value1',
          },
        ],
      }),
    );
  });

  test('multiple onChange with valueKey reduce', () => {
    const onChange = jest.fn();
    const Test = () => {
      const [value] = React.useState();
      return (
        <Select
          id="test-select"
          placeholder="test select"
          labelKey="name"
          valueKey={{ key: 'id', reduce: true }}
          value={value}
          multiple
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
    expect(onChange).toBeCalledWith(expect.objectContaining({ value: [1] }));
  });

  test('multiple onChange toggle with valueKey reduce', () => {
    const onChange = jest.fn();
    const Test = () => {
      const [value] = React.useState([1]);
      return (
        <Select
          id="test-select"
          placeholder="test select"
          labelKey="name"
          valueKey={{ key: 'id', reduce: true }}
          value={value}
          multiple
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
    expect(onChange).toBeCalledWith(expect.objectContaining({ value: [] }));
  });

  test('multiple with empty results', () => {
    const { getByPlaceholderText, container } = render(
      <Grommet>
        <Select
          id="test-select"
          placeholder="test select"
          options={['one', 'two']}
          multiple
          value={[]}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByPlaceholderText('test select'));
    expectPortal('test-select__drop').toMatchSnapshot();
  });

  test('should allow multiple selections when using search', () => {
    jest.useFakeTimers();
    const onChange = jest.fn();
    const onSearch = jest.fn();
    const defaultOptions = [
      {
        id: 1,
        name: 'Value1',
      },
      {
        id: 2,
        name: 'Value2',
      },
      {
        id: 15,
        name: 'Value15',
      },
      {
        id: 21,
        name: 'Value21',
      },
      {
        id: 22,
        name: 'Value22',
      },
    ];

    const Test = () => {
      const [value, setValue] = React.useState();
      const [options, setOptions] = React.useState(defaultOptions);

      return (
        <Select
          id="test-select-mult-search"
          placeholder="Select multiple options"
          multiple
          valueKey="id"
          labelKey="name"
          value={value}
          options={options}
          onChange={({ value: nextValue }) => {
            onChange(nextValue);
            setValue(nextValue);
          }}
          onClose={() => setOptions(defaultOptions)}
          onSearch={(text) => {
            onSearch(text);
            const nextOptions = defaultOptions.filter(
              (option) =>
                option.name.toLowerCase().indexOf(text.toLowerCase()) >= 0,
            );
            setOptions(nextOptions);
          }}
        />
      );
    };
    const { getByPlaceholderText, getByText } = render(
      <Grommet>
        <Test />
      </Grommet>,
    );

    const selectInput = getByPlaceholderText('Select multiple options');
    fireEvent.click(selectInput);
    // advance timers so select can open & have focus
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // focus is on search input, searching...
    fireEvent.change(document.activeElement, { target: { value: '1' } });
    expect(onSearch).toHaveBeenNthCalledWith(1, '1');
    // make first selection
    fireEvent.click(getByText('Value15'));
    fireEvent.click(selectInput);
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // searching again
    fireEvent.change(document.activeElement, { target: { value: '2' } });
    expect(onSearch).toHaveBeenNthCalledWith(2, '2');
    // make second selection
    fireEvent.click(getByText('Value21'));
    expect(onChange).toHaveBeenNthCalledWith(2, [
      { id: 15, name: 'Value15' },
      { id: 21, name: 'Value21' },
    ]);

    fireEvent.click(selectInput);
    act(() => {
      jest.advanceTimersByTime(200);
    });
    // remove previous selection
    fireEvent.click(getByText('Value15'));
    expect(onChange).toHaveBeenNthCalledWith(3, [{ id: 21, name: 'Value21' }]);
  });

  test(`should allow multiple selections when options are
  loaded lazily`, () => {
    jest.useFakeTimers();
    const onChange = jest.fn();
    const optionsFromServer = [
      {
        id: 1,
        name: 'Value1',
      },
      {
        id: 2,
        name: 'Value2',
      },
      {
        id: 15,
        name: 'Value15',
      },
      {
        id: 21,
        name: 'Value21',
      },
      {
        id: 22,
        name: 'Value22',
      },
    ];

    const Test = () => {
      const [value, setValue] = React.useState();
      const [options, setOptions] = React.useState([]);

      // get options from mock server
      React.useEffect(() => {
        setTimeout(() => {
          setOptions(optionsFromServer);
        }, 1000);
      }, []);

      return (
        <Select
          id="test-select-mult-lazy"
          placeholder="Select multiple lazyload options"
          multiple
          valueKey="id"
          labelKey="name"
          value={value}
          options={options}
          onChange={({ value: nextValue }) => {
            onChange(nextValue);
            setValue(nextValue);
          }}
        />
      );
    };
    const { getByPlaceholderText, getByText } = render(
      <Grommet>
        <Test />
      </Grommet>,
    );

    const selectInput = getByPlaceholderText(
      'Select multiple lazyload options',
    );
    fireEvent.click(selectInput);
    // advance timers so that options have been returned
    act(() => {
      jest.advanceTimersByTime(1100);
    });
    fireEvent.click(getByText('Value15'));
    expect(onChange).toHaveBeenNthCalledWith(1, [{ id: 15, name: 'Value15' }]);
    fireEvent.click(selectInput);
    fireEvent.click(getByText('Value22'));
    expect(onChange).toHaveBeenNthCalledWith(2, [
      { id: 15, name: 'Value15' },
      { id: 22, name: 'Value22' },
    ]);
  });

  window.scrollTo.mockRestore();
});
