import React, { useEffect, useMemo, useState } from 'react';
import { Box } from '../Box';
import { DataFilters } from '../DataFilters';
import { DataSearch } from '../DataSearch';
import { DataSummary } from '../DataSummary';
import { Toolbar } from '../Toolbar';
import { DataContext } from '../../contexts/DataContext';
import { DataPropTypes } from './propTypes';
import { filter } from './filter';

const defaultDefaultView = { search: '' };

export const Data = ({
  children,
  data: dataProp,
  defaultView = defaultDefaultView,
  filteredTotal,
  id = 'data',
  messages,
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

  const result = useMemo(() => {
    if (onView)
      // caller is filtering
      return {
        data: dataProp,
        total,
        filteredTotal: filteredTotal || dataProp.length,
      };
    return filter(dataProp, view, properties);
  }, [dataProp, filteredTotal, onView, properties, total, view]);

  // what we use for DataContext value
  const contextValue = useMemo(() => {
    const value = { id, messages, properties, updateOn, view, ...result };

    value.clearFilters = () => {
      const nextView = defaultView;
      setView(nextView);
      if (onView) onView(nextView);
    };

    value.onView = (nextView) => {
      setView(nextView);
      if (onView) onView(nextView);
    };

    return value;
  }, [defaultView, id, messages, onView, properties, result, updateOn, view]);

  let toolbarContent;
  if (toolbar) {
    toolbarContent = [
      <Toolbar key="toolbar">
        {(toolbar === true || toolbar === 'search') && <DataSearch />}
        {(toolbar === true || toolbar === 'filters') && <DataFilters drop />}
      </Toolbar>,
      <DataSummary key="summary" />,
    ];
  }

  return (
    <DataContext.Provider value={contextValue}>
      <Box id={id} flex={false} {...rest}>
        {toolbarContent}
        {children}
      </Box>
    </DataContext.Provider>
  );
};

Data.propTypes = DataPropTypes;
