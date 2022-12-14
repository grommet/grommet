import React, { useContext } from 'react';
import { Search } from 'grommet-icons/icons/Search';
import { DataForm } from '../Data';
import { FormContext } from '../Form/FormContext';
import { TextInput } from '../TextInput';
import { DataSearchPropTypes } from './propTypes';

export const DataSearch = ({ ...rest }) => {
  const { id: dataId, noForm } = useContext(FormContext);

  let content = (
    <TextInput
      aria-label="search"
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
