import React from 'react';
import 'jest-styled-components';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import '@testing-library/jest-dom';

import { Grommet } from '../../Grommet';
import { Form } from '../../Form';
import { FormField } from '../../FormField';
import { TimeInput } from '..';

describe('TimeInput', () => {
  test('should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <TimeInput timeFormat="24hr" />
      </Grommet>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  test('emits normalized 24hr value when a complete time is typed', async () => {
    const onChange = jest.fn();

    render(
      <Grommet>
        <TimeInput timeFormat="24hr" onChange={onChange} />
      </Grommet>,
    );

    const input = screen.getByPlaceholderText('hh : mm');
    fireEvent.change(input, { target: { value: '09:05' } });

    expect(onChange).toHaveBeenCalled();
    const [{ value }] = onChange.mock.calls[onChange.mock.calls.length - 1];
    expect(value).toBe('09:05');
  });

  test('emits normalized 12hr value', async () => {
    const onChange = jest.fn();

    render(
      <Grommet>
        <TimeInput timeFormat="12hr" onChange={onChange} />
      </Grommet>,
    );

    const input = screen.getByPlaceholderText('hh : mm am');
    fireEvent.change(input, { target: { value: '09:05 PM' } });

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

    const input = screen.getByPlaceholderText('hh : mm');
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

    const input = screen.getByPlaceholderText('hh : mm');
    await user.type(input, '09:07');

    expect(onChange).not.toHaveBeenCalled();
  });

  test('does not open picker on focus by default', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput timeFormat="24hr" />
      </Grommet>,
    );

    const input = screen.getByPlaceholderText('hh : mm');
    await user.click(input);

    expect(screen.queryByRole('listbox', { name: 'Hours' })).toBeNull();
  });

  test('opens picker on focus when openOnFocus is true', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput timeFormat="24hr" defaultValue="12:00" openOnFocus />
      </Grommet>,
    );

    const input = screen.getByPlaceholderText('hh : mm');
    await user.click(input);

    expect(screen.getByRole('listbox', { name: 'Hours' })).toBeInTheDocument();
  });

  test('preserves caret when formatting typed value', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput timeFormat="24hr" />
      </Grommet>,
    );

    const input = screen.getByPlaceholderText('hh : mm') as HTMLInputElement;

    await user.click(input);
    await user.type(input, '1');

    expect(input.selectionStart).toBe(1);
    expect(input.selectionEnd).toBe(1);
  });

  test('keeps active segment selection when using arrow keys', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput timeFormat="24hr" />
      </Grommet>,
    );

    const input = screen.getByPlaceholderText('hh : mm') as HTMLInputElement;
    const toggleButton = screen.getByLabelText('Open time picker');

    await user.click(input);
    await user.type(input, '12:00');
    await user.click(toggleButton);
    await user.click(input);
    input.setSelectionRange(0, 2);

    await user.keyboard('{ArrowUp}');

    await waitFor(() => {
      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(3);
    });
  });

  test('increments and decrements hour with arrow keys when picker is closed', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput timeFormat="24hr" />
      </Grommet>,
    );

    const input = screen.getByPlaceholderText('hh : mm') as HTMLInputElement;

    await user.click(input);
    fireEvent.change(input, { target: { value: '12:00' } });
    input.setSelectionRange(0, 2);

    await user.keyboard('{ArrowUp}');
    await waitFor(() => {
      expect(input.value).toBe('13 : 00');
      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(3);
    });

    await user.keyboard('{ArrowDown}');
    await waitFor(() => {
      expect(input.value).toBe('12 : 00');
      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(3);
    });
  });

  test('does not change value with arrow keys when readOnly', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput timeFormat="24hr" value="12:00" readOnly />
      </Grommet>,
    );

    const input = screen.getByDisplayValue('12 : 00') as HTMLInputElement;

    await user.click(input);
    input.setSelectionRange(0, 2);
    await user.keyboard('{ArrowUp}');
    await user.keyboard('{ArrowDown}');

    expect(input.value).toBe('12 : 00');
  });

  test('selects full segments with ArrowLeft and ArrowRight', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput timeFormat="12hr" />
      </Grommet>,
    );

    const input = screen.getByPlaceholderText('hh : mm am') as HTMLInputElement;

    await user.click(input);
    fireEvent.change(input, { target: { value: '12:34 PM' } });
    input.setSelectionRange(0, 2);

    await user.keyboard('{ArrowRight}');
    await waitFor(() => {
      expect(input.selectionStart).toBe(4);
      expect(input.selectionEnd).toBe(8);
    });

    await user.keyboard('{ArrowRight}');
    await waitFor(() => {
      expect(input.selectionStart).toBe(7);
      expect(input.selectionEnd).toBe(10);
    });

    await user.keyboard('{ArrowLeft}');
    await waitFor(() => {
      expect(input.selectionStart).toBe(4);
      expect(input.selectionEnd).toBe(8);
    });
  });

  test('selects segment on first click without arrow keys', async () => {
    render(
      <Grommet>
        <TimeInput timeFormat="12hr" value="03:30 PM" />
      </Grommet>,
    );

    const input = screen.getByDisplayValue('03 : 30 PM') as HTMLInputElement;

    // Simulate initial click landing inside minute segment.
    fireEvent.focus(input);
    input.setSelectionRange(5, 5);
    fireEvent.click(input);

    expect(input.selectionStart).toBe(4);
    expect(input.selectionEnd).toBe(8);
  });

  test('ArrowUp on am/pm toggles period, not minutes', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput timeFormat="12hr" />
      </Grommet>,
    );

    const input = screen.getByPlaceholderText('hh : mm am') as HTMLInputElement;

    await user.click(input);
    fireEvent.change(input, { target: { value: '12:34 PM' } });

    // Current am/pm selection includes leading space for visual padding.
    input.setSelectionRange(7, 10);

    await user.keyboard('{ArrowUp}');

    await waitFor(() => {
      expect(input.value).toBe('12 : 34 AM');
      expect(input.selectionStart).toBe(7);
      expect(input.selectionEnd).toBe(10);
    });
  });

  test('first keyboard focus selects HH segment', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <>
          <button type="button">Before</button>
          <TimeInput timeFormat="24hr" value="12:34" />
        </>
      </Grommet>,
    );

    const before = screen.getByRole('button', { name: 'Before' });
    const input = screen.getByDisplayValue('12 : 34') as HTMLInputElement;

    before.focus();
    await user.tab();

    expect(input).toHaveFocus();
    await waitFor(() => {
      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(3);
    });
  });

  test('mouse-selected segment wins after keyboard focus when using ArrowUp', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <>
          <button type="button">Before</button>
          <TimeInput timeFormat="12hr" />
        </>
      </Grommet>,
    );

    const before = screen.getByRole('button', { name: 'Before' });
    const input = screen.getByPlaceholderText('hh : mm am') as HTMLInputElement;

    await user.click(input);
    fireEvent.change(input, { target: { value: '12:34 PM' } });

    await user.click(before);
    expect(before).toHaveFocus();
    await user.tab();
    expect(input).toHaveFocus();

    await user.click(input);
    input.setSelectionRange(5, 5);

    await user.keyboard('{ArrowUp}');

    await waitFor(() => {
      expect(input.value).toBe('12 : 35 PM');
      expect(input.selectionStart).toBe(4);
      expect(input.selectionEnd).toBe(8);
    });
  });

  test('tabs to the next picker section instead of the next option', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput timeFormat="24hr" value="02:02" />
      </Grommet>,
    );

    await user.click(screen.getByLabelText('Open time picker'));

    const hoursList = screen.getByRole('listbox', { name: 'Hours' });
    const minutesList = screen.getByRole('listbox', { name: 'Minutes' });
    const selectedHourOption = within(hoursList).getByRole('option', {
      name: '02',
    });
    const selectedMinuteOption = within(minutesList).getByRole('option', {
      name: '02',
    });

    await user.click(selectedHourOption);
    expect(selectedHourOption).toHaveFocus();

    await user.tab();

    expect(selectedMinuteOption).toHaveFocus();
  });
});
