import React from 'react';

import { Box, SelectMultiple } from 'grommet';

const dummyOptions = Array(2000)
  .fill()
  .map((_, i) => `option ${i}`)
  .sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }),
  );

export const LongList = () => {
  const [selected, setSelected] = React.useState([]);
  const [options, setOptions] = React.useState(dummyOptions.slice(0, 200));

  const onMore = () => {
    setTimeout(() => {
      setOptions(dummyOptions.slice(0, options.length + 200));
    }, 1000);
  };

  const onChange = ({ value: nextSelected }) => setSelected(nextSelected);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="start" pad="large">
      <SelectMultiple
        showSelectedInline
        placeholder="select an option..."
        value={selected}
        options={options}
        dropHeight="medium"
        onMore={onMore}
        onChange={onChange}
      />
    </Box>
    // </Grommet>
  );
};

LongList.storyName = 'Long list';

LongList.parameters = {
  chromatic: { disable: true },
};

LongList.args = {
  full: true,
};

export default {
  title: 'Input/SelectMultiple/Long list',
};
