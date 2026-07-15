import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import 'jest-styled-components';
import '@testing-library/jest-dom';

import { Data } from '../../Data';
import { DataFilters } from '../../DataFilters';
import { Grommet } from '../../Grommet';
import { DataSort } from '..';
import { createPortal, expectPortal } from '../../../utils/portal';
import { Add } from 'grommet-icons';

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

  test('should render theme icon', () => {
    render(
      <Grommet theme={{ dataSort: { icons: { control: Add } } }}>
        <Data id="test-data" data={data}>
          <DataSort drop />
        </Data>
      </Grommet>,
    );

    expect(screen.getByLabelText('Add')).toBeInTheDocument();
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

  test('properties', async () => {
    const items = [
      { name: 'a', loc: 'Home' },
      { name: 'b', loc: 'School' },
    ];
    const properties = {
      name: { label: 'My Name' },
      loc: { label: 'Location' },
    };

    render(
      <Grommet>
        <Data data={items} properties={properties}>
          <DataFilters>
            <DataSort />
          </DataFilters>
        </Data>
      </Grommet>,
    );

    const propButton = screen.getByRole('button', {
      name: 'Sort by Open Drop',
    });
    fireEvent.click(propButton);
    const drop = await waitFor(() => screen.getByRole('listbox'));

    expect(drop).toBeTruthy();
    expect(drop).toMatchSnapshot();
  });
});
