import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { FormClose } from 'grommet-icons';

import Box from '../Box/Box';
import Button from '../Button/Button';
import Grommet from '../Grommet/Grommet';
import Select from '../Select/Select';
import Text from '../Text/Text';

const allSeasons = ['S01', 'S02', 'S03', 'S04', 'S05', 'S06', 'S07', 'S08', 'S09', 'S10'];

class SeasonsSelect extends Component {
  state = {
    selectedSeasons: [],
  };

  onRemoveSeason = (season) => {
    const { selectedSeasons } = this.state;
    const newSeasons = [...selectedSeasons];
    newSeasons.splice(
      selectedSeasons.indexOf(season), 1
    );
    this.setState({
      selectedSeasons: newSeasons,
    });
  }

  renderSeason = season => (
    <Button
      key={`season_tag_${season}`}
      href='#'
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        this.onRemoveSeason(season);
      }}
      onFocus={event => event.stopPropagation()}
    >
      <Box
        align='center'
        direction='row'
        gap='xsmall'
        pad={{ vertical: 'xsmall', horizontal: 'small' }}
        margin='xsmall'
        background='accent-1'
        round='large'
      >
        <Text size='small' color='white'>{season}</Text>
        <Box background='white' round='full' margin={{ left: 'xsmall' }}>
          <FormClose
            color='accent-1'
            size='small'
            style={{ width: '12px', height: '12px' }}
          />
        </Box>
      </Box>
    </Button>
  );

  renderOption = option => (
    <Box
      pad='small'
      background={
        this.state.selectedSeasons.indexOf(option) >= 0 ? 'active' : undefined
      }
    >
      {option}
    </Box>
  );

  render() {
    const { selectedSeasons } = this.state;
    return (
      <Grommet>
        <Box direction='row'>
          <Box align='start' basis='medium' direction='row'>
            <Select
              size='medium'
              placeholder='Select Season'
              multiple={true}
              value={
                selectedSeasons && selectedSeasons.length
                  ? (
                    <Box wrap={true} direction='row'>
                      {selectedSeasons.map(this.renderSeason)}
                    </Box>
                  )
                  : undefined
              }
              options={allSeasons}
              onChange={({ option }) => {
                const newSelectedSeasons = [...this.state.selectedSeasons];
                const seasonIndex = newSelectedSeasons.indexOf(option);
                if (seasonIndex >= 0) {
                  newSelectedSeasons.splice(seasonIndex, 1);
                } else {
                  newSelectedSeasons.push(option);
                }
                this.setState({ selectedSeasons: newSelectedSeasons.sort() });
              }}
            >
              {this.renderOption}
            </Select>
          </Box>
        </Box>
      </Grommet>
    );
  }
}

storiesOf('Select', module)
  .add('Seasons Select', () => (
    <SeasonsSelect />
  ));
