import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Data } from '../../Data';
import { DataFilters } from '../../DataFilters';
import { Grommet } from '../../Grommet';
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
              options: [
                { label: 'ZZ', value: 1 },
                { label: 'YY', value: 2 },
              ],
            },
          }}
        >
          <DataFilters>
            <DataFilter property="name" />
            <DataFilter property="enabled" />
            <DataFilter property="type.name" />
          </DataFilters>
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
