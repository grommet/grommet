import React from 'react';
import 'jest-styled-components';
import { render, screen, waitFor } from '@testing-library/react';
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
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(
      <Grommet>
        <TimeInput timeFormat="24hr" onChange={onChange} />
      </Grommet>,
    );

    const input = screen.getByPlaceholderText('hh:mm');
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

    const input = screen.getByPlaceholderText('hh:mm am');
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

    const input = screen.getByPlaceholderText('hh:mm');
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

    const input = screen.getByPlaceholderText('hh:mm');
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

    const input = screen.getByPlaceholderText('hh:mm');
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

    const input = screen.getByPlaceholderText('hh:mm');
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

    const input = screen.getByPlaceholderText('hh:mm') as HTMLInputElement;

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

    const input = screen.getByPlaceholderText('hh:mm') as HTMLInputElement;
    const toggleButton = screen.getByLabelText('Open time picker');

    await user.click(input);
    await user.type(input, '12:00');
    await user.click(toggleButton);
    await user.click(input);
    input.setSelectionRange(0, 2);

    await user.keyboard('{ArrowUp}');

    await waitFor(() => {
      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(2);
    });
  });
});
