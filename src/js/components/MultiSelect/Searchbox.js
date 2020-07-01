import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Search } from 'grommet-icons/icons/Search';

import { Box } from '../Box';
import { Text } from '../Text';
import { TextInput } from '../TextInput';

const Searchbox = ({ placeholder, value, onValueChange }) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;

  const handleChange = (textValue) => {
    if (textValue.replace(/\s/g, '').length || !textValue.length)
      return onValueChange(textValue);
    return null;
  };

  return (
    <Box {...theme.multiselect.searchbox.container}>
      <TextInput
        plain
        value={value}
        valueLabel={<Text>value</Text>}
        onChange={(event) => handleChange(event.target.value)}
        placeholder={
          <Text {...theme.multiselect.searchbox.placeholder}>
            {value ? '' : placeholder}
          </Text>
        }
      />
      <Search {...theme.multiselect.searchbox.icon} />
    </Box>
  );
}

export { Searchbox };
