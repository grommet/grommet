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

import { createPortal } from '../../../utils/portal';
import { Button } from '../../Button';
import { Form } from '../../Form';
import { FormField } from '../../FormField';
import { Grommet } from '../../Grommet';
import { DateTimeInput } from '..';

const getDropFromTrigger = (trigger: HTMLElement) => {
  const controlsId = trigger.getAttribute('aria-controls');
  expect(controlsId).toBeTruthy();

  const drop = document.getElementById(controlsId as string);
  expect(drop).toBeTruthy();

  return drop as HTMLElement;
};

describe('DateTimeInput', () => {
  beforeEach(createPortal);
  afterEach(() => {
    jest.restoreAllMocks();
  });

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
          showSeconds
          value="2026-07-22T18:30:00.000Z"
        />
      </Grommet>,
    );

    const trigger = screen.getByRole('button', {
      name: 'Choose date and time',
    });
    await user.click(trigger);

    const drop = getDropFromTrigger(trigger);

    const scoped = within(drop);
    expect(scoped.getByRole('listbox', { name: 'hour' })).toBeInTheDocument();
    expect(scoped.getByRole('listbox', { name: 'minute' })).toBeInTheDocument();
    expect(scoped.getByRole('listbox', { name: 'second' })).toBeInTheDocument();
    expect(scoped.getByRole('listbox', { name: 'period' })).toBeInTheDocument();

    // Ensure there is no full TimeInput field rendered inside the drop.
    expect(
      scoped.queryByRole('button', { name: 'Choose time' }),
    ).not.toBeInTheDocument();
  });

  test('inline mode renders icon trigger and opens date-time drop', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeInput
          id="dt-inline"
          inline
          format="12"
          showSeconds
          value="2026-07-22T18:30:00.000Z"
        />
      </Grommet>,
    );

    expect(
      screen.queryByRole('spinbutton', { name: 'day' }),
    ).not.toBeInTheDocument();

    const trigger = screen.getByRole('button', {
      name: 'Choose date and time',
    });
    await user.click(trigger);

    const drop = getDropFromTrigger(trigger);

    const scoped = within(drop);
    expect(scoped.getByRole('listbox', { name: 'hour' })).toBeInTheDocument();
    expect(scoped.getByRole('listbox', { name: 'minute' })).toBeInTheDocument();
    expect(scoped.getByRole('listbox', { name: 'second' })).toBeInTheDocument();
  });

  test('can hide seconds in field and popup via showSeconds=false', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeInput
          id="dt-no-seconds"
          format="12"
          showSeconds={false}
          value="2026-07-22T18:30:45.000Z"
        />
      </Grommet>,
    );

    expect(
      screen.queryByRole('spinbutton', { name: 'seconds' }),
    ).not.toBeInTheDocument();

    const trigger = screen.getByRole('button', {
      name: 'Choose date and time',
    });
    await user.click(trigger);

    const drop = getDropFromTrigger(trigger);
    const scoped = within(drop);

    expect(scoped.getByRole('listbox', { name: 'hour' })).toBeInTheDocument();
    expect(scoped.getByRole('listbox', { name: 'minute' })).toBeInTheDocument();
    expect(
      scoped.queryByRole('listbox', { name: 'second' }),
    ).not.toBeInTheDocument();
    expect(scoped.getByRole('listbox', { name: 'period' })).toBeInTheDocument();
  });

  test('hides seconds in field and popup by default', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeInput
          id="dt-default-no-seconds"
          format="12"
          value="2026-07-22T18:30:45.000Z"
        />
      </Grommet>,
    );

    expect(
      screen.queryByRole('spinbutton', { name: 'seconds' }),
    ).not.toBeInTheDocument();

    const trigger = screen.getByRole('button', {
      name: 'Choose date and time',
    });
    await user.click(trigger);

    const drop = getDropFromTrigger(trigger);
    expect(
      within(drop).queryByRole('listbox', { name: 'second' }),
    ).not.toBeInTheDocument();
  });

  test('preserves existing seconds when showSeconds=false', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(
      <Grommet>
        <DateTimeInput
          format="12"
          showSeconds={false}
          value="2026-07-22T18:30:45.000Z"
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
        value: expect.stringMatching(/:\d{2}:45\.000Z$/),
      }),
    );
  });

  test('uses generated drop id linkage when id prop is not provided', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeInput
          format="12"
          showSeconds
          value="2026-07-22T18:30:00.000Z"
        />
      </Grommet>,
    );

    const trigger = screen.getByRole('button', {
      name: 'Choose date and time',
    });

    await user.click(trigger);

    const drop = getDropFromTrigger(trigger);

    const scoped = within(drop);
    expect(scoped.getByRole('listbox', { name: 'hour' })).toBeInTheDocument();
    expect(scoped.getByRole('listbox', { name: 'minute' })).toBeInTheDocument();
    expect(scoped.getByRole('listbox', { name: 'second' })).toBeInTheDocument();
  });

  test('inline readOnly mode keeps icon visible and does not open drop', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeInput id="dt-inline-readonly" inline readOnly />
      </Grommet>,
    );

    const trigger = screen.getByRole('button', {
      name: 'Choose date and time',
    });
    expect(trigger).toBeDisabled();

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    const controlsId = trigger.getAttribute('aria-controls');
    expect(document.getElementById(controlsId as string)).toBeFalsy();
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

  test('seeds empty year to current year on first arrow interaction', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeInput format="12" />
      </Grommet>,
    );

    const yearSegment = screen.getByRole('spinbutton', { name: 'year' });
    await user.click(yearSegment);
    await user.keyboard('{ArrowDown}');

    expect(yearSegment).toHaveTextContent(
      String(new Date().getFullYear()).padStart(4, '0'),
    );
  });

  test('uses locale-driven DMY ordering for date sections', () => {
    jest.spyOn(Intl, 'DateTimeFormat').mockImplementation(((_, options) => {
      if (options && 'year' in options) {
        return {
          formatToParts: () => [
            { type: 'day', value: '22' },
            { type: 'literal', value: '/' },
            { type: 'month', value: '07' },
            { type: 'literal', value: '/' },
            { type: 'year', value: '2026' },
            { type: 'literal', value: ' ' },
            { type: 'hour', value: '18' },
            { type: 'literal', value: ':' },
            { type: 'minute', value: '30' },
            { type: 'literal', value: ':' },
            { type: 'second', value: '00' },
          ],
        } as Intl.DateTimeFormat;
      }

      return {
        resolvedOptions: () => ({ hour12: false }),
      } as Intl.DateTimeFormat;
    }) as typeof Intl.DateTimeFormat);

    render(
      <Grommet>
        <DateTimeInput format="24" value="2026-07-22T18:30:00.000Z" />
      </Grommet>,
    );

    const sections = screen.getAllByRole('spinbutton');
    expect(sections[0]).toHaveAttribute('aria-label', 'day');
    expect(sections[1]).toHaveAttribute('aria-label', 'month');
    expect(sections[2]).toHaveAttribute('aria-label', 'year');
  });

  test('uses locale-driven MDY ordering for date sections', () => {
    jest.spyOn(Intl, 'DateTimeFormat').mockImplementation(((_, options) => {
      if (options && 'year' in options) {
        return {
          formatToParts: () => [
            { type: 'month', value: '07' },
            { type: 'literal', value: '/' },
            { type: 'day', value: '22' },
            { type: 'literal', value: '/' },
            { type: 'year', value: '2026' },
            { type: 'literal', value: ' ' },
            { type: 'hour', value: '18' },
            { type: 'literal', value: ':' },
            { type: 'minute', value: '30' },
            { type: 'literal', value: ':' },
            { type: 'second', value: '00' },
          ],
        } as Intl.DateTimeFormat;
      }

      return {
        resolvedOptions: () => ({ hour12: false }),
      } as Intl.DateTimeFormat;
    }) as typeof Intl.DateTimeFormat);

    render(
      <Grommet>
        <DateTimeInput format="24" value="2026-07-22T18:30:00.000Z" />
      </Grommet>,
    );

    const sections = screen.getAllByRole('spinbutton');
    expect(sections[0]).toHaveAttribute('aria-label', 'month');
    expect(sections[1]).toHaveAttribute('aria-label', 'day');
    expect(sections[2]).toHaveAttribute('aria-label', 'year');
  });

  test('defaults to 24-hour mode when locale resolves to hour12=false', () => {
    jest.spyOn(Intl, 'DateTimeFormat').mockImplementation(((_, options) => {
      if (options && 'year' in options) {
        return {
          formatToParts: () => [
            { type: 'day', value: '22' },
            { type: 'literal', value: '/' },
            { type: 'month', value: '07' },
            { type: 'literal', value: '/' },
            { type: 'year', value: '2026' },
            { type: 'literal', value: ' ' },
            { type: 'hour', value: '18' },
            { type: 'literal', value: ':' },
            { type: 'minute', value: '30' },
            { type: 'literal', value: ':' },
            { type: 'second', value: '00' },
          ],
        } as Intl.DateTimeFormat;
      }

      return {
        resolvedOptions: () => ({ hour12: false }),
      } as Intl.DateTimeFormat;
    }) as typeof Intl.DateTimeFormat);

    render(
      <Grommet>
        <DateTimeInput value="2026-07-22T18:30:00.000Z" />
      </Grommet>,
    );

    expect(screen.getByRole('spinbutton', { name: 'hours' })).toHaveAttribute(
      'aria-valuemax',
      '23',
    );
    expect(
      screen.queryByRole('spinbutton', { name: 'meridiem' }),
    ).not.toBeInTheDocument();
  });

  test('inline popup supports Tab, Arrow transitions, Enter, and Escape', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeInput
          id="dt-inline-kbd"
          inline
          format="12"
          value="2026-07-22T18:30:00.000Z"
        />
        <Button type="button" label="After inline picker" />
      </Grommet>,
    );

    const trigger = screen.getByRole('button', {
      name: 'Choose date and time',
    });
    await user.click(trigger);

    const drop = getDropFromTrigger(trigger);
    const scoped = within(drop);
    const dialog = scoped.getByRole('dialog', { name: 'Choose date and time' });

    const hourList = scoped.getByRole('listbox', { name: 'hour' });
    const minuteList = scoped.getByRole('listbox', { name: 'minute' });

    const selectedHourOption = within(hourList)
      .getAllByRole('option')
      .find((option) => option.getAttribute('aria-selected') === 'true');
    expect(selectedHourOption).toBeTruthy();

    fireEvent.keyDown(dialog, { key: 'Tab' });
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    const selectedMinuteOption = within(minuteList)
      .getAllByRole('option')
      .find((option) => option.getAttribute('aria-selected') === 'true');
    expect(selectedMinuteOption).toBeTruthy();

    fireEvent.keyDown(dialog, { key: 'ArrowRight' });
    fireEvent.keyDown(dialog, { key: 'ArrowDown' });
    const updatedMinuteOption = within(minuteList)
      .getAllByRole('option')
      .find((option) => option.getAttribute('aria-selected') === 'true');
    expect(updatedMinuteOption).toBeTruthy();
    expect(updatedMinuteOption).toHaveTextContent('31');

    fireEvent.keyDown(dialog, { key: 'Enter' });
    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    const reopenedDrop = getDropFromTrigger(trigger);
    const reopenedDialog = within(reopenedDrop).getByRole('dialog', {
      name: 'Choose date and time',
    });

    fireEvent.keyDown(reopenedDialog, { key: 'Escape' });
    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
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

  test('respects theme.dateTimeInput properties', () => {
    const customTheme = {
      dateTimeInput: {
        container: {
          round: 'large',
        },
        button: {
          margin: 'medium',
        },
        icon: {
          // calendar: undefined — can be overridden with a component
        },
      },
    };

    const { container } = render(
      <Grommet theme={customTheme}>
        <DateTimeInput format="12" value="2026-07-22T18:30:00.000Z" />
      </Grommet>,
    );

    // Verify the component renders without error when theme is provided
    expect(container).toBeTruthy();
    expect(screen.getByRole('group')).toBeInTheDocument();
  });
});
