import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';
import '@testing-library/jest-dom';

import { Data } from '../../Data';
import { DataFilters } from '../../DataFilters';
import { DataTable } from '../../DataTable';
import { Grommet } from '../../Grommet';
import { DataTableColumns } from '..';
import { createPortal, expectPortal } from '../../../utils/portal';

const data = [
  { name: 'a', size: 's' },
  { name: 'b', size: 'm' },
];

describe('DataTableColumns', () => {
  window.scrollTo = jest.fn();
  beforeEach(createPortal);

  test('renders', () => {
    const { container, getByRole } = render(
      <Grommet>
        <Data id="test-data" data={data}>
          <DataFilters>
            <DataTableColumns drop options={['name', 'size']} />
          </DataFilters>
          <DataTable
            columns={[
              { property: 'name', header: 'Name' },
              { property: 'size', header: 'Size' },
            ]}
          />
        </Data>
      </Grommet>,
    );

    expect(getByRole('button', { name: 'Open column selector' })).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('remove column', () => {
    jest.useFakeTimers();
    const onView = jest.fn();
    const { container, getByRole, getByText } = render(
      <Grommet>
        <Data id="test-data" data={data} updateOn="change" onView={onView}>
          <DataFilters>
            <DataTableColumns drop options={['name', 'size', 'age']} />
          </DataFilters>
          <DataTable
            columns={[
              { property: 'name', header: 'Name' },
              { property: 'age', header: 'Age' },
              { property: 'size', header: 'Size' },
            ]}
          />
        </Data>
      </Grommet>,
    );
    expect(getByRole('button', { name: 'Open column selector' })).toBeTruthy();

    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByRole('button', { name: 'Open column selector' }));

    // advance timers so drop can open
    act(() => jest.advanceTimersByTime(200));

    // snapshot on drop
    expectPortal('test-data--columns-control').toMatchSnapshot();

    fireEvent.click(getByText('name'));
    expect(onView).toBeCalledWith(
      expect.objectContaining({ columns: ['size', 'age'] }),
    );

    fireEvent.click(getByText('name'));
    expect(onView).toBeCalledWith(
      expect.objectContaining({ columns: ['name', 'size', 'age'] }),
    );
  });

  test('search', () => {
    jest.useFakeTimers();
    const onView = jest.fn();
    const { container, getByPlaceholderText, getByRole, getByText } = render(
      <Grommet>
        <Data id="test-data" data={data} updateOn="change" onView={onView}>
          <DataFilters>
            <DataTableColumns drop options={['name', 'size']} />
          </DataFilters>
          <DataTable
            columns={[
              { property: 'name', header: 'Name' },
              { property: 'size', header: 'Size' },
            ]}
          />
        </Data>
      </Grommet>,
    );
    expect(getByRole('button', { name: 'Open column selector' })).toBeTruthy();

    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByRole('button', { name: 'Open column selector' }));

    // advance timers so drop can open
    act(() => jest.advanceTimersByTime(200));

    // snapshot on drop
    expectPortal('test-data--columns-control').toMatchSnapshot();

    // add content to search
    fireEvent.change(getByPlaceholderText('Search'), {
      target: { value: 'n' },
    });
    expectPortal('test-data--columns-control').toMatchSnapshot();

    fireEvent.click(getByText('name'));
    expect(onView).toBeCalledWith(
      expect.objectContaining({ columns: ['size'] }),
    );
  });
});
