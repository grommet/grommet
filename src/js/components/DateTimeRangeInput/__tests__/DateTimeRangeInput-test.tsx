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

    const presetButtons = screen.getAllByRole('button');
    expect(presetButtons.map((button) => button.textContent)).toEqual(
      expect.arrayContaining(['Last hour', 'Last day', 'Custom range']),
    );
    await user.click(screen.getByRole('button', { name: 'Last day' }));

    expect(screen.getByText('Last day')).toBeInTheDocument();
    expect(screen.getByText('Last day').parentElement).toHaveStyleRule(
      'align-items',
      'center',
    );
  });

  test('keeps the footer inside the calendar/time panel, not the preset list', async () => {
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

    const presetButton = screen.getByRole('button', { name: 'Last hour' });
    const presetContainer = presetButton.parentElement;
    const nextButton = screen.getByRole('button', { name: 'Next' });
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });

    expect(presetContainer).not.toContainElement(nextButton);
    expect(presetContainer).not.toContainElement(cancelButton);
  });

  test('styles the preset rail and selected custom range from theme', async () => {
    const user = userEvent.setup();

    render(
      <Grommet
        theme={{
          dateTimeRangeInput: {
            presets: {
              background: '#F2F2F2',
              selected: {
                background: '#D1FFEE',
                border: { color: '#006750', size: '6px' },
                round: '6px',
              },
            },
          },
        }}
      >
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

    const customButton = screen.getByRole('button', { name: 'Custom range' });
    const selectedItem = customButton.parentElement as HTMLElement;
    const presetRail = selectedItem.parentElement as HTMLElement;
    const itemGap = selectedItem.previousElementSibling as HTMLElement;

    expect(presetRail).toHaveStyleRule('background-color', '#F2F2F2');
    expect(presetRail).toHaveStyleRule('padding', '6px');
    expect(itemGap).toHaveStyleRule('height', '6px');
    expect(selectedItem).toHaveStyleRule('background-color', '#D1FFEE');
    expect(selectedItem).toHaveStyleRule(
      'border-inline-start',
      'solid 6px #006750',
    );
    expect(selectedItem).toHaveStyleRule('border-radius', '6px');
    expect(selectedItem).toHaveStyleRule('padding-top', '5px');
    expect(selectedItem).toHaveStyleRule('padding-bottom', '5px');
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

  test('preserves an explicit plain prop inside FormField', () => {
    render(
      <Grommet>
        <Form>
          <FormField name="range" label="Range">
            <DateTimeRangeInput plain name="range" />
          </FormField>
        </Form>
      </Grommet>,
    );

    const trigger = screen.getByRole('button', {
      name: 'Open date and time range picker',
    });
    expect(trigger.parentElement).not.toHaveStyleRule('border');
  });

  test('keeps FormField border around the range field only', () => {
    render(
      <Grommet>
        <Form>
          <FormField htmlFor="form-range" name="range" label="Range">
            <DateTimeRangeInput id="form-range" name="range" format="12" />
          </FormField>
        </Form>
      </Grommet>,
    );

    const trigger = screen.getByRole('button', {
      name: 'Open date and time range picker',
    });
    const innerField = trigger.parentElement as HTMLElement;
    const rangeGroup = screen.getByRole('group', { name: 'Range' });
    const formFieldContent = rangeGroup.parentElement as HTMLElement;
    const previous = screen.getByRole('button', {
      name: 'Go to previous range',
    });
    const next = screen.getByRole('button', { name: 'Go to next range' });

    expect(window.getComputedStyle(formFieldContent).borderStyle).not.toBe(
      'solid',
    );
    expect(window.getComputedStyle(innerField).borderStyle).toBe('solid');
    expect(innerField).not.toContainElement(previous);
    expect(innerField).not.toContainElement(next);
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
      <Grommet
        theme={{
          formField: {
            error: {
              background: '#FFE5E5',
            },
          },
        }}
      >
        <Form value={{ stay: [undefined, undefined] }}>
          <FormField name="stay" required validate={validateRange}>
            <DateTimeRangeInput name="stay" format="12" />
          </FormField>
          <Button type="submit" label="Submit" />
        </Form>
      </Grommet>,
    );

    await user.click(screen.getByRole('button', { name: 'Submit' }));
    await screen.findByText('Select both a start and end date and time.');

    const trigger = screen.getByRole('button', {
      name: 'Open date and time range picker',
    });
    const field = trigger.parentElement as HTMLElement;
    const root = field.parentElement as HTMLElement;
    const formFieldContent = root.parentElement as HTMLElement;
    const previous = screen.getByRole('button', {
      name: 'Go to previous range',
    });
    const next = screen.getByRole('button', { name: 'Go to next range' });

    await waitFor(() =>
      expect(field).toHaveStyleRule('border', 'solid 1px #EB0000'),
    );
    expect(getComputedStyle(formFieldContent).backgroundColor).not.toBe(
      'rgb(255, 229, 229)',
    );
    expect(field).not.toContainElement(previous);
    expect(field).not.toContainElement(next);
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
      screen.getByRole('button', { name: 'Open date and time range picker' })
        .parentElement,
    ).toHaveStyleRule('border', 'solid 1px #EB0000');
    const field = screen.getByRole('button', {
      name: 'Open date and time range picker',
    }).parentElement as HTMLElement;
    const contentWrapper = field.parentElement?.parentElement as HTMLElement;
    expect(contentWrapper).not.toHaveStyleRule('background-color', '#FFE5E5');
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

  test('renders the resting field border and configured radius', () => {
    render(
      <Grommet
        theme={{
          dateTimeRangeInput: {
            container: { round: '12px' },
          },
        }}
      >
        <DateTimeRangeInput format="12" />
      </Grommet>,
    );

    const trigger = screen.getByRole('button', {
      name: 'Open date and time range picker',
    });
    const field = trigger.parentElement as HTMLElement;

    expect(field).toHaveStyleRule('border-radius', '12px');
    expect(window.getComputedStyle(field).borderStyle).toBe('solid');
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
    const initialStartText = startGroup.textContent?.replace(/\s/g, ' ');

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );
    await user.click(screen.getByRole('option', { name: '10 hours' }));
    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(startGroup.textContent?.replace(/\s/g, ' ')).toBe(initialStartText);
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
    expect(sixth.parentElement).toHaveAttribute('aria-selected', 'true');

    await user.click(fourteenth);

    expect(startGroup).toHaveTextContent('12:00 AM');
    expect(endGroup).toHaveTextContent('hh:mm aa');
    expect(sixth.parentElement).toHaveAttribute('aria-selected', 'false');
    expect(fourteenth.parentElement).toHaveAttribute('aria-selected', 'true');
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

    expect(sixth.parentElement).toHaveAttribute('aria-selected', 'true');
  });

  test('underlines the active start and end range fields', async () => {
    const user = userEvent.setup();

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
        <DateTimeRangeInput format="12" />
      </Grommet>,
    );

    const rangeField = screen.getByRole('button', {
      name: 'Open date and time range picker',
    }).parentElement as HTMLElement;
    const startField = within(rangeField).getByRole('group', {
      name: 'Start date and time',
    }).parentElement?.parentElement?.parentElement
      ?.parentElement as HTMLElement;
    const endField = within(rangeField).getByRole('group', {
      name: 'End date and time',
    }).parentElement?.parentElement?.parentElement
      ?.parentElement as HTMLElement;

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );

    expect(startField).toHaveStyleRule('height', '2px', {
      modifier: '::after',
    });
    expect(startField).toHaveStyleRule('background-color', '#006750', {
      modifier: '::after',
    });
    expect(endField).not.toHaveStyleRule('height', '2px', {
      modifier: '::after',
    });
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();

    await user.click(
      within(screen.getByRole('grid')).getByRole('button', {
        name: currentMonthDate(14).toDateString(),
      }),
    );
    await user.click(screen.getByRole('button', { name: 'Next' }));

    expect(startField).not.toHaveStyleRule('height', '2px', {
      modifier: '::after',
    });
    expect(endField).toHaveStyleRule('height', '2px', {
      modifier: '::after',
    });
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
    const sixth = calendar.getByRole('button', {
      name: currentMonthDate(6).toDateString(),
    });
    const fourteenth = calendar.getByRole('button', {
      name: currentMonthDate(14).toDateString(),
    });

    expect(sixth.parentElement).toHaveAttribute('aria-selected', 'true');
    expect(fourteenth.parentElement).toHaveAttribute('aria-selected', 'true');
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

    const rangeField = screen.getByRole('button', {
      name: 'Open date and time range picker',
    }).parentElement as HTMLElement;
    const startGroup = within(rangeField).getByRole('group', {
      name: 'Start date and time',
    });
    const endGroup = within(rangeField).getByRole('group', {
      name: 'End date and time',
    });
    const startField = startGroup.parentElement?.parentElement?.parentElement
      ?.parentElement as HTMLElement;
    const endField = endGroup.parentElement?.parentElement?.parentElement
      ?.parentElement as HTMLElement;

    await user.click(
      screen.getByRole('button', {
        name: 'Open date and time range picker',
      }),
    );

    expect(startField).toHaveStyleRule('height', '2px', {
      modifier: '::after',
    });
    expect(endField).not.toHaveStyleRule('height', '2px', {
      modifier: '::after',
    });

    await user.click(
      within(endGroup).getByRole('spinbutton', {
        name: 'day',
        hidden: true,
      }),
    );
    expect(endField).toHaveStyleRule('height', '2px', {
      modifier: '::after',
    });

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
    expect(
      calendar.getByRole('button', {
        name: currentMonthDate(6).toDateString(),
      }).parentElement,
    ).toHaveAttribute('aria-selected', 'false');
    expect(
      calendar.getByRole('button', {
        name: currentMonthDate(14).toDateString(),
      }).parentElement,
    ).toHaveAttribute('aria-selected', 'true');
    expect(tenth.parentElement).toHaveAttribute('aria-selected', 'true');
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
  });
});
