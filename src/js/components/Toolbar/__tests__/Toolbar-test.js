import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Data } from '../../Data';
import { DataFilters } from '../../DataFilters';
import { DataSearch } from '../../DataSearch';
import { Grommet } from '../../Grommet';
import { Toolbar } from '..';

const data = [{ name: 'a' }, { name: 'b' }];

describe('DataFilters', () => {
  test('renders', () => {
    const { container } = render(
      <Grommet>
        <Data data={data}>
          <Toolbar>
            <DataSearch />
            <DataFilters />
          </Toolbar>
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
