import React from 'react';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';

import { Data } from '../../Data';
import { DataFilters } from '../../DataFilters';
import { Grommet } from '../../Grommet';
import { DataSummary } from '..';

// asserts that AnnounceContext aria-live region and visible DataSummary each have this text
const expectDataSummary = (message: string) =>
  expect(screen.getAllByText(message)).toHaveLength(2);

const data = [{ name: 'a' }, { name: 'b' }];

describe('DataSummary', () => {
  test('renders', () => {
    const { container } = render(
      <Grommet>
        <Data data={data}>
          <DataFilters>
            <DataSummary />
          </DataFilters>
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders total message correctly when only 1 item', () => {
    const { asFragment } = render(
      <Grommet>
        <Data data={[{ name: 'a' }]}>
          <DataFilters>
            <DataSummary />
          </DataFilters>
        </Data>
      </Grommet>,
    );

    expectDataSummary('1 item');
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders filtered message correctly when 0 results but only 1 item', () => {
    const { asFragment } = render(
      <Grommet>
        <Data
          data={[{ name: 'a' }]}
          defaultView={{
            properties: {
              name: ['b'],
            },
          }}
        >
          <DataFilters>
            <DataSummary />
          </DataFilters>
        </Data>
      </Grommet>,
    );

    expectDataSummary('0 results of 1 item');
    expect(asFragment()).toMatchSnapshot();
  });
});
