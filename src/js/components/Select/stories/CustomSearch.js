import React, { useRef, useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';

import { FormClose } from 'grommet-icons';

import { Box, Button, CheckBox, Grommet, Select, Text } from 'grommet';

import { theme as customSearchTheme } from './theme';
import { SearchInputContext } from './components/SearchInputContext';

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

const CustomSearchSelect = () => {
  const [selectedContentPartners, setSelectedContentPartners] = useState([]);
  const [contentPartners, setContentPartners] = useState(allContentPartners);
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSerchQuery] = useState('');

  const selectRef = useRef();

  const clearContentPartners = () => {
    setSelectedContentPartners([]);
  };

  useEffect(() => {
    const filterContentPartners = allContentPartners.filter(
      s => s.name.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0,
    );

    setTimeout(() => {
      setSearching(false);
      setContentPartners(filterContentPartners);
    }, 500);
  }, [searching, searchQuery]);

  const renderOption = ({ name }) => (
    <Box direction="row" align="center" pad="small" flex={false}>
      <CheckBox
        tabIndex="-1"
        checked={selectedContentPartners.some(partner => partner.name === name)}
        label={<Text size="small">{name}</Text>}
        onChange={() => {}}
      />
    </Box>
  );

  const renderContentPartners = () => (
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
          clearContentPartners();
          selectRef.current.focus();
        }}
      >
        <Box background="gray" round="full">
          <FormClose style={{ width: '12px', height: '12px' }} />
        </Box>
      </Button>
    </Box>
  );

  const sortContentPartners = selectedPartnerNames => {
    return (p1, p2) => {
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
    };
  };

  return (
    <Grommet full theme={customSearchTheme}>
      <Box fill align="center" justify="center" width="medium">
        <SearchInputContext.Provider value={{ searching }}>
          <Select
            ref={selectRef}
            closeOnChange={false}
            placeholder="Select Content Partners"
            searchPlaceholder="Search Content Partners"
            emptySearchMessage="No partners found"
            multiple
            value={
              selectedContentPartners.length
                ? renderContentPartners()
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
              const sortedContentPartners = [...allContentPartners].sort(
                sortContentPartners(selectedPartnerNames),
              );
              setSelectedContentPartners(newSelectedPartners);
              setContentPartners(sortedContentPartners);
            }}
            onSearch={query => {
              setSearching(true);
              setSerchQuery(query);
            }}
          >
            {renderOption}
          </Select>
        </SearchInputContext.Provider>
      </Box>
    </Grommet>
  );
};

storiesOf('Select', module).add('Custom Search', () => <CustomSearchSelect />);
