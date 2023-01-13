import React, { useContext } from 'react';
import { Search } from 'grommet-icons/icons/Search';
import { DataForm } from '../Data/DataForm';
import { DataContext } from '../../contexts/DataContext';
import { FormContext } from '../Form/FormContext';
import { useSkeleton } from '../Skeleton';
import { TextInput } from '../TextInput';
import { MessageContext } from '../../contexts/MessageContext';
import { DataSearchPropTypes } from './propTypes';

export const DataSearch = ({ ...rest }) => {
  const skeleton = useSkeleton();
  const { format } = useContext(MessageContext);
  const { updateOn } = useContext(DataContext);
  const { id: dataId, messages, noForm } = useContext(FormContext);
  const addSubmit = noForm && updateOn === 'submit';

  let content = skeleton ? null : (
    <TextInput
      aria-label={format({
        id: 'dataSearch.label',
        messages: messages?.DataSearch,
      })}
      id={`${dataId}--search`}
      name="_search"
      icon={<Search />}
      reverse={addSubmit}
      type="search"
      {...rest}
    />
  );

  if (noForm) {
    content = <DataForm footer={false}>{content}</DataForm>;
  }

  return content;
};

DataSearch.propTypes = DataSearchPropTypes;
