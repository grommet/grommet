import React, { useEffect, useMemo, useState } from 'react';
import { Box } from '../Box';
import { DataFilters } from '../DataFilters';
import { DataSearch } from '../DataSearch';
import { DataSummary } from '../DataSummary';
import { Toolbar } from '../Toolbar';
import { DataContext } from '../../contexts/DataContext';
import { DataPropTypes } from './propTypes';
import { filter } from './filter';

const defaultView = {
  search: '',
  properties: {},
};

export const Data = ({
  children,
  data,
  onView,
  properties,
  toolbar,
  total,
  updateOn = 'submit',
  view: viewProp,
  ...rest
}) => {
  const [view, setView] = useState(viewProp || defaultView);
  useEffect(() => setView(viewProp), [viewProp]);

  // what we use for DataContext value
  const contextValue = useMemo(() => {
    const result = { properties, updateOn, view };

    // used by DataSearch to pass along what property search should be scoped to
    result.setSearchProperty = (property) => {
      if (!view) setView({ search: { property } });
      else if (property && property !== view?.search?.property)
        setView({ ...view, search: { ...view.search, property } });
    };

    if (
      view?.search?.text ||
      (typeof view?.search === 'string' && view.search) ||
      (view?.properties && Object.keys(view.properties).length)
    ) {
      result.clearFilters = () => {
        const nextView = defaultView;
        setView(nextView);
        if (typeof onView === 'function') onView(nextView);
        else result.data = filter(data, nextView, properties);
      };
    }

    result.onView = (nextView) => {
      setView(nextView);
      if (typeof onView === 'function') onView(nextView);
      else result.data = filter(data, nextView, properties);
    };

    const doFilter = typeof onView !== 'function';
    result.data = doFilter ? filter(data, view, properties) : data;
    result.unfilteredData = data;
    result.total = total !== undefined ? total : data.length;

    return result;
  }, [data, onView, properties, total, updateOn, view]);

  let toolbarContent;
  if (toolbar) {
    toolbarContent = [
      <Toolbar key="toolbar">
        <Box flex={false} direction="row" gap="small">
          {(toolbar === true || toolbar === 'search') && <DataSearch />}
          {(toolbar === true || toolbar === 'filters') && <DataFilters drop />}
        </Box>
      </Toolbar>,
      <DataSummary key="summary" />,
    ];
  }

  return (
    <DataContext.Provider value={contextValue}>
      <Box flex={false} {...rest}>
        {toolbarContent}
        {children}
      </Box>
    </DataContext.Provider>
  );
};

Data.propTypes = DataPropTypes;
