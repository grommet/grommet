import React from 'react';
import 'jest-styled-components';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import '@testing-library/jest-dom';

import { createPortal } from '../../../utils/portal';
import { Grommet } from '../../Grommet';
import { TimeInput } from '..';

describe('TimeInput', () => {
  beforeEach(createPortal);

  test('should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <TimeInput format="12" defaultValue="12:34:56 PM" />
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

    const input = screen.getByRole('spinbutton');
    await user.click(input);
    await user.keyboard('{Alt>}{ArrowDown}{/Alt}');

    expect(document.getElementById('time-picker__drop')).toBeTruthy();

    await user.keyboard('{Escape}');
    expect(document.getElementById('time-picker__drop')).toBeNull();
  });

  test('does not show an active section before focus', () => {
    render(
      <Grommet>
        <TimeInput format="12" />
      </Grommet>,
    );

    expect(screen.queryByTestId('time-input-active-section')).toBeNull();
  });

  test('updates active section via arrows and digits', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="24" defaultValue="00:00:00" />
      </Grommet>,
    );

    const input = screen.getByRole('spinbutton');
    await user.click(input);
    await user.keyboard('{Home}');
    await user.keyboard('1');
    await user.keyboard('2');
    await user.keyboard('3');
    await user.keyboard('4');

    expect(input).toHaveValue('12:34:00');
  });

  test('announces active section value through aria-valuetext', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="12" defaultValue="12:35:10 PM" />
      </Grommet>,
    );

    const input = screen.getByRole('spinbutton');

    await user.click(input);
    await user.keyboard('{Home}');

    await waitFor(() => {
      expect(input).toHaveAttribute('aria-valuetext', '12 hours');
    });

    await user.keyboard('{ArrowRight}');
    await waitFor(() => {
      expect(input).toHaveAttribute('aria-valuetext', '35 minutes');
    });
  });

  test('updates spinbutton range metadata for the active section', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="12" defaultValue="12:35:10 PM" />
      </Grommet>,
    );

    const input = screen.getByRole('spinbutton');
    await user.click(input);
    await user.keyboard('{Home}');

    await waitFor(() => {
      expect(input).toHaveAttribute('aria-valuenow', '12');
      expect(input).toHaveAttribute('aria-valuemin', '1');
      expect(input).toHaveAttribute('aria-valuemax', '12');
    });

    await user.keyboard('{ArrowRight}');
    await waitFor(() => {
      expect(input).toHaveAttribute('aria-valuenow', '35');
      expect(input).toHaveAttribute('aria-valuemin', '0');
      expect(input).toHaveAttribute('aria-valuemax', '59');
    });

    await user.keyboard('{End}');
    await waitFor(() => {
      expect(input).toHaveAttribute('aria-valuenow', '1');
      expect(input).toHaveAttribute('aria-valuemin', '0');
      expect(input).toHaveAttribute('aria-valuemax', '1');
    });
  });

  test('selects hour section on focus in empty state', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="12" />
      </Grommet>,
    );

    const input = screen.getByRole('spinbutton') as HTMLInputElement;
    await user.click(input);

    await waitFor(() => {
      expect(input).toHaveValue('hh:mm:ss aa');
      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(2);
    });
  });

  test('moves between placeholder sections with ArrowRight in empty state', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="12" />
      </Grommet>,
    );

    const input = screen.getByRole('spinbutton') as HTMLInputElement;
    await user.click(input);

    await waitFor(() => {
      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(2);
    });

    await user.keyboard('{ArrowRight}');
    await waitFor(() => {
      expect(input.selectionStart).toBe(3);
      expect(input.selectionEnd).toBe(5);
    });

    await user.keyboard('{ArrowRight}');
    await waitFor(() => {
      expect(input.selectionStart).toBe(6);
      expect(input.selectionEnd).toBe(8);
    });
  });

  test('selects minute section when clicking minute token in empty state', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="12" />
      </Grommet>,
    );

    const input = screen.getByRole('spinbutton') as HTMLInputElement;

    await user.click(input);
    await user.click(screen.getByText('mm'));

    await waitFor(() => {
      expect(input.selectionStart).toBe(3);
      expect(input.selectionEnd).toBe(5);
    });

    await user.keyboard('15');
    expect(input).toHaveValue('hh:15:ss aa');
  });

  test('keeps clicked placeholder section active for hh, mm, ss, and aa', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="12" />
      </Grommet>,
    );

    const input = screen.getByRole('spinbutton') as HTMLInputElement;

    await user.click(input);
    await user.click(screen.getByText('hh'));

    await waitFor(() => {
      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(2);
    });

    await user.click(screen.getByText('mm'));

    await waitFor(() => {
      expect(input.selectionStart).toBe(3);
      expect(input.selectionEnd).toBe(5);
    });

    await user.click(screen.getByText('ss'));

    await waitFor(() => {
      expect(input.selectionStart).toBe(6);
      expect(input.selectionEnd).toBe(8);
    });

    await user.click(screen.getByText('aa'));

    await waitFor(() => {
      expect(input.selectionStart).toBe(9);
      expect(input.selectionEnd).toBe(11);
    });
  });

  test('uses directly clicked placeholder token on first click', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="12" />
      </Grommet>,
    );

    const input = screen.getByRole('spinbutton') as HTMLInputElement;

    await user.click(screen.getByText('ss'));

    await waitFor(() => {
      expect(input.selectionStart).toBe(6);
      expect(input.selectionEnd).toBe(8);
    });
  });

  test('supports uncontrolled initial value', () => {
    render(
      <Grommet>
        <TimeInput format="12" defaultValue="01:05:09 PM" />
      </Grommet>,
    );

    expect(screen.getByRole('spinbutton')).toHaveValue('01:05:09 PM');
  });

  test('clears only the active section when deleting from a complete value', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="12" defaultValue="12:34:56 PM" />
      </Grommet>,
    );

    const input = screen.getByRole('spinbutton');

    await user.click(input);
    await user.keyboard('{Home}');
    await user.keyboard('{Backspace}');

    expect(input).toHaveValue('hh:34:56 PM');
  });

  test('keeps selection on cleared middle sections after delete', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="12" defaultValue="12:34:56 PM" />
      </Grommet>,
    );

    const input = screen.getByRole('spinbutton') as HTMLInputElement;

    await user.click(input);
    await user.keyboard('{Home}{ArrowRight}');
    await user.keyboard('{Backspace}');

    await waitFor(() => {
      expect(input).toHaveValue('12:mm:56 PM');
      expect(input.selectionStart).toBe(3);
      expect(input.selectionEnd).toBe(5);
    });

    await user.keyboard('{ArrowRight}');
    await user.keyboard('{Backspace}');

    await waitFor(() => {
      expect(input).toHaveValue('12:mm:ss PM');
      expect(input.selectionStart).toBe(6);
      expect(input.selectionEnd).toBe(8);
    });
  });

  test('applies minuteStep to keyboard increments', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="24" defaultValue="10:30:00" minuteStep={15} />
      </Grommet>,
    );

    const input = screen.getByRole('spinbutton');

    await user.click(input);
    await user.keyboard('{Home}{ArrowRight}');

    await user.keyboard('{ArrowUp}');
    expect(input).toHaveValue('10:45:00');

    await user.keyboard('{ArrowUp}');
    expect(input).toHaveValue('10:00:00');
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
    const input = screen.getByRole('spinbutton');

    await user.click(input);
    await user.keyboard('1');

    const partialFormData = new FormData(form as HTMLFormElement);
    expect(partialFormData.get('alarmTime')).toBe('');

    await user.keyboard('23456p');

    const completeFormData = new FormData(form as HTMLFormElement);
    expect(completeFormData.get('alarmTime')).toBe('12:34:56 PM');
  });

  test('disables both spinbutton and trigger button when disabled', () => {
    render(
      <Grommet>
        <TimeInput format="12" defaultValue="09:45:10 AM" disabled />
      </Grommet>,
    );

    expect(screen.getByRole('spinbutton')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Choose time' })).toBeDisabled();
  });

  test('read-only mode hides trigger and prevents keyboard edits and drop open', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput
          id="read-only-picker"
          format="12"
          defaultValue="12:00:00 AM"
          readOnly
        />
      </Grommet>,
    );

    const input = screen.getByRole('spinbutton');
    expect(screen.queryByRole('button', { name: 'Choose time' })).toBeNull();

    await user.click(input);
    await user.keyboard('{Alt>}{ArrowDown}{/Alt}');
    await user.keyboard('{Home}99');

    expect(document.getElementById('read-only-picker__drop')).toBeNull();
    expect(input).toHaveValue('12:00:00 AM');
  });

  test('read-only mode does not show active section highlight on focus', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="12" defaultValue="12:00:00 AM" readOnly />
      </Grommet>,
    );

    await user.click(screen.getByRole('spinbutton'));

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

    const input = screen.getByRole('spinbutton');
    expect(input).toHaveValue('09:10:11');

    await user.click(input);
    await user.keyboard('{Home}12');

    expect(onChange).toHaveBeenCalled();

    await user.click(
      screen.getByRole('button', { name: 'set-controlled-value' }),
    );
    expect(input).toHaveValue('10:20:30');
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

    const input = screen.getByRole('spinbutton');
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
      name: '13',
    });
    const selectedMinuteOption = within(minuteList).getByRole('option', {
      name: '45',
    });
    const selectedSecondOption = within(secondList).getByRole('option', {
      name: '30',
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

    const input = screen.getByRole('spinbutton');
    await user.click(input);
    await user.keyboard('{Alt>}{ArrowDown}{/Alt}');

    const hourList = screen.getByRole('listbox', { name: 'hour' });
    await user.click(within(hourList).getByRole('option', { name: '07' }));

    expect(input).toHaveValue('07:00:00');
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
    const option = within(hourList).getByRole('option', { name: '01' });

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
        within(hourList).getByRole('option', { name: '01' }),
      ).toHaveFocus();
    });
  });

  test('allows replacing hour with leading zero in 12-hour format', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TimeInput format="12" defaultValue="07:30:00 AM" />
      </Grommet>,
    );

    const input = screen.getByRole('spinbutton');
    await user.click(input);
    await user.keyboard('{Home}05');

    await waitFor(() => {
      expect(input).toHaveValue('05:30:00 AM');
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

    const input = screen.getByRole('spinbutton');
    await user.click(input);
    await user.keyboard('{Home}1');

    expect(onChange).toHaveBeenCalled();
    const firstCallArg = onChange.mock.calls[0][0];
    expect(firstCallArg).toHaveProperty('value');
    expect(typeof firstCallArg.value).toBe('string');
  });
});
