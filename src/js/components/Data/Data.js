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
  data: dataProp,
  onView,
  properties,
  toolbar,
  total,
  updateOn = 'submit',
  view: viewProp,
  ...rest
}) => {
  const [view, setView] = useState(viewProp);
  useEffect(() => setView(viewProp), [viewProp]);

  const data = useMemo(() => {
    if (onView) return dataProp;
    return filter(dataProp, view, properties);
  }, [dataProp, onView, properties, view]);

  // what we use for DataContext value
  const contextValue = useMemo(() => {
    const result = { properties, updateOn, view };

    if (
      view?.search ||
      (view?.properties && Object.keys(view.properties).length)
    ) {
      result.clearFilters = () => {
        const nextView = defaultView;
        setView(nextView);
        if (onView) onView(nextView);
      };
    }

    result.onView = (nextView) => {
      setView(nextView);
      if (onView) onView(nextView);
    };

    result.data = data;
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
