import React, { useContext, useCallback } from 'react';
import { ThemeContext } from 'styled-components';
import { TextArea } from '../TextArea';

import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';
import { FormField } from '../FormField';
import CustomSelectedList from './CustomSelectedList';

const CustomMultiSelect = ({
  value,
  layout,
  onValueChange,
  renderSearch,
  placeholder,
  renderEmptySelected,
  width,
  height,
  custom,
  isExcluded,
  setIncExcVal,
  inclusionExclusion,
  validate,
}) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  const [textAreaValue, setTextAreaValue] = React.useState('');
  const [isValid, setIsValid] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState('');

  const setTextAreaValueFn = value => {
    setIsValid(true);
    setTextAreaValue(value);
  };

  const setItems = isIncExc => {
    const trimedValue = textAreaValue.trim();
    if (trimedValue && trimedValue.length) {
      const textValues = trimedValue.split('\n');
      const filteredValues = textValues.filter(text => text.length);
      const { isValid: isValueValid, errMsg } = validate(filteredValues, value);
      if (validate && isValueValid) {
        setIncExcVal(isIncExc);
        onValueChange([...value, ...filteredValues]);
        setTextAreaValue('');
      } else {
        setErrorMsg(errMsg);
        setIsValid(false);
      }
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
    <Box {...theme.multiselect.custom.wrapper} height={height}>
      <Box {...theme.multiselect.custom.textAreaWrap} width={width}>
        <Text {...theme.multiselect.custom.label}>
          {(custom && custom.label) || 'Label'}
        </Text>
        <Box
          {...theme.multiselect.custom.textAreaContainer}
          width={width}
          style={{ height: '100%' }}
        >
          <FormField error={!isValid ? errorMsg : null}>
            <Box
              width="full"
              style={{
                minHeight: theme.multiselect.custom.textAreaContainer.minHeight,
                overflow: 'auto',
              }}
            >
              <TextArea
                value={textAreaValue}
                onChange={event => setTextAreaValueFn(event.target.value)}
                resize={false}
                fill
              />
            </Box>
          </FormField>
        </Box>
        <Box {...theme.multiselect.custom.actions.wrapper}>
          {(isExcluded === false || isExcluded === null) && (
            <Button primary onClick={() => setItems(false)}>
              <Text weight={600}>INCLUDE</Text>
            </Button>
          )}
          {(isExcluded || isExcluded === null) && (
            <Button secondary color="brand" onClick={() => setItems(true)}>
              <Text weight={600}>EXCLUDE</Text>
            </Button>
          )}
        </Box>
      </Box>
      <Box width={width}>
        <CustomSelectedList
          layout={layout}
          selectedItems={value}
          isExcluded={isExcluded}
          renderSearch={renderSearch}
          searchPlaceholder={placeholder}
          onRemove={removeItem}
          clearAll={clearAll}
          renderEmptySelected={renderEmptySelected}
          width={width}
          height={height}
          inclusionExclusion={inclusionExclusion}
        />
      </Box>
    </Box>
  );
};

export { CustomMultiSelect };
