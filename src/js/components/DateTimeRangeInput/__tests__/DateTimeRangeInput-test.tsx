// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
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
import { DateTimeRangeInput } from '..';

const currentMonthDate = (day: number, hour = 0, minute = 0) => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), day, hour, minute);
};

describe('DateTimeRangeInput', () => {
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
        <DateTimeRangeInput
          format="12"
          value={['2026-07-22T09:00:00.000Z', '2026-07-22T18:30:00.000Z']}
        />
      </Grommet>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('renders start and end labeled date time inputs', () => {
    render(
      <Grommet
        theme={{
          formField: {
            error: {
              background: '#FFE5E5',
            },
          },
        }}
      >
        <DateTimeRangeInput format="12" />
      </Grommet>,
    );

    expect(
      screen.getByRole('group', { name: 'Start date and time' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('group', { name: 'End date and time' }),
    ).toBeInTheDocument();
  });

  test('applies a supplied preset range when selected', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const presetValue: [string, string] = [
      '2026-07-22T09:00:00.000Z',
      '2026-07-22T18:30:00.000Z',
    ];

    render(
      <Grommet>
        <DateTimeRangeInput
          format="12"
          ranges={[
            {
              id: 'business-hours',
              label: 'Business hours',
              getValue: () => presetValue,
            },
          ]}
          onChange={onChange}
        />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );
    await user.click(screen.getByRole('button', { name: 'Business hours' }));

    expect(onChange).toHaveBeenCalledWith({ value: presetValue });
    expect(screen.getByText('Business hours')).toBeInTheDocument();
    expect(
      screen.queryByRole('group', { name: 'Start date and time' }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('grid')).not.toBeInTheDocument();
  });

  test('shows the selected preset in the field and Custom range last', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeRangeInput
          format="12"
          ranges={[
            {
              id: 'last-hour',
              label: 'Last hour',
              getValue: () => [
                '2026-07-22T09:00:00.000Z',
                '2026-07-22T18:30:00.000Z',
              ],
            },
            {
              id: 'last-day',
              label: 'Last day',
              getValue: () => [
                '2026-07-22T09:00:00.000Z',
                '2026-07-22T18:30:00.000Z',
              ],
            },
          ]}
        />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );

    expect(screen.getByRole('button', { name: 'Last hour' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Last day' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Custom range' }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Last day' }));

    expect(screen.getByText('Last day')).toBeInTheDocument();
    expect(
      screen.queryByRole('group', { name: 'Start date and time' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Custom range' }),
    ).not.toBeInTheDocument();
  });

  test('uses the provided custom range message', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeRangeInput
          format="12"
          messages={{ customRange: 'Choose exact dates' }}
          ranges={[
            {
              id: 'last-hour',
              label: 'Last hour',
              getValue: () => [
                '2026-07-22T09:00:00.000Z',
                '2026-07-22T18:30:00.000Z',
              ],
            },
          ]}
        />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );

    expect(
      screen.getByRole('button', { name: 'Choose exact dates' }),
    ).toHaveAttribute('aria-pressed', 'true');
  });

  test('shows custom range actions separately from presets', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeRangeInput
          format="12"
          ranges={[
            {
              id: 'last-hour',
              label: 'Last hour',
              getValue: () => [
                '2026-07-22T09:00:00.000Z',
                '2026-07-22T18:30:00.000Z',
              ],
            },
          ]}
        />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );
    await user.click(screen.getByRole('button', { name: 'Custom range' }));

    const nextButton = screen.getByRole('button', { name: 'Next' });
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });

    expect(nextButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Last hour' }),
    ).toBeInTheDocument();
  });

  test('opens the editable custom range flow from a preset selection', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeRangeInput
          format="12"
          ranges={[
            {
              id: 'business-hours',
              label: 'Business hours',
              getValue: () => [
                '2026-07-22T09:00:00.000Z',
                '2026-07-22T18:30:00.000Z',
              ],
            },
          ]}
          value={['2026-07-22T09:00:00.000Z', '2026-07-22T18:30:00.000Z']}
        />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );
    await user.click(screen.getByRole('button', { name: 'Business hours' }));
    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );
    await user.click(screen.getByRole('button', { name: 'Custom range' }));

    const startGroup = screen.getByRole('group', {
      name: 'Start date and time',
      hidden: true,
    });
    const endGroup = screen.getByRole('group', {
      name: 'End date and time',
      hidden: true,
    });
    expect(startGroup).toHaveTextContent('mm/dd/yyyy hh:mm aa');
    expect(endGroup).toHaveTextContent('mm/dd/yyyy hh:mm aa');
    expect(
      within(startGroup).getByRole('spinbutton', {
        name: 'day',
        hidden: true,
      }),
    ).not.toHaveAttribute('aria-readonly', 'true');
    expect(
      screen.getByRole('button', { name: 'Custom range' }),
    ).toHaveAttribute('aria-pressed', 'true');
    expect(
      screen.getByRole('button', { name: 'Business hours' }),
    ).toHaveAttribute('aria-pressed', 'false');
    await waitFor(() =>
      expect(screen.getByRole('grid')).toContainElement(
        document.activeElement as HTMLElement,
      ),
    );

    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.getByText('Business hours')).toBeInTheDocument();
    expect(screen.queryByRole('grid')).not.toBeInTheDocument();
  });

  test('keeps focus on empty End meridiem after typing Start with keyboard', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeRangeInput format="12" />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );

    const startGroup = screen.getByRole('group', {
      name: 'Start date and time',
      hidden: true,
    });
    await user.click(
      within(startGroup).getByRole('spinbutton', {
        name: 'day',
        hidden: true,
      }),
    );
    await user.keyboard('12');
    await user.click(
      within(startGroup).getByRole('spinbutton', {
        name: 'month',
        hidden: true,
      }),
    );
    await user.keyboard('09');
    await user.click(
      within(startGroup).getByRole('spinbutton', {
        name: 'year',
        hidden: true,
      }),
    );
    await user.keyboard('2026');
    await user.click(
      within(startGroup).getByRole('spinbutton', {
        name: 'hours',
        hidden: true,
      }),
    );
    await user.keyboard('10');
    await user.click(
      within(startGroup).getByRole('spinbutton', {
        name: 'minutes',
        hidden: true,
      }),
    );
    await user.keyboard('00');
    await user.click(
      within(startGroup).getByRole('spinbutton', {
        name: 'meridiem',
        hidden: true,
      }),
    );
    await user.keyboard('{ArrowUp}');

    const endGroup = screen.getByRole('group', {
      name: 'End date and time',
      hidden: true,
    });
    const endMeridiem = within(endGroup).getByRole('spinbutton', {
      name: 'meridiem',
      hidden: true,
    });

    await user.click(endMeridiem);
    expect(endMeridiem).toHaveFocus();
    await user.keyboard('{ArrowUp}');

    expect(endMeridiem).toHaveTextContent('AM');
    await waitFor(() => expect(endMeridiem).toHaveFocus());

    await user.keyboard('{ArrowDown}');

    expect(endMeridiem).toHaveTextContent('PM');
    await waitFor(() => expect(endMeridiem).toHaveFocus());
  });

  test('changes the active time segment with ArrowUp and ArrowDown', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeRangeInput
          format="24"
          value={[
            currentMonthDate(10, 10).toISOString(),
            currentMonthDate(10, 12).toISOString(),
          ]}
        />
      </Grommet>,
    );

    const startGroup = screen.getByRole('group', {
      name: 'Start date and time',
    });
    const hours = within(startGroup).getByRole('spinbutton', {
      name: 'hours',
    });

    await user.click(hours);
    await user.keyboard('{ArrowUp}');
    expect(startGroup).toHaveTextContent('11:00');

    await user.keyboard('{ArrowDown}');
    expect(startGroup).toHaveTextContent('10:00');
    expect(hours).toHaveFocus();
  });

  test('renders the preset calendar as read-only', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeRangeInput
          format="12"
          ranges={[
            {
              id: 'business-hours',
              label: 'Business hours',
              getValue: () => [
                '2026-07-22T09:00:00.000Z',
                '2026-07-22T18:30:00.000Z',
              ],
            },
          ]}
        />
      </Grommet>,
    );

    const trigger = screen.getByRole('button', {
      name: 'Open date and time range picker',
    });
    await user.click(trigger);
    await user.click(screen.getByRole('button', { name: 'Business hours' }));
    await user.click(trigger);

    await user.click(
      within(screen.getByRole('grid')).getByRole('button', {
        name: 'Fri Jul 10 2026',
      }),
    );

    expect(
      screen.getByRole('button', { name: 'Business hours' }),
    ).toHaveAttribute('aria-pressed', 'true');
    expect(
      screen.queryByRole('button', { name: 'Next' }),
    ).not.toBeInTheDocument();
  });

  test('does not apply an invalid preset range', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(
      <Grommet>
        <DateTimeRangeInput
          format="12"
          ranges={[
            {
              id: 'invalid',
              label: 'Invalid range',
              getValue: () => [
                '2026-07-22T18:30:00.000Z',
                '2026-07-22T09:00:00.000Z',
              ],
            },
          ]}
          onChange={onChange}
        />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );
    await user.click(screen.getByRole('button', { name: 'Invalid range' }));

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  test('does not apply a preset range with a missing endpoint', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const malformedValue = [null, '2026-07-22T18:30:00.000Z'] as unknown as [
      string,
      string,
    ];

    render(
      <Grommet>
        <DateTimeRangeInput
          format="12"
          ranges={[
            {
              id: 'missing-endpoint',
              label: 'Missing endpoint',
              getValue: () => malformedValue,
            },
          ]}
          onChange={onChange}
        />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );
    await user.click(screen.getByRole('button', { name: 'Missing endpoint' }));

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  test('keeps a controlled value authoritative when selecting a preset', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const controlledValue: [string, string] = [
      currentMonthDate(6, 9).toISOString(),
      currentMonthDate(14, 18).toISOString(),
    ];
    const presetValue: [string, string] = [
      currentMonthDate(1).toISOString(),
      currentMonthDate(2).toISOString(),
    ];

    render(
      <Grommet>
        <DateTimeRangeInput
          format="12"
          value={controlledValue}
          onChange={onChange}
          ranges={[
            {
              id: 'preset',
              label: 'Preset range',
              getValue: () => presetValue,
            },
          ]}
        />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );
    await user.click(screen.getByRole('button', { name: 'Preset range' }));

    expect(onChange).toHaveBeenCalledWith({ value: presetValue });
    expect(screen.queryByText('Preset range')).not.toBeInTheDocument();
    expect(
      screen.getByRole('group', { name: 'Start date and time' }),
    ).toBeInTheDocument();
  });

  test('associates the FormField label with the composite range input', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <Form>
          <FormField
            htmlFor="maintenance-window"
            name="window"
            label="Maintenance window"
          >
            <DateTimeRangeInput
              id="maintenance-window"
              name="window"
              format="12"
            />
          </FormField>
        </Form>
      </Grommet>,
    );

    expect(
      screen.getByRole('group', { name: 'Maintenance window' }),
    ).toBeInTheDocument();

    await user.click(screen.getByText('Maintenance window'));
    expect(
      within(
        screen.getByRole('group', { name: 'Start date and time' }),
      ).getByRole('spinbutton', { name: 'month' }),
    ).toHaveFocus();
  });

  test('selects and applies a complete range inside FormField', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(
      <Grommet>
        <Form>
          <FormField name="range" label="Range">
            <DateTimeRangeInput name="range" format="12" onChange={onChange} />
          </FormField>
        </Form>
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );
    await user.click(
      within(screen.getByRole('grid')).getByRole('button', {
        name: currentMonthDate(6).toDateString(),
      }),
    );
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(
      within(screen.getByRole('grid')).getByRole('button', {
        name: currentMonthDate(14).toDateString(),
      }),
    );
    await user.click(screen.getByRole('button', { name: 'Apply' }));

    expect(onChange).toHaveBeenLastCalledWith({
      value: [
        currentMonthDate(6).toISOString(),
        currentMonthDate(14, 23, 59).toISOString(),
      ],
    });
  });

  test('keeps default FormField validation styling on the range field only', async () => {
    const user = userEvent.setup();
    const validateRange = (range?: [string?, string?]) =>
      range?.[0] && range?.[1]
        ? undefined
        : 'Select both a start and end date and time.';

    render(
      <Grommet>
        <Form value={{ stay: [undefined, undefined] }}>
          <FormField name="stay" required validate={validateRange}>
            <DateTimeRangeInput name="stay" format="12" />
          </FormField>
          <Button type="submit" label="Submit" />
        </Form>
      </Grommet>,
    );

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(
      screen.getByText('Select both a start and end date and time.'),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole('textbox', { hidden: true }).every((input) =>
        input.getAttribute('aria-invalid') === 'true',
      ),
    ).toBe(true);
  });

  test('supports FormField validation for an incomplete range', async () => {
    const user = userEvent.setup();
    const validateRange = (range?: [string?, string?]) =>
      range?.[0] && range?.[1]
        ? undefined
        : 'Select both a start and end date and time.';

    render(
      <Grommet>
        <Form value={{ stay: [undefined, undefined] }}>
          <FormField name="stay" required validate={validateRange}>
            <DateTimeRangeInput name="stay" format="12" />
          </FormField>
          <Button type="submit" label="Submit" />
        </Form>
      </Grommet>,
    );

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(
      screen.getByText('Select both a start and end date and time.'),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole('textbox', { hidden: true }).every((input) =>
        input.getAttribute('aria-invalid') === 'true',
      ),
    ).toBe(true);
  });

  test('does not emit onChange during initial render', () => {
    const onChange = jest.fn();

    render(
      <Grommet>
        <DateTimeRangeInput
          format="12"
          value={[undefined, '2026-07-22T18:30:00.000Z']}
          onChange={onChange}
        />
      </Grommet>,
    );

    // start field is rendered and independently controlled from end
    expect(
      screen.getByRole('group', { name: 'Start date and time' }),
    ).toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled();
  });

  test('keeps invalid controlled inline edit visible for correction', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(
      <Grommet>
        <DateTimeRangeInput
          format="24"
          value={['2026-07-22T18:00:00.000Z', '2026-07-22T19:00:00.000Z']}
          onChange={onChange}
        />
      </Grommet>,
    );

    const endGroup = screen.getByRole('group', {
      name: 'End date and time',
    });
    const endHours = within(endGroup).getByRole('spinbutton', {
      name: 'hours',
    });

    await user.click(endHours);
    await user.keyboard('{ArrowDown}');

    expect(onChange).not.toHaveBeenCalled();
    expect(endGroup).toHaveTextContent('11:00');
    await waitFor(() => expect(endHours).toHaveFocus());
  });

  test('keeps invalid inline End entry visible and focused for correction', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    const ControlledRange = () => {
      const [range, setRange] = React.useState<[string?, string?]>([
        undefined,
        undefined,
      ]);
      return (
        <DateTimeRangeInput
          format="12"
          value={range}
          onChange={({ value: nextRange }) => {
            onChange({ value: nextRange });
            setRange(nextRange || [undefined, undefined]);
          }}
        />
      );
    };

    render(
      <Grommet>
        <ControlledRange />
      </Grommet>,
    );

    const startGroup = screen.getByRole('group', {
      name: 'Start date and time',
    });
    await user.click(
      within(startGroup).getByRole('spinbutton', { name: 'day' }),
    );
    await user.keyboard('03');
    await user.click(
      within(startGroup).getByRole('spinbutton', { name: 'month' }),
    );
    await user.keyboard('02');
    await user.click(
      within(startGroup).getByRole('spinbutton', { name: 'year' }),
    );
    await user.keyboard('2027');
    await user.click(
      within(startGroup).getByRole('spinbutton', { name: 'hours' }),
    );
    await user.keyboard('02');
    await user.click(
      within(startGroup).getByRole('spinbutton', { name: 'minutes' }),
    );
    await user.keyboard('01');
    await user.click(
      within(startGroup).getByRole('spinbutton', { name: 'meridiem' }),
    );
    await user.keyboard('{ArrowUp}');

    const endGroup = screen.getByRole('group', {
      name: 'End date and time',
    });
    await user.click(within(endGroup).getByRole('spinbutton', { name: 'day' }));
    await user.keyboard('01');
    await user.click(
      within(endGroup).getByRole('spinbutton', { name: 'month' }),
    );
    await user.keyboard('01');
    await user.click(
      within(endGroup).getByRole('spinbutton', { name: 'year' }),
    );
    await user.keyboard('2026');
    await user.click(
      within(endGroup).getByRole('spinbutton', { name: 'hours' }),
    );
    await user.keyboard('01');
    await user.click(
      within(endGroup).getByRole('spinbutton', { name: 'minutes' }),
    );
    await user.keyboard('00');

    const endMeridiem = within(endGroup).getByRole('spinbutton', {
      name: 'meridiem',
    });
    await user.click(endMeridiem);
    await user.keyboard('{ArrowUp}');

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(endGroup).toHaveTextContent('01/01/2026 01:00 AM');
    await waitFor(() => expect(endMeridiem).toHaveFocus());
  });

  test('blocks disabled and read-only interactions', async () => {
    const { rerender } = render(
      <Grommet>
        <DateTimeRangeInput disabled aria-label="Range" />
      </Grommet>,
    );

    const group = screen.getByRole('group', { name: 'Range' });
    expect(group).toHaveAttribute('aria-disabled', 'true');
    expect(
      screen.getByRole('button', { name: 'Open date and time range picker' }),
    ).toBeDisabled();

    rerender(
      <Grommet>
        <DateTimeRangeInput readOnly aria-label="Range" />
      </Grommet>,
    );

    expect(group).not.toHaveAttribute('aria-disabled');
    expect(
      within(group)
        .getAllByRole('spinbutton')
        .every((segment) => segment.getAttribute('aria-readonly') === 'true'),
    ).toBe(true);
    expect(
      screen.queryByRole('button', { name: 'Open date and time range picker' }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('renders custom messages', () => {
    render(
      <Grommet>
        <DateTimeRangeInput
          format="12"
          messages={{
            startLabel: 'Check-in',
            endLabel: 'Check-out',
            separator: 'through',
          }}
        />
      </Grommet>,
    );

    expect(screen.getByRole('group', { name: 'Check-in' })).toBeInTheDocument();
    expect(
      screen.getByRole('group', { name: 'Check-out' }),
    ).toBeInTheDocument();
    expect(screen.getByText('through')).toBeInTheDocument();
  });

  test('renders previous, next, and calendar toggle buttons', () => {
    render(
      <Grommet>
        <DateTimeRangeInput format="12" />
      </Grommet>,
    );

    expect(
      screen.getByRole('button', { name: 'Go to previous range' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Go to next range' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    ).toBeInTheDocument();
  });

  test('applies a custom calendar icon from the range theme', () => {
    const CustomCalendarIcon = () => <span>Custom Range Calendar Icon</span>;

    render(
      <Grommet
        theme={{
          dateTimeRangeInput: {
            icon: { calendar: CustomCalendarIcon },
          },
        }}
      >
        <DateTimeRangeInput format="12" />
      </Grommet>,
    );

    expect(screen.getByText('Custom Range Calendar Icon')).toBeInTheDocument();
  });

  test('disables previous/next range navigation until both dates are set', () => {
    render(
      <Grommet>
        <DateTimeRangeInput
          format="12"
          value={[undefined, '2026-07-22T18:30:00.000Z']}
        />
      </Grommet>,
    );

    expect(
      screen.getByRole('button', { name: 'Go to previous range' }),
    ).toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'Go to next range' }),
    ).toBeDisabled();
  });

  test('disables range navigation for malformed controlled values', () => {
    render(
      <Grommet>
        <DateTimeRangeInput
          format="12"
          value={['not-a-date', '2026-07-22T18:30:00.000Z']}
        />
      </Grommet>,
    );

    expect(
      screen.getByRole('button', { name: 'Go to previous range' }),
    ).toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'Go to next range' }),
    ).toBeDisabled();
  });

  test('shifts the range forward and backward by its duration', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(
      <Grommet>
        <DateTimeRangeInput
          format="12"
          value={['2026-07-22T09:00:00.000Z', '2026-07-22T18:30:00.000Z']}
          onChange={onChange}
        />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', { name: 'Go to previous range' }),
    );

    // shifts the window backward by its own duration (9.5 hours here)
    expect(onChange).toHaveBeenCalledWith({
      value: ['2026-07-21T23:30:00.000Z', '2026-07-22T09:00:00.000Z'],
    });

    onChange.mockClear();

    await user.click(screen.getByRole('button', { name: 'Go to next range' }));

    // shifts the window forward by its own duration (9.5 hours here)
    expect(onChange).toHaveBeenCalledWith({
      value: ['2026-07-22T18:30:00.000Z', '2026-07-23T04:00:00.000Z'],
    });
  });

  test('opens a drop that includes both calendar and time controls', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeRangeInput
          format="12"
          value={['2026-07-22T09:00:00.000Z', '2026-07-22T18:30:00.000Z']}
        />
      </Grommet>,
    );

    const trigger = screen.getByRole('button', {
      name: 'Open date and time range picker',
    });
    await user.click(trigger);

    expect(screen.getByRole('grid')).toBeInTheDocument();
    expect(screen.getAllByRole('listbox').length).toBeGreaterThan(0);
    const dialog = screen.getByRole('dialog', {
      name: 'Open date and time range picker',
    });
    expect(dialog).toHaveAttribute('id');
    expect(trigger).toHaveAttribute('aria-controls', dialog.id);
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
  });

  test('focuses the active calendar day when the picker opens', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeRangeInput format="12" />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );

    await waitFor(() =>
      expect(screen.getByRole('grid')).toContainElement(
        document.activeElement as HTMLElement,
      ),
    );
  });

  test('shows Next when a completed custom range reopens start-active', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeRangeInput
          format="12"
          value={['2026-07-22T09:00:00.000Z', '2026-07-22T18:30:00.000Z']}
        />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );

    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Apply' }),
    ).not.toBeInTheDocument();
  });

  test('returns focus to the picker trigger when the drop closes', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeRangeInput format="12" />
      </Grommet>,
    );

    const trigger = screen.getByRole('button', {
      name: 'Open date and time range picker',
    });
    await user.click(trigger);
    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    await waitFor(() => expect(trigger).toHaveFocus());
  });

  test('does not steal focus when an outside click closes the picker', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeRangeInput format="12" />
        <Button label="Outside action" />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );
    const outsideButton = screen.getByRole('button', {
      name: 'Outside action',
      hidden: true,
    });
    await user.click(outsideButton);

    expect(screen.queryByRole('grid')).not.toBeInTheDocument();
    await waitFor(() => expect(outsideButton).toHaveFocus());
  });

  test('closes the picker and returns focus to its trigger on Escape', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeRangeInput format="12" />
      </Grommet>,
    );

    const trigger = screen.getByRole('button', {
      name: 'Open date and time range picker',
    });
    await user.click(trigger);
    await waitFor(() =>
      expect(screen.getByRole('grid')).toContainElement(
        document.activeElement as HTMLElement,
      ),
    );
    fireEvent.keyDown(document.activeElement as HTMLElement, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
    });

    expect(screen.queryByRole('grid')).not.toBeInTheDocument();
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  test('discards time edits when the picker is cancelled', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeRangeInput
          format="12"
          value={['2026-07-22T09:00:00.000Z', '2026-07-22T18:30:00.000Z']}
        />
      </Grommet>,
    );

    const startGroup = screen.getByRole('group', {
      name: 'Start date and time',
    });
    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );
    await user.click(screen.getByRole('option', { name: '10 hours' }));
    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(startGroup).toHaveTextContent('07/22/2026 02:00 AM');
  });

  test('requires correcting equal endpoints before Apply', async () => {
    const user = userEvent.setup();
    const value: [string, string] = [
      '2026-07-22T09:00:00.000Z',
      '2026-07-22T09:00:00.000Z',
    ];

    render(
      <Grommet>
        <DateTimeRangeInput format="12" value={value} />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );

    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByRole('button', { name: 'Apply' })).toBeDisabled();
  });

  test('time options are not selected until a date is selected', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeRangeInput format="12" />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );

    expect(screen.getByRole('option', { name: '12 hours' })).toHaveAttribute(
      'aria-selected',
      'false',
    );
    expect(screen.getByRole('option', { name: '00 minutes' })).toHaveAttribute(
      'aria-selected',
      'false',
    );
    expect(screen.getByRole('option', { name: 'AM meridiem' })).toHaveAttribute(
      'aria-selected',
      'false',
    );

    await user.click(
      within(screen.getByRole('grid')).getByRole('button', {
        name: currentMonthDate(10).toDateString(),
      }),
    );

    expect(screen.getByRole('option', { name: '12 hours' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByRole('option', { name: '00 minutes' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByRole('option', { name: 'AM meridiem' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  test('updates input region while selecting start/end date-times in drop', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeRangeInput format="12" />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );

    await user.click(
      within(screen.getByRole('grid')).getByRole('button', {
        name: currentMonthDate(10).toDateString(),
      }),
    );
    await user.click(screen.getByRole('option', { name: '11 hours' }));
    await user.click(screen.getByRole('option', { name: '15 minutes' }));
    await user.click(screen.getByRole('option', { name: 'PM meridiem' }));

    const startGroup = screen.getByRole('group', {
      name: 'Start date and time',
      hidden: true,
    });
    expect(startGroup).toHaveTextContent('11:15 PM');
    expect(startGroup).not.toHaveTextContent('hh:mm aa');

    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(
      within(screen.getByRole('grid')).getByRole('button', {
        name: currentMonthDate(12).toDateString(),
      }),
    );
    await user.click(screen.getByRole('option', { name: '10 hours' }));
    await user.click(screen.getByRole('option', { name: '20 minutes' }));
    await user.click(screen.getByRole('option', { name: 'PM meridiem' }));

    const endGroup = screen.getByRole('group', {
      name: 'End date and time',
      hidden: true,
    });
    expect(endGroup).toHaveTextContent('10:20 PM');
    expect(endGroup).not.toHaveTextContent('hh:mm aa');
  });

  test('replaces the start date when a second click lands on a different date', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeRangeInput format="12" />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );

    const startGroup = screen.getByRole('group', {
      name: 'Start date and time',
      hidden: true,
    });
    const endGroup = screen.getByRole('group', {
      name: 'End date and time',
      hidden: true,
    });

    let calendar = within(screen.getByRole('grid'));
    const sixth = calendar.getByRole('button', {
      name: currentMonthDate(6).toDateString(),
    });
    const fourteenth = calendar.getByRole('button', {
      name: currentMonthDate(14).toDateString(),
    });

    await user.click(sixth);
    expect(startGroup).toHaveTextContent('12:00 AM');
    expect(endGroup).toHaveTextContent('hh:mm aa');
    expect(screen.getByRole('gridcell', { selected: true })).toHaveTextContent(
      '6',
    );

    await user.click(fourteenth);

    expect(startGroup).toHaveTextContent('12:00 AM');
    expect(endGroup).toHaveTextContent('hh:mm aa');
    expect(screen.getByRole('gridcell', { selected: true })).toHaveTextContent(
      '14',
    );
  });

  test('keeps the selected start date visible after pressing Next', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeRangeInput format="12" />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );

    const sixth = within(screen.getByRole('grid')).getByRole('button', {
      name: currentMonthDate(6).toDateString(),
    });
    await user.click(sixth);
    await user.click(screen.getByRole('button', { name: 'Next' }));

    expect(screen.getByRole('gridcell', { selected: true })).toHaveTextContent(
      '6',
    );
  });

  test('disables calendar days before start while selecting end', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeRangeInput format="12" />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );

    let calendar = within(screen.getByRole('grid'));
    const startDay = calendar.getByRole('button', {
      name: currentMonthDate(14).toDateString(),
    });
    await user.click(startDay);
    await user.click(screen.getByRole('button', { name: 'Next' }));
    calendar = within(screen.getByRole('grid'));

    const earlierDay = calendar.getByRole('button', {
      name: currentMonthDate(10).toDateString(),
    });
    const currentStartDay = calendar.getByRole('button', {
      name: currentMonthDate(14).toDateString(),
    });
    const laterDay = calendar.getByRole('button', {
      name: currentMonthDate(16).toDateString(),
    });

    expect(earlierDay).toHaveAttribute('aria-disabled', 'true');
    expect(currentStartDay).toHaveAttribute('aria-disabled', 'false');
    expect(laterDay).toHaveAttribute('aria-disabled', 'false');
    await user.click(earlierDay);
    expect(
      screen.getByRole('group', {
        name: 'End date and time',
        hidden: true,
      }),
    ).toHaveTextContent('hh:mm aa');
  });

  test('disables dates outside the configured min and max dates', async () => {
    const user = userEvent.setup();
    const minDate = currentMonthDate(10).toISOString();
    const maxDate = currentMonthDate(20, 23, 59).toISOString();

    render(
      <Grommet>
        <DateTimeRangeInput format="12" minDate={minDate} maxDate={maxDate} />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );

    const calendar = within(screen.getByRole('grid'));
    expect(
      calendar.getByRole('button', {
        name: currentMonthDate(9).toDateString(),
      }),
    ).toHaveAttribute('aria-disabled', 'true');
    expect(
      calendar.getByRole('button', {
        name: currentMonthDate(10).toDateString(),
      }),
    ).toHaveAttribute('aria-disabled', 'false');
    expect(
      calendar.getByRole('button', {
        name: currentMonthDate(20).toDateString(),
      }),
    ).toHaveAttribute('aria-disabled', 'false');
    expect(
      calendar.getByRole('button', {
        name: currentMonthDate(21).toDateString(),
      }),
    ).toHaveAttribute('aria-disabled', 'true');
  });

  test('does not apply a preset outside the configured date bounds', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(
      <Grommet>
        <DateTimeRangeInput
          minDate="2026-07-10T00:00:00.000Z"
          maxDate="2026-07-20T23:59:59.999Z"
          ranges={[
            {
              id: 'outside-bounds',
              label: 'Outside bounds',
              getValue: () => [
                '2026-07-01T00:00:00.000Z',
                '2026-07-11T00:00:00.000Z',
              ],
            },
          ]}
          onChange={onChange}
        />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );
    await user.click(screen.getByRole('button', { name: 'Outside bounds' }));

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('keeps Apply disabled when the draft violates a time-bearing minDate', async () => {
    const user = userEvent.setup();
    const minDate = currentMonthDate(10, 12).toISOString();

    render(
      <Grommet>
        <DateTimeRangeInput
          format="12"
          minDate={minDate}
          maxDate={currentMonthDate(20, 23, 59).toISOString()}
        />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );
    await user.click(
      within(screen.getByRole('grid')).getByRole('button', {
        name: currentMonthDate(10).toDateString(),
      }),
    );
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(
      within(screen.getByRole('grid')).getByRole('button', {
        name: currentMonthDate(11).toDateString(),
      }),
    );

    expect(
      screen.getByText(/Date and time must be on or after .*12:00 PM/),
    ).toBeInTheDocument();
    screen
      .getAllByRole('textbox', { hidden: true })
      .forEach((input) =>
        expect(input).toHaveAttribute('aria-invalid', 'true'),
      );
    expect(screen.getByRole('button', { name: 'Apply' })).toBeDisabled();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('interprets date-only minDate values in local time when validating ranges', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeRangeInput
          format="12"
          minDate="2026-07-10"
          value={['2026-07-10T01:00:00.000Z', '2026-07-10T03:00:00.000Z']}
        />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );

    expect(
      screen.getAllByText(/Date and time must be on or after/i).length,
    ).toBeGreaterThan(0);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('supports an optional timezone override for min and max bound messaging', async () => {
    const user = userEvent.setup();
    const minDate = '2026-07-10T00:00:00.000Z';
    const expectedBoundText = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'UTC',
    }).format(new Date(minDate));

    render(
      <Grommet>
        <DateTimeRangeInput
          format="12"
          locale="en-US"
          minDate={minDate}
          timezone="UTC"
          value={['2026-07-09T23:30:00.000Z', '2026-07-09T23:45:00.000Z']}
        />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );

    expect(
      within(screen.getByRole('dialog')).getByText(
        new RegExp(expectedBoundText),
      ),
    ).toBeInTheDocument();
  });

  test('disables range navigation when a shift would exceed bounds', async () => {
    render(
      <Grommet>
        <DateTimeRangeInput
          value={['2026-07-15T09:00:00.000Z', '2026-07-15T17:00:00.000Z']}
          minDate="2026-07-15T09:00:00.000Z"
          maxDate="2026-07-15T17:00:00.000Z"
        />
      </Grommet>,
    );

    expect(
      screen.getByRole('button', { name: 'Go to previous range' }),
    ).toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'Go to next range' }),
    ).toBeDisabled();
  });

  test('shows an error when same-day end time is not after start', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeRangeInput format="12" />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );

    const sameDay = within(screen.getByRole('grid')).getByRole('button', {
      name: currentMonthDate(14).toDateString(),
    });
    await user.click(sameDay);
    await user.click(screen.getByRole('option', { name: '11 hours' }));
    await user.click(screen.getByRole('option', { name: '15 minutes' }));
    await user.click(screen.getByRole('option', { name: 'PM meridiem' }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(
      within(screen.getByRole('grid')).getByRole('button', {
        name: currentMonthDate(14).toDateString(),
      }),
    );
    await user.click(screen.getByRole('option', { name: '10 hours' }));
    await user.click(screen.getByRole('option', { name: 'PM meridiem' }));

    expect(
      screen.getByRole('group', {
        name: 'End date and time',
        hidden: true,
      }),
    ).toHaveTextContent('10:59 PM');
    expect(
      screen.getByText('End date and time must be after start date and time'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Apply' })).toBeDisabled();
  });

  test('shows the committed custom range when reopened', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeRangeInput format="12" />
      </Grommet>,
    );

    const trigger = screen.getByRole('button', {
      name: 'Open date and time range picker',
    });
    await user.click(trigger);

    let calendar = within(screen.getByRole('grid'));
    await user.click(
      calendar.getByRole('button', {
        name: currentMonthDate(6).toDateString(),
      }),
    );
    await user.click(screen.getByRole('button', { name: 'Next' }));
    calendar = within(screen.getByRole('grid'));
    await user.click(
      calendar.getByRole('button', {
        name: currentMonthDate(14).toDateString(),
      }),
    );
    await user.click(screen.getByRole('button', { name: 'Apply' }));

    await user.click(trigger);
    calendar = within(screen.getByRole('grid'));
    expect(screen.getAllByRole('gridcell', { selected: true })).toHaveLength(2);
  });

  test('reopens with start active and updates the chosen end', async () => {
    const user = userEvent.setup();
    const start = currentMonthDate(6).toISOString();
    const end = currentMonthDate(14, 23, 59).toISOString();

    render(
      <Grommet
        theme={{
          dateTimeRangeInput: {
            active: {
              indicator: { color: '#006750', size: '2px' },
            },
          },
        }}
      >
        <DateTimeRangeInput format="12" defaultValue={[start, end]} />
      </Grommet>,
    );

    const startGroup = screen.getByRole('group', {
      name: 'Start date and time',
    });
    const endGroup = screen.getByRole('group', {
      name: 'End date and time',
    });

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );

    await user.click(
      within(endGroup).getByRole('spinbutton', {
        name: 'day',
        hidden: true,
      }),
    );
    await user.click(
      within(screen.getByRole('grid')).getByRole('button', {
        name: currentMonthDate(16).toDateString(),
      }),
    );

    expect(startGroup).toHaveTextContent('06');
    expect(endGroup).toHaveTextContent('16');
    expect(screen.getByRole('button', { name: 'Apply' })).toBeEnabled();
  });

  test('moves focus into the Calendar after pressing Next', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeRangeInput format="12" />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );
    await user.click(
      within(screen.getByRole('grid')).getByRole('button', {
        name: currentMonthDate(14).toDateString(),
      }),
    );
    await user.click(screen.getByRole('button', { name: 'Next' }));

    await waitFor(() =>
      expect(screen.getByRole('grid')).toContainElement(
        document.activeElement as HTMLElement,
      ),
    );
  });

  test('preserves end when a reopened start remains before it', async () => {
    const user = userEvent.setup();
    const start = currentMonthDate(6).toISOString();
    const end = currentMonthDate(14, 23, 59).toISOString();

    render(
      <Grommet>
        <DateTimeRangeInput format="12" defaultValue={[start, end]} />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );
    const calendar = within(screen.getByRole('grid'));
    const tenth = calendar.getByRole('button', {
      name: currentMonthDate(10).toDateString(),
    });
    await user.click(tenth);

    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    expect(calendar.getAllByRole('gridcell', { selected: true })).toHaveLength(2);
  });

  test('clears end when a reopened start moves after it', async () => {
    const user = userEvent.setup();
    const start = currentMonthDate(6).toISOString();
    const end = currentMonthDate(14, 23, 59).toISOString();

    render(
      <Grommet>
        <DateTimeRangeInput format="12" defaultValue={[start, end]} />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );
    await user.click(
      within(screen.getByRole('grid')).getByRole('button', {
        name: currentMonthDate(16).toDateString(),
      }),
    );

    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    expect(
      screen.getByRole('group', {
        name: 'End date and time',
        hidden: true,
      }),
    ).toHaveTextContent('hh:mm aa');
  });

  test('keeps end side active for time edits after pressing Next', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <DateTimeRangeInput format="12" />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );

    await user.click(
      within(screen.getByRole('grid')).getByRole('button', {
        name: currentMonthDate(10).toDateString(),
      }),
    );
    await user.click(screen.getByRole('option', { name: '11 hours' }));
    await user.click(screen.getByRole('option', { name: '15 minutes' }));
    await user.click(screen.getByRole('option', { name: 'PM meridiem' }));

    const startGroup = screen.getByRole('group', {
      name: 'Start date and time',
      hidden: true,
    });
    expect(startGroup).toHaveTextContent('11:15 PM');

    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(
      within(screen.getByRole('grid')).getByRole('button', {
        name: currentMonthDate(12).toDateString(),
      }),
    );
    await user.click(screen.getByRole('option', { name: '10 hours' }));
    await user.click(screen.getByRole('option', { name: '20 minutes' }));
    await user.click(screen.getByRole('option', { name: 'PM meridiem' }));

    // Start stays intact while end gets the new edited time.
    expect(startGroup).toHaveTextContent('11:15 PM');
    const endGroup = screen.getByRole('group', {
      name: 'End date and time',
      hidden: true,
    });
    expect(endGroup).toHaveTextContent('10:20 PM');
  }, 10000);
});
