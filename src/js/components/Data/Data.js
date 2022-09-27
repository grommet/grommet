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

// TODO: handle '.' delimited property names via sub objects

const filterData = (data, filters) => {
  const searchExp = filters.search.text
    ? new RegExp(filters.search.text, 'i')
    : undefined;
  const searchProperty = filters.search.property;
  const result = data.filter((datum) => {
    let matched = true;
    // check whether it matches any search
    if (searchExp) {
      matched = Object.keys(datum).some((property) => {
        if (
          !searchProperty ||
          searchProperty === property ||
          (Array.isArray(searchProperty) && searchProperty.includes(property))
        )
          return searchExp.test(datum[property]);
        return false;
      });
    }
    // check whether it matches any specific values
    if (matched) {
      matched = !Object.keys(filters.properties).some((property) => {
        // returning true means it doesn't match the filter
        const filterValue = filters.properties[property];
        const value = datum[property];
        if (Array.isArray(filterValue) && typeof filterValue[0] === 'number')
          return value < filterValue[0] || value > filterValue[1];
        if (Array.isArray(filterValue)) return !value.includes(value);
        return filterValue !== value;
      });
    }
    return matched;
  });

  if (filters?.sort?.property && filters?.sort?.direction) {
    const { property, direction } = filters.sort;
    const sortAsc = direction === 'asc';
    const before = sortAsc ? 1 : -1;
    const after = sortAsc ? -1 : 1;
    result.sort((d1, d2) => {
      const d1Val = d1[property];
      const d2Val = d2[property];
      // sort strings via locale case insensitive
      if ((typeof d1Val === 'string' && typeof d2Val === 'string') ||
        (typeof d1Val === 'string' && !d2Val) ||
        (typeof d2Val === 'string' && !d1Val)) {
        const sortResult = (d1Val || '').localeCompare(d2Val || '', undefined, {
          sensitivity: 'base',
        });
        return sortAsc ? sortResult : -sortResult;
      }
      // numbers are easier to sort
      if (d1Val > d2Val) return before;
      if (d1Val < d2Val) return after;

      return 0;
    });
  }

  return result;
};

export const Data = ({
  children,
  data,
  filters: filtersProp,
  onChange,
  onSubmit,
  search,
  sort,
  total,
  ...rest
}) => {
  const [filters, setFilters] = useState(defaultFilters);

  const contextValue = useMemo(() => {
    const result = {};

    result.filters = filters;

    result.setSearchProperty = (property) => {
      if (property !== filters.search.property)
        setFilters({ ...filters, search: { ...filters.search, property } });
    };

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
        sort,
      }) ||
      (typeof filtersProp === 'object' && { ...filtersProp, sort }) ||
      undefined,
    [filtersProp, sort],
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
