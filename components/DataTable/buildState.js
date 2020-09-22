"use strict";

exports.__esModule = true;
exports.buildGroupState = exports.buildGroups = exports.buildFooterValues = exports.filterAndSortData = exports.initializeFilters = exports.normalizePrimaryProperty = exports.datumValue = exports.set = void 0;

// This file contains helper functions for DataTable, to keep the component
// files simpler.
var set = function set(obj, path, value) {
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
}; // get the value for the property in the datum object


exports.set = set;

var datumValue = function datumValue(datum, property) {
  if (!property) return undefined;
  var parts = property.split('.');

  if (parts.length === 1) {
    return datum[property];
  }

  if (!datum[parts[0]]) {
    return undefined;
  }

  return datumValue(datum[parts[0]], parts.slice(1).join('.'));
}; // get the primary property name


exports.datumValue = datumValue;

var normalizePrimaryProperty = function normalizePrimaryProperty(columns, primaryKey) {
  var result;
  columns.forEach(function (column) {
    // remember the first key property
    if (column.primary && !result) {
      result = column.property;
    }
  });

  if (!result) {
    if (primaryKey === false) result = undefined;else if (primaryKey) result = primaryKey;else if (columns.length > 0) result = columns[0].property;
  }

  return result;
}; // initialize filters with empty strings


exports.normalizePrimaryProperty = normalizePrimaryProperty;

var initializeFilters = function initializeFilters(columns) {
  var result = {};
  columns.forEach(function (column) {
    if (column.search) {
      result[column.property] = '';
    }
  });
  return result;
}; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping


exports.initializeFilters = initializeFilters;

var escapeRegExp = function escapeRegExp(input) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}; // filter data based on filters then sort


var filterAndSortData = function filterAndSortData(data, filters, onSearch, sort) {
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

    var before = direction === 'asc' ? 1 : -1;
    var after = direction === 'asc' ? -1 : 1;
    result.sort(function (d1, d2) {
      if (datumValue(d1, property) > datumValue(d2, property)) return before;
      if (datumValue(d1, property) < datumValue(d2, property)) return after;
      return 0;
    });
  }

  return result;
}; // aggregate reducers


exports.filterAndSortData = filterAndSortData;

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
}; // aggregate reducers init values

var reducersInitValues = {
  min: Number.MAX_VALUE,
  max: Number.MIN_VALUE,
  sum: 0
}; // aggregate a single column

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
}; // aggregate all columns that can


var aggregate = function aggregate(columns, data) {
  var result = {};
  columns.forEach(function (column) {
    if (column.aggregate) {
      var value = aggregateColumn(column, data);
      result = set(result, column.property, value);
    }
  });
  return result;
}; // build the values for the footer cells


var buildFooterValues = function buildFooterValues(columns, data) {
  var aggregateValues = aggregate(columns, data);
  var result = {};
  columns.forEach(function (column) {
    if (column.footer) {
      if (typeof column.footer === 'string') {
        result = set(result, column.property, column.footer);
      } else if (column.footer.aggregate) {
        var value = datumValue(aggregateValues, column.property);
        result = set(result, column.property, value);
      }
    }
  });
  return result;
}; // looks at the groupBy property of each data object and returns an
// array with one item for each unique value of that property.


exports.buildFooterValues = buildFooterValues;

var buildGroups = function buildGroups(columns, data, groupBy) {
  var result;

  if (groupBy) {
    result = [];
    var groupMap = {};
    data.forEach(function (datum) {
      var groupByProperty = groupBy.property ? groupBy.property : groupBy;
      var groupValue = datumValue(datum, groupByProperty);

      if (!groupMap[groupValue]) {
        var group = {
          data: [],
          datum: {},
          key: groupValue
        };
        group.datum[groupByProperty] = groupValue;
        result.push(group);
        groupMap[groupValue] = group;
      }

      groupMap[groupValue].data.push(datum);
    }); // include any aggregate column values across the data for each group

    columns.forEach(function (column) {
      if (column.aggregate) {
        result.forEach(function (group) {
          var datum = group.datum;
          datum[column.property] = aggregateColumn(column, group.data);
        });
      }
    });
  }

  return result;
}; // build group expanded state, expanding any in groupBy.expand


exports.buildGroups = buildGroups;

var buildGroupState = function buildGroupState(groups, groupBy) {
  var result = {};

  if (groups) {
    groups.forEach(function (_ref) {
      var key = _ref.key;
      result[key] = {
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

exports.buildGroupState = buildGroupState;