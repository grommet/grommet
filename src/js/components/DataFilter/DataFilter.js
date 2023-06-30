import React, { useContext, useMemo, useState } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { DataForm } from '../Data/DataForm';
import { FormContext } from '../Form/FormContext';
import { FormField } from '../FormField';
import { CheckBoxGroup } from '../CheckBoxGroup';
import { RangeSelector } from '../RangeSelector';
import { SelectMultiple } from '../SelectMultiple';
import { DataFilterPropTypes } from './propTypes';

// empirical constants for when we change inputs
const maxCheckBoxGroupOptions = 4;
const minSelectSearchOptions = 10;

const getValueAt = (valueObject, pathArg) => {
  if (valueObject === undefined) return undefined;
  const path = Array.isArray(pathArg) ? pathArg : pathArg.split('.');
  if (path.length === 1) return valueObject[path];
  return getValueAt(valueObject[path.shift()], path);
};

const generateOptions = (data, property) =>
  Array.from(new Set(data.map((d) => getValueAt(d, property))))
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
  const { noForm } = useContext(FormContext);
  const [searchText, setSearchText] = useState('');

  const [options, range] = useMemo(() => {
    if (children) return [undefined, undefined]; // caller driving

    const optionsIn = optionsProp || properties?.[property]?.options;
    const rangeIn = rangeProp || properties?.[property]?.range;
    if (optionsIn) return [optionsIn, undefined];
    if (rangeIn) return [undefined, [rangeIn.min, rangeIn.max]];

    // generate options from all values for property
    const uniqueValues = generateOptions(unfilteredData || data, property);
    // if less than two values, nothing to filter
    if (uniqueValues.length < 2) return [undefined, undefined];
    // if any values aren't numeric, treat as options
    if (uniqueValues.some((v) => v !== undefined && typeof v !== 'number'))
      return [uniqueValues, undefined];
    // all values are numeric, treat as range
    // normalize to make it friendler, so [1.3, 4.895] becomes [1, 5]
    const delta = uniqueValues[uniqueValues.length - 1] - uniqueValues[0];
    const interval = Number.parseFloat((delta / 3).toPrecision(1));
    const min = alignMin(uniqueValues[0], interval);
    const max = alignMax(uniqueValues[uniqueValues.length - 1], interval);
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
