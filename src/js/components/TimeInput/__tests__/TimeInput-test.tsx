import React from 'react';
import 'jest-styled-components';
import { render, screen } from '@testing-library/react';
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
});
