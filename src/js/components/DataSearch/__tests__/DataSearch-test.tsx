import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';

import { Data } from '../../Data';
import { DataFilters } from '../../DataFilters';
import { Grommet } from '../../Grommet';
import { DataSearch } from '..';
import { createPortal, expectPortal } from '../../../utils/portal';

const data = [{ name: 'a' }, { name: 'b' }];

describe('DataSearch', () => {
  window.scrollTo = jest.fn();
  beforeEach(createPortal);

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

  test('no Data', () => {
    const { container } = render(
      <Grommet>
        <DataSearch />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('drop', () => {
    jest.useFakeTimers();

    const { container, getByRole } = render(
      <Grommet>
        <Data id="test-data" data={data}>
          <DataSearch drop />
        </Data>
      </Grommet>,
    );

    expect(getByRole('button', { name: 'Open search' })).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByRole('button', { name: 'Open search' }));
    // advance timers so drop can open
    act(() => jest.advanceTimersByTime(200));

    // snapshot on drop
    expectPortal('test-data--search-control').toMatchSnapshot();
  });
});

test('enter', async () => {
  jest.useFakeTimers();
  const onView = jest.fn();
  const { getByRole } = render(
    <Grommet>
      <Data data={data} onView={onView}>
        <DataSearch data-testid="input_submit" updateOn="submit" />
      </Data>
    </Grommet>,
  );
  const searchbox = getByRole('searchbox');
  expect(searchbox).toBeTruthy();

  fireEvent.change(searchbox, { target: { value: 'one' } });
  act(() => jest.advanceTimersByTime(300));

  fireEvent.keyDown(searchbox, { key: 'enter', keyCode: 13 });

  expect(onView).toHaveBeenNthCalledWith(
    1,
    expect.objectContaining({
      search: 'one',
    }),
  );
}, 20000);
