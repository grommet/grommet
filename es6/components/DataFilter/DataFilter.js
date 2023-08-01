var _excluded = ["children", "options", "property", "range"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useContext, useMemo, useState } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { DataForm } from '../Data/DataForm';
import { FormContext } from '../Form/FormContext';
import { FormField } from '../FormField';
import { CheckBoxGroup } from '../CheckBoxGroup';
import { RangeSelector } from '../RangeSelector';
import { SelectMultiple } from '../SelectMultiple';
import { DataFilterPropTypes } from './propTypes';

// empirical constants for when we change inputs
var maxCheckBoxGroupOptions = 4;
var minSelectSearchOptions = 10;
var getValueAt = function getValueAt(valueObject, pathArg) {
  if (valueObject === undefined) return undefined;
  var path = Array.isArray(pathArg) ? pathArg : pathArg.split('.');
  if (path.length === 1) return valueObject[path];
  return getValueAt(valueObject[path.shift()], path);
};
var generateOptions = function generateOptions(data, property) {
  return Array.from(new Set(data.map(function (d) {
    return getValueAt(d, property);
  }))).filter(function (v) {
    return v !== undefined && v !== '';
  }).sort();
};
var alignMax = function alignMax(value, interval) {
  if (value > 0) return value - value % interval + interval;
  if (value < 0) return value + value % interval;
  return value;
};
var alignMin = function alignMin(value, interval) {
  if (value > 0) return value - value % interval;
  if (value < 0) return value - value % interval - interval;
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
  var _properties$property3;
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
  var _useContext2 = useContext(FormContext),
    noForm = _useContext2.noForm;
  var _useState = useState(''),
    searchText = _useState[0],
    setSearchText = _useState[1];
  var _useMemo = useMemo(function () {
      var _properties$property, _properties$property2;
      if (children) return [undefined, undefined]; // caller driving

      var optionsIn = optionsProp || (properties == null || (_properties$property = properties[property]) == null ? void 0 : _properties$property.options);
      var rangeIn = rangeProp || (properties == null || (_properties$property2 = properties[property]) == null ? void 0 : _properties$property2.range);
      if (optionsIn) return [optionsIn, undefined];
      if (rangeIn) return [undefined, [rangeIn.min, rangeIn.max]];

      // generate options from all values for property
      var uniqueValues = generateOptions(unfilteredData || data, property);
      // if less than two values, nothing to filter
      if (uniqueValues.length < 2) return [undefined, undefined];
      // if any values aren't numeric, treat as options
      if (uniqueValues.some(function (v) {
        return v !== undefined && typeof v !== 'number';
      })) return [uniqueValues, undefined];
      // all values are numeric, treat as range
      // normalize to make it friendler, so [1.3, 4.895] becomes [1, 5]
      var delta = uniqueValues[uniqueValues.length - 1] - uniqueValues[0];
      var interval = Number.parseFloat((delta / 3).toPrecision(1));
      var min = alignMin(uniqueValues[0], interval);
      var max = alignMax(uniqueValues[uniqueValues.length - 1], interval);
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
  var content = children;
  if (!content) {
    if (range) {
      content = /*#__PURE__*/React.createElement(RangeSelector, {
        id: id,
        name: property + "._range",
        defaultValues: range,
        label: true,
        min: range[0],
        max: range[1],
        step: (range[1] - range[0]) / 20,
        size: "full",
        round: "small"
      });
    } else if (options) {
      if (options.length === 2 && options[1] === true && options[0] === false) {
        // special case boolean properties
        content = /*#__PURE__*/React.createElement(CheckBoxGroup, {
          id: id,
          name: property,
          options: booleanOptions
        });
      } else if (options.length <= maxCheckBoxGroupOptions) {
        content = /*#__PURE__*/React.createElement(CheckBoxGroup, {
          id: id,
          name: property,
          options: options
        });
      } else {
        content = /*#__PURE__*/React.createElement(SelectMultiple, {
          id: id,
          name: property,
          showSelectedInline: true,
          options: searchedOptions,
          onSearch: options.length >= minSelectSearchOptions ? setSearchText : undefined,
          onClose: function onClose() {
            return setSearchText('');
          }
        });
      }
    }
  }
  if (!content) return null;
  if (noForm)
    // likely in Toolbar
    content = /*#__PURE__*/React.createElement(DataForm, {
      footer: false,
      updateOn: "change"
    }, content);else content = /*#__PURE__*/React.createElement(FormField, _extends({
    htmlFor: id,
    name: property,
    label: (properties == null || (_properties$property3 = properties[property]) == null ? void 0 : _properties$property3.label) || property
  }, rest), content);
  return content;
};
DataFilter.propTypes = DataFilterPropTypes;