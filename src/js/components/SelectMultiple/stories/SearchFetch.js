import React, { useState } from 'react';

import { Box } from 'grommet';
import { SelectMultiple } from '../SelectMultiple';

const locationList = [
  { name: 'Abc 1', id: '12345' },
  { name: 'bcd 2', id: '67890' },
  { name: 'cde 1', id: '13570' },
  { name: 'efg 2', id: '24680' },
];

const stringList = ['a', 'b', 'c', 'd'];

export const SearchFetch = () => {
  const [dropOptions, setDropOptions] = useState(locationList?.slice(0, 2));
  const [stringOptions, setStringOptions] = useState(stringList?.slice(0, 2));

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" pad="large" gap="large">
      <SelectMultiple
        placeholder="object example"
        options={dropOptions}
        onChange={(event) => console.log(event, 'onChange')}
        onSearch={(searchText) => {
          const regexp = new RegExp(searchText, 'i');
          setDropOptions(locationList.filter((o) => o.name.match(regexp)));
        }}
        onClose={() => {
          setDropOptions(locationList);
        }}
      />
      <SelectMultiple
        placeholder="string example"
        options={stringOptions}
        onChange={(event) => console.log(event, 'onChange')}
        onSearch={(searchText) => {
          const regexp = new RegExp(searchText, 'i');
          setStringOptions(stringList.filter((o) => o.match(regexp)));
        }}
        onClose={() => {
          setStringOptions(stringList);
        }}
      />
    </Box>
    // </Grommet>
  );
};

SearchFetch.storyName = 'Search fetch';

export default {
  title: 'Input/SelectMultiple/Search fetch',
};
