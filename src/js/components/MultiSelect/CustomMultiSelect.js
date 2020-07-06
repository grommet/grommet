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
    <Box direction="row">
      <Box border={{ side: 'right' }} pad="large">
        <Text weight={600}>Enter one domain per line</Text>
        <Box width="medium" height="medium" margin={{ vertical: 'medium' }}>
          <TextArea
            value={textAreaValue}
            onChange={event => setTextAreaValue(event.target.value)}
            fill
          />
        </Box>
        <Box direction="row" margin={{ vertical: 'small' }} gap="medium">
          {(isInclude || isInclude === null) && (
            <Button primary onClick={() => setItems(true)}>
              INCLUDE
            </Button>
          )}
          {(isInclude === false || isInclude === null) && (
            <Button secondary color="brand" onClick={() => setItems(false)}>
              EXCLUDE
            </Button>
          )}
        </Box>
      </Box>
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
  );
};

export { CustomMultiSelect };
