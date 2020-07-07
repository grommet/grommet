import React, { useContext, useCallback } from 'react';
import { ThemeContext } from 'styled-components';
import { TextArea } from '../TextArea';

import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';
import CustomSelectedList from './CustomSelectedList';

const CustomMultiSelect = ({
  value,
  onValueChange,
  renderSearch,
  placeholder,
  renderEmptySelected,
  width,
  custom,
  incExcVal,
  setIncExcVal,
}) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  const [textAreaValue, setTextAreaValue] = React.useState('');

  const setItems = isIncExc => {
    if (textAreaValue.length) {
      const textValues = textAreaValue.trim().split('\n');
      setIncExcVal(isIncExc);
      onValueChange([...value, ...textValues]);
      setTextAreaValue('');
    }
  };

  const removeItem = useCallback(
    item => {
      const lists = [...value];
      const index = lists.indexOf(item);
      lists.splice(index, 1);
      onValueChange([...lists]);
      if (!lists.length) setIncExcVal(null);
    },
    [value, onValueChange, setIncExcVal],
  );

  const clearAll = () => {
    setIncExcVal(null);
    onValueChange([]);
  };

  return (
    <Box {...theme.multiselect.custom.wrapper}>
      <Box {...theme.multiselect.custom.textAreaWrap} width={width}>
        <Text {...theme.multiselect.custom.label}>
          {(custom && custom.label) || 'Label'}
        </Text>
        <Box {...theme.multiselect.custom.textAreaContainer}>
          <TextArea
            value={textAreaValue}
            onChange={event => setTextAreaValue(event.target.value)}
            fill
          />
        </Box>
        <Box {...theme.multiselect.custom.actions.wrapper}>
          {(incExcVal || incExcVal === null) && (
            <Button primary onClick={() => setItems(true)}>
              <Box {...theme.multiselect.custom.actions.button}>
                <Text weight={600}>INCLUDE</Text>
              </Box>
            </Button>
          )}
          {(incExcVal === false || incExcVal === null) && (
            <Button secondary onClick={() => setItems(false)}>
              <Box {...theme.multiselect.custom.actions.button}>
                <Text weight={600}>EXCLUDE</Text>
              </Box>
            </Button>
          )}
        </Box>
      </Box>
      <Box width={width}>
        <CustomSelectedList
          selectedItems={value}
          incExcVal={incExcVal}
          renderSearch={renderSearch}
          searchPlaceholder={placeholder}
          onRemove={removeItem}
          clearAll={clearAll}
          renderEmptySelected={renderEmptySelected}
          width={width}
        />
      </Box>
    </Box>
  );
};

export { CustomMultiSelect };
