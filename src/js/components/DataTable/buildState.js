// This file contains helper functions for DataTable, to keep the component
// files simpler.

export const set = (obj, path, value) => {
  let parts = path;
  if (Object(obj) !== obj) return obj;
  if (!Array.isArray(path)) parts = path.toString().match(/[^.[\]]+/g) || [];

  parts.slice(0, -1).reduce((acc, item, index) => {
    if (Object(acc[item]) === acc[item]) {
      return acc[item];
    }
    acc[item] = Math.abs(parts[index + 1]) > 0 === +parts[index + 1] ? [] : {};
    return acc[item];
  }, obj)[parts[parts.length - 1]] = value;

  return obj;
};

// get the value for the property in the datum object
export const datumValue = (datum, property) => {
  if (!property || !datum) return undefined;
  const parts = property.split('.');
  if (parts.length === 1) return datum[property];
  if (!datum[parts[0]]) return undefined;
  return datumValue(datum[parts[0]], parts.slice(1).join('.'));
};

// get the primary property name
export const normalizePrimaryProperty = (columns, primaryKey) => {
  let result = primaryKey;
  if (result === undefined) {
    columns.forEach((column) => {
      // remember the first key property
      if (column.primary && !result) {
        result = column.property;
      }
    });
  }
  if (result === undefined && columns.length > 0) {
    result = columns[0].property;
  }
  return result;
};

