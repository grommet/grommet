import React, { useContext } from 'react';
import { Search } from 'grommet-icons/icons/Search';
import { DataForm } from '../Data';
import { FormContext } from '../Form/FormContext';
import { TextInput } from '../TextInput';
import { DataSearchPropTypes } from './propTypes';

export const DataSearch = ({ properties, ...rest }) => {
  const { noForm } = useContext(FormContext);

  let content = <TextInput name="_search" icon={<Search />} {...rest} />;

  if (noForm) {
    content = (
      <DataForm footer={false}>
        {content}
      </DataForm>
    );
  }

  return content;
};

DataSearch.propTypes = DataSearchPropTypes;
