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

import { AnnounceContext } from '../../../contexts/AnnounceContext';
import { createPortal } from '../../../utils/portal';
import { Form } from '../../Form';
import { FormField } from '../../FormField';
import { Grommet } from '../../Grommet';
import { TimeInput } from '..';

const getSegment = (name: 'hours' | 'minutes' | 'seconds' | 'meridiem') =>
  screen.getByRole('spinbutton', { name });

const getDisplayInput = () =>
  document.querySelector(
    'input[aria-hidden="true"]:not([type="hidden"])',
  ) as HTMLInputElement;

describe('TimeInput', () => {
  beforeEach(createPortal);

  test('should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <TimeInput format="12" defaultValue="12:34:56" />
      </Grommet>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('opens and closes picker with keyboard', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput id="time-picker" format="24" defaultValue="13:45:30" />
      </Grommet>,
    );

    const input = getSegment('hours');
    await user.click(input);
    await user.keyboard('{Alt>}{ArrowDown}{/Alt}');

    expect(document.getElementById('time-picker__drop')).toBeTruthy();

    await user.keyboard('{Escape}');
    expect(document.getElementById('time-picker__drop')).toBeNull();
  });

  test('links trigger aria-controls to popup id when id is provided', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput id="time-a11y" format="24" defaultValue="13:45:30" />
      </Grommet>,
    );

    const trigger = screen.getByRole('button', { name: 'Choose time' });
    expect(trigger).toHaveAttribute('aria-controls', 'time-a11y__drop');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);

    const popup = document.getElementById('time-a11y__drop');
    expect(popup).toBeTruthy();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger).toHaveAttribute('aria-controls', 'time-a11y__drop');
  });

  test('does not show an active section before focus', () => {
    render(
      <Grommet>
        <TimeInput format="12" />
      </Grommet>,
    );

    expect(screen.queryByTestId('time-input-active-section')).toBeNull();
  });

  test('allows clicking directly on a non-first segment to focus it', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="12" defaultValue="12:34:56" />
      </Grommet>,
    );

    const meridiemSegment = getSegment('meridiem');
    await user.click(meridiemSegment);

    expect(meridiemSegment).toHaveFocus();
  });

  test('keeps segment typing active for two-digit entry', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="24" defaultValue="00:00:00" />
      </Grommet>,
    );

    const hourSegment = screen.getByRole('spinbutton', { name: 'hours' });
    await user.click(hourSegment);
    expect(hourSegment).toHaveFocus();

    await user.keyboard('12');

    expect(screen.getByRole('spinbutton', { name: 'minutes' })).toHaveFocus();
    expect(hourSegment).toHaveTextContent('12');
  });

  test('supports two-digit hour entry after tabbing to first segment', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="24" defaultValue="00:00:00" />
      </Grommet>,
    );

    await user.tab();
    const hourSegment = screen.getByRole('spinbutton', { name: 'hours' });
    expect(hourSegment).toHaveFocus();

    await user.keyboard('12');

    expect(hourSegment).toHaveTextContent('12');
    expect(screen.getByRole('spinbutton', { name: 'minutes' })).toHaveFocus();
  });

  test('supports typing 11 in each segment while navigating by Tab', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="24" defaultValue="00:00:00" />
      </Grommet>,
    );

    await user.tab();
    const hourSegment = screen.getByRole('spinbutton', { name: 'hours' });
    expect(hourSegment).toHaveFocus();
    await user.keyboard('11');
    expect(hourSegment).toHaveTextContent('11');

    const minuteSegment = screen.getByRole('spinbutton', { name: 'minutes' });
    expect(minuteSegment).toHaveFocus();
    await user.keyboard('11');
    expect(minuteSegment).toHaveTextContent('11');

    const secondSegment = screen.getByRole('spinbutton', { name: 'seconds' });
    expect(secondSegment).toHaveFocus();
    await user.keyboard('11');
    expect(secondSegment).toHaveTextContent('11');
    expect(secondSegment).toHaveFocus();
  });

  test('allows Tab to leave the component past the trigger button', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <div>
          <TimeInput format="24" defaultValue="00:00:00" />
          <button type="button">after</button>
        </div>
      </Grommet>,
    );

    const secondSegment = screen.getByRole('spinbutton', { name: 'seconds' });
    await user.click(secondSegment);
    expect(secondSegment).toHaveFocus();

    // First hop lands on the "Choose time" trigger button, which is also
    // part of the component's own tab order.
    await user.tab();
    expect(screen.getByRole('button', { name: 'Choose time' })).toHaveFocus();

    // Second hop should fully leave the component.
    await user.tab();
    expect(screen.getByRole('button', { name: 'after' })).toHaveFocus();
  });

  test('allows Shift+Tab to leave the component before the first segment', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <div>
          <button type="button">before</button>
          <TimeInput format="24" defaultValue="00:00:00" />
        </div>
      </Grommet>,
    );

    const hourSegment = screen.getByRole('spinbutton', { name: 'hours' });
    await user.click(hourSegment);
    expect(hourSegment).toHaveFocus();

    await user.tab({ shift: true });

    expect(screen.getByRole('button', { name: 'before' })).toHaveFocus();
  });

  test('does not trap focus back on the first segment when nothing precedes it', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="24" defaultValue="00:00:00" />
      </Grommet>,
    );

    const hourSegment = screen.getByRole('spinbutton', { name: 'hours' });
    await user.click(hourSegment);
    expect(hourSegment).toHaveFocus();

    await user.tab({ shift: true });

    // With no preceding focusable element on the page, focus falls through
    // to document.body; onSegmentBlur must not yank it back onto the segment.
    expect(document.body).toHaveFocus();
  });

  test('updates active section via arrows and digits', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="24" defaultValue="00:00:00" />
      </Grommet>,
    );

    const input = getSegment('hours');
    await user.click(input);
    await user.keyboard('{Home}');
    await user.keyboard('1');
    await user.keyboard('2');
    await user.keyboard('3');
    await user.keyboard('4');

    expect(getDisplayInput()).toHaveValue('12:34:00');
  });

  test('announces active section value through aria-valuetext', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="12" defaultValue="12:35:10" />
      </Grommet>,
    );

    const input = getSegment('hours');

    await user.click(input);
    await user.keyboard('{Home}');

    await waitFor(() => {
      expect(input).toHaveAttribute('aria-valuetext', '12 hours');
    });

    await user.keyboard('{ArrowRight}');
    await waitFor(() => {
      expect(getSegment('minutes')).toHaveAttribute(
        'aria-valuetext',
        '35 minutes',
      );
    });
  });

  test('does not push a live-region announcement when focusing a segment', async () => {
    const user = userEvent.setup();
    const announceSpy = jest.fn();

    render(
      <AnnounceContext.Provider value={announceSpy}>
        <Grommet>
          <TimeInput format="12" defaultValue="12:34:56" />
        </Grommet>
      </AnnounceContext.Provider>,
    );

    await user.click(getSegment('hours'));
    await user.keyboard('{ArrowRight}');
    await user.keyboard('{ArrowRight}');

    // the section name/value is already conveyed natively via
    // aria-label/aria-valuetext when focus moves to a segment, so no
    // manual announcement should accompany plain segment navigation
    expect(
      announceSpy.mock.calls.some(([message]) =>
        /selected|hours|minutes|seconds/i.test(String(message)),
      ),
    ).toBe(false);
  });

  test('announces the openDrop hint once when the component first gains focus', async () => {
    const user = userEvent.setup();
    const announceSpy = jest.fn();

    render(
      <AnnounceContext.Provider value={announceSpy}>
        <Grommet>
          <TimeInput format="12" defaultValue="12:34:56" />
        </Grommet>
      </AnnounceContext.Provider>,
    );

    await user.click(getSegment('hours'));

    expect(
      announceSpy.mock.calls.filter(
        ([message]) => message === 'Press space to open time picker',
      ),
    ).toHaveLength(1);

    announceSpy.mockClear();

    await user.keyboard('{ArrowRight}');
    await user.keyboard('{ArrowRight}');

    // moving between segments within the already-focused component
    // should not repeat the hint
    expect(
      announceSpy.mock.calls.some(
        ([message]) => message === 'Press space to open time picker',
      ),
    ).toBe(false);
  });

  test('uses currentValue message key for current value announcements', async () => {
    const user = userEvent.setup();
    const announceSpy = jest.fn();

    render(
      <AnnounceContext.Provider value={announceSpy}>
        <Grommet>
          <TimeInput
            format="12"
            defaultValue="12:34:56"
            messages={{
              currentValue: 'Now {hour}:{minute}:{second}{period}',
            }}
          />
        </Grommet>
      </AnnounceContext.Provider>,
    );

    const input = getSegment('hours');
    await user.click(input);
    await user.keyboard('{ArrowUp}');

    await waitFor(() => {
      expect(
        announceSpy.mock.calls.some(
          ([message, mode]) =>
            mode === 'polite' &&
            /^Now \d{1,2}:34:56\s(AM|PM)$/.test(String(message)),
        ),
      ).toBe(true);
    });
  });

  test('uses currentValue message key without period in 24h format', async () => {
    const user = userEvent.setup();
    const announceSpy = jest.fn();

    render(
      <AnnounceContext.Provider value={announceSpy}>
        <Grommet>
          <TimeInput
            format="24"
            defaultValue="12:34:56"
            messages={{
              currentValue: 'Now {hour}:{minute}:{second}{period}',
            }}
          />
        </Grommet>
      </AnnounceContext.Provider>,
    );

    const input = getSegment('hours');
    await user.click(input);
    await user.keyboard('{ArrowUp}');

    await waitFor(() => {
      expect(
        announceSpy.mock.calls.some(([message, mode]) => {
          const text = String(message);
          return mode === 'polite' && /^Now \d{1,2}:\d{2}:\d{2}$/.test(text);
        }),
      ).toBe(true);
    });
  });

  test('associates the FormField label once with the segment group via aria-labelledby', () => {
    render(
      <Grommet>
        <Form>
          <FormField
            htmlFor="appointment-time"
            name="value"
            label="Choose an appointment time"
          >
            <TimeInput id="appointment-time" name="value" format="24" />
          </FormField>
        </Form>
      </Grommet>,
    );

    expect(screen.getByText('Choose an appointment time')).toHaveAttribute(
      'id',
      'grommet-appointment-time__label',
    );

    const group = screen.getByRole('group');
    expect(group).toHaveAttribute(
      'aria-labelledby',
      'grommet-appointment-time__label',
    );
    expect(within(group).getByRole('spinbutton', { name: 'hours' })).toBe(
      getSegment('hours'),
    );
    // segment labels stay focused on the section name, not repeated
    // sentence text, since the group label is only announced once
    expect(getSegment('hours')).not.toHaveAttribute('aria-describedby');
    expect(getSegment('minutes')).not.toHaveAttribute('aria-describedby');

    // the FormField label takes precedence, so no fallback aria-label
    // should be set on the group
    expect(group).not.toHaveAttribute('aria-label');
  });

  test('falls back to the inputLabel message when there is no FormField label', () => {
    render(
      <Grommet>
        <TimeInput format="24" />
      </Grommet>,
    );

    expect(screen.getByRole('group')).toHaveAttribute(
      'aria-label',
      'Time input',
    );
  });

  test('uses sectionHours/sectionMinutes message keys for segment labels', async () => {
    render(
      <Grommet>
        <TimeInput
          format="12"
          defaultValue="12:34:56"
          messages={{
            sectionHours: 'heures',
            sectionMinutes: 'minutes-fr',
          }}
        />
      </Grommet>,
    );

    expect(
      screen.getByRole('spinbutton', { name: 'heures' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('spinbutton', { name: 'minutes-fr' }),
    ).toBeInTheDocument();
  });

  test('updates spinbutton range metadata for the active section', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="12" defaultValue="12:35:10" />
      </Grommet>,
    );

    const input = getSegment('hours');
    await user.click(input);
    await user.keyboard('{Home}');

    await waitFor(() => {
      expect(input).toHaveAttribute('aria-valuenow', '12');
      expect(input).toHaveAttribute('aria-valuemin', '1');
      expect(input).toHaveAttribute('aria-valuemax', '12');
    });

    await user.keyboard('{ArrowRight}');
    await waitFor(() => {
      expect(getSegment('minutes')).toHaveAttribute('aria-valuenow', '35');
      expect(getSegment('minutes')).toHaveAttribute('aria-valuemin', '0');
      expect(getSegment('minutes')).toHaveAttribute('aria-valuemax', '59');
    });

    await user.keyboard('{End}');
    await waitFor(() => {
      expect(getSegment('meridiem')).toHaveAttribute('aria-valuenow', '1');
      expect(getSegment('meridiem')).toHaveAttribute('aria-valuemin', '0');
      expect(getSegment('meridiem')).toHaveAttribute('aria-valuemax', '1');
    });
  });

  test('selects hour section on focus in empty state', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="12" />
      </Grommet>,
    );

    const input = getSegment('hours');
    await user.click(input);

    await waitFor(() => {
      expect(getDisplayInput()).toHaveValue('hh:mm:ss aa');
      expect(input).toHaveFocus();
    });

    expect(input).toHaveAttribute('aria-valuenow', '1');
    expect(input).toHaveAttribute('aria-valuemin', '1');
    expect(input).toHaveAttribute('aria-valuemax', '12');
  });

  test('moves between placeholder sections with ArrowRight in empty state', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="12" />
      </Grommet>,
    );

    const input = getSegment('hours');
    await user.click(input);
    expect(input).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(getSegment('minutes')).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(getSegment('seconds')).toHaveFocus();
  });

  test('selects minute section when clicking minute token in empty state', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="12" />
      </Grommet>,
    );

    const input = getSegment('hours');
    await user.click(input);
    await user.click(screen.getByText('mm'));
    expect(getSegment('minutes')).toHaveFocus();

    await user.keyboard('15');
    expect(getDisplayInput()).toHaveValue('hh:15:ss aa');
  });

  test('keeps clicked placeholder section active for hh, mm, ss, and aa', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="12" />
      </Grommet>,
    );

    const input = getSegment('hours');

    await user.click(input);
    await user.click(screen.getByText('hh'));
    expect(getSegment('hours')).toHaveFocus();

    await user.click(screen.getByText('mm'));
    expect(getSegment('minutes')).toHaveFocus();

    await user.click(screen.getByText('ss'));
    expect(getSegment('seconds')).toHaveFocus();

    await user.click(screen.getByText('aa'));
    expect(getSegment('meridiem')).toHaveFocus();
  });

  test('uses directly clicked placeholder token on first click', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="12" />
      </Grommet>,
    );

    await user.click(screen.getByText('ss'));
    expect(getSegment('seconds')).toHaveFocus();
  });

  test('supports uncontrolled initial value', () => {
    render(
      <Grommet>
        <TimeInput format="12" defaultValue="13:05:09" />
      </Grommet>,
    );

    expect(getDisplayInput()).toHaveValue('01:05:09 PM');
  });

  test('clears only the active section when deleting from a complete value', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="12" defaultValue="12:34:56" />
      </Grommet>,
    );

    const input = getSegment('hours');

    await user.click(input);
    await user.keyboard('{Home}');
    await user.keyboard('{Backspace}');

    expect(getDisplayInput()).toHaveValue('hh:34:56 PM');
  });

  test('keeps selection on cleared middle sections after delete', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="12" defaultValue="12:34:56" />
      </Grommet>,
    );

    const input = getSegment('hours');

    await user.click(input);
    await user.keyboard('{Home}{ArrowRight}');
    await user.keyboard('{Backspace}');

    await waitFor(() => {
      expect(getDisplayInput()).toHaveValue('12:mm:56 PM');
      expect(getSegment('minutes')).toHaveFocus();
    });

    await user.keyboard('{ArrowRight}');
    await user.keyboard('{Backspace}');

    await waitFor(() => {
      expect(getDisplayInput()).toHaveValue('12:mm:ss PM');
      expect(getSegment('seconds')).toHaveFocus();
    });
  });

  test('applies minuteStep to keyboard increments', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="24" defaultValue="10:30:00" minuteStep={15} />
      </Grommet>,
    );

    const input = getSegment('hours');

    await user.click(input);
    await user.keyboard('{Home}{ArrowRight}');

    await user.keyboard('{ArrowUp}');
    expect(getDisplayInput()).toHaveValue('10:45:00');

    await user.keyboard('{ArrowUp}');
    expect(getDisplayInput()).toHaveValue('10:00:00');
  });

  test('submits only committed value and never section placeholders', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <form aria-label="native-form">
          <TimeInput format="12" name="alarmTime" />
        </form>
      </Grommet>,
    );

    const form = screen.getByRole('form', { name: 'native-form' });
    const input = getSegment('hours');

    await user.click(input);
    await user.keyboard('1');

    const partialFormData = new FormData(form as HTMLFormElement);
    expect(partialFormData.get('alarmTime')).toBe('');

    await user.keyboard('23456p');

    const completeFormData = new FormData(form as HTMLFormElement);
    expect(completeFormData.get('alarmTime')).toBe('12:34:56');
  });

  test('disables both spinbutton and trigger button when disabled', () => {
    render(
      <Grommet>
        <TimeInput format="12" defaultValue="09:45:10" disabled />
      </Grommet>,
    );

    expect(getSegment('hours')).toHaveAttribute('aria-disabled', 'true');
    expect(getSegment('minutes')).toHaveAttribute('aria-disabled', 'true');
    expect(getSegment('seconds')).toHaveAttribute('aria-disabled', 'true');
    expect(getSegment('meridiem')).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('button', { name: 'Choose time' })).toBeDisabled();
  });

  test('read-only mode hides trigger and prevents keyboard edits and drop open', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput
          id="read-only-picker"
          format="12"
          defaultValue="00:00:00"
          readOnly
        />
      </Grommet>,
    );

    const input = getSegment('hours');
    expect(screen.queryByRole('button', { name: 'Choose time' })).toBeNull();

    await user.click(input);
    await user.keyboard('{Alt>}{ArrowDown}{/Alt}');
    await user.keyboard('{Home}99');

    expect(document.getElementById('read-only-picker__drop')).toBeNull();
    expect(getDisplayInput()).toHaveValue('12:00:00 AM');
  });

  test('read-only mode does not show active section highlight on focus', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="12" defaultValue="00:00:00" readOnly />
      </Grommet>,
    );

    await user.click(getSegment('hours'));

    expect(screen.queryByTestId('time-input-active-section')).toBeNull();
  });

  test('supports controlled updates', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    const ControlledHarness = () => {
      const [value, setValue] = React.useState('09:10:11');
      return (
        <>
          <TimeInput
            format="24"
            value={value}
            onChange={({ value: nextValue }) => {
              onChange(nextValue);
              setValue(nextValue || '');
            }}
          />
          <button
            type="button"
            onClick={() => setValue('10:20:30')}
            aria-label="set-controlled-value"
          >
            set
          </button>
        </>
      );
    };

    render(
      <Grommet>
        <ControlledHarness />
      </Grommet>,
    );

    const input = getSegment('hours');
    expect(getDisplayInput()).toHaveValue('09:10:11');

    await user.click(input);
    await user.keyboard('{Home}12');

    expect(onChange).toHaveBeenCalled();

    await user.click(
      screen.getByRole('button', { name: 'set-controlled-value' }),
    );
    expect(getDisplayInput()).toHaveValue('10:20:30');
  });

  test('closes picker when focus leaves popup', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput
          id="focus-leave-picker"
          format="24"
          defaultValue="13:45:30"
        />
        <button type="button" aria-label="outside-focus-target">
          outside
        </button>
      </Grommet>,
    );

    const input = getSegment('hours');
    await user.click(input);
    await user.keyboard('{Alt>}{ArrowDown}{/Alt}');

    expect(document.getElementById('focus-leave-picker__drop')).toBeTruthy();

    await user.click(screen.getByText('outside'));
    expect(document.getElementById('focus-leave-picker__drop')).toBeNull();
  });

  test('keeps focus inside picker on continuous Tab navigation', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput id="tab-cycle-picker" format="24" defaultValue="13:45:30" />
      </Grommet>,
    );

    await user.click(screen.getByRole('button', { name: 'Choose time' }));

    const hourList = screen.getByRole('listbox', { name: 'hour' });
    const minuteList = screen.getByRole('listbox', { name: 'minute' });
    const secondList = screen.getByRole('listbox', { name: 'second' });

    const selectedHourOption = within(hourList).getByRole('option', {
      name: '13 hours',
    });
    const selectedMinuteOption = within(minuteList).getByRole('option', {
      name: '45 minutes',
    });
    const selectedSecondOption = within(secondList).getByRole('option', {
      name: '30 seconds',
    });

    await user.click(selectedHourOption);
    expect(selectedHourOption).toHaveFocus();

    await user.tab();
    await waitFor(() => {
      expect(selectedMinuteOption).toHaveFocus();
    });
    expect(document.getElementById('tab-cycle-picker__drop')).toBeTruthy();

    await user.tab();
    await waitFor(() => {
      expect(selectedSecondOption).toHaveFocus();
    });
    expect(document.getElementById('tab-cycle-picker__drop')).toBeTruthy();

    await user.tab();
    await waitFor(() => {
      expect(selectedHourOption).toHaveFocus();
    });
    expect(document.getElementById('tab-cycle-picker__drop')).toBeTruthy();
  });

  test('supports option selection by click for touch-like interactions', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="24" defaultValue="01:00:00" />
      </Grommet>,
    );

    const input = getSegment('hours');
    await user.click(input);
    await user.keyboard('{Alt>}{ArrowDown}{/Alt}');

    const hourList = screen.getByRole('listbox', { name: 'hour' });
    await user.click(
      within(hourList).getByRole('option', { name: '07 hours' }),
    );

    expect(getDisplayInput()).toHaveValue('07:00:00');
  });

  test('announces popup option values with their section type', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="12" defaultValue="07:15:20" />
      </Grommet>,
    );

    await user.click(screen.getByRole('button', { name: 'Choose time' }));

    expect(
      screen.getByRole('option', { name: '07 hours' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: '15 minutes' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: '20 seconds' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: 'AM meridiem' }),
    ).toBeInTheDocument();
  });

  test('updates minute and second on first click when selected values are deep in list', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="24" defaultValue="01:45:50" />
      </Grommet>,
    );

    const input = getSegment('hours');
    await user.click(input);
    await user.keyboard('{Alt>}{ArrowDown}{/Alt}');

    const minuteList = screen.getByRole('listbox', { name: 'minute' });
    const secondList = screen.getByRole('listbox', { name: 'second' });

    await user.click(
      within(minuteList).getByRole('option', { name: '10 minutes' }),
    );
    await waitFor(() => {
      expect(getDisplayInput()).toHaveValue('01:10:50');
    });

    await user.click(
      within(secondList).getByRole('option', { name: '08 seconds' }),
    );
    await waitFor(() => {
      expect(getDisplayInput()).toHaveValue('01:10:08');
    });
  });

  test('persists first option click after wheel scrolling in hour, minute, and second lists', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="24" defaultValue="05:55:55" />
      </Grommet>,
    );

    const input = getSegment('hours');
    await user.click(input);
    await user.keyboard('{Alt>}{ArrowDown}{/Alt}');

    const hourList = screen.getByRole('listbox', { name: 'hour' });
    const minuteList = screen.getByRole('listbox', { name: 'minute' });
    const secondList = screen.getByRole('listbox', { name: 'second' });

    fireEvent.wheel(minuteList, { deltaY: 120 });
    await user.click(
      within(minuteList).getByRole('option', { name: '22 minutes' }),
    );
    await waitFor(() => {
      expect(getDisplayInput()).toHaveValue('05:22:55');
    });

    fireEvent.wheel(secondList, { deltaY: -120 });
    await user.click(
      within(secondList).getByRole('option', { name: '11 seconds' }),
    );
    await waitFor(() => {
      expect(getDisplayInput()).toHaveValue('05:22:11');
    });

    fireEvent.wheel(hourList, { deltaY: 120 });
    await user.click(
      within(hourList).getByRole('option', { name: '08 hours' }),
    );
    await waitFor(() => {
      expect(getDisplayInput()).toHaveValue('08:22:11');
    });
  });

  test('auto-scrolls minute and second columns to selected values on open', async () => {
    const user = userEvent.setup();
    const offsetHeightDescriptor = Object.getOwnPropertyDescriptor(
      window.HTMLElement.prototype,
      'offsetHeight',
    );
    const clientHeightDescriptor = Object.getOwnPropertyDescriptor(
      window.HTMLElement.prototype,
      'clientHeight',
    );
    const offsetTopDescriptor = Object.getOwnPropertyDescriptor(
      window.HTMLElement.prototype,
      'offsetTop',
    );

    Object.defineProperty(window.HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      get() {
        return 40;
      },
    });

    Object.defineProperty(window.HTMLElement.prototype, 'clientHeight', {
      configurable: true,
      get() {
        return this.getAttribute?.('role') === 'listbox' ? 200 : 40;
      },
    });

    Object.defineProperty(window.HTMLElement.prototype, 'offsetTop', {
      configurable: true,
      get() {
        const optionKey = this.getAttribute?.('data-option-key');
        if (!optionKey) return 0;

        const [, rawValue] = optionKey.split('-');
        const numericValue = Number(rawValue);
        return Number.isFinite(numericValue) ? numericValue * 40 : 0;
      },
    });

    try {
      render(
        <Grommet>
          <TimeInput format="12" defaultValue="00:30:20" />
        </Grommet>,
      );

      await user.click(screen.getByRole('button', { name: 'Choose time' }));

      const minuteList = screen.getByRole('listbox', { name: 'minute' });
      const secondList = screen.getByRole('listbox', { name: 'second' });

      await waitFor(() => {
        expect(minuteList.scrollTop).toBeGreaterThan(0);
        expect(secondList.scrollTop).toBeGreaterThan(0);
      });
    } finally {
      if (offsetHeightDescriptor) {
        Object.defineProperty(
          window.HTMLElement.prototype,
          'offsetHeight',
          offsetHeightDescriptor,
        );
      }

      if (clientHeightDescriptor) {
        Object.defineProperty(
          window.HTMLElement.prototype,
          'clientHeight',
          clientHeightDescriptor,
        );
      }

      if (offsetTopDescriptor) {
        Object.defineProperty(
          window.HTMLElement.prototype,
          'offsetTop',
          offsetTopDescriptor,
        );
      }
    }
  });

  test('does not leak Box pad prop onto popup option DOM nodes', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="24" defaultValue="01:00:00" />
      </Grommet>,
    );

    await user.click(screen.getByRole('button', { name: 'Choose time' }));

    const hourList = screen.getByRole('listbox', { name: 'hour' });
    const option = within(hourList).getByRole('option', { name: '01 hours' });

    expect(option).not.toHaveAttribute('pad');
  });

  test('moves focus to hour-01 when opened via icon from placeholder state', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="12" />
      </Grommet>,
    );

    await user.click(screen.getByRole('button', { name: 'Choose time' }));

    const hourList = screen.getByRole('listbox', { name: 'hour' });

    await waitFor(() => {
      expect(
        within(hourList).getByRole('option', { name: '01 hours' }),
      ).toHaveFocus();
    });
  });

  test('allows replacing hour with leading zero in 12-hour format', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="12" defaultValue="07:30:00" />
      </Grommet>,
    );

    const input = getSegment('hours');
    await user.click(input);
    await user.keyboard('{Home}05');

    await waitFor(() => {
      expect(getDisplayInput()).toHaveValue('05:30:00 AM');
    });
  });

  test('emits onChange with object payload containing value', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(
      <Grommet>
        <TimeInput format="24" defaultValue="00:00:00" onChange={onChange} />
      </Grommet>,
    );

    const input = getSegment('hours');
    await user.click(input);
    await user.keyboard('{Home}1');

    expect(onChange).toHaveBeenCalled();
    const firstCallArg = onChange.mock.calls[0][0];
    expect(firstCallArg).toHaveProperty('value');
    expect(typeof firstCallArg.value).toBe('string');
  });

  test('applies fallback logic when typing invalid 2-digit combination in hour section', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="12" defaultValue="07:30:00" />
      </Grommet>,
    );

    const input = getSegment('hours');
    await user.click(input);
    // Type "22" in HH section
    // Expected: 2 is pending, second 2 makes 22 invalid for 12h (max 12)
    // Fallback: use first digit (2) for HH, apply second digit (2) to MM
    // Result: 02:02:00 AM
    await user.keyboard('{Home}22');

    await waitFor(() => {
      expect(getDisplayInput()).toHaveValue('02:02:00 AM');
    });
  });

  test('applies fallback logic when typing invalid 2-digit combination in minute section', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="12" defaultValue="02:30:00" />
      </Grommet>,
    );

    const input = getSegment('hours');
    await user.click(input);
    // Navigate to MM section: {Home} to go to HH, then {ArrowRight} to move to MM
    await user.keyboard('{Home}{ArrowRight}');
    // Type "66" in MM section
    // Expected: 6 is pending, second 6 makes 66 invalid (max 59)
    // Fallback: use first digit (6) for MM, apply second digit (6) to SS
    // Result: 02:06:06 AM
    await user.keyboard('66');

    await waitFor(() => {
      expect(getDisplayInput()).toHaveValue('02:06:06 AM');
    });
  });

  test('handles 222 digit sequence in 24-hour format', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="24" defaultValue="07:30:00" />
      </Grommet>,
    );

    const input = getSegment('hours');
    await user.click(input);
    // Type 222 starting at HH
    // Digit 1: "2" → HH=02, stay on HH
    // Digit 2: "2" combined with first → HH=22, move to MM
    // Digit 3: "2" → MM=02, stay on MM
    await user.keyboard('{Home}222');

    await waitFor(() => {
      expect(getDisplayInput()).toHaveValue('22:02:00');
    });
  });

  test('handles 2222 digit sequence in 24-hour format', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="24" defaultValue="07:30:00" />
      </Grommet>,
    );

    const input = getSegment('hours');
    await user.click(input);
    // Type 2222 starting at HH
    // Digit 1: "2" → HH=02, stay on HH
    // Digit 2: "2" → HH=22, move to MM
    // Digit 3: "2" → MM=02, stay on MM
    // Digit 4: "2" → MM=22, move to SS
    await user.keyboard('{Home}2222');

    await waitFor(() => {
      expect(getDisplayInput()).toHaveValue('22:22:00');
    });
  });

  test('does not wrap focus back to HH after completing full time entry', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="24" defaultValue="00:00:00" />
      </Grommet>,
    );

    const input = getSegment('hours');
    await user.click(input);
    // Type 12:34:56 complete time
    // After entering 56 in SS, focus should stay on SS
    await user.keyboard('{Home}123456');

    // Should be 12:34:56
    await waitFor(() => {
      expect(getDisplayInput()).toHaveValue('12:34:56');
    });

    // Verify typing another digit stays on SS (doesn't wrap to HH)
    // When typing 4 on SS with value 56, it becomes the first digit buffer
    // So 56 becomes 04 (4 is first digit, 0 is pending display)
    await user.keyboard('4');
    await waitFor(() => {
      // Focus stays on SS, 4 becomes first digit (SS = 04)
      expect(getDisplayInput()).toHaveValue('12:34:04');
    });

    // Type another digit to complete the second digit in SS
    // 4 + 5 = 45 (valid)
    await user.keyboard('5');
    await waitFor(() => {
      // 4 + 5 = 45, and focus stays on SS (not wrapping back to HH)
      expect(getDisplayInput()).toHaveValue('12:34:45');
    });
  });

  test('does not modify typed minute values that do not match minuteStep', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="24" minuteStep={15} />
      </Grommet>,
    );

    const input = getSegment('hours');

    // Click and type a time with minute value 22 (does not match minuteStep={15})
    await user.click(input);
    await user.keyboard('12:22:00');

    // Expect the value to remain 12:22:00 (not snapped to 12:15:00 or 12:30:00)
    expect(getDisplayInput()).toHaveValue('12:22:00');
  });

  test('does not modify typed minute values 07 that do not match minuteStep', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="24" minuteStep={15} />
      </Grommet>,
    );

    const input = getSegment('hours');

    // Type a minute value that doesn't match the step
    await user.click(input);
    await user.keyboard('10:07:00');

    // Expect value to remain exactly as typed (not corrected to 10:00:00 or 10:15:00)
    expect(getDisplayInput()).toHaveValue('10:07:00');
  });

  test('does not modify pasted time values with misaligned minutes', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="24" minuteStep={15} />
      </Grommet>,
    );

    const input = getSegment('hours');

    // Click into the component and type a time with misaligned minute
    await user.click(input);
    await user.keyboard('14:22:30');

    // Value must be preserved exactly as typed (not snapped/corrected)
    expect(getDisplayInput()).toHaveValue('14:22:30');
  });

  test('applies compact HHMMSS paste contract in 24-hour format', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="24" />
      </Grommet>,
    );

    const input = getSegment('hours');

    await user.click(input);

    const cases = [
      { pasted: '123456', expected: '12:34:56' },
      { pasted: '234559', expected: '23:45:59' },
      { pasted: '004559', expected: '00:45:59' },
    ];

    cases.forEach(({ pasted, expected }) => {
      fireEvent.paste(input, {
        clipboardData: {
          getData: () => pasted,
        },
      });

      expect(getDisplayInput()).toHaveValue(expected);
    });
  });

  test('applies compact HHMMSS paste contract in 12-hour format', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="12" />
      </Grommet>,
    );

    const input = getSegment('hours');

    await user.click(input);

    const cases = [
      { pasted: '123456', expected: '12:34:56 PM' },
      { pasted: '234559', expected: '11:45:59 PM' },
      { pasted: '004559', expected: '12:45:59 AM' },
    ];

    cases.forEach(({ pasted, expected }) => {
      fireEvent.paste(input, {
        clipboardData: {
          getData: () => pasted,
        },
      });

      expect(getDisplayInput()).toHaveValue(expected);
    });
  });

  test('rejects incomplete compact paste values', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="12" defaultValue="09:30:00" />
      </Grommet>,
    );

    const input = getSegment('hours');

    await user.click(input);

    fireEvent.paste(input, {
      clipboardData: {
        getData: () => '2345',
      },
    });

    expect(getDisplayInput()).toHaveValue('09:30:00 AM');
  });

  test('uses explicit meridiem token only when AM or PM is a full token', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="12" defaultValue="09:30:00" />
      </Grommet>,
    );

    const input = getSegment('hours');

    await user.click(input);

    fireEvent.paste(input, {
      clipboardData: {
        getData: () => '11:22:33 PM',
      },
    });

    expect(getDisplayInput()).toHaveValue('11:22:33 PM');

    fireEvent.paste(input, {
      clipboardData: {
        getData: () => '112233 spam',
      },
    });

    expect(getDisplayInput()).toHaveValue('11:22:33 AM');
  });

  test('arrow keys still respect minuteStep increment', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="24" defaultValue="10:00:00" minuteStep={15} />
      </Grommet>,
    );

    const input = getSegment('hours');

    // Click and navigate to minute section
    await user.click(input);
    await user.keyboard('{Home}{ArrowRight}'); // Move to MM section

    // Press ArrowUp to increment by minuteStep (15)
    await user.keyboard('{ArrowUp}');
    expect(getDisplayInput()).toHaveValue('10:15:00');

    // Press ArrowUp again
    await user.keyboard('{ArrowUp}');
    expect(getDisplayInput()).toHaveValue('10:30:00');

    // Continue incrementing: 45, 0 (wrap), 15, 30
    await user.keyboard('{ArrowUp}');
    expect(getDisplayInput()).toHaveValue('10:45:00');

    // Wrap around at end (minute=45 + step=15 => 0)
    await user.keyboard('{ArrowUp}');
    expect(getDisplayInput()).toHaveValue('10:00:00');
  });

  test('dropdown options reflect minuteStep intervals', async () => {
    const user = userEvent.setup();

    // Verify the minute options array generated for minuteStep={20} has correct values
    // by rendering with a controlled default value and arrow-keying through
    render(
      <Grommet>
        <TimeInput format="24" defaultValue="10:00:00" minuteStep={20} />
      </Grommet>,
    );

    const input = getSegment('hours');

    // Navigate to MM section
    await user.click(input);
    await user.keyboard('{Home}{ArrowRight}'); // Move to MM section

    // Arrow through options - should step in multiples of 20 only
    await user.keyboard('{ArrowUp}');
    expect(getDisplayInput()).toHaveValue('10:20:00');

    await user.keyboard('{ArrowUp}');
    expect(getDisplayInput()).toHaveValue('10:40:00');

    // Wraps from 40 back to 0
    await user.keyboard('{ArrowUp}');
    expect(getDisplayInput()).toHaveValue('10:00:00');
  });

  test('normalizes invalid minuteStep values to avoid crashes', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="24" defaultValue="10:00:00" minuteStep={0} />
      </Grommet>,
    );

    const input = getSegment('hours');

    await user.click(input);
    await user.keyboard('{Home}{ArrowRight}');
    await user.keyboard('{ArrowUp}');
    expect(getDisplayInput()).toHaveValue('10:01:00');
  });

  test('auto-scrolls selected minute and second options on open', async () => {
    const user = userEvent.setup();
    const originalScrollIntoView = window.HTMLElement.prototype.scrollIntoView;
    const scrollIntoViewSpy = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewSpy;

    try {
      render(
        <Grommet>
          <TimeInput format="12" defaultValue="00:30:20" />
        </Grommet>,
      );

      await user.click(screen.getByRole('button', { name: 'Choose time' }));

      const minuteList = screen.getByRole('listbox', { name: 'minute' });
      const secondList = screen.getByRole('listbox', { name: 'second' });

      const selectedMinuteOption = within(minuteList).getByRole('option', {
        name: '30 minutes',
      });
      const selectedSecondOption = within(secondList).getByRole('option', {
        name: '20 seconds',
      });

      await waitFor(() => {
        expect(scrollIntoViewSpy).toHaveBeenCalled();
      });

      expect(scrollIntoViewSpy.mock.contexts).toContain(selectedMinuteOption);
      expect(scrollIntoViewSpy.mock.contexts).toContain(selectedSecondOption);
    } finally {
      window.HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
    }
  });

  test('does not scroll popup options after clicking to select one', async () => {
    const user = userEvent.setup();
    const offsetHeightDescriptor = Object.getOwnPropertyDescriptor(
      window.HTMLElement.prototype,
      'offsetHeight',
    );
    const clientHeightDescriptor = Object.getOwnPropertyDescriptor(
      window.HTMLElement.prototype,
      'clientHeight',
    );
    const offsetTopDescriptor = Object.getOwnPropertyDescriptor(
      window.HTMLElement.prototype,
      'offsetTop',
    );

    Object.defineProperty(window.HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      get() {
        return 40;
      },
    });

    Object.defineProperty(window.HTMLElement.prototype, 'clientHeight', {
      configurable: true,
      get() {
        return this.getAttribute?.('role') === 'listbox' ? 200 : 40;
      },
    });

    Object.defineProperty(window.HTMLElement.prototype, 'offsetTop', {
      configurable: true,
      get() {
        const optionKey = this.getAttribute?.('data-option-key');
        if (!optionKey) return 0;

        const [, rawValue] = optionKey.split('-');
        const numericValue = Number(rawValue);
        return Number.isFinite(numericValue) ? numericValue * 40 : 0;
      },
    });

    try {
      render(
        <Grommet>
          <TimeInput format="12" defaultValue="00:30:20" />
        </Grommet>,
      );

      await user.click(screen.getByRole('button', { name: 'Choose time' }));

      const minuteList = screen.getByRole('listbox', { name: 'minute' });
      await waitFor(() => {
        expect(minuteList.scrollTop).toBeGreaterThan(0);
      });

      const initialMinuteScrollTop = minuteList.scrollTop;
      const nextMinuteOption = within(minuteList).getByRole('option', {
        name: '31 minutes',
      });

      await user.click(nextMinuteOption);

      expect(getDisplayInput()).toHaveValue('12:31:20 AM');
      expect(minuteList.scrollTop).toBe(initialMinuteScrollTop);
    } finally {
      if (offsetHeightDescriptor) {
        Object.defineProperty(
          window.HTMLElement.prototype,
          'offsetHeight',
          offsetHeightDescriptor,
        );
      }

      if (clientHeightDescriptor) {
        Object.defineProperty(
          window.HTMLElement.prototype,
          'clientHeight',
          clientHeightDescriptor,
        );
      }

      if (offsetTopDescriptor) {
        Object.defineProperty(
          window.HTMLElement.prototype,
          'offsetTop',
          offsetTopDescriptor,
        );
      }
    }
  });
});
