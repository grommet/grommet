import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Text } from '../../Text';
import { Table, TableCell } from '../';

test('Grid columns renders', () => {
  const component = renderer.create(
    <Grommet>
      <Table
        columns={[
          { label: 'Name', property: 'name' },
          {
            header: <TableCell border='bottom'><Text>Flavor</Text></TableCell>,
            renderData: datum =>
              <TableCell ><Text>{datum.flavor}</Text></TableCell>,
          },
        ]}
      />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Grid data renders', () => {
  const component = renderer.create(
    <Grommet>
      <Table
        columns={[
          { label: 'Name', property: 'name' },
          {
            header: <TableCell border='bottom'><Text>Flavor</Text></TableCell>,
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
