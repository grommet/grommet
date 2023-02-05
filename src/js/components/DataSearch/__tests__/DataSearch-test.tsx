import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Data } from '../../Data';
import { DataFilters } from '../../DataFilters';
import { Grommet } from '../../Grommet';
import { DataSearch } from '..';

const data = [{ name: 'a' }, { name: 'b' }];

describe('DataSearch', () => {
  test('renders', () => {
    const { container } = render(
      <Grommet>
        <Data data={data}>
          <DataFilters>
            <DataSearch />
          </DataFilters>
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
