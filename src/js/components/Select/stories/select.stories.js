import React, { createRef, Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import { FormClose } from 'grommet-icons';

import { Box, Button, CheckBox, Grommet, Select, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

import { theme as customSearchTheme } from './theme';
import { SearchInputContext } from './components/SearchInputContext';

const customRoundedTheme = deepMerge(grommet, {
  global: {
    control: {
      border: {
        radius: '24px',
      },
    },
    input: {
      weight: 400,
    },
    font: {
      size: '12px',
    },
  },
  text: {
    medium: '13px',
  },
  textInput: {
    extend: 'padding: 0 12px;',
  },
  select: {
    control: {
      extend: 'padding: 3px 6px;',
    },
  },
});

class SimpleSelect extends Component {
  static propTypes = {
    theme: PropTypes.shape({}),
  };

  static defaultProps = {
    theme: undefined,
  };

  state = {
    options: ['one', 'two'],
    value: '',
  };

  render() {
    const { theme } = this.props;
    const { options, value } = this.state;
    return (
      <Grommet full theme={theme || grommet}>
        <Box fill align="center" justify="start" pad="large">
          <Select
            id="select"
            name="select"
            placeholder="Select"
            value={value}
            options={options}
            onChange={({ option }) => this.setState({ value: option })}
          />
        </Box>
      </Grommet>
    );
  }
}

const defaultOptions = [];
const objectOptions = [];
for (let i = 1; i <= 200; i += 1) {
  defaultOptions.push(`option ${i}`);
  objectOptions.push({
    lab: `option ${i}`,
    val: i,
    dis: i % 5 === 0,
    sel: i % 13 === 0,
  });
}

class SearchSelect extends Component {
  state = {
    options: defaultOptions,
    value: '',
  };

  render() {
    const { options, value } = this.state;
    return (
      <Grommet full theme={grommet}>
        <Box fill align="center" justify="start" pad="large">
          <Select
            size="medium"
            placeholder="Select"
            value={value}
            options={options}
            onChange={({ option }) => this.setState({ value: option })}
            onClose={() => this.setState({ options: defaultOptions })}
            onSearch={text => {
              const exp = new RegExp(text, 'i');
              this.setState({
                options: defaultOptions.filter(o => exp.test(o)),
              });
            }}
          />
        </Box>
      </Grommet>
    );
  }
}

class SimpleMultiSelect extends Component {
  state = {
    options: defaultOptions,
    value: '',
  };

  render() {
    const { options, value } = this.state;
    return (
      <Grommet full theme={grommet}>
        <Box fill align="center" justify="start" pad="large">
          <Select
            size="medium"
            placeholder="Select"
            multiple
            value={value}
            options={options}
            onChange={({ value: nextValue }) =>
              this.setState({ value: nextValue })
            }
            onClose={() => this.setState({ options: defaultOptions })}
            onSearch={text => {
              const exp = new RegExp(text, 'i');
              this.setState({
                options: defaultOptions.filter(o => exp.test(o)),
              });
            }}
          />
        </Box>
      </Grommet>
    );
  }
}

class ObjectMultiSelect extends Component {
  state = {
    options: objectOptions,
    value: '',
  };

  render() {
    const { options, value } = this.state;
    return (
      <Grommet full theme={grommet}>
        <Box fill align="center" justify="start" pad="large">
          <Select
            size="medium"
            placeholder="Select"
            multiple
            disabledKey="dis"
            labelKey="lab"
            valueKey="val"
            value={value}
            options={options}
            onChange={({ value: nextValue }) =>
              this.setState({ value: nextValue })
            }
            onClose={() => this.setState({ options: objectOptions })}
            onSearch={text => {
              const exp = new RegExp(text, 'i');
              this.setState({
                options: objectOptions.filter(o => exp.test(o.val)),
              });
            }}
          />
        </Box>
      </Grommet>
    );
  }
}

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

  selectRef = createRef();

  clearContentPartners = () => this.setState({ selectedContentPartners: [] });

  renderOption = ({ name }) => {
    const { selectedContentPartners } = this.state;
    return (
      <Box direction="row" align="center" pad="small" flex={false}>
        <CheckBox
          tabIndex="-1"
          checked={selectedContentPartners.some(
            partner => partner.name === name,
          )}
          label={<Text size="small">{name}</Text>}
          onChange={() => {}}
        />
      </Box>
    );
  };

  renderContentPartners = () => {
    const { selectedContentPartners } = this.state;
    return (
      <Box
        direction="row"
        gap="xsmall"
        pad={{ left: 'small', vertical: 'small' }}
        align="center"
        flex
      >
        <Box
          background="brand"
          round="medium"
          align="center"
          justify="center"
          pad={{ horizontal: 'xsmall' }}
          style={{ minWidth: '21px' }}
        >
          <Text size="small">{selectedContentPartners.length}</Text>
        </Box>
        <Box flex>
          <Text size="small" truncate>
            {selectedContentPartners.map(({ name }) => name).join(', ')}
          </Text>
        </Box>
        <Button
          href="#"
          onFocus={event => event.stopPropagation()}
          onClick={event => {
            event.preventDefault();
            event.stopPropagation();
            this.clearContentPartners();
            this.selectRef.current.focus();
          }}
        >
          <Box background="gray" round="full">
            <Text>hoi</Text>
            <FormClose style={{ width: '12px', height: '12px' }} />
          </Box>
        </Button>
      </Box>
    );
  };

  render() {
    const { contentPartners, searching, selectedContentPartners } = this.state;

    return (
      <Grommet full theme={customSearchTheme}>
        <Box fill align="center" justify="center" width="medium">
          <SearchInputContext.Provider value={{ searching }}>
            <Select
              ref={this.selectRef}
              closeOnChange={false}
              placeholder="Select Content Partners"
              searchPlaceholder="Search Content Partners"
              multiple
              value={
                selectedContentPartners.length
                  ? this.renderContentPartners()
                  : undefined
              }
              selected={selectedContentPartners.map(option =>
                contentPartners.indexOf(option),
              )}
              options={contentPartners}
              onChange={({ option }) => {
                const newSelectedPartners = [...selectedContentPartners];
                const seasonIndex = newSelectedPartners
                  .map(({ name }) => name)
                  .indexOf(option.name);
                if (seasonIndex >= 0) {
                  newSelectedPartners.splice(seasonIndex, 1);
                } else {
                  newSelectedPartners.push(option);
                }
                const selectedPartnerNames = newSelectedPartners.map(
                  ({ name }) => name,
                );
                this.setState({
                  selectedContentPartners: newSelectedPartners,
                  contentPartners: allContentPartners.sort((p1, p2) => {
                    const p1Exists = selectedPartnerNames.includes(p1.name);
                    const p2Exists = selectedPartnerNames.includes(p2.name);

                    if (!p1Exists && p2Exists) {
                      return 1;
                    }
                    if (p1Exists && !p2Exists) {
                      return -1;
                    }
                    if (p1.name.toLowerCase() < p2.name.toLowerCase()) {
                      return -1;
                    }
                    return 1;
                  }),
                });
              }}
              onSearch={query => {
                this.setState({ searching: true }, () => {
                  setTimeout(() => {
                    this.setState({
                      searching: false,
                      contentPartners: allContentPartners.filter(
                        s =>
                          s.name.toLowerCase().indexOf(query.toLowerCase()) >=
                          0,
                      ),
                    });
                  }, 500);
                });
              }}
            >
              {this.renderOption}
            </Select>
          </SearchInputContext.Provider>
        </Box>
      </Grommet>
    );
  }
}

class DarkSelect extends Component {
  state = {
    options: ['one', 'two'],
    value: '',
  };

  render() {
    const { options, value } = this.state;
    return (
      <Grommet full theme={grommet} {...this.props}>
        <Box fill background="dark-1" align="center" justify="center">
          <Select
            placeholder="Select"
            value={value}
            options={options}
            onChange={({ option }) => this.setState({ value: option })}
          />
        </Box>
      </Grommet>
    );
  }
}

class Option extends PureComponent {
  render() {
    const { value, selected } = this.props;
    return (
      <Box direction="row" gap="small" align="center" pad="xsmall">
        <CheckBox tabIndex="-1" checked={selected} onChange={() => {}} />
        {value}
      </Box>
    );
  }
}

const dummyOptions = Array(2000)
  .fill()
  .map((_, i) => `option ${i}`)
  .sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }),
  );

