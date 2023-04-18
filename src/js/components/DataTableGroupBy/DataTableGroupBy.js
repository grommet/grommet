import React, { useContext, useEffect } from 'react';
import { DataForm } from '../Data/DataForm';
import { DataContext } from '../../contexts/DataContext';
import { FormContext } from '../Form/FormContext';
import { FormField } from '../FormField';
import { Select } from '../Select';
import { MessageContext } from '../../contexts/MessageContext';
import { DataTableGroupByPropTypes } from './propTypes';

export const DataTableGroupBy = ({ id: idProp, options, ...rest }) => {
  const { id: dataId, messages, view, addToolbarKey } = useContext(DataContext);
  const { noForm } = useContext(FormContext);
  const { format } = useContext(MessageContext);
  const id = idProp || `${dataId}--groupby`;

  useEffect(() => {
    if (noForm) addToolbarKey('_groupBy');
  }, [addToolbarKey, noForm]);

  if (!options) return null;

  let content = (
    <Select
      id={id}
      name="_groupBy"
      showSelectedInline
      placeholder={noForm ? 'Group by' : undefined}
      options={options}
      labelKey="label"
      clear={
        view?.groupBy
          ? {
              position: 'top',
              label: format({
                id: 'dataTableGroupBy.clear',
                messages: messages?.dataTableGroupBy,
              }),
            }
          : undefined
      }
      value={view?.groupBy}
      {...rest}
    />
  );

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
        label={format({
          id: 'dataTableGroupBy.label',
          messages: messages?.dataTableGroupBy,
        })}
      >
        {content}
      </FormField>
    );

  return content;
};

DataTableGroupBy.propTypes = DataTableGroupByPropTypes;
