import React, { useContext, useMemo, useState } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { Box } from '../Box';
import { FormField } from '../FormField';
import { CheckBoxGroup } from '../CheckBoxGroup';
import { RangeSelector } from '../RangeSelector';
import { SelectMultiple } from '../SelectMultiple';
import { Text } from '../Text';
import { DataFilterPropTypes } from './propTypes';

export const DataFilter = ({
  children,
  options: optionsProp,
  property,
  ...rest
}) => {
  const { properties, unfilteredData } = useContext(DataContext);

  const options = useMemo(() => {
    if (children) return []; // caller driving
    if (optionsProp) return optionsProp; // caller setting

    // generate options from all values detected for property
    return Array.from(new Set(unfilteredData.map((d) => d[property])))
      .filter((v) => v)
      .sort();
  }, [children, optionsProp, property, unfilteredData]);

  const [rangeValues, setRangeValues] = useState(() =>
    typeof options[0] === 'number'
      ? [options[0], options[options.length - 1]]
      : undefined,
  );

  let content = children;
  if (!content) {
    if (rangeValues) {
      content = (
        <Box
          direction="row"
          justify="between"
          align="center"
          pad="xsmall"
          gap="small"
        >
          <Text size="small" style={{ fontFamily: 'monospace' }}>
            {rangeValues[0]}
          </Text>
          <RangeSelector
            name={property}
            defaultValues={rangeValues}
            direction="horizontal"
            invert={false}
            min={options[0]}
            max={options[options.length - 1]}
            size="full"
            round="small"
            // values={[options[0], last]}
            onChange={(values) => setRangeValues(values)}
          />
          <Text size="small" style={{ fontFamily: 'monospace' }}>
            {rangeValues[1]}
          </Text>
        </Box>
      );
    } else if (options.length < 7) {
      content = <CheckBoxGroup name={property} options={options} />;
    } else {
      content = (
        <SelectMultiple name={property} showSelectedInline options={options} />
      );
    }
  }

  return (
    <FormField
      name={property}
      label={properties?.[property]?.label || property}
      {...rest}
    >
      {content}
    </FormField>
  );
};

DataFilter.propTypes = DataFilterPropTypes;
