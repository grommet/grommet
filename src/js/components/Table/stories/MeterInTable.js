/* eslint-disable react/no-array-index-key */
import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  Box,
  MnetUIBase,
  Meter,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Text,
} from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const values = [20, 40, 60, 80, 100];

const MeterInTable = () => (
  <MnetUIBase theme={mnet}>
    <Box align="center" pad="large">
      <Box border pad={{ top: 'xsmall' }}>
        <Table caption="Meter Inside Table">
          <TableBody>
            {values.map((val, index) => (
              <TableRow key={index}>
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
  </MnetUIBase>
);

storiesOf('Table', module).add('Meter Inside Table', () => <MeterInTable />);
