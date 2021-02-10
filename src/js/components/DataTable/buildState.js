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
  if (!property) return undefined;
  const parts = property.split('.');
  if (parts.length === 1) {
    return datum[property];
  }
  if (!datum[parts[0]]) {
    return undefined;
  }
  return datumValue(datum[parts[0]], parts.slice(1).join('.'));
};

// get the primary property name
export const normalizePrimaryProperty = (columns, primaryKey) => {
  let result;
  columns.forEach(column => {
    // remember the first key property
    if (column.primary && !result) {
      result = column.property;
    }
  });
  if (!result) {
    if (primaryKey === false) result = undefined;
    else if (primaryKey) result = primaryKey;
    else if (columns.length > 0) result = columns[0].property;
  }
  return result;
};

// initialize filters with empty strings
export const initializeFilters = columns => {
  const result = {};
  columns.forEach(column => {
    if (column.search) {
      result[column.property] = '';
    }
  });
  return result;
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
const escapeRegExp = input => input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// filter data based on filters then sort
export const filterAndSortData = (data, filters, onSearch, sort) => {
  let result = data;
  if (!onSearch) {
    const regexps = {};
    Object.keys(filters)
      .filter(n => filters[n])
      .forEach(n => {
        regexps[n] = new RegExp(escapeRegExp(filters[n]), 'i');
      });
    if (Object.keys(regexps).length > 0) {
      result = data.filter(
        datum =>
          !Object.keys(regexps).some(
            property => !regexps[property].test(datumValue(datum, property)),
          ),
      );
    }
  }

  if (sort && !sort.external) {
    const { property, direction } = sort;
    result = result === data ? [...data] : result; // don't sort caller's data
    const before = direction === 'asc' ? 1 : -1;
    const after = direction === 'asc' ? -1 : 1;
    result.sort((d1, d2) => {
      if (datumValue(d1, property) > datumValue(d2, property)) return before;
      if (datumValue(d1, property) < datumValue(d2, property)) return after;
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
    value = data.map(d => datumValue(d, column.property)).reduce(sumReducer);
    value /= data.length;
  } else {
    value = data
      .map(d => datumValue(d, column.property))
      .reduce(reducers[column.aggregate], reducersInitValues[column.aggregate]);
  }
  return value;
};

// aggregate all columns that can
const aggregate = (columns, data) => {
  let result = {};
  columns.forEach(column => {
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
  columns.forEach(column => {
    if (column.footer) {
      if (typeof column.footer === 'string') {
        result = set(result, column.property, column.footer);
      } else if (column.footer.aggregate) {
        const value = datumValue(aggregateValues, column.property);
        result = set(result, column.property, value);
      }
    }
  });

  return result;
};

// looks at the groupBy property of each data object and returns an
// array with one item for each unique value of that property.
export const buildGroups = (columns, data, groupBy) => {
  let result;
  if (groupBy) {
    result = [];
    const groupMap = {};
    data.forEach(datum => {
      const groupByProperty = groupBy.property ? groupBy.property : groupBy;
      const groupValue = datumValue(datum, groupByProperty);
      if (!groupMap[groupValue]) {
        const group = { data: [], datum: {}, key: groupValue };
        group.datum[groupByProperty] = groupValue;
        result.push(group);
        groupMap[groupValue] = group;
      }
      groupMap[groupValue].data.push(datum);
    });

    // include any aggregate column values across the data for each group
    columns.forEach(column => {
      if (column.aggregate) {
        result.forEach(group => {
          const { datum } = group;
          datum[column.property] = aggregateColumn(column, group.data);
        });
      }
    });
  }

  return result;
};

// build group expanded state, expanding any in groupBy.expand
export const buildGroupState = (groups, groupBy) => {
  const result = {};
  if (groups) {
    groups.forEach(({ key }) => {
      result[key] = { expanded: false };
    });
  }
  if (groupBy && groupBy.expand) {
    groupBy.expand.forEach(value => {
      result[value] = { expanded: true };
    });
  }
  return result;
};

export const normalizeBackgroundColor = theme => {
  const { background } = theme; // context background
  if (typeof background === 'string') return background;
  if (background.light && background.dark) return background;
  if (background.color) return background.color;
  return undefined;
};
