"use strict";

exports.__esModule = true;
exports.set = exports.normalizeRowProp = exports.normalizeRowCellProps = exports.normalizePrimaryProperty = exports.normalizeCellProps = exports.normalizeBackgroundColor = exports.initializeFilters = exports.filterAndSortData = exports.datumValue = exports.buildGroups = exports.buildGroupState = exports.buildFooterValues = void 0;
// This file contains helper functions for DataTable, to keep the component
// files simpler.

var set = exports.set = function set(obj, path, value) {
  var parts = path;
  if (Object(obj) !== obj) return obj;
  if (!Array.isArray(path)) parts = path.toString().match(/[^.[\]]+/g) || [];
  parts.slice(0, -1).reduce(function (acc, item, index) {
    if (Object(acc[item]) === acc[item]) {
      return acc[item];
    }
    acc[item] = Math.abs(parts[index + 1]) > 0 === +parts[index + 1] ? [] : {};
    return acc[item];
  }, obj)[parts[parts.length - 1]] = value;
  return obj;
};

// get the value for the property in the datum object
var datumValue = exports.datumValue = function datumValue(datum, property) {
  if (!property || !datum) return undefined;
  var parts = property.split('.');
  if (parts.length === 1) return datum[property];
  if (!datum[parts[0]]) return undefined;
  return datumValue(datum[parts[0]], parts.slice(1).join('.'));
};

