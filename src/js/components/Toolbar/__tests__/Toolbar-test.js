import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Data } from '../../Data';
import { DataFilters } from '../../DataFilters';
import { Grommet } from '../../Grommet';
import { Toolbar } from '..';

const data = [{ name: 'a' }, { name: 'b' }];

describe('DataFilters', () => {
  test('renders', () => {
    const { container } = render(
      <Grommet>
        <Data data={data}>
          <Toolbar>
            <DataFilters />
          </Toolbar>
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
