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
    fireEvent.click(
      screen.getByRole('tab', {
        name: 'Reorder the visible columns in the data table',
      }),
    );

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
    expect(onView).toHaveBeenCalledWith(
      expect.objectContaining({ columns: ['size', 'age'] }),
    );

    fireEvent.click(getByText('name'));
    expect(onView).toHaveBeenCalledWith(
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
    expect(onView).toHaveBeenCalledWith(
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

    // Open the drop button to reveal the column settings
    fireEvent.click(
      screen.getByRole('button', {
        name: 'Open column selector',
      }),
    );

    // Let drop animation/timers complete
    act(() => jest.advanceTimersByTime(200));

    // Click the "Reorder columns" tab using the full aria-label
    fireEvent.click(
      screen.getByRole('tab', {
        name: 'Reorder the visible columns in the data table',
      }),
    );

    // Get the tab panel
    const tabPanel = screen.getByRole('tabpanel', {
      name: 'Order columns Tab Contents',
    });

    expect(tabPanel).toMatchSnapshot();

    // Click the move up button for "Percent"
    const bottomMoveUp = screen.getByRole('button', {
      name: '2 Percent move up',
    });
    fireEvent.click(bottomMoveUp);

    expect(onView).toHaveBeenCalledWith(
      expect.objectContaining({
        columns: ['percent', 'size', 'name'],
      }),
    );

    // Check that another move button exists for "Name"
    screen.getByRole('button', { name: '2 Name move up' });

    // Simulate drag and drop for reordering
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

    expect(onView).toHaveBeenCalledWith(
      expect.objectContaining({
        columns: ['name', 'size', 'percent'],
      }),
    );
  });

  test('theme tabs pad, selectColumns pad and gap, orderColumns pad', () => {
    const theme = {
      dataTableColumns: {
        tabs: {
          pad: 'small',
        },
        selectColumns: {
          pad: {
            vertical: 'small',
          },
          gap: 'xsmall',
        },
        orderColumns: {
          pad: {
            top: 'small',
          },
        },
      },
    };

    const { getByRole } = render(
      <Grommet theme={theme}>
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

    // open the columns control
    fireEvent.click(getByRole('button', { name: 'Open column selector' }));

    // let the drop open
    act(() => jest.advanceTimersByTime(200));

    // snapshot the Select columns tab content (theme.selectColumns pad + gap)
    const selectTabPanel = screen.getByRole('tabpanel', {
      name: 'Select columns Tab Contents',
    });
    expect(selectTabPanel).toMatchSnapshot();

    // switch to Order columns tab (theme.orderColumns pad)
    fireEvent.click(
      screen.getByRole('tab', {
        name: 'Reorder the visible columns in the data table',
      }),
    );

    const orderTabPanel = screen.getByRole('tabpanel', {
      name: 'Order columns Tab Contents',
    });
    expect(orderTabPanel).toMatchSnapshot();
  });
});