class ManyOptions extends Component {
  state = {
    selected: [],
    options: dummyOptions,
  };

  render() {
    const { options, selected } = this.state;
    return (
      <Grommet full theme={grommet}>
        <Box fill align="center" justify="start" pad="large">
          <Select
            multiple
            closeOnChange={false}
            placeholder="select an option..."
            selected={selected}
            options={options}
            onClose={() =>
              this.setState({
                options: options.sort((p1, p2) => {
                  const p1Exists = selected.includes(p1);
                  const p2Exists = selected.includes(p2);

                  if (!p1Exists && p2Exists) {
                    return 1;
                  }
                  if (p1Exists && !p2Exists) {
                    return -1;
                  }
                  return p1.localeCompare(p2, undefined, {
                    numeric: true,
                    sensitivity: 'base',
                  });
                }),
              })
            }
            onChange={({ selected: nextSelected }) => {
              this.setState({ selected: nextSelected });
            }}
          >
            {(option, index) => (
              <Option
                value={option}
                selected={selected.indexOf(index) !== -1}
              />
            )}
          </Select>
        </Box>
      </Grommet>
    );
  }
}

storiesOf('Select', module)
  .add('Simple', () => <SimpleSelect />)
  .add('Search', () => <SearchSelect />)
  .add('Simple Multiple', () => <SimpleMultiSelect />)
  .add('Object Multiple', () => <ObjectMultiSelect />)
  .add('Seasons', () => <SeasonsSelect />)
  .add('Custom Search', () => <CustomSearchSelect />)
  .add('Dark', () => <DarkSelect />)
  .add('Custom Colors', () => (
    <DarkSelect
      theme={{
        global: { font: { family: 'Arial' } },
        select: { background: '#000000', iconColor: '#d3d3d3' },
      }}
    />
  ))
  .add('Custom Rounded', () => <SimpleSelect theme={customRoundedTheme} />)
  .add('Lots of options', () => <ManyOptions />);
