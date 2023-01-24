import React, { useContext, useMemo } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { FormField } from '../FormField';
import { CheckBoxGroup } from '../CheckBoxGroup';
import { RangeSelector } from '../RangeSelector';
import { SelectMultiple } from '../SelectMultiple';
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

const booleanOptions = [
  { label: 'true', value: true },
  { label: 'false', value: false },
];

export const DataFilter = ({
  children,
  options: optionsProp,
  property,
  range: rangeProp,
  ...rest
}) => {
  const {
    data,
    id: dataId,
    properties,
    unfilteredData,
  } = useContext(DataContext);

  const options = useMemo(() => {
    if (children) return undefined; // caller driving
    if (optionsProp) return optionsProp; // caller setting
    // Data properties setting
    if (properties?.[property]?.options) return properties[property].options;
    // skip if we have a range
    if (rangeProp || properties?.[property]?.range) return undefined;

    // generate options from all values for property
    const uniqueValues = generateOptions(unfilteredData || data, property);
    // if any values aren't numeric, treat as options
    if (uniqueValues.some((v) => v && typeof v !== 'number'))
      return uniqueValues;
    // if all values are numeric, let range take care of it
    return undefined;
  }, [
    children,
    data,
    optionsProp,
    properties,
    property,
    rangeProp,
    unfilteredData,
  ]);

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
    const uniqueValues = generateOptions(
      unfilteredData || data,
      property,
    ).sort();
    // normalize to make it friendler, so [1.3, 4.895] becomes [1, 5]
    const delta = uniqueValues[uniqueValues.length - 1] - uniqueValues[0];
    const interval = Number.parseFloat((delta / 3).toPrecision(1));
    const min = alignMin(uniqueValues[0], interval);
    const max = alignMax(uniqueValues[uniqueValues.length - 1], interval);
    return [min, max];
  }, [
    children,
    data,
    options,
    properties,
    property,
    rangeProp,
    unfilteredData,
  ]);

  const id = `${dataId}-${property}`;

  let content = children;
  if (!content) {
    if (range) {
      content = (
        <RangeSelector
          id={id}
          name={`${property}._range`}
          defaultValues={range}
          label
          min={range[0]}
          max={range[1]}
          step={(range[1] - range[0]) / 20}
          size="full"
          round="small"
        />
      );
    } else if (
      options.length === 2 &&
      options[1] === true &&
      options[0] === false
    ) {
      // special case boolean properties
      content = (
        <CheckBoxGroup id={id} name={property} options={booleanOptions} />
      );
    } else if (options.length < 7) {
      content = <CheckBoxGroup id={id} name={property} options={options} />;
    } else {
      content = (
        <SelectMultiple
          id={id}
          name={property}
          showSelectedInline
          options={options}
        />
      );
    }
  }

  return (
    <FormField
      htmlFor={id}
      name={property}
      label={properties?.[property]?.label || property}
      {...rest}
    >
      {content}
    </FormField>
  );
};

DataFilter.propTypes = DataFilterPropTypes;
