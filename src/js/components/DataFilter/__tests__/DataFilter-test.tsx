import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';
import { Data } from '../../Data';
import { DataFilters } from '../../DataFilters';
import { Grommet } from '../../Grommet';
import { TextInput } from '../../TextInput';
import { DataFilter } from '..';
import { Toolbar } from '../../Toolbar';

const data = [
  {
    name: 'aa',
    enabled: true,
    rating: 2.3,
    type: { name: 'ZZ', id: 1 },
    blank: '',
    zero: 0,
  },
  {
    name: 'bb',
    enabled: false,
    rating: 4.3,
    type: { name: 'YY', id: 2 },
    blank: '',
    zero: 0,
  },
  { name: 'cc', type: { name: 'ZZ', id: 1 }, blank: '', zero: 0 },
];

describe('DataFilter', () => {
  window.scrollTo = jest.fn();
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

  test('select multiple options', () => {
    jest.useFakeTimers();

    const { container, getByRole } = render(
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
              options={['ZZ', 'YY', 'aa', 'bb', 'cc', 'dd', 'ee', 'ff']}
            />
          </DataFilters>
        </Data>
      </Grommet>,
    );

    expect(getByRole('button', { name: 'Open filters' })).toBeTruthy();
    fireEvent.click(getByRole('button', { name: 'Open filters' }));
    // advance timers so drop can open
    act(() => jest.advanceTimersByTime(200));

    // open SelectMultiple
    fireEvent.click(getByRole('button', { name: /Open Drop/i }));
    act(() => jest.advanceTimersByTime(200));

    // click the first option 'ZZ'
    fireEvent.click(getByRole('option', { name: /ZZ/i }));
    act(() => jest.advanceTimersByTime(200));

    // close SelectMultiple
    fireEvent.click(getByRole('button', { name: /Close Select/i }));
    act(() => jest.advanceTimersByTime(200));

    // click Apply Filters button
    expect(getByRole('button', { name: 'Apply filters' })).toBeTruthy();
    fireEvent.click(getByRole('button', { name: 'Apply filters' }));

    // advance timers so filters can be applied
    act(() => jest.advanceTimersByTime(200));

    // snapshot on selected filter
    expect(container.firstChild).toMatchSnapshot();
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

  test('noForm', () => {
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
});
