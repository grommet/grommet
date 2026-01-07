import React from 'react';
import { act, render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'jest-styled-components';
import '@testing-library/jest-dom';
import { Data } from '../../Data';
import { DataFilters } from '../../DataFilters';
import { Grommet } from '../../Grommet';
import { TextInput } from '../../TextInput';
import { DataFilter } from '..';
import { Toolbar } from '../../Toolbar';
import { DataTable } from '../../DataTable';
import { createPortal, expectPortal } from '../../../utils/portal';

const data = [
  {
    name: 'aa',
    enabled: true,
    rating: 2.3,
    type: { name: 'ZZ', id: 1 },
    blank: '',
    zero: 0,
    total: 4,
  },
  {
    name: 'bb',
    enabled: false,
    rating: 4.3,
    type: { name: 'YY', id: 2 },
    blank: '',
    zero: 0,
    total: 200,
  },
  { name: 'cc', type: { name: 'ZZ', id: 1 }, blank: '', zero: 0, total: 35 },
];

describe('DataFilter', () => {
  window.scrollTo = jest.fn();
  beforeEach(createPortal);

  test('renders', () => {
    const { container } = render(
      <Grommet>
        <Data data={data}>
          <DataFilters>
            <DataFilter property="name" />
            <DataFilter property="enabled" />
            <DataFilter property="rating" />
            <DataFilter property="blank" />
            <DataFilter property="zero" />
          </DataFilters>
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('options', () => {
    const { container } = render(
      <Grommet>
        <Data
          data={data}
          properties={{
            enabled: {
              label: 'Enabled',
              options: [
                { label: 'Enabled', value: true },
                { label: 'Disabled', value: false },
              ],
            },
            'type.name': {
              label: 'Type',
            },
          }}
        >
          <DataFilters>
            <DataFilter property="name" />
            <DataFilter property="enabled" />
            <DataFilter
              property="type.name"
              options={[
                { label: 'ZZ', value: 1 },
                { label: 'YY', value: 2 },
              ]}
            />
          </DataFilters>
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('select multiple options', async () => {
    const user = userEvent.setup();
    const { asFragment } = render(
      <Grommet>
        <Data
          data={data}
          properties={{
            'type.name': {
              label: 'Type',
            },
          }}
        >
          <DataFilters drop>
            <DataFilter
              property="type.name"
              options={['ZZ', 'YY', 'aa', 'bb', 'cc']}
            />
          </DataFilters>
        </Data>
      </Grommet>,
    );

    const { getByRole } = screen;

    const filterButton = getByRole('button', { name: 'Open filters' });
    expect(filterButton).toBeTruthy();
    await user.click(filterButton);

    // open SelectMultiple
    const selectInput = getByRole('button', { name: /Open Drop/i });
    expect(selectInput).toBeTruthy();
    await user.click(selectInput);

    // click the first option 'ZZ'
    await user.click(getByRole('option', { name: /ZZ/i }));

    // close SelectMultiple
    await user.click(getByRole('button', { name: /Close Select/i }));

    // click Apply Filters button
    const applyFiltersButton = getByRole('button', { name: 'Apply filters' });
    expect(applyFiltersButton).toBeTruthy();
    await user.click(applyFiltersButton);

    // snapshot on selected filter
    expect(asFragment()).toMatchSnapshot();
  });

  test('select multiple options search', async () => {
    const user = userEvent.setup();
    const { asFragment } = render(
      <Grommet>
        <Data
          id="test-data"
          data={data}
          properties={{
            'type.name': {
              label: 'Type',
            },
          }}
        >
          <DataFilters drop>
            <DataFilter
              property="type.name"
              options={[
                'ZZ',
                'YY',
                'aa',
                'bb',
                'cc',
                'dd',
                'ee',
                'ff',
                'gg',
                'hh',
              ]}
            />
          </DataFilters>
        </Data>
      </Grommet>,
    );

    expect(asFragment()).toMatchSnapshot();
    const filterButton = screen.getByRole('button', { name: 'Open filters' });
    expect(filterButton).toBeTruthy();
    await user.click(filterButton);

    // open SelectMultiple
    const selectInput = screen.getByLabelText('Type');
    expect(selectInput).toBeTruthy();
    await user.click(selectInput);

    const searchInput = screen.getByLabelText(/Search to filter/);
    expect(searchInput).toBeTruthy();
  });

  test('range prop', () => {
    const { container } = render(
      <Grommet>
        <Data data={data}>
          <DataFilters>
            <DataFilter property="rating" range={{ min: 0, max: 5 }} />
          </DataFilters>
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('range prop step', async () => {
    render(
      <Grommet>
        <Data data={data}>
          <DataFilters>
            <DataFilter
              property="total"
              range={{ step: 15, min: 0, max: 250 }}
            />
          </DataFilters>
        </Data>
      </Grommet>,
    );

    const lowerBound = screen.getByRole('slider', {
      name: 'Lower Bounds',
    });
    const lowerHandle = lowerBound.parentElement?.querySelector('div');
    if (lowerHandle) {
      fireEvent.mouseDown(lowerHandle);
      fireEvent.mouseMove(lowerHandle, { clientX: 31, clientY: 20 });
      fireEvent.mouseUp(lowerHandle);
    }
    expect(lowerBound.getAttribute('aria-valuenow')).toEqual('45');
  });

  test('range step Data', () => {
    render(
      <Grommet>
        <Data
          data={data}
          properties={{
            total: {
              label: 'Total',
            },
          }}
        >
          <DataFilters>
            <DataFilter property="total" range={{ step: 15 }} />
          </DataFilters>
        </Data>
      </Grommet>,
    );

    const lowerBound = screen.getByRole('slider', {
      name: 'Lower Bounds',
    });
    const lowerHandle = lowerBound.parentElement?.querySelector('div');
    if (lowerHandle) {
      fireEvent.mouseDown(lowerHandle);
      fireEvent.mouseMove(lowerHandle, { clientX: 31, clientY: 20 });
      fireEvent.mouseUp(lowerHandle);
    }
    expect(lowerBound.getAttribute('aria-valuenow')).toEqual('49');
  });

  test('range Data', () => {
    const { container } = render(
      <Grommet>
        <Data
          data={data}
          properties={{
            rating: {
              label: 'Rating',
              range: { min: 0, max: 5 },
            },
          }}
        >
          <DataFilters>
            <DataFilter property="rating" />
          </DataFilters>
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('includes range min and max in filtered results', () => {
    const { getByRole } = render(
      <Grommet>
        <Data data={[{ age: 1 }, { age: 2 }, { age: 3 }, { age: 4 }]}>
          <DataFilters>
            <DataFilter range={{ min: 1, max: 4, step: 1 }} property="age" />
          </DataFilters>
          <DataTable />
        </Data>
      </Grommet>,
    );

    const lowerBound = screen.getByRole('slider', {
      name: 'Lower Bounds',
    });
    const lowerHandle = lowerBound.parentElement?.querySelector('div');

    act(() => {
      if (lowerHandle) {
        lowerHandle.focus();
      }
    });
    if (lowerHandle) {
      fireEvent.keyDown(lowerHandle, { key: 'Right', keyCode: 39 });
    }
    const applyFiltersButton = getByRole('button', { name: 'Apply filters' });
    fireEvent.click(applyFiltersButton);

    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(screen.queryAllByText('2')[1]).toBeInTheDocument();
  });

  test('children', () => {
    const { container } = render(
      <Grommet>
        <Data data={data}>
          <DataFilters>
            <DataFilter property="name">
              <TextInput />
            </DataFilter>
          </DataFilters>
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('!inDataForm', () => {
    const { container } = render(
      <Grommet>
        <Data data={data}>
          <Toolbar>
            <DataFilter property="name" />
            <DataFilter property="enabled" />
            <DataFilter property="rating" />
          </Toolbar>
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should allow filtering on multiple sub-properties from same parent property', () => {
    const { asFragment } = render(
      <Grommet>
        <Data
          data={data}
          properties={{
            'type.name': {
              label: 'Type',
            },
            'type.id': {
              label: 'ID',
            },
          }}
        >
          <DataFilters drop>
            <DataFilter
              property="type.name"
              options={['ZZ', 'YY', 'aa', 'bb', 'cc']}
            />
            <DataFilter property="type.id" options={['1', '2']} />
          </DataFilters>
        </Data>
      </Grommet>,
    );

    const { getByRole, getByLabelText } = screen;

    const filterButton = getByRole('button', { name: 'Open filters' });
    expect(filterButton).toBeTruthy();
    fireEvent.click(filterButton);

    // open SelectMultiple
    const selectInput = getByRole('button', { name: /Open Drop/i });
    expect(selectInput).toBeTruthy();
    fireEvent.click(selectInput);

    // click the first option 'ZZ'
    fireEvent.click(getByRole('option', { name: /ZZ/i }));

    // close SelectMultiple
    fireEvent.click(getByRole('button', { name: /Close Select/i }));

    const checkBox = getByLabelText(1);

    fireEvent.click(checkBox);

    // click Apply Filters button
    const applyFiltersButton = getByRole('button', { name: 'Apply filters' });
    expect(applyFiltersButton).toBeTruthy();
    fireEvent.click(applyFiltersButton);

    const updatedFilterButton = getByRole('button', {
      name: 'Open filters, 2 filters applied',
    });

    expect(updatedFilterButton).toBeTruthy();
    // snapshot on selected filter
    expect(asFragment()).toMatchSnapshot();
  });

  test('theme rangeSelector size and round, selectMultiple dropHeight', () => {
    const customTheme = {
      dataFilter: {
        rangeSelector: {
          size: 'large',
          round: 'large',
        },
        selectMultiple: {
          dropHeight: 'large',
        },
      },
    };

    const { asFragment } = render(
      <Grommet theme={customTheme}>
        <Data
          data={data}
          properties={{
            'type.name': {
              label: 'Type',
            },
          }}
        >
          <DataFilters>
            <DataFilter property="rating" range={{ min: 0, max: 5 }} />
            <DataFilter
              id="test-data"
              property="type.name"
              options={['ZZ', 'YY', 'aa', 'bb', 'cc', 'dd', 'ee']}
            />
          </DataFilters>
        </Data>
      </Grommet>,
    );

    expect(screen.getByText('rating')).toBeTruthy();
    expect(screen.getByLabelText('Type')).toBeTruthy();

    expect(asFragment()).toMatchSnapshot();

    const selectInput = screen.getByRole('button', { name: /Open Drop/i });
    fireEvent.click(selectInput);

    expectPortal('data-type.name__drop').toMatchSnapshot();
  });

  // Test cases for single value and edge case numeric filters (Issue #7852)
  test('single decimal value [0.1] - renders RangeSelector with matching min/max', () => {
    const singleDecimalData = [{ price: 0.1 }];
    const { asFragment } = render(
      <Grommet>
        <Data data={singleDecimalData}>
          <DataFilters>
            <DataFilter property="price" />
          </DataFilters>
        </Data>
      </Grommet>,
    );

    const lowerBound = screen.getByRole('slider', {
      name: 'Lower Bounds',
    });
    const upperBound = screen.getByRole('slider', {
      name: 'Upper Bounds',
    });

    expect(lowerBound).toBeTruthy();
    expect(upperBound).toBeTruthy();

    expect(lowerBound.getAttribute('aria-valuenow')).toBe('0.1');
    expect(upperBound.getAttribute('aria-valuenow')).toBe('0.1');

    expect(asFragment()).toMatchSnapshot();
  });

  test('decimal values [0.1, 0.2] - no artificial range normalization', () => {
    const decimalData = [{ price: 0.1 }, { price: 0.2 }];
    const { asFragment } = render(
      <Grommet>
        <Data data={decimalData}>
          <DataFilters>
            <DataFilter property="price" />
          </DataFilters>
        </Data>
      </Grommet>,
    );

    const lowerBound = screen.getByRole('slider', {
      name: 'Lower Bounds',
    });
    const upperBound = screen.getByRole('slider', {
      name: 'Upper Bounds',
    });

    expect(lowerBound).toBeTruthy();
    expect(upperBound).toBeTruthy();

    // Should remain [0.1, 0.2]
    expect(lowerBound.getAttribute('aria-valuemin')).toBe('0.1');
    expect(upperBound.getAttribute('aria-valuemax')).toBe('0.2');

    expect(asFragment()).toMatchSnapshot();
  });

  test('negative decimal values [-19.99, -4.895] - preserves actual range, caps decimals to 2', () => {
    const negativeDecimalData = [{ price: -19.99 }, { price: -4.859 }];
    const { asFragment } = render(
      <Grommet>
        <Data data={negativeDecimalData}>
          <DataFilters>
            <DataFilter property="price" />
          </DataFilters>
        </Data>
      </Grommet>,
    );

    const lowerBound = screen.getByRole('slider', {
      name: 'Lower Bounds',
    });
    const upperBound = screen.getByRole('slider', {
      name: 'Upper Bounds',
    });

    expect(lowerBound).toBeTruthy();
    expect(upperBound).toBeTruthy();

    // Should preserve actual values and round to max 2 decimals
    expect(lowerBound.getAttribute('aria-valuemin')).toBe('-19.99');
    expect(upperBound.getAttribute('aria-valuemax')).toBe('-4.86');

    expect(asFragment()).toMatchSnapshot();
  });

  test('single zero value [0] - handles zero correctly', () => {
    const zeroData = [{ quantity: 0 }];
    const { asFragment } = render(
      <Grommet>
        <Data data={zeroData}>
          <DataFilters>
            <DataFilter property="quantity" />
          </DataFilters>
        </Data>
      </Grommet>,
    );

    // Should render (not be hidden)
    const lowerBound = screen.getByRole('slider', {
      name: 'Lower Bounds',
    });
    const upperBound = screen.getByRole('slider', {
      name: 'Upper Bounds',
    });

    expect(lowerBound).toBeTruthy();
    expect(upperBound).toBeTruthy();

    expect(lowerBound.getAttribute('aria-valuemin')).toBe('0');
    expect(upperBound.getAttribute('aria-valuemax')).toBe('0');

    expect(asFragment()).toMatchSnapshot();
  });

  test('single negative value [-5] - renders single negative value for max and min', () => {
    const negativeData = [{ balance: -5 }];
    const { asFragment } = render(
      <Grommet>
        <Data data={negativeData}>
          <DataFilters>
            <DataFilter property="balance" />
          </DataFilters>
        </Data>
      </Grommet>,
    );

    const lowerBound = screen.getByRole('slider', {
      name: 'Lower Bounds',
    });
    const upperBound = screen.getByRole('slider', {
      name: 'Upper Bounds',
    });

    expect(lowerBound).toBeTruthy();
    expect(upperBound).toBeTruthy();

    expect(lowerBound.getAttribute('aria-valuenow')).toBe('-5');
    expect(upperBound.getAttribute('aria-valuenow')).toBe('-5');

    expect(asFragment()).toMatchSnapshot();
  });

  test('mixed positive and negative decimals - validates step is valid (not 0, not NaN)', () => {
    const mixedData = [{ value: -2.5 }, { value: 3.75 }];
    const { asFragment } = render(
      <Grommet>
        <Data data={mixedData}>
          <DataFilters>
            <DataFilter property="value" />
          </DataFilters>
        </Data>
      </Grommet>,
    );

    const lowerBound = screen.getByRole('slider', {
      name: 'Lower Bounds',
    });
    const upperBound = screen.getByRole('slider', {
      name: 'Upper Bounds',
    });

    expect(lowerBound).toBeTruthy();
    expect(upperBound).toBeTruthy();

    expect(lowerBound.getAttribute('aria-valuemin')).toBe('-2.5');
    expect(upperBound.getAttribute('aria-valuemax')).toBe('3.75');

    // CRITICAL: Step should never be 0 or NaN
    const stepAttr = lowerBound.getAttribute('step');
    expect(stepAttr).toBeTruthy();
    const stepValue = parseFloat(stepAttr || '0');
    expect(stepValue).toBeGreaterThan(0);
    expect(isNaN(stepValue)).toBe(false);

    // Step should be capped to max 2 decimal places
    const stepDecimals = (stepAttr?.split('.')[1] || '').length;
    expect(stepDecimals).toBeLessThanOrEqual(2);

    expect(asFragment()).toMatchSnapshot();
  });

  test('empty dataset - returns null (no filter rendered)', () => {
    const emptyData: any[] = [];
    render(
      <Grommet>
        <Data data={emptyData}>
          <DataFilters>
            <DataFilter property="price" />
          </DataFilters>
        </Data>
      </Grommet>,
    );

    // Should render nothing - query should fail
    expect(() => screen.getByRole('slider')).toThrow();
  });

  test('render filter for single item', () => {
    const singleValueData = [{ rating: 2.5 }];
    const { asFragment } = render(
      <Grommet>
        <Data data={singleValueData}>
          <DataFilters>
            <DataFilter property="rating" />
          </DataFilters>
        </Data>
      </Grommet>,
    );

    const lowerBound = screen.getByRole('slider', {
      name: 'Lower Bounds',
    });
    expect(lowerBound).toBeTruthy();
    expect(lowerBound.getAttribute('aria-valuenow')).toBe('2.5');

    expect(asFragment()).toMatchSnapshot();
  });

  test('high precision decimals are rounded to max 2 places', () => {
    // Test floating-point artifact cleanup
    const precisionData = [{ value: 1.1234567 }, { value: 2.9876543 }];
    const { asFragment } = render(
      <Grommet>
        <Data data={precisionData}>
          <DataFilters>
            <DataFilter property="value" />
          </DataFilters>
        </Data>
      </Grommet>,
    );

    const lowerBound = screen.getByRole('slider', {
      name: 'Lower Bounds',
    });
    const upperBound = screen.getByRole('slider', {
      name: 'Upper Bounds',
    });

    expect(lowerBound.getAttribute('aria-valuemin')).toBe('1.12');
    expect(upperBound.getAttribute('aria-valuemax')).toBe('2.99');
    expect(asFragment()).toMatchSnapshot();
  });
});
