import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';
import { Data } from '../../Data';
import { DataFilters } from '../../DataFilters';
import { Grommet } from '../../Grommet';
import { DataSummary } from '../../DataSummary';
import { DataTable } from '../../DataTable';

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
  const { asFragment, getByTestId, getByText } = render(
    <Grommet>
      <Data data={[
            { a: 'one', b: 1 },
            { a: 'two', b: 2 },
          ]} updateOn="change">
        <DataSearch data-testid="input_submit" updateOn="submit" />
        <DataSummary />
        <DataTable
          columns={[
            { property: 'a', header: 'A' },
            { property: 'b', header: 'B' },
          ]}
          
        />
      </Data>
    </Grommet>,
  );
  const submitButton = getByTestId('input_submit');
  expect(submitButton).toBeTruthy();
  fireEvent.change(submitButton, { target: { value: 'one' } });
  const event = new KeyboardEvent('keydown', { keyCode: 32 });
  act(() => jest.advanceTimersByTime(200));
  submitButton.dispatchEvent(event);
  // make sure one is in the table
  expect(getByText('one')).toBeTruthy();
  // make sure two is not in the table
  expect(getByText('two')).toBeNull();
  // make sure the snapshot is correct
  expect(asFragment()).toMatchSnapshot();
}, 20000);
