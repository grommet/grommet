import React, { Component } from 'react';
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

class SeasonsSelect extends Component {
  state = { selected: [] };

  onRemoveSeason = season => {
    const { selected } = this.state;
    const nextSelected = [...selected];
    nextSelected.splice(nextSelected.indexOf(allSeasons.indexOf(season)), 1);
    this.setState({ selected: nextSelected });
  };

  renderSeason = season => (
    <Button
      key={`season_tag_${season}`}
      href="#"
      onClick={event => {
        event.preventDefault();
        event.stopPropagation();
        this.onRemoveSeason(season);
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

  renderOption = (option, index, options, state) => (
    <Box pad="small" background={state.active ? 'active' : undefined}>
      {option}
    </Box>
  );

  render() {
    const { selected } = this.state;
    return (
      <Grommet full theme={grommet}>
        <Box fill align="center" justify="center">
          <Select
            closeOnChange={false}
            multiple
            value={
              <Box wrap direction="row" width="small">
                {selected && selected.length ? (
                  selected.map(index => this.renderSeason(allSeasons[index]))
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
              this.setState({ selected: nextSelected.sort() });
            }}
          >
            {this.renderOption}
          </Select>
        </Box>
      </Grommet>
    );
  }
}

storiesOf('Select', module).add('Seasons', () => <SeasonsSelect />);
