import React, { createRef, Component } from 'react';
import { findDOMNode } from 'react-dom';
import { storiesOf } from '@storybook/react';

import { FormClose } from 'grommet-icons';

import {
  Box,
  Button,
  CheckBox,
  Grommet,
  Select,
  Text,
} from '../../';

import customSearchTheme from './theme';
import SearchInputContext from './components/SearchInputContext';

const DEFAULT_OPTIONS = ['one', 'two', 'three'];

class SearchSelect extends Component {
  state = { options: DEFAULT_OPTIONS }

  render() {
    const { options, value } = this.state;
    return (
      <Grommet>
        <Select
          size='medium'
          placeholder='Select'
          value={value}
          options={options}
          onChange={({ option }) => this.setState({ value: option })}
          onSearch={(text) => {
            const exp = new RegExp(text, 'i');
            this.setState({ options: DEFAULT_OPTIONS.filter(o => exp.test(o)) });
          }}
        />
      </Grommet>
    );
  }
}

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
                    <Box wrap={true} direction='row' style={{ width: '208px' }}>
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

const allContentPartners = [
  {
    name: 'Test Partner',
    id: '32131232',
  },
  {
    name: 'Test Partner 1',
    id: '32131232',
  },
  {
    name: 'Test Partner 2',
    id: '32131242',
  },
  {
    name: 'Test Partner 3',
    id: '32131252',
  },
  {
    name: 'Test Partner 4',
    id: '32131262',
  },
  {
    name: 'Test Partner 5',
    id: '32131272',
  },
  {
    name: 'Test Partner 6',
    id: '32131231',
  },
  {
    name: 'Test Partner 7',
    id: '32131234',
  },
  {
    name: 'Test Partner 8',
    id: '32131245',
  },
  {
    name: 'Test Partner 9',
    id: '32131256',
  },
  {
    name: 'Test Partner 10',
    id: '32131269',
  },
  {
    name: 'Test Partner 11',
    id: '32131244',
  },
];

class CustomSearchSelect extends Component {
  state = {
    contentPartners: allContentPartners,
    selectedContentPartners: [],
    searching: false,
  };

  selectRef = createRef()

  clearContentPartners = () => this.setState({ selectedContentPartners: [] })

  renderOption = ({ name }) => {
    const { selectedContentPartners } = this.state;
    return (
      <Box direction='row' align='center' pad='small' flex={false}>
        <CheckBox
          tabIndex='-1'
          checked={selectedContentPartners.some(
            partner => partner.name === name
          )}
          value={name}
          onChange={() => {}}
        />
        <Text size='small'>{name}</Text>
      </Box>
    );
  }

  renderContentPartners = () => {
    const { selectedContentPartners } = this.state;
    return (
      <Box
        direction='row'
        gap='xsmall'
        pad={{ left: 'small', vertical: 'small' }}
        align='center'
        flex={true}
      >
        <Box
          background='brand'
          round='medium'
          align='center'
          justify='center'
          pad={{ horizontal: 'xsmall' }}
        >
          <Text size='small'>
            {selectedContentPartners.length}
          </Text>
        </Box>
        <Box flex={true}>
          <Text size='small' truncate={true}>
            {selectedContentPartners.map(({ name }) => name).join(', ')}
          </Text>
        </Box>
        <Button
          href='#'
          onFocus={event => event.stopPropagation()}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            this.clearContentPartners();
            findDOMNode(this.selectRef.current).focus();
          }}
        >
          <Box background='gray' round='full'>
            <FormClose style={{ width: '12px', height: '12px' }} />
          </Box>
        </Button>
      </Box>
    );
  }

  render() {
    const {
      contentPartners, searching, selectedContentPartners,
    } = this.state;

    const selectedPartnerNames = selectedContentPartners.map(({ name }) => name);

    return (
      <Grommet theme={customSearchTheme}>
        <Box align='start' width='medium' direction='row'>
          <SearchInputContext.Provider value={{ searching }}>
            <Select
              ref={this.selectRef}
              fill={true}
              closeOnChange={false}
              placeholder='Select Content Partners'
              searchPlaceholder='Search Content Partners'
              multiple={true}
              value={selectedContentPartners.length ? this.renderContentPartners() : undefined}
              options={contentPartners}
              onChange={({ option }) => {
                const newSelectedPartners = [...this.state.selectedContentPartners];
                const seasonIndex = newSelectedPartners.map(
                  ({ name }) => name
                ).indexOf(option.name);
                if (seasonIndex >= 0) {
                  newSelectedPartners.splice(seasonIndex, 1);
                } else {
                  newSelectedPartners.push(option);
                }
                this.setState({ selectedContentPartners: newSelectedPartners });
              }}
              onClose={() => this.setState({
                contentPartners: allContentPartners.sort((p1, p2) => {
                  const p1Exists = selectedPartnerNames.includes(p1.name);
                  const p2Exists = selectedPartnerNames.includes(p2.name);

                  if (!p1Exists && p2Exists) {
                    return 1;
                  } else if (p1Exists && !p2Exists) {
                    return -1;
                  } else if (p1.name.toLowerCase() < p2.name.toLowerCase()) {
                    return -1;
                  }
                  return 1;
                }),
              })}
              onSearch={
                (query) => {
                  this.setState({ searching: true }, () => {
                    setTimeout(() => {
                      this.setState(
                        {
                          searching: false,
                          contentPartners: allContentPartners.filter(
                            s => s.name.toLowerCase().indexOf(query.toLowerCase()) >= 0
                          ),
                        }
                      );
                    }, 500);
                  });
                }
              }
            >
              {this.renderOption}
            </Select>
          </SearchInputContext.Provider>
        </Box>
      </Grommet>
    );
  }
}

storiesOf('Select', module)
  .add('Search Select', () => <SearchSelect />)
  .add('Seasons Select', () => <SeasonsSelect />)
  .add('Custom Search', () => <CustomSearchSelect />);
