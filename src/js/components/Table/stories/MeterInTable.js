import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  Box,
  Grommet,
  Meter,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Text,
} from 'grommet';
import { grommet } from 'grommet/themes';

const values = [20, 40, 60, 80, 100];

const MeterInTable = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Box border>
        <Table caption="Meter Inside Table">
          <TableBody>
            {values.map(val => (
              <TableRow>
                <TableCell>
                  <Meter
                    type="bar"
                    values={[
                      {
                        value: val,
                      },
                    ]}
                  />
                </TableCell>
                <TableCell>
                  <Text>{val}% complete</Text>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  </Grommet>
);

storiesOf('Table', module).add('Meter Inside Table', () => <MeterInTable />);
