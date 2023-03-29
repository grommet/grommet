import React from 'react';
import 'jest-styled-components';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';
import { Calendar as CalendarIcon, Clock as ClockIcon } from 'grommet-icons';

import { createPortal, expectPortal } from '../../../utils/portal';
import { Grommet } from '../../Grommet';
import { Button } from '../../Button';
import { DateInput } from '..';
import { Form } from '../../Form';
import { FormField } from '../../FormField';

const DATE = '2020-07-02T00:00:00-08:00';
const DATE_FIRST = '2020-07-01T00:00:00-08:00';
const DATES = ['2020-07-02T00:00:00-08:00', '2020-07-07T00:00:00-08:00'];
const DATE_NOTZ = '2020-07-02';
const DATES_NOTZ = ['2020-07-02', '2020-07-07'];

describe('DateInput', () => {
  beforeEach(createPortal);

  test('should reset date if passed empty string', async () => {
    const Test = () => {
      const [value, setValue] = React.useState(DATE);
      return (
        <Grommet>
          <DateInput
            id="item"
            name="item"
            format="mm/dd/yyyy"
            value={value}
            inline
          />
          <Button label="Reset Date" onClick={() => setValue('')} />
        </Grommet>
      );
    };
    const { container, getByText } = render(<Test />);
    let dateInputValue = (container.querySelector('#item') as HTMLInputElement)
      .value;

    expect(dateInputValue).not.toEqual('');
    fireEvent.click(getByText('Reset Date'));
    dateInputValue = (container.querySelector('#item') as HTMLInputElement)
      .value;
    expect(dateInputValue).toEqual('');
  });

  test('should reset date if passed an []', async () => {
    const Test = () => {
      const [value, setValue] = React.useState(DATES);
      return (
        <Grommet>
          <DateInput
            id="item"
            name="item"
            format="mm/dd/yyyy"
            value={value}
            inline
          />
          <Button label="Reset Date" onClick={() => setValue([])} />
        </Grommet>
      );
    };
    const { container, getByText } = render(<Test />);
    let dateInputValue = (container.querySelector('#item') as HTMLInputElement)
      .value;

    expect(dateInputValue).not.toEqual('');
    fireEvent.click(getByText('Reset Date'));
    dateInputValue = (container.querySelector('#item') as HTMLInputElement)
      .value;
    expect(dateInputValue).toEqual('');
  });

  test('should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <DateInput format="mm/dd/yyyy" />
      </Grommet>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should handle typing date and clicking date simultaneously', async () => {
    const user = userEvent.setup();

    const TestComponent = () => {
      const [value, setValue] = React.useState([]);
      return (
        <Grommet>
          <DateInput
            id="item"
            name="item"
            format="mm/dd/yyyy-mm/dd/yyyy"
            onChange={(event) => {
              setValue(event.value as any);
            }}
            inline
            value={value}
          />
        </Grommet>
      );
    };

    render(<TestComponent />);

    const input = screen.getByRole('textbox');

    await user.type(input, '01/01/2022');
    expect(input).toHaveValue('01/01/2022');
    const button = screen.queryAllByText('1');

    await user.click(button[0]);
    expect(input).toHaveValue('');
  });

  test('basic', () => {
    const { container } = render(
      <Grommet>
        <DateInput id="item" name="item" value={DATE} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('format', () => {
    const { container } = render(
      <Grommet>
        <DateInput id="item" name="item" format="mm/dd/yyyy" value={DATE} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('format with date bounds', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="mm/dd/yyyy"
          calendarProps={{
            bounds: ['2022-11-10', '2022-11-20'],
          }}
        />
      </Grommet>,
    );

    const input = screen.getByRole('textbox');

    await user.type(input, '09/09/2022');
    expect(input).not.toHaveValue();

    await user.clear(input);
    await user.type(input, '11/15/2022');
    expect(input).toHaveValue('11/15/2022');
  });

  test('reverse calendar icon', () => {
    const { container } = render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="dd/mm/yyyy"
          reverse
          value={DATES}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('input props reverse as false', () => {
    const { container } = render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="dd/mm/yyyy"
          inputProps={{ reverse: false }}
          value={DATES}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('input props reverse as true', () => {
    const { container } = render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="dd/mm/yyyy"
          inputProps={{ reverse: true }}
          value={DATES}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('input props reverse as false with icon', () => {
    const { container } = render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="dd/mm/yyyy"
          icon={<ClockIcon />}
          inputProps={{ reverse: false }}
          value={DATES}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('input props reverse as true with icon', () => {
    const { container } = render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="dd/mm/yyyy"
          icon={<ClockIcon />}
          inputProps={{ reverse: true }}
          value={DATES}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('inline', () => {
    const { container } = render(
      <Grommet>
        <DateInput id="item" name="item" inline value={DATE} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('format inline', () => {
    const { container } = render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="mm/dd/yyyy"
          inline
          value={DATE}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('format disabled', () => {
    const { container } = render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="mm/dd/yyyy"
          disabled
          value={DATE}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('range', () => {
    const { container } = render(
      <Grommet>
        <DateInput id="item" name="item" value={DATES} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('range inline', () => {
    const { container } = render(
      <Grommet>
        <DateInput id="item" name="item" value={DATES} inline />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('range format', () => {
    const { container } = render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="mm/dd/yyyy-mm/dd/yyyy"
          value={DATES}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('range format no value', () => {
    render(
      <Grommet>
        <DateInput id="item" name="item" format="mm/dd/yyyy-mm/dd/yyyy" />
      </Grommet>,
    );

    expect(screen.queryByRole('button', { name: /Calendar/ })).not.toBeNull();
  });

  test('range format inline', () => {
    const { container } = render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="mm/dd/yyyy-mm/dd/yyyy"
          value={DATES}
          inline
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('range format with date bounds', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="mm/dd/yyyy-mm/dd/yyyy"
          calendarProps={{
            bounds: ['2022-11-10', '2022-11-20'],
          }}
        />
      </Grommet>,
    );

    const input = screen.getByRole('textbox');

    await user.type(input, '09/09/2022-09/09/2022');
    expect(input).not.toHaveValue();

    await user.clear(input);
    await user.type(input, '11/15/2022-11/15/2022');
    expect(input).toHaveValue('11/15/2022-11/15/2022');
  });

  test('dates initialized with empty array', async () => {
    const user = userEvent.setup();

    const onChange = jest.fn((event) => event.value);

    const { getByText } = render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          defaultValue={[]}
          inline
          onChange={onChange}
          calendarProps={{
            reference: DATE,
          }}
        />
      </Grommet>,
    );
    await user.click(getByText('20'));
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveReturnedWith([
      `2020-07-20T08:00:00.000Z`,
      `2020-07-20T08:00:00.000Z`,
    ]);
  });

  test('focus', () => {
    const onFocus = jest.fn();
    const { container, getByPlaceholderText } = render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="mm/dd/yyyy"
          value={DATE}
          onFocus={onFocus}
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.focus(getByPlaceholderText('mm/dd/yyyy'));
    expect(onFocus).toHaveBeenCalled();

    fireEvent.keyDown(getByPlaceholderText('mm/dd/yyyy'), {
      key: 'Space',
      keyCode: 32,
      which: 32,
    });
    expect(document.getElementById('item__drop')).not.toBeNull();
  });

  test('click', async () => {
    const user = userEvent.setup();

    const { getByPlaceholderText } = render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="mm/dd/yyyy"
          value={DATE}
          onFocus={() => {}}
        />
      </Grommet>,
    );

    await user.click(getByPlaceholderText('mm/dd/yyyy'));
    expect(document.getElementById('item__drop')).toBeNull();
  });

  test('select inline', () => {
    const onChange = jest.fn((event) => event.value);
    const { container, getByText } = render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          defaultValue={DATE}
          inline
          onChange={onChange}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByText('20'));
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveReturnedWith('2020-07-20T08:00:00.000Z');
  });

  test('select inline without timezone', () => {
    const onChange = jest.fn((event) => event.value);
    const { container, getByText } = render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          defaultValue={DATE_NOTZ}
          inline
          onChange={onChange}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByText('20'));
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveReturnedWith('2020-07-20');
  });

  test('select format inline', () => {
    const onChange = jest.fn((event) => event.value);
    const { container, getByText } = render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="mm/dd/yyyy"
          defaultValue={DATE}
          inline
          onChange={onChange}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByText('20'));
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveReturnedWith('2020-07-20T08:00:00.000Z');
    expect(container.firstChild).toMatchSnapshot();
  });

  test('select format inline', () => {
    const onChange = jest.fn((event) => event.value);
    const { asFragment, getByText } = render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="mm/dd/yyyy"
          defaultValue={DATE_NOTZ}
          inline
          onChange={onChange}
        />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();

    fireEvent.click(getByText('20'));
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveReturnedWith('2020-07-20');
    expect(asFragment()).toMatchSnapshot();
  });

  test('select format', () => {
    const onChange = jest.fn((event) => event.value);
    const { container, getByPlaceholderText, getByText } = render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="mm/dd/yyyy"
          defaultValue={DATE}
          onChange={onChange}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.focus(getByPlaceholderText('mm/dd/yyyy'));
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.keyDown(getByPlaceholderText('mm/dd/yyyy'), {
      key: 'Space',
      keyCode: 32,
      which: 32,
    });
    expectPortal('item__drop').toMatchSnapshot();

    fireEvent.click(getByText('20'));
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveReturnedWith('2020-07-20T08:00:00.000Z');
    expect(document.getElementById('item__drop')).toBeNull();
  });

  test('select format no timezone', () => {
    const onChange = jest.fn((event) => event.value);
    const { asFragment, getByPlaceholderText, getByText } = render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="mm/dd/yyyy"
          defaultValue={DATE_NOTZ}
          onChange={onChange}
        />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();

    fireEvent.focus(getByPlaceholderText('mm/dd/yyyy'));
    expect(asFragment()).toMatchSnapshot();
    fireEvent.keyDown(getByPlaceholderText('mm/dd/yyyy'), {
      key: 'Space',
      keyCode: 32,
      which: 32,
    });
    expectPortal('item__drop').toMatchSnapshot();

    fireEvent.click(getByText('20'));
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveReturnedWith('2020-07-20');
    expect(document.getElementById('item__drop')).toBeNull();
  });

  test('type format inline', () => {
    const onChange = jest.fn((event) => event.value);
    const { container, getByPlaceholderText } = render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="mm/dd/yyyy"
          defaultValue={DATE}
          inline
          onChange={onChange}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.change(getByPlaceholderText('mm/dd/yyyy'), {
      target: { value: '07/21/2020' },
    });
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveReturnedWith('2020-07-21T08:00:00.000Z');
    expect(container.firstChild).toMatchSnapshot();
  });

  test('type format inline without timezone', () => {
    const onChange = jest.fn((event) => event.value);
    const { asFragment, getByPlaceholderText } = render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="mm/dd/yyyy"
          defaultValue={DATE_NOTZ}
          inline
          onChange={onChange}
        />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();

    fireEvent.change(getByPlaceholderText('mm/dd/yyyy'), {
      target: { value: '07/21/2020' },
    });
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveReturnedWith('2020-07-21');
    expect(asFragment()).toMatchSnapshot();
  });

  test('type format inline short', () => {
    const onChange = jest.fn((event) => event.value);
    const { container, getByPlaceholderText } = render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="m/d/yy"
          defaultValue={DATE}
          inline
          onChange={onChange}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.change(getByPlaceholderText('m/d/yy'), {
      target: { value: '7/21/20' },
    });

    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveReturnedWith('2020-07-21T08:00:00.000Z');
    expect(container.firstChild).toMatchSnapshot();
  });

  test('type format inline short without timezone', () => {
    const onChange = jest.fn((event) => event.value);
    const { asFragment, getByPlaceholderText } = render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="m/d/yy"
          defaultValue={DATE_NOTZ}
          inline
          onChange={onChange}
        />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();

    fireEvent.change(getByPlaceholderText('m/d/yy'), {
      target: { value: '7/21/20' },
    });

    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveReturnedWith('2020-07-21');
    expect(asFragment()).toMatchSnapshot();
  });

  test('type format inline partial', () => {
    const onChange = jest.fn((event) => event.value);
    const { container, getByPlaceholderText } = render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="mm/dd/yyyy"
          defaultValue={DATE}
          inline
          onChange={onChange}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.change(getByPlaceholderText('mm/dd/yyyy'), {
      target: { value: '07/21/202' },
    });
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveReturnedWith(undefined);
    // cannot check snapshot here as it will be relative to the current date
  });

  test('type format inline partial without timezone', () => {
    const onChange = jest.fn((event) => event.value);
    const { asFragment, getByPlaceholderText } = render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="mm/dd/yyyy"
          defaultValue={DATE_NOTZ}
          inline
          onChange={onChange}
        />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();

    fireEvent.change(getByPlaceholderText('mm/dd/yyyy'), {
      target: { value: '07/21/202' },
    });
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveReturnedWith(undefined);
    // cannot check snapshot here as it will be relative to the current date
  });

  test('select format inline range', () => {
    const onChange = jest.fn((event) => event.value);
    const { container, getByText } = render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="mm/dd/yyyy-mm/dd/yyyy"
          defaultValue={DATES}
          inline
          onChange={onChange}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    // new calendar logic adjust start date by default
    fireEvent.click(getByText('10'));
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveReturnedWith([
      '2020-07-10T08:00:00.000Z',
      '2020-07-10T08:00:00.000Z',
    ]);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('select format inline range without timezone', () => {
    const onChange = jest.fn((event) => event.value);
    const { asFragment, getByText } = render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="mm/dd/yyyy-mm/dd/yyyy"
          defaultValue={DATES_NOTZ}
          inline
          onChange={onChange}
        />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();

    // new calendar logic adjust start date by default
    fireEvent.click(getByText('10'));
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveReturnedWith(['2020-07-10', '2020-07-10']);
    expect(asFragment()).toMatchSnapshot();
  });

  test('type format inline range', () => {
    const onChange = jest.fn((event) => event.value);
    const { container, getByPlaceholderText } = render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="mm/dd/yyyy-mm/dd/yyyy"
          defaultValue={DATES}
          inline
          onChange={onChange}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.change(getByPlaceholderText('mm/dd/yyyy-mm/dd/yyyy'), {
      target: { value: '07/21/2020-07/23/2020' },
    });
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveReturnedWith([
      '2020-07-21T08:00:00.000Z',
      '2020-07-23T08:00:00.000Z',
    ]);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('type format inline range without timezone', () => {
    const onChange = jest.fn((event) => event.value);
    const { asFragment, getByPlaceholderText } = render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="mm/dd/yyyy-mm/dd/yyyy"
          defaultValue={DATES_NOTZ}
          inline
          onChange={onChange}
        />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();

    fireEvent.change(getByPlaceholderText('mm/dd/yyyy-mm/dd/yyyy'), {
      target: { value: '07/21/2020-07/23/2020' },
    });
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveReturnedWith(['2020-07-21', '2020-07-23']);
    expect(asFragment()).toMatchSnapshot();
  });

  test('type format inline range partial', () => {
    const onChange = jest.fn((event) => event.value);
    const { container, getByPlaceholderText } = render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="mm/dd/yyyy-mm/dd/yyyy"
          defaultValue={DATES}
          inline
          onChange={onChange}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.change(getByPlaceholderText('mm/dd/yyyy-mm/dd/yyyy'), {
      target: { value: '07/21/2020-07' },
    });
    expect(onChange).toHaveNthReturnedWith(1, ['2020-07-21T08:00:00.000Z']);
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.change(getByPlaceholderText('mm/dd/yyyy-mm/dd/yyyy'), {
      target: { value: '07/21/2020-' },
    });
    expect(onChange).toHaveNthReturnedWith(2, ['2020-07-21T08:00:00.000Z']);
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.change(getByPlaceholderText('mm/dd/yyyy-mm/dd/yyyy'), {
      target: { value: '07//2020-07/27/2021' },
    });
    // cannot check snapshot here as it will be relative to the current date

    expect(onChange).toHaveBeenCalledTimes(2);
  });

  test('type format inline range partial without timezone', () => {
    const onChange = jest.fn((event) => event.value);
    const { asFragment, getByPlaceholderText } = render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="mm/dd/yyyy-mm/dd/yyyy"
          defaultValue={DATES_NOTZ}
          inline
          onChange={onChange}
        />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();

    fireEvent.change(getByPlaceholderText('mm/dd/yyyy-mm/dd/yyyy'), {
      target: { value: '07/21/2020-07' },
    });
    expect(onChange).toHaveNthReturnedWith(1, ['2020-07-21']);
    expect(asFragment()).toMatchSnapshot();

    fireEvent.change(getByPlaceholderText('mm/dd/yyyy-mm/dd/yyyy'), {
      target: { value: '07/21/2020-' },
    });
    expect(onChange).toHaveNthReturnedWith(2, ['2020-07-21']);
    expect(asFragment()).toMatchSnapshot();

    fireEvent.change(getByPlaceholderText('mm/dd/yyyy-mm/dd/yyyy'), {
      target: { value: '07//2020-07/27/2021' },
    });
    // cannot check snapshot here as it will be relative to the current date

    expect(onChange).toHaveBeenCalledTimes(2);
  });

  test('controlled format inline', () => {
    const onChange = jest.fn((event) => event.value);
    const Test = () => {
      const [value, setValue] = React.useState(DATE);
      return (
        <Grommet>
          <DateInput
            id="item"
            name="item"
            format="mm/dd/yyyy"
            value={value}
            inline
            onChange={onChange}
          />
          <Button label="first" onClick={() => setValue(DATE_FIRST)} />
        </Grommet>
      );
    };
    const { container, getByDisplayValue, getByText } = render(<Test />);
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByText('first'));
    expect(getByDisplayValue('07/01/2020')).not.toBeNull();
    expect(container.firstChild).toMatchSnapshot();
    expect(onChange).not.toHaveBeenCalled();
  });

  test('controlled format inline without timezone', () => {
    const onChange = jest.fn((event) => event.value);
    const Test = () => {
      const [value, setValue] = React.useState(DATE_NOTZ);
      return (
        <Grommet>
          <DateInput
            id="item"
            name="item"
            format="mm/dd/yyyy"
            value={value}
            inline
            onChange={onChange}
          />
          <Button label="first" onClick={() => setValue(DATE_FIRST)} />
        </Grommet>
      );
    };
    const { asFragment, getByDisplayValue, getByText } = render(<Test />);
    expect(asFragment()).toMatchSnapshot();

    fireEvent.click(getByText('first'));
    expect(getByDisplayValue('07/01/2020')).not.toBeNull();
    expect(asFragment()).toMatchSnapshot();
    expect(onChange).not.toHaveBeenCalled();
  });

  test('should be displayed when value is controlled', async () => {
    const Test = () => {
      const [value, setValue] = React.useState<string[] | []>([]);
      return (
        <Grommet>
          <DateInput
            id="item"
            name="item"
            format="mm/dd/yyyy-mm/dd/yyyy"
            value={value}
            inline
          />
          <Button label="Set Date" onClick={() => setValue(DATES)} />
        </Grommet>
      );
    };
    const { container, getByText } = render(<Test />);
    let dateInputValue = (container.querySelector('#item') as HTMLInputElement)
      .value;

    expect(dateInputValue).toEqual('');
    fireEvent.click(getByText('Set Date'));
    dateInputValue = (container.querySelector('#item') as HTMLInputElement)
      .value;
    expect(dateInputValue).toEqual('07/02/2020-07/07/2020');
  });

  test('should be displayed when value is controlled without timezone', async () => {
    const Test = () => {
      const [value, setValue] = React.useState<string[] | []>([]);
      return (
        <Grommet>
          <DateInput
            id="item"
            name="item"
            format="mm/dd/yyyy-mm/dd/yyyy"
            value={value}
            inline
          />
          <Button label="Set Date" onClick={() => setValue(DATES_NOTZ)} />
        </Grommet>
      );
    };
    const { container, getByText } = render(<Test />);
    let dateInputValue = (container.querySelector('#item') as HTMLInputElement)
      .value;

    expect(dateInputValue).toEqual('');
    fireEvent.click(getByText('Set Date'));
    dateInputValue = (container.querySelector('#item') as HTMLInputElement)
      .value;
    expect(dateInputValue).toEqual('07/02/2020-07/07/2020');
  });

  test(`dropProps should pass props to Drop
  when not inline`, () => {
    const { container } = render(
      <Grommet>
        <DateInput
          dropProps={{
            plain: true,
          }}
          format="mm/dd/yyyy"
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test(`buttonProps should pass props to Button
  when not inline and no format`, () => {
    window.scrollTo = jest.fn();
    const { container } = render(
      <Grommet>
        <DateInput
          buttonProps={{
            disabled: true,
          }}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('disabled', () => {
    const { container } = render(
      <Grommet>
        <DateInput disabled />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders size', () => {
    const { container } = render(
      <Grommet>
        <DateInput size="xsmall" />
        <DateInput size="small" />
        <DateInput size="medium" />
        <DateInput size="large" />
        <DateInput size="xlarge" />
        <DateInput size="xxlarge" />
        <DateInput size="2xl" />
        <DateInput size="3xl" />
        <DateInput size="4xl" />
        <DateInput size="5xl" />
        <DateInput size="6xl" />
        <DateInput size="16px" />
        <DateInput size="1rem" />
        <DateInput size="100%" />
      </Grommet>,
    );
    expect(container.children).toMatchSnapshot();
  });

  test('clicking calendar icon should open drop', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateInput format="m/d/yy" defaultValue="2021-01-01" />
      </Grommet>,
    );
    expect(
      screen.queryByRole('heading', { name: /January 2021/i }),
    ).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Calendar/i }));
    expect(
      screen.getByRole('heading', { name: /January 2021/i }),
    ).toBeInTheDocument();
  });

  test('handle focus in FormField', async () => {
    const user = userEvent.setup();

    const onFocus = jest.fn();
    const { asFragment } = render(
      <Grommet>
        <Form>
          <FormField>
            <DateInput format="mm/dd/yyyy" onFocus={onFocus} />
          </FormField>
        </Form>
      </Grommet>,
    );
    await user.tab();
    expect(asFragment()).toMatchSnapshot();
    await user.tab();
    expect(asFragment()).toMatchSnapshot();
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  test('icon', () => {
    const { container } = render(
      <DateInput icon={<CalendarIcon color="red" />} name="item" />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('custom theme', () => {
    const customTheme = {
      dateInput: {
        container: {
          round: 'xsmall',
        },
      },
    };
    const { asFragment } = render(
      <Grommet theme={customTheme}>
        <DateInput format="mm/dd/yyyy" />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('matches icon size to size prop when theme.icon.matchSize is true', () => {
    const theme = {
      icon: {
        matchSize: true,
      },
    };

    const { asFragment } = render(
      <Grommet theme={theme}>
        <DateInput size="small" format="mm/dd/yyyy" />
        <DateInput format="mm/dd/yyyy" />
        <DateInput size="large" format="mm/dd/yyyy" />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
