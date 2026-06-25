import React from 'react';
import 'jest-styled-components';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import '@testing-library/jest-dom';

import { Grommet } from '../../Grommet';
import { Form } from '../../Form';
import { FormField } from '../../FormField';
import { TimeInput } from '..';

const getOpenButton = () =>
  screen.getByRole('button', { name: /open time picker|close time picker/i });

const isBefore = (first: Element, second: Element) =>
  Boolean(
    first.compareDocumentPosition(second) & Node.DOCUMENT_POSITION_FOLLOWING,
  );

describe('TimeInput', () => {
  test('should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <TimeInput timeFormat="24hr" />
      </Grommet>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(
      <Grommet>
        <TimeInput id="timeinput-snapshot" timeFormat="24hr" value="09:30" />
      </Grommet>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('emits normalized 24hr value when a complete time is typed', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(
      <Grommet>
        <TimeInput timeFormat="24hr" onChange={onChange} />
      </Grommet>,
    );

    const input = screen.getByRole('textbox');
    await user.type(input, '9:05');

    expect(onChange).toHaveBeenCalled();
    const [{ value }] = onChange.mock.calls[onChange.mock.calls.length - 1];
    expect(value).toBe('09:05');
  });

  test('emits normalized 12hr value', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(
      <Grommet>
        <TimeInput timeFormat="12hr" onChange={onChange} />
      </Grommet>,
    );

    const input = screen.getByRole('textbox');
    await user.type(input, '9:05 pm');

    expect(onChange).toHaveBeenCalled();
    const [{ value }] = onChange.mock.calls[onChange.mock.calls.length - 1];
    expect(value).toBe('09:05 PM');
  });

  test('renders TimeInput with Form integration', () => {
    render(
      <Grommet>
        <Form>
          <FormField name="startTime" htmlFor="startTime" required>
            <TimeInput id="startTime" name="startTime" timeFormat="24hr" />
          </FormField>
        </Form>
      </Grommet>,
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  test('respects minuteStep for typed values', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(
      <Grommet>
        <TimeInput timeFormat="24hr" minuteStep={15} onChange={onChange} />
      </Grommet>,
    );

    const input = screen.getByRole('textbox');
    await user.type(input, '09:07');

    expect(onChange).not.toHaveBeenCalled();
  });

  test('renders a right-side clock icon by default', () => {
    const { container } = render(
      <Grommet>
        <TimeInput timeFormat="24hr" />
      </Grommet>,
    );

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  test('receives keyboard focus via tab navigation', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput timeFormat="24hr" />
      </Grommet>,
    );

    const input = screen.getByRole('textbox');
    expect(input).not.toHaveFocus();

    await user.tab();

    expect(input).toHaveFocus();
    expect(screen.getByTestId('timeinput-picker-hours')).toBeInTheDocument();
  });

  test('clock icon is interactive via icon button', async () => {
    const user = userEvent.setup();
    render(
      <Grommet>
        <TimeInput timeFormat="24hr" />
      </Grommet>,
    );

    expect(
      screen.queryByTestId('timeinput-picker-hours'),
    ).not.toBeInTheDocument();
    await user.click(getOpenButton());

    expect(screen.getByTestId('timeinput-picker-hours')).toBeInTheDocument();
  });

  test('toggle button exposes popup state via aria-expanded', async () => {
    const user = userEvent.setup();
    render(
      <Grommet>
        <TimeInput id="time-input" timeFormat="24hr" />
      </Grommet>,
    );

    const toggleButton = getOpenButton();
    expect(toggleButton).toHaveAttribute('aria-haspopup', 'listbox');
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(toggleButton).toHaveAttribute('aria-controls', 'time-input__drop');

    await user.click(toggleButton);

    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('timeinput-picker-hours')).toBeInTheDocument();
  });

  test('does not open picker on focus when openOnFocus is false', async () => {
    const user = userEvent.setup();
    render(
      <Grommet>
        <TimeInput timeFormat="24hr" openOnFocus={false} />
      </Grommet>,
    );

    const input = screen.getByRole('textbox');
    await user.click(input);

    expect(
      screen.queryByTestId('timeinput-picker-hours'),
    ).not.toBeInTheDocument();
  });

  test('renders toggle button before input when reverse is true', () => {
    render(
      <Grommet>
        <TimeInput timeFormat="24hr" reverse />
      </Grommet>,
    );

    const input = screen.getByRole('textbox');
    const button = getOpenButton();

    expect(isBefore(button, input)).toBe(true);
  });

  test('selecting picker values updates input value', async () => {
    const user = userEvent.setup();
    render(
      <Grommet>
        <TimeInput timeFormat="12hr" showSeconds />
      </Grommet>,
    );

    const input = screen.getByRole('textbox');
    await user.click(getOpenButton());

    const hoursColumn = screen.getByTestId('timeinput-picker-hours');
    const minutesColumn = screen.getByTestId('timeinput-picker-minutes');
    const secondsColumn = screen.getByTestId('timeinput-picker-seconds');
    const periodColumn = screen.getByTestId('timeinput-picker-period');

    await user.click(within(hoursColumn).getByRole('option', { name: '09' }));
    await user.click(within(minutesColumn).getByRole('option', { name: '30' }));
    await user.click(within(secondsColumn).getByRole('option', { name: '45' }));
    await user.click(within(periodColumn).getByRole('option', { name: 'pm' }));

    expect(input).toHaveValue('09:30:45 PM');
  });

  test('12 hour picker shows 12 as the first hour option', async () => {
    const user = userEvent.setup();
    render(
      <Grommet>
        <TimeInput timeFormat="12hr" />
      </Grommet>,
    );

    await user.click(getOpenButton());

    const hoursColumn = screen.getByTestId('timeinput-picker-hours');
    const options = within(hoursColumn).getAllByRole('option');

    expect(options[0]).toHaveTextContent('12');
  });

  test('up/down arrows select values in active segment', async () => {
    const user = userEvent.setup();
    render(
      <Grommet>
        <TimeInput timeFormat="24hr" value="23:01" />
      </Grommet>,
    );

    const input = screen.getByRole('textbox');
    await user.click(input);

    await user.keyboard('{ArrowDown}');
    expect(input).toHaveValue('00:01');

    await user.keyboard('{ArrowUp}');
    expect(input).toHaveValue('23:01');
  });

  test('left/right arrows switch segment and adjust minute values', async () => {
    const user = userEvent.setup();
    render(
      <Grommet>
        <TimeInput timeFormat="24hr" value="23:01" />
      </Grommet>,
    );

    const input = screen.getByRole('textbox');
    await user.click(input);

    await user.keyboard('{ArrowRight}');
    await user.keyboard('{ArrowDown}');
    expect(input).toHaveValue('23:02');

    await user.keyboard('{ArrowUp}');
    expect(input).toHaveValue('23:01');
  });
});
