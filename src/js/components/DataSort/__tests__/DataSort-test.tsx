import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import 'jest-styled-components';

import { Data } from '../../Data';
import { DataFilters } from '../../DataFilters';
import { Grommet } from '../../Grommet';
import { DataSort } from '..';
import { createPortal, expectPortal } from '../../../utils/portal';

const data = [{ name: 'a' }, { name: 'b' }];

describe('DataSort', () => {
  window.scrollTo = jest.fn();
  beforeEach(createPortal);

  test('renders', () => {
    const { container } = render(
      <Grommet>
        <Data data={data}>
          <DataFilters>
            <DataSort />
          </DataFilters>
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
          <DataSort drop />
        </Data>
      </Grommet>,
    );

    expect(getByRole('button', { name: 'Open sort' })).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByRole('button', { name: 'Open sort' }));
    // advance timers so drop can open
    act(() => jest.advanceTimersByTime(200));

    // snapshot on drop
    expectPortal('test-data--sort-control').toMatchSnapshot();
  });

  test('sort when data array is empty', () => {
    const { container } = render(
      <Grommet>
        <Data id="test-data" data={[]}>
          <DataSort />
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render tooltip', async () => {
    render(
      <Grommet>
        <Data data={data}>
          <DataSort drop />
        </Data>
      </Grommet>,
    );

    const sortButton = screen.getByRole('button', { name: 'Open sort' });
    fireEvent.mouseOver(sortButton);

    const tooltip = await waitFor(() => screen.getByText('Open sort'));

    expect(tooltip).toBeTruthy();
  });
});
