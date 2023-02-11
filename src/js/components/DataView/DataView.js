import React, { useContext, useEffect } from 'react';
import { DataForm } from '../Data/DataForm';
import { DataContext } from '../../contexts/DataContext';
import { FormContext } from '../Form/FormContext';
import { FormField } from '../FormField';
import { RadioButtonGroup } from '../RadioButtonGroup';
import { Select } from '../Select';
import { DataViewPropTypes } from './propTypes';

export const DataView = ({ ...rest }) => {
  const { id: dataId, view, views, addToolbarKey } = useContext(DataContext);
  const { noForm } = useContext(FormContext);

  useEffect(() => {
    if (noForm) addToolbarKey('_view');
  }, [addToolbarKey, noForm]);

  if (!views) return null;

  const names = views.map((v) => v.name);

  const id = `${dataId}-view`;
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
        placeholder={noForm ? 'Select view ...' : undefined}
        options={names}
        value={view?.name}
        {...rest}
      />
    );
  }

  if (noForm)
    content = (
      <DataForm footer={false} updateOn="change">
        {content}
      </DataForm>
    );
  else content = <FormField>{content}</FormField>;

  return content;
};

DataView.propTypes = DataViewPropTypes;
