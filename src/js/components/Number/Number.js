import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { Text } from '../Text';

const Number = ({
  color,
  gap = 'xsmall', // theme someday
  size = 'medium',
  units,
  value,
  weight,
  ...rest
}) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  const { size: themeSize, units: themeUnits, ...valueProps } = {
    ...theme.number,
  };
  valueProps.size = themeSize[size] || size;
  if (color) valueProps.color = color;
  if (weight) valueProps.weight = weight;
  let content = (
    <Text {...valueProps} {...rest}>
      {value}
    </Text>
  );

  if (units) {
    const { size: themeUnitsSize = {}, ...themeUnitsRest } = theme.number.units;
    let unitsProps;
    let unitsLabel;
    if (typeof units === 'object') {
      const { label, size: unitsSize, ...unitsRest } = units;
      unitsLabel = label;
      unitsProps = { ...themeUnitsRest, ...unitsRest, size: unitsSize };
      if (!unitsProps.size)
        unitsProps.size = themeUnitsSize[size] || valueProps.size;
      if (!unitsProps.color) unitsProps.color = valueProps.color;
      if (!unitsProps.weight) unitsProps.weight = valueProps.weight;
    } else {
      unitsLabel = units;
      unitsProps = themeUnitsRest;
      unitsProps.size = themeUnitsSize[size];
      if (!unitsProps.size) unitsProps.size = valueProps.size;
      if (!unitsProps.color) unitsProps.color = valueProps.color;
      if (!unitsProps.weight) unitsProps.weight = valueProps.weight;
    }
    content = (
      <Box direction="row" gap={gap} align="baseline">
        {content}
        <Text {...unitsProps}>{unitsLabel}</Text>
      </Box>
    );
  }

  return content;
};

let NumberDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  NumberDoc = require('./doc').doc(Number);
}
const NumberWrapper = NumberDoc || Number;

export { NumberWrapper as Number };
