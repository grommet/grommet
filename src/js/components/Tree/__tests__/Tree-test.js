import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { Grommet } from '../../Grommet';
import { Tree } from '../Tree';

const data = [
  {
    name: 'All Resources',
    subs: { read: true, write: false, block: false },
  },
  { name: 'Air Group', subs: { read: true, write: false, block: false } },
  {
    name: 'Analytics',
    subs: { read: true, write: false, block: false },
  },
  {
    name: 'Guest Management',
    subs: { read: true, write: false, block: false },
  },
  {
    name: 'Network Management',
    subs: { read: true, write: true, block: false },
    children: [
      {
        name: 'Analytics',
        subs: { read: true, write: true, block: false },
      },
      { name: 'Audit', subs: { read: true, write: true, block: false } },
      {
        name: 'Configuration',
        subs: { read: true, write: true, block: false },
        children: [
          {
            name: 'Analytics',
            subs: { read: true, write: true, block: false },
          },
          {
            name: 'Reports',
            subs: { read: true, write: true, block: false },
          },
        ],
      },
      {
        name: 'Firmware',
        subs: { read: true, write: true, block: false },
      },
    ],
  },
  {
    name: 'Reports',
  },
  {
    name: 'Resource Foo',
    subs: { read: true, write: true, block: false },
    children: [
      {
        name: 'Sub Resource1',
        subs: { read: true, write: false, block: false },
      },
      {
        name: 'Sub Resource2',
        subs: { read: false, write: true, block: false },
      },
    ],
  },
  {
    name: 'Resource Foo1',
  },
  {
    name: 'Resource Foo2',
    subs: { read: true, write: false, block: false },
  },
  {
    name: 'United Communications',
    children: [
      {
        id: 4,
        name: 'Analytics',
        subs: { read: true, write: false, block: false },
      },
      {
        id: 5,
        name: 'Reports',
        subs: { read: false, write: true, block: false },
      },
    ],
  },
  {
    name: 'Virtual Gateways',
  },
];

describe('Tree', () => {
  test('should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <Tree data={data} />
      </Grommet>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('column mode', () => {
    const { container } = render(
      <Grommet>
        <Tree data={data} mode="column" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('column nested', () => {
    const { container } = render(
      <Grommet>
        <Tree data={data} mode="nested" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
