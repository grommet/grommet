import React, { useContext, useMemo } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { RadioButtonGroup } from '../RadioButtonGroup';
import { DataForm } from '../Data';
import { FormContext } from '../Form/FormContext';
import { FormField } from '../FormField';
import { Select } from '../Select';
import { DataSortPropTypes } from './propTypes';

const directionOptions = [
  { label: 'Ascending', value: 'asc' },
  { label: 'Descending', value: 'desc' },
];

export const DataSort = ({ options: optionsArg }) => {
  const { properties, unfilteredData } = useContext(DataContext);
  const { noForm } = useContext(FormContext);

  const options = useMemo(
    () =>
      optionsArg ||
      (properties && Object.keys(properties).sort()) ||
      Object.keys(unfilteredData[0]).sort(),
    [optionsArg, properties, unfilteredData],
  );

  let content = [
    <FormField key="by" label="Sort by">
      <Select name="_sort.property" options={options} />
    </FormField>,
    <FormField key="dir" label="Sort direction">
      <RadioButtonGroup name="_sort.direction" options={directionOptions} />
    </FormField>,
  ];

  if (noForm) content = <DataForm footer={false}>{content}</DataForm>;

  return content;
};

DataSort.propTypes = DataSortPropTypes;
