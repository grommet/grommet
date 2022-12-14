import React, { useContext, useMemo, useRef, useState } from 'react';
import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';
import { DataContext } from '../../contexts/DataContext';
import { Box } from '../Box';
import { FormField } from '../FormField';
import { CheckBoxGroup } from '../CheckBoxGroup';
import { RangeSelector } from '../RangeSelector';
import { SelectMultiple } from '../SelectMultiple';
import { Text } from '../Text';
import { DataFilterPropTypes } from './propTypes';

const generateOptions = (data, property) =>
  Array.from(new Set(data.map((d) => d[property])))
    .filter((v) => v !== undefined && v !== '')
    .sort();

const alignMax = (value, interval) => {
  if (value > 0) return value - (value % interval) + interval;
  if (value < 0) return value + (value % interval);
  return value;
};

const alignMin = (value, interval) => {
  if (value > 0) return value - (value % interval);
  if (value < 0) return value - (value % interval) - interval;
  return value;
};

export const DataFilter = ({
  children,
  options: optionsProp,
  property,
  range: rangeProp,
  ...rest
}) => {
  const { properties, unfilteredData, view } = useContext(DataContext);
  const maxRef = useRef();
  const minRef = useRef();

  const options = useMemo(() => {
    if (children) return undefined; // caller driving
    if (optionsProp) return optionsProp; // caller setting
    // Data properties setting
    if (properties?.[property]?.options) return properties[property].options;
    // skip if we have a range
    if (rangeProp || properties?.[property]?.range) return undefined;

    // generate options from all values for property
    const uniqueValues = generateOptions(unfilteredData, property);
    // if any values aren't numeric, treat as options
    if (uniqueValues.some((v) => v && typeof v !== 'number'))
      return uniqueValues;
    // if all values are numeric, let range take care of it
    return undefined;
  }, [children, optionsProp, properties, property, rangeProp, unfilteredData]);

  const range = useMemo(() => {
    if (children) return undefined; // caller driving
    if (rangeProp) return rangeProp; // caller setting
    // Data properties setting
    if (properties?.[property]?.range) {
      const { min, max } = properties[property].range;
      return [min, max];
    }
    // skip if we have options
    if (options) return undefined;

    // generate range from all values for the property
    const uniqueValues = generateOptions(unfilteredData, property).sort();
    // normalize to make it friendler, so [1.3, 4.895] becomes [1, 5]
    const delta = uniqueValues[uniqueValues.length - 1] - uniqueValues[0];
    const interval = Number.parseFloat((delta / 3).toPrecision(1));
    const min = alignMin(uniqueValues[0], interval);
    const max = alignMax(uniqueValues[uniqueValues.length - 1], interval);
    return [min, max];
  }, [children, options, properties, property, rangeProp, unfilteredData]);

  // track range values so we can display them
  const [rangeValues, setRangeValues] = useState(() => {
    if (!range) return undefined;
    const { min, max } = view?.properties?.[property] || {};
    return [min || range[0], max || range[1]];
  }, [range, view]);

  // keep the text values size consistent
  useLayoutEffect(() => {
    if (maxRef.current && minRef.current) {
      const width = Math.max(
        maxRef.current.getBoundingClientRect().width,
        minRef.current.getBoundingClientRect().width,
      );
      maxRef.current.style.width = `${width}px`;
      minRef.current.style.width = `${width}px`;
    }
  });

  let content = children;
  if (!content) {
    if (range) {
      content = (
        <Box
          direction="row"
          justify="between"
          align="center"
          pad="xsmall"
          gap="small"
        >
          <Text ref={minRef} size="small" style={{ fontFamily: 'monospace' }}>
            {rangeValues[0]}
          </Text>
          <RangeSelector
            name={`${property}._range`}
            defaultValues={range}
            direction="horizontal"
            invert={false}
            min={range[0]}
            max={range[1]}
            step={(range[1] - range[0]) / 20}
            size="full"
            round="small"
            onChange={setRangeValues}
          />
          <Text ref={maxRef} size="small" style={{ fontFamily: 'monospace' }}>
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
