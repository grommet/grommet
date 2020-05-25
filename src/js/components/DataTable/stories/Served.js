import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, DataTable } from 'mnet-ui-base';

import { columns, DATA } from './data';

const ServedDataTable = () => {
  const [data2, setData2] = React.useState(DATA);

  const onSearch = search => {
    let nextData;
    if (search) {
      // The function below escapes regular expression special characters:
      // [ \ ^ $ . | ? * + ( )
      const escapedText = text => {
        text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
        return new RegExp(escapedText, 'i');
      };
      const expressions = Object.keys(search).map(property => ({
        property,
        // Create the regular expression with modified value which handles
        // escaping special characters. Without escaping special characters,
        // errors will appear in the console
        exp: new RegExp(escapedText(search[property]), 'i'),
      }));
      nextData = DATA.filter(
        d => !expressions.some(e => !e.exp.test(d[e.property])),
      );
    } else {
      nextData = DATA;
    }
    setData2(nextData);
  };

  return (
    <>
      <Box align="center" pad="large">
        <DataTable
          columns={columns.map(column => ({
            ...column,
            search:
              column.property === 'name' || column.property === 'location',
          }))}
          data={data2}
          onSearch={onSearch}
        />
      </Box>
    </>
  );
};

storiesOf('DataTable', module).add('Served', () => <ServedDataTable />);
