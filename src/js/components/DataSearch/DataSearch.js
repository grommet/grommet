import React, { useContext } from 'react';
import { Search } from 'grommet-icons/icons/Search';
import { DataForm } from '../Data/DataForm';
import { FormContext } from '../Form/FormContext';
import { TextInput } from '../TextInput';
import { MessageContext } from '../../contexts/MessageContext';
import { DataSearchPropTypes } from './propTypes';

export const DataSearch = ({ ...rest }) => {
  const { id: dataId, messages, noForm } = useContext(FormContext);
  const { format } = useContext(MessageContext);

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

  if (noForm) content = <DataForm footer={false}>{content}</DataForm>;

  return content;
};

DataSearch.propTypes = DataSearchPropTypes;
