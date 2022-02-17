import React, { useState } from 'react';

import { FormClose } from 'grommet-icons';
import { Box, Button, Select, Text } from 'grommet';

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
    const seasonIndex = allSeasons.indexOf(season);
    setSelected(
      selected.filter((selectedSeason) => selectedSeason !== seasonIndex),
    );
  };

  const renderSeason = (season) => (
    <Button
      key={`season_tag_${season}`}
      href="#"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onRemoveSeason(season);
      }}
      onFocus={(event) => event.stopPropagation()}
    >
      <Box
        align="center"
        direction="row"
        gap="xsmall"
        pad={{ vertical: 'xsmall', horizontal: 'small' }}
        margin="xsmall"
        background="brand"
        round="large"
      >
        <Text size="small">{season}</Text>
        <Box round="full" margin={{ left: 'xsmall' }}>
          <FormClose size="small" style={{ width: '12px', height: '12px' }} />
        </Box>
      </Box>
    </Button>
  );

  const renderOption = (option, state) => (
    <Box pad="small" background={state.active ? 'active' : undefined}>
      {option}
    </Box>
  );

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="center">
      <Select
        closeOnChange={false}
        multiple
        value={
          <Box wrap direction="row" width="small">
            {selected && selected.length ? (
              selected.map((index) => renderSeason(allSeasons[index]))
            ) : (
              <Box
                pad={{ vertical: 'xsmall', horizontal: 'small' }}
                margin="xsmall"
              >
                Select Season
              </Box>
            )}
          </Box>
        }
        options={allSeasons}
        selected={selected}
        disabled={[2, 6]}
        onChange={({ selected: nextSelected }) => {
          setSelected([...nextSelected].sort());
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
