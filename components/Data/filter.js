"use strict";

exports.__esModule = true;
exports.filter = void 0;
// TODO: share with DataTable, List, Cards, etc.
var datumValue = function datumValue(datum, property) {
  if (!property) return undefined;
  var parts = property.split('.');
  if (parts.length === 1) return datum[property];
  if (!datum[parts[0]]) return undefined;
  return datumValue(datum[parts[0]], parts.slice(1).join('.'));
};

// This is where we filter the data internally, when the caller doesn't
// provide an onView.
var filter = exports.filter = function filter(data, view, properties) {
  var _view$sort, _view$sort2;
  // from https://stackoverflow.com/a/6300266/8513067
  var searchExp = view != null && view.search ? new RegExp(view.search.replace(/[#-.]|[[-^]|[?|{}]/g, '\\$&'), 'i') : undefined;
  var searchProperties;
  if (searchExp && properties) {
    // if we know where we want to search, look there
    searchProperties = Object.keys(properties).filter(function (k) {
      return properties[k].search;
    });
    // if none specified, look in all defined properties
    if (searchProperties.length === 0) searchProperties = Object.keys(properties);
  }
  var filteredData = data.filter(function (datum) {
    var matched = true;

    // check whether it matches any search
    if (searchExp) {
      var searchWith = function searchWith(property) {
        var value = datumValue(datum, property);
        if (value === undefined) return false;
        return searchExp.test(value);
      };
      if (searchProperties) matched = searchProperties.some(searchWith);else matched = Object.keys(datum).some(searchWith);
    }

    // check whether it matches any specific values
    if (matched && view != null && view.properties) {
      // if any properties don't match, overall not matched
      matched = !Object.keys(view.properties).some(function (property) {
        // returning true means it doesn't match the filter,
        var filterValue = view.properties[property];
        var value = datumValue(datum, property);

        // range case
        if (typeof (filterValue == null ? void 0 : filterValue.min) === 'number' || typeof (filterValue == null ? void 0 : filterValue.max) === 'number') return typeof value !== 'number' || value <= filterValue.min || value >= filterValue.max;

        // options case
        if (Array.isArray(filterValue)) {
          return !filterValue.some(function (f) {
            // f may be an object with form {label: __, value: __}
            var isObject = typeof f === 'object';
            // match f within data value array using .includes()
            if (Array.isArray(value)) {
              return isObject ? value.includes(f == null ? void 0 : f.value) : value.includes(f);
            }
            // match f with data value using ===
            return isObject ? (f == null ? void 0 : f.value) === value : f === value;
          });
        }

        // presence case
        if (typeof filterValue === 'boolean') return filterValue === !value;

        // not sure, keep it
        return false;
      });
    }
    return matched;
  });
  if (view != null && (_view$sort = view.sort) != null && _view$sort.property || view != null && (_view$sort2 = view.sort) != null && _view$sort2.direction) {
    var _view$sort3 = view.sort,
      property = _view$sort3.property,
      direction = _view$sort3.direction;
    var prop = property || filteredData.length && Object.keys(filteredData[0])[0];
    var sortDesc = direction === 'desc'; // default to asc
    var before = sortDesc ? -1 : 1;
    var after = sortDesc ? 1 : -1;
    filteredData.sort(function (d1, d2) {
      var d1Val = datumValue(d1, prop);
      var d2Val = datumValue(d2, prop);
      // sort strings via locale case insensitive
      if (typeof d1Val === 'string' && typeof d2Val === 'string' || typeof d1Val === 'string' && !d2Val || typeof d2Val === 'string' && !d1Val) {
        var sortResult = (d1Val || '').localeCompare(d2Val || '', undefined, {
          sensitivity: 'base'
        });
        return sortDesc ? -sortResult : sortResult;
      }
      // numbers are easier to sort
      if (d1Val > d2Val) return before;
      if (d1Val < d2Val) return after;
      return 0;
    });
  }
  var pagedData;
  if (view != null && view.step) {
    var _view$page;
    var start = view.step * (((_view$page = view == null ? void 0 : view.page) != null ? _view$page : 1) - 1);
    pagedData = filteredData.slice(start, start + view.step);
  }
  return {
    unfilteredData: data,
    data: pagedData || filteredData,
    total: data.length,
    filteredTotal: filteredData.length
  };
};