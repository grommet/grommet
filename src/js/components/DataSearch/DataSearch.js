import React from 'react';
import { Search } from 'grommet-icons/icons/Search';
import { TextInput } from '../TextInput';
import { DataSearchPropTypes } from './propTypes';

export const DataSearch = ({ properties, ...rest }) => (
  <TextInput name="_search" icon={<Search />} {...rest} />
);

DataSearch.propTypes = DataSearchPropTypes;
