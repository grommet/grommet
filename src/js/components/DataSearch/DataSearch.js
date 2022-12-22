import React, { useContext, useEffect } from 'react';
import { Search } from 'grommet-icons/icons/Search';
import { DataForm } from '../Data';
import { DataContext } from '../../contexts/DataContext';
import { FormContext } from '../Form/FormContext';
import { TextInput } from '../TextInput';
import { MessageContext } from '../../contexts/MessageContext';
import { DataSearchPropTypes } from './propTypes';

export const DataSearch = ({ ...rest }) => {
  const { id: dataId, messages, addToolbarKey } = useContext(DataContext);
  const { noForm } = useContext(FormContext);
  const { format } = useContext(MessageContext);

  useEffect(() => {
    if (noForm) addToolbarKey('_search');
  }, [addToolbarKey, noForm]);

  let content = (
    <TextInput
      aria-label={format({
        id: 'dataSearch.label',
        messages: messages?.DataSearch,
      })}
      id={`${dataId}--search`}
      name="_search"
      icon={<Search />}
      type="search"
      {...rest}
    />
  );

  if (noForm)
    content = (
      <DataForm footer={false} updateOn="change">
        {content}
      </DataForm>
    );

  return content;
};

DataSearch.propTypes = DataSearchPropTypes;
