import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Data } from '../../Data';
import { Grommet } from '../../Grommet';
import { DataView } from '..';

const data = [
  { name: 'aa', enabled: true, rating: 2.3, type: { name: 'ZZ', id: 1 } },
  { name: 'bb', enabled: false, rating: 4.3, type: { name: 'YY', id: 2 } },
  { name: 'cc', type: { name: 'ZZ', id: 1 } },
];

const views = [
  { name: 'top', properties: { rating: { min: 3.0, max: 5.0 } } },
  { name: 'disabled', properties: { enabled: [true] } },
];

describe('DataView', () => {
  test('renders', () => {
    const { container } = render(
      <Grommet>
        <Data data={data} views={views}>
          <DataView />
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('preset view', () => {
    const { container, getByDisplayValue } = render(
      <Grommet>
        <Data data={data} view="top" views={views}>
          <DataView />
        </Data>
      </Grommet>,
    );

    expect(getByDisplayValue('top')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });
});
