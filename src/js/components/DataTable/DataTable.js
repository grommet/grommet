import React, { useCallback, useMemo, useState } from 'react';

import { Header } from './Header';
import { Footer } from './Footer';
import { Body } from './Body';
import { GroupedBody } from './GroupedBody';
import {
  buildFooterValues,
  buildGroups,
  buildGroupState,
  filterAndSortData,
  initializeFilters,
  normalizePrimaryProperty,
} from './buildState';
import { StyledDataTable } from './StyledDataTable';

const contexts = ['header', 'body', 'footer'];

const normalizeProp = (prop, context) => {
  if (prop) {
    if (prop[context]) return prop[context];
    if (contexts.some(c => prop[c])) return undefined;
    return prop;
  }
  return undefined;
};

const DataTable = ({
  background,
  border,
  columns = [],
  data = [],
  groupBy,
  onClickRow, // removing unknown DOM attributes
  onMore,
  onSearch, // removing unknown DOM attributes
  onSort: onSortProp,
  replace,
  pad,
  primaryKey,
  resizeable,
  rowProps,
  size,
  sort: sortProp,
  sortable,
  step = 50,
  ...rest
}) => {
  // property name of the primary property
  const primaryProperty = useMemo(
    () => normalizePrimaryProperty(columns, primaryKey),
    [columns, primaryKey],
  );

  // whether or not we should show a footer
  const showFooter = useMemo(() => columns.filter(c => c.footer).length > 0, [
    columns,
  ]);

  // what column we are actively capturing filter input on
  const [filtering, setFiltering] = useState();

  // the currently active filters
  const [filters, setFilters] = useState(initializeFilters(columns));

  // which column we are sorting on, with direction
  const [sort, setSort] = useState(sortProp || {});

  // the data filtered and sorted, if needed
  const adjustedData = useMemo(
    () => filterAndSortData(data, filters, onSearch, sort),
    [data, filters, onSearch, sort],
  );

  // the values to put in the footer cells
  const footerValues = useMemo(() => buildFooterValues(columns, adjustedData), [
    adjustedData,
    columns,
  ]);

  // if groupBy, an array with one item per unique groupBy key value
  const groups = useMemo(() => buildGroups(columns, adjustedData, groupBy), [
    adjustedData,
    columns,
    groupBy,
  ]);

  // an object indicating which group values are expanded
  const [groupState, setGroupState] = useState(
    buildGroupState(groups, groupBy),
  );

  // any customized column widths
  const [widths, setWidths] = useState({});

  // remember that we are filtering on this property
  const onFiltering = property => setFiltering(property);

  // remember the search text we should filter this property by
  const onFilter = (property, value) => {
    const nextFilters = { ...filters };
    nextFilters[property] = value;
    setFilters(nextFilters);
    // Let caller know about search, if interested
    if (onSearch) onSearch(nextFilters);
  };

  // toggle the sort direction on this property
  const onSort = property => () => {
    let direction;
    if (!sort || property !== sort.property) direction = 'asc';
    else if (sort.direction === 'asc') direction = 'desc';
    else direction = 'asc';
    const nextSort = { property, direction };
    setSort(nextSort);
    if (onSortProp) onSortProp(nextSort);
  };

  // toggle whether the group is expanded
  const onToggleGroup = groupValue => () => {
    const nextGroupState = { ...groupState };
    nextGroupState[groupValue] = {
      ...nextGroupState[groupValue],
      expanded: !nextGroupState[groupValue].expanded,
    };
    setGroupState(nextGroupState);
    if (groupBy.onExpand) {
      const expandedKeys = Object.keys(nextGroupState).filter(
        k => nextGroupState[k].expanded,
      );
      groupBy.onExpand(expandedKeys);
    }
  };

  // toggle whether all groups are expanded
  const onToggleGroups = () => {
    const expanded =
      Object.keys(groupState).filter(k => !groupState[k].expanded).length === 0;
    const nextGroupState = {};
    Object.keys(groupState).forEach(k => {
      nextGroupState[k] = { ...groupState[k], expanded: !expanded };
    });
    setGroupState(nextGroupState);
    if (groupBy.onExpand) {
      const expandedKeys = Object.keys(nextGroupState).filter(
        k => nextGroupState[k].expanded,
      );
      groupBy.onExpand(expandedKeys);
    }
  };

  // remember the width this property's column should be
  const onResize = useCallback(
    (property, width) => {
      if (widths[property] !== width) {
        const nextWidths = { ...widths };
        nextWidths[property] = width;
        setWidths(nextWidths);
      }
    },
    [widths],
  );

  if (size && resizeable) {
    console.warn('DataTable cannot combine "size" and "resizeble".');
  }

  return (
    <StyledDataTable {...rest}>
      <Header
        background={normalizeProp(background, 'header')}
        border={normalizeProp(border, 'header')}
        columns={columns}
        filtering={filtering}
        filters={filters}
        groups={groups}
        groupState={groupState}
        pad={normalizeProp(pad, 'header')}
        size={size}
        sort={sort}
        widths={widths}
        onFiltering={onFiltering}
        onFilter={onFilter}
        onResize={resizeable ? onResize : undefined}
        onSort={sortable || sortProp || onSortProp ? onSort : undefined}
        onToggle={onToggleGroups}
      />
      {groups ? (
        <GroupedBody
          background={normalizeProp(background, 'body')}
          border={normalizeProp(border, 'body')}
          columns={columns}
          groupBy={groupBy.property ? groupBy.property : groupBy}
          groups={groups}
          groupState={groupState}
          pad={normalizeProp(pad, 'body')}
          primaryProperty={primaryProperty}
          onToggle={onToggleGroup}
          size={size}
        />
      ) : (
        <Body
          background={normalizeProp(background, 'body')}
          border={normalizeProp(border, 'body')}
          columns={columns}
          data={adjustedData}
          onMore={onMore}
          replace={replace}
          onClickRow={onClickRow}
          pad={normalizeProp(pad, 'body')}
          primaryProperty={primaryProperty}
          rowProps={rowProps}
          size={size}
          step={step}
        />
      )}
      {showFooter && (
        <Footer
          background={normalizeProp(background, 'footer')}
          border={normalizeProp(border, 'footer')}
          columns={columns}
          footerValues={footerValues}
          groups={groups}
          pad={normalizeProp(pad, 'footer')}
          primaryProperty={primaryProperty}
          size={size}
        />
      )}
    </StyledDataTable>
  );
};

let DataTableDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  DataTableDoc = require('./doc').doc(DataTable);
}
const DataTableWrapper = DataTableDoc || DataTable;

export { DataTableWrapper as DataTable };
