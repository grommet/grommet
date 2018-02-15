import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Text } from '../../Text';
import { Table, TableCell } from '../';

test('Table columns renders', () => {
  const component = renderer.create(
    <Grommet>
      <Table
        columns={[
          { label: 'Name', property: 'name', basis: 'small' },
          {
            header: <TableCell border='bottom'><Text>Flavor</Text></TableCell>,
            footer: <TableCell border='top'><Text>Flavor</Text></TableCell>,
          },
        ]}
      />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Table caption renders', () => {
  const component = renderer.create(
    <Grommet>
      <Table
        caption='Caption'
        columns={[{ label: 'Name', property: 'name' }]}
      />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Table data renders', () => {
  const component = renderer.create(
    <Grommet>
      <Table
        columns={[
          { label: 'Name', property: 'name', dataHeader: true },
          {
            label: 'Flavor',
            renderData: datum =>
              <TableCell ><Text>{datum.flavor}</Text></TableCell>,
          },
        ]}
        data={[
          { name: 'Eric', flavor: 'Coconut' },
          { name: 'Chris', flavor: 'Watermelon' },
        ]}
      />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
