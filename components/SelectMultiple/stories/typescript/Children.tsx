import React, { useState } from 'react';

import { FormClose } from 'grommet-icons';
import { Box, Button, Text } from 'grommet';
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

  const renderSeason = (season) => (
    <Button
      key={`season_tag_${season}`}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onRemoveSeason(season);
      }}
      onFocus={(event) => event.stopPropagation()}
      a11yTitle={season}
    >
      <Box
        align="center"
        direction="row"
        gap="xsmall"
        pad={{ vertical: 'xsmall', horizontal: 'small' }}
        margin="xsmall"
        background="light-3"
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
    <Box fill align="center" pad="large" gap="large">
      <Text>SelectMultiple with custom children</Text>
      <SelectMultiple
        sortSelectedOnClose={false}
        showSelectedInline
        valueLabel={(option) => (
          <Box wrap direction="row" width="small">
            {option && option.length ? (
              <>
                {option.map((i) => {
                  console.log(option);
                  return renderSeason(i);
                })}
              </>
            ) : (
              <Text color="text-weak">Select Season</Text>
            )}
          </Box>
        )}
        options={allSeasons}
        value={selected}
        onChange={({ value }) => {
          setSelected([...value]);
        }}
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
