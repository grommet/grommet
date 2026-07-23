import React from 'react';
import 'jest-styled-components';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import '@testing-library/jest-dom';

import { createPortal } from '../../../utils/portal';
import { Button } from '../../Button';
import { Form } from '../../Form';
import { FormField } from '../../FormField';
import { Grommet } from '../../Grommet';
import { DateTimeInput } from '..';

describe('DateTimeInput', () => {
  beforeEach(createPortal);

  test('should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <DateTimeInput format="12" value="2026-07-22T18:30:00.000Z" />
      </Grommet>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('does not emit onChange for partial section entry', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(
      <Grommet>
        <DateTimeInput format="12" onChange={onChange} />
      </Grommet>,
    );

    const daySegment = screen.getByRole('spinbutton', { name: 'day' });
    await user.click(daySegment);
    await user.keyboard('1');

    expect(onChange).not.toHaveBeenCalled();
  });

  test('emits committed ISO value on valid section update', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(
      <Grommet>
        <DateTimeInput
          format="12"
          value="2026-07-22T18:30:00.000Z"
          onChange={onChange}
        />
      </Grommet>,
    );

    const minuteSegment = screen.getByRole('spinbutton', { name: 'minutes' });
    await user.click(minuteSegment);
    await user.keyboard('{ArrowUp}');

    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        value: expect.stringMatching(
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
        ),
      }),
    );
  });

  test('drop shows calendar and time columns without nested time input field', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeInput
          id="dt-input"
          format="12"
          value="2026-07-22T18:30:00.000Z"
        />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', { name: 'Choose date and time' }),
    );

    const drop = document.getElementById('dt-input__drop');
    expect(drop).toBeTruthy();

    const scoped = within(drop as HTMLElement);
    expect(scoped.getByRole('listbox', { name: 'hour' })).toBeInTheDocument();
    expect(scoped.getByRole('listbox', { name: 'minute' })).toBeInTheDocument();
    expect(scoped.getByRole('listbox', { name: 'second' })).toBeInTheDocument();
    expect(scoped.getByRole('listbox', { name: 'period' })).toBeInTheDocument();

    // Ensure there is no full TimeInput field rendered inside the drop.
    expect(
      scoped.queryByRole('button', { name: 'Choose time' }),
    ).not.toBeInTheDocument();
  });

  test('increments minutes by minuteStep on keyboard arrow', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeInput
          format="12"
          minuteStep={15}
          value="2026-07-22T18:31:00.000Z"
        />
      </Grommet>,
    );

    const minuteSegment = screen.getByRole('spinbutton', { name: 'minutes' });
    await user.click(minuteSegment);
    await user.keyboard('{ArrowUp}');

    expect(minuteSegment).toHaveTextContent('45');
  });

  test('associates the FormField label with the grouped segmented input', () => {
    render(
      <Grommet>
        <Form>
          <FormField
            htmlFor="appointment-date-time"
            name="appointment"
            label="Choose an appointment date and time"
          >
            <DateTimeInput
              id="appointment-date-time"
              name="appointment"
              format="12"
            />
          </FormField>
        </Form>
      </Grommet>,
    );

    expect(
      screen.getByText('Choose an appointment date and time'),
    ).toHaveAttribute('id', 'grommet-appointment-date-time__label');

    expect(screen.getByRole('group')).toHaveAttribute(
      'aria-labelledby',
      'grommet-appointment-date-time__label',
    );
    expect(screen.getByRole('group')).not.toHaveAttribute('aria-label');
  });

  test('submits committed value and responds to controlled Form updates', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    const Test = () => {
      const [value, setValue] = React.useState({
        scheduledAt: '2026-07-22T18:30:00.000Z',
      });

      return (
        <Grommet>
          <Form
            value={value}
            onChange={(nextValue) => setValue(nextValue)}
            onSubmit={({ value: nextValue }) => {
              onSubmit(nextValue);
            }}
          >
            <FormField
              htmlFor="scheduled-at"
              name="scheduledAt"
              label="Scheduled at"
            >
              <DateTimeInput id="scheduled-at" name="scheduledAt" format="12" />
            </FormField>
            <Button type="submit" label="Submit" />
            <Button
              type="button"
              label="Clear"
              onClick={() => setValue({ scheduledAt: '' })}
            />
          </Form>
        </Grommet>
      );
    };

    render(<Test />);

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        scheduledAt: '2026-07-22T18:30:00.000Z',
      }),
    );

    await user.click(screen.getByRole('button', { name: 'Clear' }));

    expect(
      document.querySelector('input[type="hidden"][name="scheduledAt"]'),
    ).toHaveValue('');
  });
});
