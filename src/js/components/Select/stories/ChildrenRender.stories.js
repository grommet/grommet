import React, { useState } from 'react';

import { Box, Select, Tag, Text } from 'grommet';

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
    <Box
      pad="small"
      background={
        state.selected ? 'brand' : undefined
      }
    >
      <Text color={state.disabled ? 'text-disabled' : 'text-strong'}>
        {option}
      </Text>
    </Box>
  );

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="center">
      <Select
        closeOnChange={false}
        multiple
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
            {options && options.length ?
              options.map((season) => (
                <Tag
                  key={`season_tag_${season}`}
                  value={season}
                  onRemove={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onRemoveSeason(season);
                  }}
                />
              )) : (
              <Text color="text-weak">Select Season</Text>
             )
            }
          </Box>
        )}
        options={allSeasons}
        value={selected}
        disabled={[2, 6]}
        onChange={({ value: nextSelected }) => {
          setSelected(nextSelected);
        }}
      >
        {renderOption}
      </Select>
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
  title: 'Input/Select/Children',
};
