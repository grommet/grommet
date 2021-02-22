import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Search } from 'grommet-icons/icons/Search';

import { defaultProps } from '../../default-props';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { SearchWrapper } from './StyledMultiSelect';

const Searchbox = ({ placeholder, value, onValueChange, layout }) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;

  const handleChange = textValue => {
    if (textValue.replace(/\s/g, '').length || !textValue.length)
      return onValueChange(textValue);
    return null;
  };

  return (
    <SearchWrapper layout={layout} {...theme.multiselect.searchbox.container}>
      <TextInput
        role="search"
        aria-label="multiselect searchbox"
        plain
        value={value}
        valueLabel={<Text>value</Text>}
        onChange={event => handleChange(event.target.value)}
        placeholder={
          <Text {...theme.multiselect.searchbox.placeholder}>
            {value ? '' : placeholder}
          </Text>
        }
      />
      <Search {...theme.multiselect.searchbox.icon} />
    </SearchWrapper>
  );
}

export { Searchbox };
