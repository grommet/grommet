import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Data } from '../../Data';
import { Grommet } from '../../Grommet';
import { DataFilters } from '..';

const data = [{ name: 'a' }, { name: 'b' }];

describe('DataFilters', () => {
  test('renders', () => {
    const { container } = render(
      <Grommet>
        <Data data={data}>
          <DataFilters />
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('drop', () => {
    const { container } = render(
      <Grommet>
        <Data data={data}>
          <DataFilters drop />
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('drop badge', () => {
    const { container } = render(
      <Grommet>
        <Data data={data} view={{ search: 'a', properties: { name: ['a'] } }}>
          <DataFilters drop />
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('properties array', () => {
    const { container } = render(
      <Grommet>
        <Data data={data} properties={['name']}>
          <DataFilters />
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('properties object', () => {
    const { container } = render(
      <Grommet>
        <Data data={data} properties={{ name: {} }}>
          <DataFilters />
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('clear', () => {
    const { container } = render(
      <Grommet>
        <Data data={data} view={{ search: 'a', properties: { name: ['a'] } }}>
          <DataFilters />
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
