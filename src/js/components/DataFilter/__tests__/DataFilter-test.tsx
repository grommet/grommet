import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Data } from '../../Data';
import { DataFilters } from '../../DataFilters';
import { Grommet } from '../../Grommet';
import { TextInput } from '../../TextInput';
import { DataFilter } from '..';
import { Toolbar } from '../../Toolbar';

const data = [
  { name: 'aa', enabled: true, rating: 2.3, type: { name: 'ZZ', id: 1 } },
  { name: 'bb', enabled: false, rating: 4.3, type: { name: 'YY', id: 2 } },
  { name: 'cc', type: { name: 'ZZ', id: 1 } },
];

describe('DataFilter', () => {
  test('renders', () => {
    const { container } = render(
      <Grommet>
        <Data data={data}>
          <DataFilters>
            <DataFilter property="name" />
            <DataFilter property="enabled" />
            <DataFilter property="rating" />
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
