import React from 'react';
import 'jest-styled-components';
import { cleanup, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { createPortal, expectPortal } from '../../../utils/portal';
import { Grommet } from '../../Grommet';
import { Button } from '../../Button';
import { DateInput } from '..';

const DATE = '2020-07-02T00:00:00-08:00';
const DATE_FIRST = '2020-07-01T00:00:00-08:00';
const DATES = ['2020-07-02T00:00:00-08:00', '2020-07-07T00:00:00-08:00'];

describe('DateInput', () => {
  beforeEach(createPortal);

  afterEach(cleanup);

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

  test('dates initialized with empty array', () => {
    const onChange = jest.fn((event) => event.value);
    // month is indexed from 0, so we add one
    let month: string | number = new Date().getMonth() + 1;
    if (month < 10) month = `0${month}`;

    const year = new Date().getFullYear();

    let timezoneOffset: string | number = new Date().getTimezoneOffset() / 60;
    if (timezoneOffset < 10) timezoneOffset = `0${timezoneOffset}`;

    const { getByText } = render(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          defaultValue={[]}
          inline
          onChange={onChange}
        />
      </Grommet>,
    );
    // cannot use snapshots because we are using current date

    fireEvent.click(getByText('20'));
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveReturnedWith([
      `${year}-${month}-20T${timezoneOffset}:00:00.000Z`,
      `${year}-${month}-20T${timezoneOffset}:00:00.000Z`,
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

  test('click', () => {
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

    userEvent.click(getByPlaceholderText('mm/dd/yyyy'));
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
    expect(onChange).toHaveNthReturnedWith(3, []);
    // cannot check snapshot here as it will be relative to the current date

    expect(onChange).toHaveBeenCalledTimes(3);
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
});
