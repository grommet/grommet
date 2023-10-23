import React, { useEffect, useMemo, useState } from 'react';
import { Box } from '../Box';
import { DataFilters } from '../DataFilters';
import { DataSearch } from '../DataSearch';
import { DataSummary } from '../DataSummary';
import { DataView } from '../DataView';
import { Toolbar } from '../Toolbar';
import { DataContext } from '../../contexts/DataContext';
import { DataPropTypes } from './propTypes';
import { filter } from './filter';

const defaultDefaultView = { search: '' };

const normalizeView = (viewProp, views) =>
  (typeof viewProp === 'string' && views?.find((v) => v.name === viewProp)) ||
  (typeof viewProp === 'object' && viewProp);

export const Data = ({
  children,
  data: dataProp = [],
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
  views,
  ...rest
}) => {
  const [view, setView] = useState(
    normalizeView(viewProp || defaultView, views),
  );
  useEffect(
    () => setView(normalizeView(viewProp || defaultView, views)),
    [defaultView, viewProp, views],
  );
  const [toolbarKeys, setToolbarKeys] = useState([]);

  const result = useMemo(() => {
    if (onView)
      // caller is filtering
      return {
        data: dataProp,
        total,
        filteredTotal: filteredTotal ?? dataProp?.length ?? 0,
      };
    return filter(dataProp, view, properties);
  }, [dataProp, filteredTotal, onView, properties, total, view]);

  // what we use for DataContext value
  const contextValue = useMemo(() => {
    const value = {
      id,
      messages,
      properties,
      updateOn,
      view,
      views,
      ...result,
    };

    value.clearFilters = () => {
      const nextView = defaultView;
      setView(nextView);
      if (onView) onView(nextView);
    };

    value.onView = (nextView) => {
      setView(nextView);
      if (onView) onView(nextView);
    };

    value.addToolbarKey = (key) => {
      setToolbarKeys((prevKeys) => {
        if (prevKeys.includes(key)) return prevKeys;
        return [...prevKeys, key];
      });
    };
    value.toolbarKeys = toolbarKeys;

    return value;
  }, [
    defaultView,
    id,
    messages,
    onView,
    properties,
    result,
    toolbarKeys,
    updateOn,
    view,
    views,
  ]);

  let toolbarContent;
  if (toolbar) {
    toolbarContent = [
      <Toolbar key="toolbar">
        {(toolbar === true || toolbar === 'search') && <DataSearch />}
        {(toolbar === true || toolbar === 'view') && <DataView />}
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
