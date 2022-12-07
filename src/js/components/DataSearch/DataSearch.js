import React, { useContext, useEffect } from 'react';
import { Search } from 'grommet-icons/icons/Search';
import { DataForm } from '../Data';
import { FormContext } from '../Form/FormContext';
import { TextInput } from '../TextInput';
import { DataContext } from '../../contexts/DataContext';
import { DataSearchPropTypes } from './propTypes';

export const DataSearch = ({ property, ...rest }) => {
  const { setSearchProperty } = useContext(DataContext);
  const { noForm } = useContext(FormContext);
  useEffect(() => {
    if (property) setSearchProperty(property);
  }, [property, setSearchProperty]);

  let content = (
    <TextInput name="_search" icon={<Search />} type="search" {...rest} />
  );

  if (noForm) content = <DataForm footer={false}>{content}</DataForm>;

  return content;
};

DataSearch.propTypes = DataSearchPropTypes;
