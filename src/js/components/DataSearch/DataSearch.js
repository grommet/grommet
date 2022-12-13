import React, { useContext } from 'react';
import { Search } from 'grommet-icons/icons/Search';
import { DataForm } from '../Data';
import { FormContext } from '../Form/FormContext';
import { TextInput } from '../TextInput';
import { DataSearchPropTypes } from './propTypes';

export const DataSearch = ({ ...rest }) => {
  const { noForm } = useContext(FormContext);

  // TODO: Consider <Data name="X" /> such that the aria-label below
  // could become "search users".
  let content = (
    <TextInput
      aria-label="search"
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
