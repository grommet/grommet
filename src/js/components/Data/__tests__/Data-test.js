import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { DataTable } from '../../DataTable';
import { Data } from '..';

const data = [{ name: 'a' }, { name: 'b' }];

describe('Data', () => {
  test('renders', () => {
    const { container } = render(
      <Grommet>
        <Data data={data} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('properties', () => {
    const { container } = render(
      <Grommet>
        <Data data={data} properties={{ name: { label: 'Name' } }} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('toolbar', () => {
    const { container } = render(
      <Grommet>
        <Data data={data} toolbar />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('view', () => {
    const { container } = render(
      <Grommet>
        <Data data={data} view={{ search: '', properties: {} }} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('all', () => {
    const { container } = render(
      <Grommet>
        <Data
          data={data}
          properties={{ name: { label: 'Name' } }}
          view={{ search: 'a', properties: {} }}
          toolbar
        >
          <DataTable />
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