// get the primary property name
var normalizePrimaryProperty = exports.normalizePrimaryProperty = function normalizePrimaryProperty(columns, primaryKey) {
  var result;
  if (typeof primaryKey === 'string' || typeof primaryKey === 'boolean') {
    result = primaryKey;
  } else if (primaryKey === null) {
    console.warn('null is not a supported value for primaryKey. See supported values: https://v2.grommet.io/datatable#primaryKey');
  }
  if (result === undefined) {
    columns.forEach(function (column) {
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
var initializeFilters = exports.initializeFilters = function initializeFilters(columns) {
  var result = {};
  columns.forEach(function (column) {
    if (column.search) {
      result[column.property] = '';
    }
  });
  return result;
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
var escapeRegExp = function escapeRegExp(input) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// filter data based on filters then sort
var filterAndSortData = exports.filterAndSortData = function filterAndSortData(data, filters, onSearch, sort) {
  var result = data;
  if (!onSearch) {
    var regexps = {};
    Object.keys(filters).filter(function (n) {
      return filters[n];
    }).forEach(function (n) {
      regexps[n] = new RegExp(escapeRegExp(filters[n]), 'i');
    });
    if (Object.keys(regexps).length > 0) {
      result = data.filter(function (datum) {
        return !Object.keys(regexps).some(function (property) {
          return !regexps[property].test(datumValue(datum, property));
        });
      });
    }
  }
  if (sort && !sort.external) {
    var property = sort.property,
      direction = sort.direction;
    result = result === data ? [].concat(data) : result; // don't sort caller's data
    var sortAsc = direction === 'asc';
    var before = sortAsc ? 1 : -1;
    var after = sortAsc ? -1 : 1;
    result.sort(function (d1, d2) {
      var d1Val = datumValue(d1, property);
      var d2Val = datumValue(d2, property);
      if (typeof d1Val === 'string' && typeof d2Val === 'string' || typeof d1Val === 'string' && !d2Val || typeof d2Val === 'string' && !d1Val) {
        var sortResult = (d1Val || '').localeCompare(d2Val || '', undefined, {
          sensitivity: 'base'
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
var sumReducer = function sumReducer(accumulated, next) {
  return accumulated + next;
};
var minReducer = function minReducer(accumulated, next) {
  return accumulated === undefined ? next : Math.min(accumulated, next);
};
var maxReducer = function maxReducer(accumulated, next) {
  return accumulated === undefined ? next : Math.max(accumulated, next);
};
var reducers = {
  max: maxReducer,
  min: minReducer,
  sum: sumReducer
};

// aggregate reducers init values
var reducersInitValues = {
  min: Number.MAX_VALUE,
  max: Number.MIN_VALUE,
  sum: 0
};

// aggregate a single column
var aggregateColumn = function aggregateColumn(column, data) {
  var value;
  if (column.aggregate === 'avg') {
    value = data.map(function (d) {
      return datumValue(d, column.property);
    }).reduce(sumReducer);
    value /= data.length;
  } else {
    value = data.map(function (d) {
      return datumValue(d, column.property);
    }).reduce(reducers[column.aggregate], reducersInitValues[column.aggregate]);
  }
  return value;
};

// aggregate all columns that can
var aggregate = function aggregate(columns, data) {
  var result = {};
  columns.forEach(function (column) {
    if (column.aggregate) {
      var value = aggregateColumn(column, data);
      result = set(result, column.property, value);
    }
  });
  return result;
};

// build the values for the footer cells
var buildFooterValues = exports.buildFooterValues = function buildFooterValues(columns, data) {
  var aggregateValues = aggregate(columns, data);
  var result = {};
  columns.forEach(function (column) {
    if (column.footer) {
      if (column.footer.aggregate) {
        var value = datumValue(aggregateValues, column.property);
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
var buildGroups = exports.buildGroups = function buildGroups(columns, data, groupBy, primaryProperty) {
  var result;
  if (groupBy != null && groupBy.property || typeof groupBy === 'string') {
    result = [];
    var groupMap = {};
    data.forEach(function (datum) {
      var _groupBy$expandable;
      var key = datumValue(datum, primaryProperty);
      var isGroup = key && ((_groupBy$expandable = groupBy.expandable) == null ? void 0 : _groupBy$expandable.includes(key));
      var groupByProperty = groupBy.property ? groupBy.property : groupBy;
      var groupValue = isGroup ? key : datumValue(datum, groupByProperty);
      if (!groupMap[groupValue]) {
        var group = {
          data: [],
          datum: isGroup ? datum : {},
          key: groupValue
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
      columns.forEach(function (column) {
        if (column.aggregate) {
          result.forEach(function (group) {
            var datum = group.datum;
            datum[column.property] = aggregateColumn(column, group.data);
          });
        }
      });
    }
  } else if (groupBy != null && groupBy.expandable) {
    result = groupBy.expandable.map(function (key) {
      return {
        data: [],
        datum: {},
        key: key
      };
    });
  }
  return result;
};

// build group expanded state, expanding any in groupBy.expand
var buildGroupState = exports.buildGroupState = function buildGroupState(groups, groupBy) {
  var result = {};
  if (groups) {
    groups.forEach(function (_ref) {
      var key = _ref.key;
      if (key !== undefined) result[key] = {
        expanded: false
      };
    });
  }
  if (groupBy && groupBy.expand) {
    groupBy.expand.forEach(function (value) {
      result[value] = {
        expanded: true
      };
    });
  }
  return result;
};
var normalizeBackgroundColor = exports.normalizeBackgroundColor = function normalizeBackgroundColor(theme) {
  var background = theme.background; // context background
  if (typeof background === 'string') return background;
  if (background.light && background.dark) return background;
  if (background.color) return background.color;
  return undefined;
};
var normalizeRowProp = exports.normalizeRowProp = function normalizeRowProp(name, rowProp, prop) {
  if (rowProp && rowProp[name]) return rowProp[name];
  return prop;
};
var tableContextNames = ['header', 'body', 'footer'];
var cellPropertyNames = ['background', 'border', 'pad'];

// Convert property specific cell props to context specific cell props.
// For example, background={{ header: { background } }}
// will become cellProps.header.background
var normalizeCellProps = exports.normalizeCellProps = function normalizeCellProps(props, theme) {
  var result = {};
  tableContextNames.forEach(function (context) {
    result[context] = {
      pinned: {}
    };
    cellPropertyNames.forEach(function (propName) {
      var _props$propName, _theme$dataTable, _theme$table, _props$propName3, _props$propName5, _theme$dataTable2;
      var value = (props == null || (_props$propName = props[propName]) == null ? void 0 : _props$propName[context]) ||
      // if the propName is used without context, it applies to all contexts
      tableContextNames.every(function (n) {
        var _props$propName2;
        return !(props != null && (_props$propName2 = props[propName]) != null && _props$propName2[n]);
      }) && (props == null ? void 0 : props[propName]) || (theme == null || (_theme$dataTable = theme.dataTable) == null || (_theme$dataTable = _theme$dataTable[context]) == null ? void 0 : _theme$dataTable[propName]) || (theme == null || (_theme$table = theme.table) == null || (_theme$table = _theme$table[context]) == null ? void 0 : _theme$table[propName]);
      if (value !== undefined) result[context][propName] = value;

      // pinned case
      value = (props == null || (_props$propName3 = props[propName]) == null || (_props$propName3 = _props$propName3.pinned) == null ? void 0 : _props$propName3[context]) || context === 'body' && tableContextNames.every(function (n) {
        var _props$propName4;
        return !(props != null && (_props$propName4 = props[propName]) != null && (_props$propName4 = _props$propName4.pinned) != null && _props$propName4[n]);
      }) && (props == null || (_props$propName5 = props[propName]) == null ? void 0 : _props$propName5.pinned) || (theme == null || (_theme$dataTable2 = theme.dataTable) == null || (_theme$dataTable2 = _theme$dataTable2.pinned) == null || (_theme$dataTable2 = _theme$dataTable2[context]) == null ? void 0 : _theme$dataTable2[propName]);
      if (value !== undefined) {
        if (propName === 'background' && theme.background && value.opacity && !value.color)
          // theme context has an active background color but the
          // theme doesn't set an explicit color, repeat the context
          // background explicitly
          value.color = normalizeBackgroundColor(theme);
        if (context === 'body')
          // in case we have pinned columns, store the pinned stuff in
          // cellProps.body.pinned
          result[context].pinned[propName] = value;else if (props.pin === true || props.pin === context)
          // this context is pinned, use the pinned value directly
          result[context][propName] = value;
      }
    });
  });
  return result;
};
var normalizeRowCellProps = exports.normalizeRowCellProps = function normalizeRowCellProps(rowProps, cellProps, primaryKey, index) {
  var result = {
    pinned: {}
  };
  ['background', 'border', 'pad'].forEach(function (propName) {
    var _rowProps$primaryKey;
    var row = primaryKey && rowProps && (rowProps == null || (_rowProps$primaryKey = rowProps[primaryKey]) == null ? void 0 : _rowProps$primaryKey[propName]);
    var cell = cellProps[propName];
    var value = row && (Array.isArray(row) ? row[index % row.length] : row) || (Array.isArray(cell) ? cell[index % cell.length] : cell);
    if (value !== undefined) result[propName] = value;
    var rowPin = rowProps && rowProps.pinned && rowProps.pinned[propName];
    var cellPin = cellProps.pinned[propName];
    value = rowPin && (Array.isArray(rowPin) ? rowPin[index % rowPin.length] : rowPin) || (Array.isArray(cellPin) ? cellPin[index % cellPin.length] : cellPin);
    if (value !== undefined) result.pinned[propName] = value;
  });
  return result;
};