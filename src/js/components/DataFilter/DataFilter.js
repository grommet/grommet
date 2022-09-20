import React, { useContext, useMemo } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { FormField } from '../FormField';
import { CheckBoxGroup } from '../CheckBoxGroup';
import { SelectMultiple } from '../SelectMultiple';
import { DataFilterPropTypes } from './propTypes';

export const DataFilter = ({
  children,
  options: optionsProp,
  property,
  ...rest
}) => {
  const { unfilteredData } = useContext(DataContext);

  const options = useMemo(() => {
    if (children) return []; // caller driving
    if (optionsProp) return optionsProp; // caller setting

    // generate options from all values detected for property
    return Array.from(new Set(unfilteredData.map((d) => d[property])))
      .filter((v) => v)
      .sort();
  }, [children, optionsProp, property, unfilteredData]);

  // TODO: other kinds of input, e.g. RangeInput
  let content = children;
  if (!content) {
    if (options.length < 7) {
      content = (
        <CheckBoxGroup
          name={property}
          options={options}
        />
      );
    } else {
      content = (
        <SelectMultiple
          name={property}
          showSelectedInline
          options={options}
        />
      );
    }
  }

  return (
    <FormField name={property} label={property} {...rest}>
      {content}
    </FormField>
  );
};

DataFilter.propTypes = DataFilterPropTypes;
