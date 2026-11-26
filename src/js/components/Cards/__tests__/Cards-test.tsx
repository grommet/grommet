// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { axe } from 'jest-axe';
import { Grommet } from '../../Grommet';
import { Cards } from '..';
import type { CardsProps } from '..';
import { Card } from '../../Card';
import { CardHeader } from '../../CardHeader';

const data: string[] = [];
for (let i = 0; i < 95; i += 1) {
  data.push(`entry-${i}`);
}

describe('Cards', () => {
  test('should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <Cards aria-label="Cards" data={[{ a: 'alpha' }, { a: 'beta' }]} />
      </Grommet>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('renders a11yTitle and aria-label', () => {
    const { container, getByLabelText } = render(
      <Grommet>
        <Cards a11yTitle="test" data={[{ a: 'alpha' }, { a: 'beta' }]} />
        <Cards aria-label="test-2" data={[{ a: 'alpha' }, { a: 'beta' }]} />
      </Grommet>,
    );
    expect(getByLabelText('test')).toBeTruthy();
    expect(getByLabelText('test-2')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('empty', () => {
    const { container } = render(
      <Grommet>
        <Cards />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('empty no grommet wrapper', () => {
    const { container } = render(<Cards />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('data strings', () => {
    const { container } = render(
      <Grommet>
        <Cards data={['one', 'two']} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('data objects', () => {
    const { container } = render(
      <Grommet>
        <Cards
          data={[
            { a: 'one', b: 1 },
            { a: 'two', b: 2 },
          ]}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('children render', () => {
    const { container } = render(
      <Grommet>
        <Cards data={['one', 'two']}>
          {(item, index) => (
            <Card key={item}>
              <CardHeader>
                `${item} - ${index}`
              </CardHeader>
            </Card>
          )}
        </Cards>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('margin string', () => {
    const { container } = render(
      <Grommet>
        <Cards data={['one', 'two']} margin="large" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('margin object', () => {
    const { container } = render(
      <Grommet>
        <Cards data={['one', 'two']} margin={{ horizontal: 'large' }} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('pad string', () => {
    const { container } = render(
      <Grommet>
        <Cards data={['one', 'two']} pad="large" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('pad object', () => {
    const { container } = render(
      <Grommet>
        <Cards data={['one', 'two']} pad={{ horizontal: 'large' }} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('theme grid columns and gap', () => {
    const customTheme = {
      cards: {
        grid: {
          columns: 'large',
          gap: 'large',
        },
      },
    };

    const { container } = render(
      <Grommet theme={customTheme}>
        <Cards data={['one', 'two', 'three', 'four']} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('onOrder', () => {
    const { container } = render(
      <Grommet>
        <Cards
          data={[
            { id: '1', name: 'one' },
            { id: '2', name: 'two' },
            { id: '3', name: 'three' },
          ]}
          onOrder={jest.fn()}
        >
          {(item) => <Card key={item.id}>{item.name}</Card>}
        </Cards>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('onOrder keyboard ArrowDown reorders items', () => {
    const onOrder = jest.fn();
    const data = [
      { id: '1', name: 'one' },
      { id: '2', name: 'two' },
      { id: '3', name: 'three' },
    ];
    const { container } = render(
      <Grommet>
        <Cards data={data} onOrder={onOrder}>
          {(item) => <Card key={item.id}>{item.name}</Card>}
        </Cards>
      </Grommet>,
    );
    const firstCard = container.querySelectorAll(
      '[aria-roledescription="sortable card"]',
    )[0];
    fireEvent.keyDown(firstCard, { keyCode: 40 }); // ArrowDown
    expect(onOrder).toHaveBeenCalledTimes(1);
    expect(onOrder).toHaveBeenCalledWith([
      { id: '2', name: 'two' },
      { id: '1', name: 'one' },
      { id: '3', name: 'three' },
    ]);
  });

  test('sizeKey', () => {
    const { container } = render(
      <Grommet>
        <Cards
          data={[
            { id: '1', name: 'one', size: { columns: 2, rows: 1 } },
            { id: '2', name: 'two' },
            { id: '3', name: 'three', size: { columns: 1, rows: 2 } },
          ]}
          sizeKey="size"
          columns={['flex', 'flex', 'flex']}
          rows="xsmall"
        >
          {(item) => <Card key={item.id}>{item.name}</Card>}
        </Cards>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('accepts Grid props through CardsProps and forwards them to Grid', () => {
    const props: CardsProps<string> = {
      data: ['one', 'two'],
      columns: ['flex', 'flex'],
      rows: 'xsmall',
      gap: { row: 'small', column: 'medium' },
      justifyContent: 'center',
      responsive: false,
      children: (item) => (
        <Card as="li" key={item}>
          {item}
        </Card>
      ),
    };

    render(
      <Grommet>
        <Cards {...props} aria-label="Dashboard cards" />
      </Grommet>,
    );

    const cards = screen.getByRole('list', { name: 'Dashboard cards' });
    expect(cards).toHaveStyleRule('grid-template-columns', '1fr 1fr');
    expect(cards).toHaveStyleRule('justify-content', 'center');
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  test('accepts dashboard auto-fit columns with typed device data', () => {
    interface Device {
      id: string;
      name: string;
    }
    const devices: Device[] = [
      { id: 'device-1', name: 'Device one' },
      { id: 'device-2', name: 'Device two' },
    ];
    const props: CardsProps<Device> = {
      as: 'ul',
      data: devices,
      columns: { count: 'fit', size: ['small', 'medium'] },
      gap: 'medium',
    };

    render(
      <Grommet>
        <h2 id="devices-heading">Devices</h2>
        <Cards
          {...props}
          aria-label="Devices"
          aria-describedby="devices-heading"
        >
          {(datum: Device) => (
            <Card as="li" key={datum.id}>
              <CardHeader>{datum.name}</CardHeader>
            </Card>
          )}
        </Cards>
      </Grommet>,
    );

    const cards = screen.getByRole('list', { name: 'Devices' });
    expect(cards).toHaveAttribute('aria-describedby', 'devices-heading');
    expect(cards).toHaveStyleRule(
      'grid-template-columns',
      'repeat( auto-fit,minmax(min(192px, 100%), 384px) )',
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('Device one')).toBeInTheDocument();
  });
});
