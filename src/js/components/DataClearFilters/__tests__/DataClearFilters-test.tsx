import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { Data } from '../../Data';
import { Grommet } from '../../Grommet';
import { DataClearFilters } from '..';

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

describe('DataClearFilters', () => {
  test('renders', () => {
    const { asFragment } = render(
      <Grommet>
        <Data data={data}>
          <DataClearFilters />
        </Data>
      </Grommet>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('clears filters when clicked', () => {
    const { asFragment } = render(
      <Grommet>
        <Data
          data={data}
          view={{
            properties: {
              name: ['cc'],
            },
          }}
          toolbar
        >
          <DataClearFilters />
        </Data>
      </Grommet>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(screen.getByText(`${data.length} items`)).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders custom message', () => {
    const { asFragment } = render(
      <Grommet>
        <Data
          data={data}
          messages={{
            dataFilters: {
              clear: 'Remove all filters',
            },
          }}
          toolbar
        >
          <DataClearFilters />
        </Data>
      </Grommet>,
    );

    expect(screen.getByText('Remove all filters')).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });
});
