var _excluded = ["children", "options", "property", "range"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { useContext, useMemo, useState } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { DataForm } from '../Data/DataForm';
import { FormField } from '../FormField';
import { CheckBoxGroup } from '../CheckBoxGroup';
import { RangeSelector } from '../RangeSelector';
import { SelectMultiple } from '../SelectMultiple';
import { DataFilterPropTypes } from './propTypes';
import { getDecimalCount } from '../RangeSelector/RangeSelector';
import { DataFormContext } from '../../contexts/DataFormContext';

// empirical constants for when we change inputs
var maxCheckBoxGroupOptions = 4;
var minSelectSearchOptions = 10;
var defaultRangeSteps = 20;
var _getValueAt = function getValueAt(valueObject, pathArg) {
  if (!pathArg || valueObject === undefined) return undefined;
  var path = Array.isArray(pathArg) ? pathArg : pathArg.split('.');
  if (path.length === 1) return valueObject[path];
  return _getValueAt(valueObject[path.shift()], path);
};
var generateOptions = function generateOptions(data, property) {
  return Array.from(new Set(data.map(function (d) {
    return _getValueAt(d, property);
  }))).filter(function (v) {
    return v !== undefined && v !== '';
  })
  // ensure number values are sorted appropriately
  // [132, 15, 100] --> [15, 100, 132]
  // empty sort() would result in [100, 132, 15]
  .sort(function (a, b) {
    if (typeof a === 'number' && typeof b === 'number') return a - b;
    if (typeof a === 'string' && typeof b === 'string' || typeof a === 'boolean' && typeof b === 'boolean') return a < b ? -1 : 1;
    return 0;
  });
};

// ensure floating point calculations are in integers
var alignMax = function alignMax(value, interval) {
  var multiplier = Math.pow(10, Math.max(getDecimalCount(value), getDecimalCount(interval)));
  var integerValue = value * multiplier;
  var integerInterval = interval * multiplier;
  if (value > 0) return (integerValue - integerValue % integerInterval + integerInterval) / multiplier;
  if (value < 0) return (integerValue + integerValue % integerInterval) / multiplier;
  return value;
};

// ensure floating point calculations are in integers
var alignMin = function alignMin(value, interval) {
  var multiplier = Math.pow(10, Math.max(getDecimalCount(value), getDecimalCount(interval)));
  var integerValue = value * multiplier;
  var integerInterval = interval * multiplier;
  if (value > 0) return (integerValue - integerValue % integerInterval) / multiplier;
  if (value < 0) return (integerValue - integerValue % integerInterval - integerInterval) / multiplier;
  return value;
};
var booleanOptions = [{
  label: 'true',
  value: true
}, {
  label: 'false',
  value: false
}];
export var DataFilter = function DataFilter(_ref) {
  var _properties$property3, _properties$property5;
  var children = _ref.children,
    optionsProp = _ref.options,
    property = _ref.property,
    rangeProp = _ref.range,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = useContext(DataContext),
    data = _useContext.data,
    dataId = _useContext.id,
    properties = _useContext.properties,
    unfilteredData = _useContext.unfilteredData;
  var _useContext2 = useContext(DataFormContext),
    inDataForm = _useContext2.inDataForm;
  var _useState = useState(''),
    searchText = _useState[0],
    setSearchText = _useState[1];
  var _useMemo = useMemo(function () {
      var _properties$property, _properties$property2;
      if (children) return [undefined, undefined]; // caller driving

      var optionsIn = optionsProp || (properties == null || (_properties$property = properties[property]) == null ? void 0 : _properties$property.options);
      var rangeIn = rangeProp || (properties == null || (_properties$property2 = properties[property]) == null ? void 0 : _properties$property2.range);
      if (optionsIn) return [optionsIn, undefined];
      if (rangeIn && 'min' in rangeIn && 'max' in rangeIn) return [undefined, [rangeIn.min, rangeIn.max]];

      // generate options from all values for property
      var uniqueValues = generateOptions(unfilteredData || data, property);
      // if less than two values, nothing to filter
      if (uniqueValues.length < 2) return [undefined, undefined];
      // if any values aren't numeric, treat as options
      if (uniqueValues.some(function (v) {
        return v !== undefined && typeof v !== 'number';
      })) return [uniqueValues, undefined];
      // all values are numeric, treat as range
      var delta = uniqueValues[uniqueValues.length - 1] - uniqueValues[0];
      var interval = Number.parseFloat((delta / 3).toPrecision(1));
      var min = uniqueValues[0];
      var max = uniqueValues[uniqueValues.length - 1];
      // normalize to make it friendler, so [1.3, 4.895] becomes [1, 5]
      if (getDecimalCount(min) > 0 || getDecimalCount(max) > 0) {
        min = alignMin(min, interval);
        max = alignMax(max, interval);
      }
      return [undefined, [min, max]];
    }, [children, data, optionsProp, properties, property, rangeProp, unfilteredData]),
    options = _useMemo[0],
    range = _useMemo[1];
  var searchedOptions = useMemo(function () {
    if (!searchText) return options;
    // The line below escapes regular expression special characters:
    // [ \ ^ $ . | ? * + ( )
    var escapedText = searchText.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    // Create the regular expression with modified value which
    // handles escaping special characters. Without escaping special
    // characters, errors will appear in the console
    var exp = new RegExp(escapedText, 'i');
    return options.filter(function (o) {
      return typeof o === 'string' ? exp.test(o) : exp.test(o.label);
    });
  }, [options, searchText]);
  var id = dataId + "-" + property;

  // only add aria-label for no form examples
  var ariaLabel = !inDataForm ? "" + ((properties == null || (_properties$property3 = properties[property]) == null ? void 0 : _properties$property3.label) || property) : undefined;
  var content = children;
  if (!content) {
    if (range) {
      var _properties$property4;
      var step =
      // from `range` on DataFilter
      (rangeProp == null ? void 0 : rangeProp.step) || (// from range in Data `properties`
      properties == null || (_properties$property4 = properties[property]) == null || (_properties$property4 = _properties$property4.range) == null ? void 0 : _properties$property4.step);
      if (!step) {
        // avoid floating point issues where 4.4 - 2 returns 2.4000000000000004
        // and instead return 2.4 by doing calculations in integers then
        // restore order of magnitude
        var multiplicationFactor = Math.pow(10, Math.max(getDecimalCount(range[1]), getDecimalCount(range[0])));
        var delta = (range[1] * multiplicationFactor - range[0] * multiplicationFactor) / multiplicationFactor;
        // avoid floating point issues where
        // 0.012 / 20 returns 0.0006000000000000001
        // and instead return 0.0006
        // or 2.8 / 20 returns 0.13999999999999999
        // and istead return 0.14
        var decimalCount = getDecimalCount(delta);
        if (decimalCount) {
          var multiplier = Math.pow(10, decimalCount);
          step = multiplier * delta / (multiplier * defaultRangeSteps);
        } else step = delta / defaultRangeSteps;
      }
      content = /*#__PURE__*/React.createElement(RangeSelector, {
        "aria-label": ariaLabel,
        id: id,
        name: property + "._range",
        defaultValues: range,
        label: true,
        min: range[0],
        max: range[1],
        step: step,
        size: "full",
        round: "small"
      });
    } else if (options) {
      if (options.length === 2 && options[1] === true && options[0] === false) {
        // special case boolean properties
        content = /*#__PURE__*/React.createElement(CheckBoxGroup, {
          "aria-label": ariaLabel,
          id: id,
          name: property,
          options: booleanOptions
        });
      } else if (options.length <= maxCheckBoxGroupOptions) {
        content = /*#__PURE__*/React.createElement(CheckBoxGroup, {
          "aria-label": ariaLabel,
          id: id,
          name: property,
          options: options
        });
      } else {
        content = /*#__PURE__*/React.createElement(SelectMultiple, {
          "aria-label": ariaLabel,
          id: id,
          dropHeight: "medium",
          name: property,
          showSelectedInline: true,
          options: searchedOptions,
          onSearch: options.length >= minSelectSearchOptions ? setSearchText : undefined,
          onClose: function onClose() {
            return setSearchText('');
          },
          labelKey: "label",
          valueKey: {
            key: 'value',
            reduce: true
          }
        });
      }
    }
  }
  if (!content) return null;
  if (!inDataForm)
    // likely in Toolbar
    content = /*#__PURE__*/React.createElement(DataForm, {
      footer: false,
      updateOn: "change"
    }, content);else content = /*#__PURE__*/React.createElement(FormField, _extends({
    htmlFor: id,
    name: property,
    label: (properties == null || (_properties$property5 = properties[property]) == null ? void 0 : _properties$property5.label) || property
  }, rest), content);
  return content;
};
DataFilter.propTypes = DataFilterPropTypes;