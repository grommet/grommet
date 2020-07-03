import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Close } from 'grommet-icons/icons/Close';
import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';
import { Searchbox } from './Searchbox';

const SelectedList = ({
  selectedItems,
  isInclude,
  onValueChange,
  renderSearch,
  searchPlaceholder,
  onRemove,
}) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  const [search, setSearch] = React.useState('');

  const filteredItems = selectedItems.filter(val => val.includes(search));

  return (
    <Box width={{ min: 'medium' }}>
      {selectedItems.length ? (
        <Box>
          <Box
            background="#F8FAFE"
            direction="row"
            justify="between"
            pad={{ vertical: 'medium', horizontal: 'large' }}
          >
            <Text weight={600}>
              {isInclude ? 'Included List' : 'Excluded List'}
            </Text>
            <Button
              onClick={() => onValueChange({ isInclude: null, items: [] })}
            >
              <Text weight={600} size="small">
                CLEAR ALL
              </Text>
            </Button>
          </Box>
          {renderSearch && (
            <Searchbox
              placeholder={searchPlaceholder}
              value={search}
              onValueChange={val => setSearch(val)}
            />
          )}
          {filteredItems.map((val, id) => (
            <Box
              key={`${id}-${val}`}
              direction="row"
              align="center"
              pad={{ vertical: 'medium', horizontal: 'large' }}
              justify="between"
              border={{ side: 'bottom', color: 'light-4' }}
            >
              <Text color={isInclude ? 'accent-1' : 'brand'}>{val}</Text>
              <Button onClick={() => onRemove(val)}>
                <Close size="small" />
              </Button>
            </Box>
          ))}
        </Box>
      ) : (
        <Box align="center" justify="center" fill>
          <Text>No domains selected</Text>
        </Box>
      )}
    </Box>
  );
};

export default React.memo(SelectedList);
