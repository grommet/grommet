import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { FormClose } from 'grommet-icons';

import { Box, Button, Grommet, Select, Text } from 'grommet';
import { grommet } from 'grommet/themes';

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

const SeasonsSelect = () => {
  const [selected, setSelected] = useState([]);

  const onRemoveSeason = season => {
    const seasonIndex = allSeasons.indexOf(season);
    setSelected(
      selected.filter(selectedSeason => selectedSeason !== seasonIndex),
    );
  };

  const renderSeason = season => (
    <Button
      key={`season_tag_${season}`}
      href="#"
      onClick={event => {
        event.preventDefault();
        event.stopPropagation();
        onRemoveSeason(season);
      }}
      onFocus={event => event.stopPropagation()}
    >
      <Box
        align="center"
        direction="row"
        gap="xsmall"
        pad={{ vertical: 'xsmall', horizontal: 'small' }}
        margin="xsmall"
        background="accent-1"
        round="large"
      >
        <Text size="small" color="white">
          {season}
        </Text>
        <Box background="white" round="full" margin={{ left: 'xsmall' }}>
          <FormClose
            color="accent-1"
            size="small"
            style={{ width: '12px', height: '12px' }}
          />
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
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="center">
        <Select
          closeOnChange={false}
          multiple
          value={
            <Box wrap direction="row" width="small">
              {selected && selected.length ? (
                selected.map(index => renderSeason(allSeasons[index]))
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
    </Grommet>
  );
};

storiesOf('Select', module).add('Seasons', () => <SeasonsSelect />);
