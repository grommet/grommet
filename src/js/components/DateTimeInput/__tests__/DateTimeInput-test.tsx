// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
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
  beforeEach(() => {
    createPortal();
    console.warn = jest.fn();
  });
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

  test('renders when dateTimeInput.separator is omitted from custom theme', () => {
    expect(() =>
      render(
        <Grommet theme={{ dateTimeInput: { separator: undefined } } as any}>
          <DateTimeInput format="12" value="2026-07-22T18:30:00.000Z" />
        </Grommet>,
      ),
    ).not.toThrow();

    expect(screen.getByRole('spinbutton', { name: 'day' })).toBeInTheDocument();
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
      name: /date and time/i,
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
      name: /date and time/i,
    });
    await user.click(trigger);

    const drop = getDropFromTrigger(trigger);

    const scoped = within(drop);
    expect(scoped.getByRole('listbox', { name: 'hour' })).toBeInTheDocument();
    expect(scoped.getByRole('listbox', { name: 'minute' })).toBeInTheDocument();
    expect(scoped.getByRole('listbox', { name: 'second' })).toBeInTheDocument();
  });

  test('selecting a calendar day does not move focus into the hour listbox', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeInput
          id="dt-calendar-focus"
          format="12"
          showSeconds
          value="2026-07-22T18:30:00.000Z"
        />
      </Grommet>,
    );

    const trigger = screen.getByRole('button', {
      name: /date and time/i,
    });
    await user.click(trigger);

    const drop = getDropFromTrigger(trigger);
    const dayButton = within(drop).getByRole('button', {
      name: /Jul 22 2026/i,
    });
    const hourListbox = within(drop).getByRole('listbox', { name: 'hour' });

    await user.click(dayButton);

    await waitFor(() => expect(dayButton).toHaveFocus());
    expect(
      hourListbox.querySelector('[role="option"][tabindex="0"]'),
    ).not.toHaveFocus();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  test('selecting time in drop selects a calendar day when date is empty', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeInput id="dt-time-seeds-date" format="12" showSeconds />
      </Grommet>,
    );

    const trigger = screen.getByRole('button', {
      name: /date and time/i,
    });
    await user.click(trigger);

    const drop = getDropFromTrigger(trigger);
    expect(
      within(drop).queryAllByRole('gridcell', { selected: true }),
    ).toHaveLength(0);

    const hourList = within(drop).getByRole('listbox', { name: 'hour' });
    await user.click(within(hourList).getAllByRole('option')[0]);

    await waitFor(() => {
      expect(
        within(drop).queryAllByRole('gridcell', { selected: true }).length,
      ).toBeGreaterThan(0);
    });

    expect(
      screen.getByRole('spinbutton', {
        name: 'minutes',
        hidden: true,
      }),
    ).toHaveTextContent('00');
    expect(
      screen.getByRole('spinbutton', {
        name: 'meridiem',
        hidden: true,
      }),
    ).toHaveTextContent('AM');
  });

  test('icon click opens and stays open during in-popup interaction', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeInput
          id="dt-open-stable"
          format="12"
          value="2026-07-22T18:30:00.000Z"
        />
      </Grommet>,
    );

    const trigger = screen.getByRole('button', {
      name: /date and time/i,
    });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    const drop = getDropFromTrigger(trigger);
    const scoped = within(drop);

    expect(
      scoped.queryByRole('dialog', { name: /date and time/i }),
    ).not.toBeInTheDocument();

    const minuteList = scoped.getByRole('listbox', { name: 'minute' });
    const firstMinute = within(minuteList).getAllByRole('option')[0];

    await user.click(firstMinute);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(
      scoped.queryByRole('dialog', { name: /date and time/i }),
    ).not.toBeInTheDocument();
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
      name: /date and time/i,
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
      name: /date and time/i,
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
      name: /date and time/i,
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
      name: /date and time/i,
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

  test('inline popup supports Tab/Arrow navigation without dialog semantics', async () => {
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
      name: /date and time/i,
    });
    await user.click(trigger);

    const drop = getDropFromTrigger(trigger);
    const scoped = within(drop);
    expect(
      scoped.queryByRole('dialog', { name: /date and time/i }),
    ).not.toBeInTheDocument();

    const hourList = scoped.getByRole('listbox', { name: 'hour' });
    const minuteList = scoped.getByRole('listbox', { name: 'minute' });
    const popupContent = hourList.parentElement as HTMLElement;

    const selectedHourOption = within(hourList)
      .getAllByRole('option')
      .find((option) => option.getAttribute('aria-selected') === 'true');
    expect(selectedHourOption).toBeTruthy();

    fireEvent.keyDown(popupContent, { key: 'Tab' });
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    const selectedMinuteOption = within(minuteList)
      .getAllByRole('option')
      .find((option) => option.getAttribute('aria-selected') === 'true');
    expect(selectedMinuteOption).toBeTruthy();

    fireEvent.keyDown(popupContent, { key: 'ArrowRight' });
    fireEvent.keyDown(popupContent, { key: 'ArrowDown' });
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    fireEvent.keyDown(popupContent, { key: 'Enter' });
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  test('non-inline drop applies hour option ArrowDown from popup option target', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeInput
          id="dt-drop-kbd-apply"
          format="12"
          defaultValue="2026-08-12T18:30:00.000Z"
        />
      </Grommet>,
    );

    const trigger = screen.getByRole('button', {
      name: /date and time/i,
    });
    const minuteSegment = screen.getByRole('spinbutton', { name: 'minutes' });
    const hourSegment = screen.getByRole('spinbutton', { name: 'hours' });
    const initialMinuteText = minuteSegment.textContent;
    const initialHourText = hourSegment.textContent;

    await user.click(trigger);

    const drop = getDropFromTrigger(trigger);
    const scoped = within(drop);
    const hourList = scoped.getByRole('listbox', { name: 'hour' });
    const popupContent = hourList.parentElement as HTMLElement;
    const selectedHourOption = within(hourList)
      .getAllByRole('option')
      .find((option) => option.getAttribute('aria-selected') === 'true');

    expect(selectedHourOption).toBeTruthy();
    // Move active section away from hour to reproduce the stale-section path,
    // then ArrowDown from an hour option target should still increment hour.
    fireEvent.keyDown(popupContent, { key: 'ArrowRight' });
    fireEvent.keyDown(selectedHourOption as HTMLElement, { key: 'ArrowDown' });

    await waitFor(() => {
      expect(hourSegment.textContent).not.toBe(initialHourText);
      expect(minuteSegment.textContent).toBe(initialMinuteText);
    });
  });

  test('non-inline drop allows minute option ArrowLeft to move to hour before apply', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeInput
          id="dt-drop-kbd-nav"
          format="12"
          defaultValue="2026-08-12T18:30:00.000Z"
        />
      </Grommet>,
    );

    const trigger = screen.getByRole('button', {
      name: /date and time/i,
    });
    const hourSegment = screen.getByRole('spinbutton', { name: 'hours' });
    const initialHourText = hourSegment.textContent;

    await user.click(trigger);

    const drop = getDropFromTrigger(trigger);
    const scoped = within(drop);
    const hourList = scoped.getByRole('listbox', { name: 'hour' });
    const minuteList = scoped.getByRole('listbox', { name: 'minute' });
    const popupContent = hourList.parentElement as HTMLElement;

    const selectedMinuteOption = within(minuteList)
      .getAllByRole('option')
      .find((option) => option.getAttribute('aria-selected') === 'true');
    expect(selectedMinuteOption).toBeTruthy();

    fireEvent.keyDown(selectedMinuteOption as HTMLElement, {
      key: 'ArrowLeft',
    });
    fireEvent.keyDown(popupContent, { key: 'ArrowDown' });

    await waitFor(() => {
      expect(hourSegment.textContent).not.toBe(initialHourText);
    });
  });

  test('in 24-hour mode with showSeconds, second is available and meridiem is hidden', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeInput
          id="dt-24h-seconds"
          format="24"
          showSeconds
          value="2026-07-22T18:30:45.000Z"
        />
      </Grommet>,
    );

    expect(
      screen.getByRole('spinbutton', { name: 'hours' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('spinbutton', { name: 'minutes' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('spinbutton', { name: 'seconds' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('spinbutton', { name: 'meridiem' }),
    ).not.toBeInTheDocument();

    const trigger = screen.getByRole('button', {
      name: /date and time/i,
    });
    await user.click(trigger);

    const drop = getDropFromTrigger(trigger);
    const scoped = within(drop);

    expect(scoped.getByRole('listbox', { name: 'hour' })).toBeInTheDocument();
    expect(scoped.getByRole('listbox', { name: 'minute' })).toBeInTheDocument();
    expect(scoped.getByRole('listbox', { name: 'second' })).toBeInTheDocument();
    expect(
      scoped.queryByRole('listbox', { name: 'period' }),
    ).not.toBeInTheDocument();
  });

  test('does not emit onChange while the user clears sections', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    const ControlledHarness = () => {
      const [value, setValue] = React.useState('2026-07-22T18:30:00.000Z');

      return (
        <DateTimeInput
          format="12"
          value={value}
          onChange={({ value: nextValue }) => {
            onChange({ value: nextValue });
            setValue(nextValue || '');
          }}
        />
      );
    };

    render(
      <Grommet>
        <ControlledHarness />
      </Grommet>,
    );

    const clearSection = async (
      section: 'day' | 'month' | 'year' | 'hours' | 'minutes' | 'meridiem',
    ) => {
      await user.click(screen.getByRole('spinbutton', { name: section }));
      await user.keyboard('{Backspace}');
    };

    await clearSection('day');
    await clearSection('month');
    await clearSection('year');
    await clearSection('hours');
    await clearSection('minutes');

    await clearSection('meridiem');

    // User edits that leave the value incomplete should not emit a committed
    // value payload.
    expect(onChange).not.toHaveBeenCalled();
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

  test('applies custom active colors from theme.dateTimeInput.active', async () => {
    const user = userEvent.setup();

    const customTheme = {
      dateTimeInput: {
        active: {
          background: 'pink',
          indicator: {
            color: 'red',
            size: '3px',
          },
        },
      },
    };

    render(
      <Grommet theme={customTheme}>
        <DateTimeInput format="12" value="2026-07-22T18:30:00.000Z" />
      </Grommet>,
    );

    const daySegment = screen.getByRole('spinbutton', { name: 'day' });
    await user.click(daySegment);

    expect(daySegment).toHaveStyleRule('background-color', 'pink', {
      modifier: '::before',
    });
    expect(daySegment).toHaveStyleRule('background-color', 'red', {
      modifier: '::after',
    });
    expect(daySegment).toHaveStyleRule('height', '3px', {
      modifier: '::after',
    });
  });

  test('applies custom calendar icon from theme.dateTimeInput.icon.calendar', () => {
    const CustomCalendarIcon = () => <span>Custom Calendar Icon</span>;

    render(
      <Grommet
        theme={{
          dateTimeInput: {
            icon: {
              calendar: CustomCalendarIcon,
            },
          },
        }}
      >
        <DateTimeInput format="12" value="2026-07-22T18:30:00.000Z" />
      </Grommet>,
    );

    expect(screen.getByText('Custom Calendar Icon')).toBeInTheDocument();
  });
});
