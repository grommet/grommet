import React, { useContext, useMemo, useState } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { DataForm } from '../Data/DataForm';
import { FormContext } from '../Form/FormContext';
import { FormField } from '../FormField';
import { CheckBoxGroup } from '../CheckBoxGroup';
import { RangeSelector } from '../RangeSelector';
import { SelectMultiple } from '../SelectMultiple';
import { DataFilterPropTypes } from './propTypes';
import { getDecimalCount } from '../RangeSelector/RangeSelector';

// empirical constants for when we change inputs
const maxCheckBoxGroupOptions = 4;
const minSelectSearchOptions = 10;
const defaultRangeSteps = 20;

const getValueAt = (valueObject, pathArg) => {
  if (valueObject === undefined) return undefined;
  const path = Array.isArray(pathArg) ? pathArg : pathArg.split('.');
  if (path.length === 1) return valueObject[path];
  return getValueAt(valueObject[path.shift()], path);
};

const generateOptions = (data, property) =>
  Array.from(new Set(data.map((d) => getValueAt(d, property))))
    .filter((v) => v !== undefined && v !== '')
    // ensure number values are sorted appropriately
    // [132, 15, 100] --> [15, 100, 132]
    // empty sort() would result in [100, 132, 15]
    .sort((a, b) => {
      if (typeof a === 'number' && typeof b === 'number') return a - b;
      if (
        (typeof a === 'string' && typeof b === 'string') ||
        (typeof a === 'boolean' && typeof b === 'boolean')
      )
        return a < b ? -1 : 1;
      return 0;
    });

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

const numberToPrecision = (number, precision = 1) =>
  Number.parseFloat(number.toPrecision(precision));

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
  const { noForm } = useContext(FormContext);
  const [searchText, setSearchText] = useState('');

  const [options, range] = useMemo(() => {
    if (children) return [undefined, undefined]; // caller driving

    const optionsIn = optionsProp || properties?.[property]?.options;
    const rangeIn = rangeProp || properties?.[property]?.range;
    if (optionsIn) return [optionsIn, undefined];
    if (rangeIn && 'min' in rangeIn && 'max' in rangeIn)
      return [undefined, [rangeIn.min, rangeIn.max]];

    // generate options from all values for property
    const uniqueValues = generateOptions(unfilteredData || data, property);
    // if less than two values, nothing to filter
    if (uniqueValues.length < 2) return [undefined, undefined];
    // if any values aren't numeric, treat as options
    if (uniqueValues.some((v) => v !== undefined && typeof v !== 'number'))
      return [uniqueValues, undefined];
    // all values are numeric, treat as range
    const delta = uniqueValues[uniqueValues.length - 1] - uniqueValues[0];
    const interval = numberToPrecision(delta / 3);
    let min = uniqueValues[0];
    let max = uniqueValues[uniqueValues.length - 1];
    // normalize to make it friendler, so [1.3, 4.895] becomes [1, 5]
    if (getDecimalCount(min) > 0 || getDecimalCount(max) > 0) {
      // capping to precision of 3 is a reasonable default to avoid
      // excessive decimal points
      min = numberToPrecision(alignMin(min, interval), 3);
      max = numberToPrecision(alignMax(max, interval), 3);
    }

    return [undefined, [min, max]];
  }, [
    children,
    data,
    optionsProp,
    properties,
    property,
    rangeProp,
    unfilteredData,
  ]);

  const searchedOptions = useMemo(() => {
    if (!searchText) return options;
    // The line below escapes regular expression special characters:
    // [ \ ^ $ . | ? * + ( )
    const escapedText = searchText.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    // Create the regular expression with modified value which
    // handles escaping special characters. Without escaping special
    // characters, errors will appear in the console
    const exp = new RegExp(escapedText, 'i');
    return options.filter((o) =>
      typeof o === 'string' ? exp.test(o) : exp.test(o.label),
    );
  }, [options, searchText]);

  const id = `${dataId}-${property}`;

  let content = children;
  if (!content) {
    if (range) {
      let step = // from `range` on DataFilter
        rangeProp?.step ||
        // from range in Data `properties`
        properties?.[property]?.range?.step;

      if (!step) {
        // avoid floating point issues where 4.4 - 2 returns 2.4000000000000004
        // and instead return 2.4 by doing calculations in integers then
        // restore order of magnitude
        const multiplicationFactor =
          10 ** Math.max(getDecimalCount(range[1]), getDecimalCount(range[0]));
        const delta =
          (range[1] * multiplicationFactor - range[0] * multiplicationFactor) /
          multiplicationFactor;
        // avoid floating point issues where
        // 0.012 / 20 returns 0.0006000000000000001
        // and instead return 0.0006
        // or 2.8 / 20 returns 0.13999999999999999
        // and istead return 0.14
        const decimalCount = getDecimalCount(delta);
        if (decimalCount) {
          const multiplier = 10 ** decimalCount;
          step = (multiplier * delta) / (multiplier * defaultRangeSteps);
        } else step = delta / defaultRangeSteps;
      }

      content = (
        <RangeSelector
          id={id}
          name={`${property}._range`}
          defaultValues={range}
          label
          min={range[0]}
          max={range[1]}
          step={step}
          size="full"
          round="small"
        />
      );
    } else if (options) {
      if (options.length === 2 && options[1] === true && options[0] === false) {
        // special case boolean properties
        content = (
          <CheckBoxGroup id={id} name={property} options={booleanOptions} />
        );
      } else if (options.length <= maxCheckBoxGroupOptions) {
        content = <CheckBoxGroup id={id} name={property} options={options} />;
      } else {
        content = (
          <SelectMultiple
            id={id}
            name={property}
            showSelectedInline
            options={searchedOptions}
            onSearch={
              options.length >= minSelectSearchOptions
                ? setSearchText
                : undefined
            }
            onClose={() => setSearchText('')}
          />
        );
      }
    }
  }

  if (!content) return null;

  if (noForm)
    // likely in Toolbar
    content = (
      <DataForm footer={false} updateOn="change">
        {content}
      </DataForm>
    );
  else
    content = (
      <FormField
        htmlFor={id}
        name={property}
        label={properties?.[property]?.label || property}
        {...rest}
      >
        {content}
      </FormField>
    );

  return content;
};

DataFilter.propTypes = DataFilterPropTypes;
