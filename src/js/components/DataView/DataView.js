import React, { useContext, useEffect } from 'react';
import { DataForm } from '../Data/DataForm';
import { DataContext } from '../../contexts/DataContext';
import { FormContext } from '../Form/FormContext';
import { FormField } from '../FormField';
import { RadioButtonGroup } from '../RadioButtonGroup';
import { Select } from '../Select';
import { MessageContext } from '../../contexts/MessageContext';
import { DataViewPropTypes } from './propTypes';

export const DataView = ({ id: idProp, ...rest }) => {
  const {
    id: dataId,
    messages,
    view,
    views,
    addToolbarKey,
  } = useContext(DataContext);
  const { noForm } = useContext(FormContext);
  const { format } = useContext(MessageContext);
  const id = idProp || `${dataId}--view`;

  useEffect(() => {
    if (noForm) addToolbarKey('_view');
  }, [addToolbarKey, noForm]);

  if (!views) return null;

  const names = views.map((v) => v.name);

  let content;

  if (!noForm && names.length < 7) {
    content = (
      <RadioButtonGroup
        id={id}
        name="_view"
        options={names}
        value={view?.name}
        {...rest}
      />
    );
  } else {
    content = (
      <Select
        id={id}
        name="_view"
        showSelectedInline
        placeholder={noForm ? 'Select view' : undefined}
        options={names}
        value={view?.name}
        {...rest}
      />
    );
  }

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
          id: 'dataView.label',
          messages: messages?.dataView,
        })}
      >
        {content}
      </FormField>
    );

  return content;
};

DataView.propTypes = DataViewPropTypes;
