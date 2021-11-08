import React, { useRef, useState, useEffect } from 'react';

import {
  FormClose,
  CaretDownFill,
  CaretUpFill,
  FormCheckmark,
} from 'grommet-icons';
import { Box, Button, CheckBox, Grommet, Select, Text } from 'grommet';
import { normalizeColor } from '../../../../utils';
import { SearchInput } from '../components/SearchInput';

// https://github.com/grommet/grommet/blob/master/src/js/components/Select/stories/theme.js
const customSearchTheme = {
  global: {
    colors: {
      selected: 'neutral-3',
      border: '#e0e0e0',
      focus: '#2196F3',
      gray: 'rgba(0, 0, 0, 0.54)',
    },
    control: {
      border: {
        radius: '24px',
      },
    },
    drop: {
      background: '#ffffff',
    },
    elevation: {
      light: {
        small: '0 2px 2px 0 rgba(0,0,0,0.19)',
        medium: '0 3px 3px 0 rgba(0,0,0,0.18)',
        large: '0 4px 4px 0 rgba(0,0,0,0.17)',
        xlarge: '0 24px 24px 0 rgba(0, 0, 0, 0.12)',
      },
    },
    font: {
      family: 'Arial',
      size: '12px',
    },
    input: {
      weight: 400,
    },
    size: {
      xxsmall: '24px',
    },
  },
  text: {
    medium: '13px',
  },
  checkBox: {
    border: {
      color: {
        light: 'brand',
      },
      radius: '2px',
    },
    color: {
      light: 'brand',
    },
    check: {
      extend: ({ theme: extendTheme, checked }) => `
        ${
          checked &&
          `background-color: ${normalizeColor('brand', extendTheme)};`
        }
      `,
    },
    hover: {
      border: {
        color: undefined,
      },
    },
    icon: {
      size: '18px',
      extend: 'stroke: white;',
    },
    icons: {
      checked: FormCheckmark,
    },
    gap: 'small',
    size: '18px',
    extend: `
      color: #9C9C9C;
    `,
  },
  drop: {
    maxHeight: '384px',
  },
  select: {
    control: {
      extend: 'padding: 3px 6px;',
      open: {
        background: '#ece0fa',
        border: '1px solid #7D4CDB',
      },
    },
    icons: {
      down: CaretDownFill,
      up: CaretUpFill,
      color: 'dark-1',
      margin: 'small',
    },
    searchInput: SearchInput,
    container: {
      text: {
        size: 'small',
      },
      extend: 'max-height: 250px;',
    },
  },
  textInput: {
    extend: (props) => `
      color: ${normalizeColor('gray', props.theme)};
      font-weight: 400;
      font-size: 13px;
      padding: 14px;
    `,
  },
};

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

export const Search = () => {
  const [selectedContentPartners, setSelectedContentPartners] = useState([]);
  const [contentPartners, setContentPartners] = useState(allContentPartners);
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectRef = useRef();

  const clearContentPartners = () => {
    setSelectedContentPartners([]);
  };

  useEffect(() => {
    const filterContentPartners = allContentPartners.filter(
      (s) => s.name.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0,
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
        checked={selectedContentPartners.some(
          (partner) => partner.name === name,
        )}
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
          {selectedContentPartners.length > 1
            ? 'multiple'
            : selectedContentPartners.map(({ name }) => name)}
        </Text>
      </Box>
      <Button
        href="#"
        onFocus={(event) => event.stopPropagation()}
        onClick={(event) => {
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

  const sortContentPartners = (selectedPartnerNames) => (p1, p2) => {
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

  return (
    <Grommet full theme={customSearchTheme}>
      <Box fill align="center" justify="center" width="medium">
        <Select
          ref={selectRef}
          closeOnChange={false}
          placeholder="Select Content Partners"
          searchPlaceholder="Search Content Partners"
          emptySearchMessage="No partners found"
          searching={searching}
          multiple
          value={
            selectedContentPartners.length ? renderContentPartners() : undefined
          }
          selected={selectedContentPartners.map((option) =>
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
          onSearch={(query) => {
            setSearching(true);
            setSearchQuery(query);
          }}
        >
          {renderOption}
        </Select>
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Input/Select/Custom Themed/Search',
};
