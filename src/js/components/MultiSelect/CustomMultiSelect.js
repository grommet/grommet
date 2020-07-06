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
}) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  const { isInclude, values } = value;
  const [textAreaValue, setTextAreaValue] = React.useState('');

  const setItems = isInclude => {
    if (textAreaValue.length) {
      const textValues = textAreaValue.trim().split('\n');
      onValueChange({
        ...value,
        isInclude,
        values: [...values, ...textValues],
      });
      setTextAreaValue('');
    }
  };

  const removeItem = useCallback(
    item => {
      const lists = [...values];
      const index = lists.indexOf(item);
      lists.splice(index, 1);
      if (!lists.length) {
        onValueChange({ ...value, isInclude: null, values: [...lists] });
        return;
      }
      onValueChange({ ...value, values: [...lists] });
    },
    [value, values, onValueChange],
  );

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
          {(isInclude || isInclude === null) && (
            <Button primary onClick={() => setItems(true)}>
              <Box {...theme.multiselect.custom.actions.button}>
                <Text weight={600}>INCLUDE</Text>
              </Box>
            </Button>
          )}
          {(isInclude === false || isInclude === null) && (
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
          selectedItems={values}
          isInclude={isInclude}
          onValueChange={onValueChange}
          renderSearch={renderSearch}
          searchPlaceholder={placeholder}
          onRemove={removeItem}
          renderEmptySelected={renderEmptySelected}
          width={width}
        />
      </Box>
    </Box>
  );
};

export { CustomMultiSelect };
