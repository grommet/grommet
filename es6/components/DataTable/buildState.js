// This file contains helper functions for DataTable, to keep the component
// files simpler.
export var set = function set(obj, path, value) {
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

export var datumValue = function datumValue(datum, property) {
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

export var normalizePrimaryProperty = function normalizePrimaryProperty(columns, primaryKey) {
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

export var initializeFilters = function initializeFilters(columns) {
  var result = {};
  columns.forEach(function (column) {
    if (column.search) {
      result[column.property] = '';
    }
  });
  return result;
}; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping

var escapeRegExp = function escapeRegExp(input) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}; // filter data based on filters then sort


export var filterAndSortData = function filterAndSortData(data, filters, onSearch, sort) {
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

      if (typeof d1Val === 'string' && typeof d2Val === 'string') {
        var sortResult = d1Val.localeCompare(d2Val, undefined, {
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
}; // aggregate reducers

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


export var buildFooterValues = function buildFooterValues(columns, data) {
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

export var buildGroups = function buildGroups(columns, data, groupBy) {
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

export var buildGroupState = function buildGroupState(groups, groupBy) {
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
export var normalizeBackgroundColor = function normalizeBackgroundColor(theme) {
  var background = theme.background; // context background

  if (typeof background === 'string') return background;
  if (background.light && background.dark) return background;
  if (background.color) return background.color;
  return undefined;
};
export var normalizeRowProp = function normalizeRowProp(name, rowProp, prop) {
  if (rowProp && rowProp[name]) return rowProp[name];
  return prop;
};
var tableContextNames = ['header', 'body', 'footer'];
var cellPropertyNames = ['background', 'border', 'pad']; // Convert property specific cell props to context specific cell props.
// For example, background={{ header: { background } }}
// will become cellProps.header.background

export var normalizeCellProps = function normalizeCellProps(props, theme) {
  var result = {};
  tableContextNames.forEach(function (context) {
    result[context] = {
      pinned: {}
    };
    cellPropertyNames.forEach(function (propName) {
      var _props$propName, _theme$dataTable, _theme$dataTable$cont, _theme$table, _theme$table$context, _props$propName3, _props$propName3$pinn, _props$propName5, _theme$dataTable2, _theme$dataTable2$pin, _theme$dataTable2$pin2;

      var value = (props == null ? void 0 : (_props$propName = props[propName]) == null ? void 0 : _props$propName[context]) || tableContextNames.every(function (n) {
        var _props$propName2;

        return !(props != null && (_props$propName2 = props[propName]) != null && _props$propName2[n]);
      }) && (props == null ? void 0 : props[propName]) || (theme == null ? void 0 : (_theme$dataTable = theme.dataTable) == null ? void 0 : (_theme$dataTable$cont = _theme$dataTable[context]) == null ? void 0 : _theme$dataTable$cont[propName]) || (theme == null ? void 0 : (_theme$table = theme.table) == null ? void 0 : (_theme$table$context = _theme$table[context]) == null ? void 0 : _theme$table$context[propName]);
      if (value !== undefined) result[context][propName] = value; // pinned case

      value = (props == null ? void 0 : (_props$propName3 = props[propName]) == null ? void 0 : (_props$propName3$pinn = _props$propName3.pinned) == null ? void 0 : _props$propName3$pinn[context]) || context === 'body' && tableContextNames.every(function (n) {
        var _props$propName4, _props$propName4$pinn;

        return !(props != null && (_props$propName4 = props[propName]) != null && (_props$propName4$pinn = _props$propName4.pinned) != null && _props$propName4$pinn[n]);
      }) && (props == null ? void 0 : (_props$propName5 = props[propName]) == null ? void 0 : _props$propName5.pinned) || (theme == null ? void 0 : (_theme$dataTable2 = theme.dataTable) == null ? void 0 : (_theme$dataTable2$pin = _theme$dataTable2.pinned) == null ? void 0 : (_theme$dataTable2$pin2 = _theme$dataTable2$pin[context]) == null ? void 0 : _theme$dataTable2$pin2[propName]);

      if (value !== undefined) {
        if (propName === 'background' && theme.background && value.opacity && !value.color) // theme context has an active background color but the
          // theme doesn't set an explicit color, repeat the context
          // background explicitly
          value.color = normalizeBackgroundColor(theme);
        if (context === 'body') // in case we have pinned columns, store the pinned stuff in
          // cellProps.body.pinned
          result[context].pinned[propName] = value;else if (props.pin === true || props.pin === context) // this context is pinned, use the pinned value directly
          result[context][propName] = value;
      }
    });
  });
  return result;
};
export var normalizeRowCellProps = function normalizeRowCellProps(rowProps, cellProps, primaryKey, index) {
  var result = {
    pinned: {}
  };
  ['background', 'border', 'pad'].forEach(function (propName) {
    var _rowProps$primaryKey;

    var row = primaryKey && rowProps && (rowProps == null ? void 0 : (_rowProps$primaryKey = rowProps[primaryKey]) == null ? void 0 : _rowProps$primaryKey[propName]);
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