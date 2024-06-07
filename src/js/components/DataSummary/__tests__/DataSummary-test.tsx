import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import 'jest-styled-components';

import { Data } from '../../Data';
import { DataFilters } from '../../DataFilters';
import { DataTable } from '../../DataTable';
import { Grommet } from '../../Grommet';
import { DataSummary } from '..';

// asserts that AnnounceContext aria-live region and visible DataSummary each have this text
const expectDataSummary = (message: string) =>
  expect(screen.getAllByText(message)).toHaveLength(2);

const data = [{ name: 'a' }, { name: 'b' }];

const Selected = ({ messages }: { messages?: object }) => {
  const [selected, setSelected] = useState<(string | number)[]>(['a']);

  return (
    <Data data={data}>
      <DataSummary messages={messages} />
      <DataTable
        select={selected}
        onSelect={(nextSelected) => setSelected(nextSelected)}
      />
    </Data>
  );
};

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

  test('should render DataTable selections message in alignment with selections', () => {
    render(
      <Grommet>
        <Selected />
      </Grommet>,
    );

    // default selection
    expect(screen.getByText('1 selected')).toBeTruthy();
    const rowCheckbox = screen.getByRole('checkbox', { name: 'select b' });
    fireEvent.click(rowCheckbox);
    expect(screen.getByText('2 selected')).toBeTruthy();
  });

  test('should render messages prop', () => {
    render(
      <Grommet>
        <Selected
          messages={{
            selected: '{selected} SELECTED!',
            total: '{total} items total',
          }}
        />
      </Grommet>,
    );

    expect(screen.getByText('1 SELECTED!')).toBeTruthy();
    expect(screen.getByText('2 items total')).toBeTruthy();
  });
});
