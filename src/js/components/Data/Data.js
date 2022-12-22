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

const defaultView = {
  search: '',
  properties: {},
};

const normalizeView = (viewProp, views) =>
  (typeof viewProp === 'string' && views?.find((v) => v.name === viewProp)) ||
  (typeof viewProp === 'object' && viewProp);

export const Data = ({
  children,
  data: dataProp,
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
  const [view, setView] = useState(normalizeView(viewProp, views));
  useEffect(() => setView(normalizeView(viewProp, views)), [viewProp, views]);
  const [toolbarKeys, setToolbarKeys] = useState([]);

  const data = useMemo(() => {
    if (onView) return dataProp;
    return filter(dataProp, view, properties);
  }, [dataProp, onView, properties, view]);

  // what we use for DataContext value
  const contextValue = useMemo(() => {
    const result = { id, messages, properties, updateOn, view, views };

    if (
      view?.search ||
      view?.sort ||
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
    result.unfilteredData = dataProp;
    result.total = total !== undefined ? total : dataProp.length;

    result.addToolbarKey = (key) => {
      setToolbarKeys((prevKeys) => {
        if (prevKeys.includes(key)) return prevKeys;
        return [...prevKeys, key];
      });
    };
    result.toolbarKeys = toolbarKeys;

    return result;
  }, [
    data,
    dataProp,
    id,
    messages,
    onView,
    properties,
    toolbarKeys,
    total,
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
