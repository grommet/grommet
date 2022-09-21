import React, { useMemo, useState } from 'react';
import { Box } from '../Box';
import { DataFilters } from '../DataFilters';
import { DataSearch } from '../DataSearch';
import { DataSummary } from '../DataSummary';
import { Toolbar } from '../Toolbar';
import { DataContext } from '../../contexts/DataContext';
import { DataPropTypes } from './propTypes';

const defaultFilters = {
  search: { text: '' },
  properties: {},
};

const filterData = (data, filters) => {
  const searchExp = filters.search.text
    ? new RegExp(filters.search.text, 'i')
    : undefined;
  const searchProperties = filters.search.properties;
  const result = data.filter((datum) => {
    let matched = true;
    if (searchExp) {
      matched = Object.keys(datum).some((property) => {
        if (!searchProperties || searchProperties.includes(property))
          return searchExp.test(datum[property]);
        return false;
      });
    }
    if (matched) {
      matched = !Object.keys(filters.properties).some((property) => {
        // returning true means it doesn't match the filter
        const value = filters.properties[property];
        if (Array.isArray(value)) return !value.includes(datum[property]);
        return value !== datum[property];
      });
    }
    return matched;
  });
  return result;
};

export const Data = ({
  children,
  data,
  filters: filtersProp,
  onChange,
  onSubmit,
  search,
  total,
  ...rest
}) => {
  const [filters, setFilters] = useState(defaultFilters);

  const contextValue = useMemo(() => {
    const result = {};

    result.filters = filters;

    if (filters.search.text || Object.keys(filters.properties).length) {
      result.clearFilters = () => {
        setFilters(defaultFilters);
        if (onSubmit && typeof onSubmit === 'function') onSubmit({});
        if (onChange && typeof onChange === 'function') onChange({});
      };
    }

    if (onSubmit || !onChange)
      result.onSubmit = (nextFilters) => {
        setFilters(nextFilters);
        if (onSubmit && typeof onSubmit === 'function') onSubmit(nextFilters);
        // else result.data = filterData(data, nextFilters);
      };

    if (onChange)
      result.onChange = (nextFilters) => {
        setFilters(nextFilters);
        if (typeof onChange === 'function') onChange(nextFilters);
        // else result.data = filterData(data, nextFilters);
      };

    const doFilter =
      (onChange === true || !onChange) && (onSubmit === true || !onSubmit);
    result.data = doFilter ? filterData(data, filters) : data;
    result.unfilteredData = data;
    result.total = total !== undefined ? total : data.length;

    return result;
  }, [data, filters, onChange, onSubmit, total]);

  const searchProps = useMemo(
    () =>
      ((typeof search === 'string' || Array.isArray(search)) && {
        property: search,
      }) ||
      (typeof search === 'object' && search) ||
      undefined,
    [search],
  );

  const filtersProps = useMemo(
    () =>
      ((typeof filtersProp === 'string' || Array.isArray(filtersProp)) && {
        properties: filtersProp,
      }) ||
      (typeof filtersProp === 'object' && filtersProp) ||
      undefined,
    [filtersProp],
  );

  let controls;
  if (filtersProp || search) {
    controls = [
      <Toolbar key="toolbar">
        <Box flex={false} direction="row" gap="small">
          {search && <DataSearch {...searchProps} />}
          {filters && <DataFilters drop {...filtersProps} />}
        </Box>
      </Toolbar>,
      <DataSummary key="summary" />,
    ];
  }

  return (
    <DataContext.Provider value={contextValue}>
      <Box flex={false} {...rest}>
        {controls}
        {children}
      </Box>
    </DataContext.Provider>
  );
};

Data.propTypes = DataPropTypes;
