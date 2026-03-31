import React, { useContext, useEffect } from 'react';
import { DataForm } from '../Data/DataForm';
import { DataContext } from '../../contexts/DataContext';
import { DataFormContext } from '../../contexts/DataFormContext';
import { FormField } from '../FormField';
import { Select } from '../Select';
import { MessageContext } from '../../contexts/MessageContext';
import { DataTableGroupByPropTypes } from './propTypes';

export const DataTableGroupBy = ({ id: idProp, options, ...rest }) => {
  const { id: dataId, messages, view, addToolbarKey } = useContext(DataContext);
  const { inDataForm } = useContext(DataFormContext);
  const { format } = useContext(MessageContext);
  const id = idProp || `${dataId}--groupby`;

  useEffect(() => {
    if (!inDataForm) addToolbarKey('_groupBy');
  }, [addToolbarKey, inDataForm]);

  if (!options) return null;

  let content = (
    <Select
      id={id}
      name="_groupBy"
      showSelectedInline
      placeholder={!inDataForm ? 'Group by' : undefined}
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

  if (!inDataForm)
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
