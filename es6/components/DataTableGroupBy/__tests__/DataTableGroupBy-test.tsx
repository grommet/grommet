import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Data } from '../../Data';
import { Grommet } from '../../Grommet';
import { DataTableGroupBy } from '..';

const data = [
  { name: 'aa', enabled: true, rating: 2.3, type: { name: 'ZZ', id: 1 } },
  { name: 'bb', enabled: false, rating: 4.3, type: { name: 'YY', id: 2 } },
  { name: 'cc', type: { name: 'ZZ', id: 1 } },
];

describe('DataTableGroupBy', () => {
  test('renders', () => {
    const { container } = render(
      <Grommet>
        <Data data={data}>
          <DataTableGroupBy
            options={[{ property: 'type.name', label: 'Type' }]}
          />
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
