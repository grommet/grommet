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
  const { id: dataId, properties, unfilteredData } = useContext(DataContext);
  const { noForm } = useContext(FormContext);

  const options = useMemo(
    () =>
      optionsArg ||
      (properties && Object.keys(properties).sort()) ||
      Object.keys(unfilteredData[0]).sort(),
    [optionsArg, properties, unfilteredData],
  );

  const sortPropertyId = `${dataId}--sort-property`;
  const sortDirectionId = `${dataId}--sort-direction`;

  let content = [
    <FormField key="by" htmlFor={sortPropertyId} label="Sort by">
      <Select id={sortPropertyId} name="_sort.property" options={options} />
    </FormField>,
    <FormField key="dir" htmlFor={sortDirectionId} label="Sort direction">
      <RadioButtonGroup
        id={sortDirectionId}
        name="_sort.direction"
        options={directionOptions}
      />
    </FormField>,
  ];

  if (noForm) content = <DataForm footer={false}>{content}</DataForm>;

  return content;
};

DataSort.propTypes = DataSortPropTypes;
