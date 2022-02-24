/* eslint-disable react/no-array-index-key */
import React from 'react';

import {
  Box,
  Meter,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Text,
} from 'grommet';

const values = [20, 40, 60, 80, 100];

export const MeterInTable = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
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
  // </Grommet>
);

MeterInTable.storyName = 'Meter inside table';

export default {
  title: 'Visualizations/Table/Meter inside table',
};
