import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';

import { Data } from '../../Data';
import { Grommet } from '../../Grommet';
import { DataFilters } from '..';
import { createPortal, expectPortal } from '../../../utils/portal';

const data = [{ name: 'a' }, { name: 'b' }];

describe('DataFilters', () => {
  window.scrollTo = jest.fn();
  beforeEach(createPortal);

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
    jest.useFakeTimers();

    const { container, getByRole } = render(
      <Grommet>
        <Data id="test-data" data={data}>
          <DataFilters drop />
        </Data>
      </Grommet>,
    );

    expect(getByRole('button', { name: 'Open filters' })).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByRole('button', { name: 'Open filters' }));
    // advance timers so drop can open
    act(() => jest.advanceTimersByTime(200));

    // snapshot on drop
    expectPortal('test-data--filters-control').toMatchSnapshot();
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

  test('layer', () => {
    jest.useFakeTimers();

    const { container, getByRole } = render(
      <Grommet>
        <Data id="test-data" data={data}>
          <DataFilters layer />
        </Data>
      </Grommet>,
    );

    expect(getByRole('button', { name: 'Open filters' })).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByRole('button', { name: 'Open filters' }));
    // advance timers so layer can open
    act(() => jest.advanceTimersByTime(200));

    // snapshot on layer
    expectPortal('test-data--filters-layer').toMatchSnapshot();
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
