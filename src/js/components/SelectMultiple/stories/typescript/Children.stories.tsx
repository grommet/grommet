import React, { useState } from 'react';

import { Box, Tag, Text } from 'grommet';
import { SelectMultiple } from '../../SelectMultiple.js';

const allSeasons = [
  'S01',
  'S02',
  'S03',
  'S04',
  'S05',
  'S06',
  'S07',
  'S08',
  'S09',
  'S10',
];

export const Children = () => {
  const [selected, setSelected] = useState([]);

  const onRemoveSeason = (season) => {
    setSelected(selected.filter((selectedSeason) => selectedSeason !== season));
  };

  const renderOption = (option, index, options, state) => (
    <Box pad="small" background={state.active ? 'active' : undefined}>
      {option}
    </Box>
  );

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" pad="large" gap="large">
      <Text>SelectMultiple with custom children</Text>
      <SelectMultiple
        sortSelectedOnClose={false}
        showSelectedInline
        placeholder="Select Season"
        valueLabel={(options) => (
          <Box
            wrap
            direction="row"
            pad="xsmall"
            gap="xsmall"
            cssGap
            width="small"
          >
            {options && options.length &&
              options.map((season) => (
                <Tag
                  key={`season_tag_${season}`}
                  value={season}
                  onRemove={() => onRemoveSeason(season)}
                />
              ))
            }
          </Box>
        )}
        options={allSeasons}
        value={selected}
        onChange={({ value }) => setSelected([...value])}
      >
        {renderOption}
      </SelectMultiple>
    </Box>
    // </Grommet>
  );
};

Children.parameters = {
  chromatic: { disable: true },
};

Children.args = {
  full: true,
};

export default {
  title: 'Input/SelectMultiple/Children',
};
