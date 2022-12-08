import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Data } from '../../Data';
import { DataFilters } from '../../DataFilters';
import { Grommet } from '../../Grommet';
import { TextInput } from '../../TextInput';
import { DataFilter } from '..';

const data = [
  { name: 'aa', enabled: true, type: { name: 'ZZ', id: 1 } },
  { name: 'bb', enabled: false, type: { name: 'YY', id: 2 } },
  { name: 'cc', type: { name: 'ZZ', id: 1 } },
];

describe('DataFilter', () => {
  test('renders', () => {
    const { container } = render(
      <Grommet>
        <Data data={data}>
          <DataFilters>
            <DataFilter property="name" />
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

  test('range values', () => {
    const { container } = render(
      <Grommet>
        <Data
          data={[
            {
              name: 'Alan',
              percent: 0,
            },
            {
              name: 'Bryan',
              percent: 30,
            },
            {
              name: 'Chris',
              percent: 40,
            },
          ]}
        >
          <DataFilters>
            <DataFilter property="name" />
            <DataFilter property="percent" />
          </DataFilters>
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
