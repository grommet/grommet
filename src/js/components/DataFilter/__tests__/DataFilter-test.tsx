import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'jest-styled-components';
import { Data } from '../../Data';
import { DataFilters } from '../../DataFilters';
import { Grommet } from '../../Grommet';
import { TextInput } from '../../TextInput';
import { DataFilter } from '..';
import { Toolbar } from '../../Toolbar';
import { createPortal, expectPortal } from '../../../utils/portal';

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

    // snapshot on search box
    expectPortal('test-data-type.name__drop').toMatchSnapshot();
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