// initialize filters with empty strings
export const initializeFilters = (columns) => {
  const result = {};
  columns.forEach((column) => {
    if (column.search) {
      result[column.property] = '';
    }
  });
  return result;
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
const escapeRegExp = (input) => input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// filter data based on filters then sort
export const filterAndSortData = (data, filters, onSearch, sort) => {
  let result = data;
  if (!onSearch) {
    const regexps = {};
    Object.keys(filters)
      .filter((n) => filters[n])
      .forEach((n) => {
        regexps[n] = new RegExp(escapeRegExp(filters[n]), 'i');
      });
    if (Object.keys(regexps).length > 0) {
      result = data.filter(
        (datum) =>
          !Object.keys(regexps).some(
            (property) => !regexps[property].test(datumValue(datum, property)),
          ),
      );
    }
  }

  if (sort && !sort.external) {
    const { property, direction } = sort;
    result = result === data ? [...data] : result; // don't sort caller's data
    const sortAsc = direction === 'asc';
    const before = sortAsc ? 1 : -1;
    const after = sortAsc ? -1 : 1;
    result.sort((d1, d2) => {
      const d1Val = datumValue(d1, property);
      const d2Val = datumValue(d2, property);
      if (
        (typeof d1Val === 'string' && typeof d2Val === 'string') ||
        (typeof d1Val === 'string' && !d2Val) ||
        (typeof d2Val === 'string' && !d1Val)
      ) {
        const sortResult = (d1Val || '').localeCompare(d2Val || '', undefined, {
          sensitivity: 'base',
        });
        return sortAsc ? sortResult : -sortResult;
      }
      if (d1Val > d2Val) return before;
      if (d1Val < d2Val) return after;
      return 0;
    });
  }

  return result;
};

// aggregate reducers
const sumReducer = (accumulated, next) => accumulated + next;
const minReducer = (accumulated, next) =>
  accumulated === undefined ? next : Math.min(accumulated, next);
const maxReducer = (accumulated, next) =>
  accumulated === undefined ? next : Math.max(accumulated, next);

const reducers = {
  max: maxReducer,
  min: minReducer,
  sum: sumReducer,
};

// aggregate reducers init values
const reducersInitValues = {
  min: Number.MAX_VALUE,
  max: Number.MIN_VALUE,
  sum: 0,
};

// aggregate a single column
const aggregateColumn = (column, data) => {
  let value;
  if (column.aggregate === 'avg') {
    value = data.map((d) => datumValue(d, column.property)).reduce(sumReducer);
    value /= data.length;
  } else {
    value = data
      .map((d) => datumValue(d, column.property))
      .reduce(reducers[column.aggregate], reducersInitValues[column.aggregate]);
  }
  return value;
};

// aggregate all columns that can
const aggregate = (columns, data) => {
  let result = {};
  columns.forEach((column) => {
    if (column.aggregate) {
      const value = aggregateColumn(column, data);
      result = set(result, column.property, value);
    }
  });

  return result;
};

// build the values for the footer cells
export const buildFooterValues = (columns, data) => {
  const aggregateValues = aggregate(columns, data);

  let result = {};
  columns.forEach((column) => {
    if (column.footer) {
      if (column.footer.aggregate) {
        const value = datumValue(aggregateValues, column.property);
        result = set(result, column.property, value);
      } else {
        result = set(result, column.property, column.footer);
      }
    }
  });

  return result;
};

// looks at the groupBy property of each data object and returns an
// array with one item for each unique value of that property.
export const buildGroups = (columns, data, groupBy, primaryProperty) => {
  let result;
  if (groupBy?.property || typeof groupBy === 'string') {
    result = [];
    const groupMap = {};
    data.forEach((datum) => {
      const key = datumValue(datum, primaryProperty);
      const isGroup = key && groupBy.expandable?.includes(key);

      const groupByProperty = groupBy.property ? groupBy.property : groupBy;
      const groupValue = isGroup ? key : datumValue(datum, groupByProperty);
      if (!groupMap[groupValue]) {
        const group = {
          data: [],
          datum: isGroup ? datum : {},
          key: groupValue,
        };
        group.datum[groupByProperty] = groupValue;
        result.push(group);
        groupMap[groupValue] = group;
      }
      if (!isGroup) groupMap[groupValue].data.push(datum);
    });

    // include any aggregate column values across the data for each group
    // If expandable was specified we let the onUpdate callback do it since
    // we may not have access to all the data to aggregate it.
    if (!groupBy.expandable) {
      columns.forEach((column) => {
        if (column.aggregate) {
          result.forEach((group) => {
            const { datum } = group;
            datum[column.property] = aggregateColumn(column, group.data);
          });
        }
      });
    }
  } else if (groupBy?.expandable) {
    result = groupBy.expandable.map((key) => ({ data: [], datum: {}, key }));
  }

  return result;
};

// build group expanded state, expanding any in groupBy.expand
export const buildGroupState = (groups, groupBy) => {
  const result = {};
  if (groups) {
    groups.forEach(({ key }) => {
      if (key !== undefined) result[key] = { expanded: false };
    });
  }
  if (groupBy && groupBy.expand) {
    groupBy.expand.forEach((value) => {
      result[value] = { expanded: true };
    });
  }
  return result;
};

export const normalizeBackgroundColor = (theme) => {
  const { background } = theme; // context background
  if (typeof background === 'string') return background;
  if (background.light && background.dark) return background;
  if (background.color) return background.color;
  return undefined;
};

export const normalizeRowProp = (name, rowProp, prop) => {
  if (rowProp && rowProp[name]) return rowProp[name];
  return prop;
};

const tableContextNames = ['header', 'body', 'footer'];
const cellPropertyNames = ['background', 'border', 'pad'];

// Convert property specific cell props to context specific cell props.
// For example, background={{ header: { background } }}
// will become cellProps.header.background
export const normalizeCellProps = (props, theme) => {
  const result = {};
  tableContextNames.forEach((context) => {
    result[context] = { pinned: {} };
    cellPropertyNames.forEach((propName) => {
      let value =
        props?.[propName]?.[context] ||
        // if the propName is used without context, it applies to all contexts
        (tableContextNames.every((n) => !props?.[propName]?.[n]) &&
          props?.[propName]) ||
        theme?.dataTable?.[context]?.[propName] ||
        theme?.table?.[context]?.[propName];
      if (value !== undefined) result[context][propName] = value;

      // pinned case
      value =
        props?.[propName]?.pinned?.[context] ||
        (context === 'body' &&
          tableContextNames.every((n) => !props?.[propName]?.pinned?.[n]) &&
          props?.[propName]?.pinned) ||
        theme?.dataTable?.pinned?.[context]?.[propName];
      if (value !== undefined) {
        if (
          propName === 'background' &&
          theme.background &&
          value.opacity &&
          !value.color
        )
          // theme context has an active background color but the
          // theme doesn't set an explicit color, repeat the context
          // background explicitly
          value.color = normalizeBackgroundColor(theme);

        if (context === 'body')
          // in case we have pinned columns, store the pinned stuff in
          // cellProps.body.pinned
          result[context].pinned[propName] = value;
        else if (props.pin === true || props.pin === context)
          // this context is pinned, use the pinned value directly
          result[context][propName] = value;
      }
    });
  });
  return result;
};

export const normalizeRowCellProps = (
  rowProps,
  cellProps,
  primaryKey,
  index,
) => {
  const result = { pinned: {} };
  ['background', 'border', 'pad'].forEach((propName) => {
    const row = primaryKey && rowProps && rowProps?.[primaryKey]?.[propName];
    const cell = cellProps[propName];
    let value =
      (row && (Array.isArray(row) ? row[index % row.length] : row)) ||
      (Array.isArray(cell) ? cell[index % cell.length] : cell);
    if (value !== undefined) result[propName] = value;

    const rowPin = rowProps && rowProps.pinned && rowProps.pinned[propName];
    const cellPin = cellProps.pinned[propName];
    value =
      (rowPin &&
        (Array.isArray(rowPin) ? rowPin[index % rowPin.length] : rowPin)) ||
      (Array.isArray(cellPin) ? cellPin[index % cellPin.length] : cellPin);
    if (value !== undefined) result.pinned[propName] = value;
  });
  return result;
};
