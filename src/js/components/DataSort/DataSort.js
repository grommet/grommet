import React, { useContext, useMemo } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { RadioButtonGroup } from '../RadioButtonGroup';
import { DataForm } from '../Data/DataForm';
import { FormContext } from '../Form/FormContext';
import { FormField } from '../FormField';
import { Select } from '../Select';
import { MessageContext } from '../../contexts/MessageContext';
import { DataSortPropTypes } from './propTypes';

export const DataSort = ({ options: optionsArg }) => {
  const { data, id: dataId, messages, properties } = useContext(DataContext);
  const { noForm } = useContext(FormContext);
  const { format } = useContext(MessageContext);

  const options = useMemo(
    () =>
      optionsArg ||
      (properties && Object.keys(properties).sort()) ||
      Object.keys(data[0]).sort(),
    [data, optionsArg, properties],
  );

  const directionOptions = [
    {
      label: format({
        id: 'dataSort.ascending',
        messages: messages?.DataSort,
      }),
      value: 'asc',
    },
    {
      label: format({
        id: 'dataSort.descending',
        messages: messages?.DataSort,
      }),
      value: 'desc',
    },
  ];

  const sortPropertyId = `${dataId}--sort-property`;
  const sortDirectionId = `${dataId}--sort-direction`;

  let content = [
    <FormField
      key="by"
      htmlFor={sortPropertyId}
      label={format({
        id: 'dataSort.by',
        messages: messages?.DataSort,
      })}
    >
      <Select id={sortPropertyId} name="_sort.property" options={options} />
    </FormField>,
    <FormField
      key="dir"
      htmlFor={sortDirectionId}
      label={format({
        id: 'dataSort.direction',
        messages: messages?.DataSort,
      })}
    >
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
