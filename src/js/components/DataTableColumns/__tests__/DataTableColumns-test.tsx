import React from 'react';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
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
  jest.useFakeTimers();
  window.scrollTo = jest.fn();
  beforeEach(createPortal);

  test('renders', () => {
    const { asFragment, getByRole } = render(
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
    expect(asFragment()).toMatchSnapshot();

    fireEvent.click(
      screen.getByRole('button', { name: 'Open column selector' }),
    );

    window.scrollTo = jest.fn();

    // advance timers so drop can open
    act(() => jest.advanceTimersByTime(200));
    // Take a snapshot of the tab panel
    const firstTabPanel = screen.getByRole('tabpanel', {
      name: 'Select columns Tab Contents',
    });
    expect(firstTabPanel).toMatchSnapshot();

    // Click on the "Order columns" tab
    fireEvent.click(screen.getByRole('tab', { name: 'Order columns' }));

    // Find the tab panel element using its role and aria-label
    const secondTabPanel = screen.getByRole('tabpanel', {
      name: 'Order columns Tab Contents',
    });
    // Take a snapshot of the tab panel
    expect(secondTabPanel).toMatchSnapshot();
  });

  test('remove column', () => {
    jest.useFakeTimers();
    const onView = jest.fn();
    const { asFragment, getByRole, getByText } = render(
      <Grommet>
        <Data id="test-data" data={data} onView={onView}>
          <DataFilters updateOn="change">
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

    expect(asFragment()).toMatchSnapshot();

    fireEvent.click(getByRole('button', { name: 'Open column selector' }));

    // advance timers so drop can open
    act(() => jest.advanceTimersByTime(200));

    // snapshot on drop
    const tabPanel = screen.getByRole('tabpanel', {
      name: 'Select columns Tab Contents',
    });
    expect(tabPanel).toMatchSnapshot();

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
        <Data id="test-data" data={data} onView={onView}>
          <DataFilters updateOn="change">
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
    const tabPanel = screen.getByRole('tabpanel', {
      name: 'Select columns Tab Contents',
    });
    expect(tabPanel).toMatchSnapshot();

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

  test('pinned', () => {
    jest.useFakeTimers();
    const onView = jest.fn();

    const App = () => (
      <Grommet>
        <Data id="test-data" data={data} onView={onView}>
          <DataFilters updateOn="change">
            <DataTableColumns
              drop
              options={[
                { property: 'name', label: 'Name', pinned: false },
                { property: 'size', label: 'Size', pinned: true },
                { property: 'percent', label: 'Percent' },
              ]}
            />
          </DataFilters>
          <DataTable
            columns={[
              { property: 'name', header: 'Name' },
              { property: 'size', header: 'Size' },
              { property: 'percent', header: 'Percent' },
            ]}
          />
        </Data>
      </Grommet>
    );

    render(<App />);

    fireEvent.click(
      screen.getByRole('button', { name: 'Open column selector' }),
    );

    // advance timers so drop can open
    act(() => jest.advanceTimersByTime(200));

    fireEvent.click(screen.getByRole('tab', { name: 'Order columns' }));

    // snap order tab
    const tabPanel = screen.getByRole('tabpanel', {
      name: 'Order columns Tab Contents',
    });
    // Take a snapshot of the tab panel
    expect(tabPanel).toMatchSnapshot();

    const bottomMoveUp = screen.getByRole('button', {
      name: '2 Percent move up',
    });

    fireEvent.click(bottomMoveUp);
    expect(onView).toBeCalledWith(
      expect.objectContaining({
        columns: ['percent', 'size', 'name'],
      }),
    );

    screen.getByRole('button', { name: '2 Name move up' });

    const list = screen.getByRole('list');
    const listItems = within(list).getAllByRole('listitem');

    const dragElement = listItems[2];
    const targetElement = listItems[0];
    expect(dragElement).toHaveAttribute('draggable', 'true');

    const dataTransfer = {
      setData: jest.fn(),
      getData: jest.fn(),
      clearData: jest.fn(),
    };

    fireEvent.dragStart(dragElement, { dataTransfer });
    fireEvent.dragOver(targetElement, { dataTransfer });
    fireEvent.drop(targetElement, { dataTransfer });
    fireEvent.dragEnd(dragElement, { dataTransfer });

    expect(onView).toBeCalledWith(
      expect.objectContaining({
        columns: ['name', 'size', 'percent'],
      }),
    );
  });
});
