var _excluded = ["children", "options", "property", "range"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useContext, useMemo, useRef, useState } from 'react';
import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';
import { DataContext } from '../../contexts/DataContext';
import { Box } from '../Box';
import { FormField } from '../FormField';
import { CheckBoxGroup } from '../CheckBoxGroup';
import { RangeSelector } from '../RangeSelector';
import { SelectMultiple } from '../SelectMultiple';
import { Text } from '../Text';
import { DataFilterPropTypes } from './propTypes';
var generateOptions = function generateOptions(data, property) {
  return Array.from(new Set(data.map(function (d) {
    return d[property];
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
  var _properties$property4;
  var children = _ref.children,
    optionsProp = _ref.options,
    property = _ref.property,
    rangeProp = _ref.range,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = useContext(DataContext),
    dataId = _useContext.id,
    properties = _useContext.properties,
    unfilteredData = _useContext.unfilteredData,
    view = _useContext.view;
  var maxRef = useRef();
  var minRef = useRef();
  var options = useMemo(function () {
    var _properties$property, _properties$property2;
    if (children) return undefined; // caller driving
    if (optionsProp) return optionsProp; // caller setting
    // Data properties setting
    if (properties != null && (_properties$property = properties[property]) != null && _properties$property.options) return properties[property].options;
    // skip if we have a range
    if (rangeProp || properties != null && (_properties$property2 = properties[property]) != null && _properties$property2.range) return undefined;

    // generate options from all values for property
    var uniqueValues = generateOptions(unfilteredData, property);
    // if any values aren't numeric, treat as options
    if (uniqueValues.some(function (v) {
      return v && typeof v !== 'number';
    })) return uniqueValues;
    // if all values are numeric, let range take care of it
    return undefined;
  }, [children, optionsProp, properties, property, rangeProp, unfilteredData]);
  var range = useMemo(function () {
    var _properties$property3;
    if (children) return undefined; // caller driving
    if (rangeProp) return rangeProp; // caller setting
    // Data properties setting
    if (properties != null && (_properties$property3 = properties[property]) != null && _properties$property3.range) {
      var _properties$property$ = properties[property].range,
        _min = _properties$property$.min,
        _max = _properties$property$.max;
      return [_min, _max];
    }
    // skip if we have options
    if (options) return undefined;

    // generate range from all values for the property
    var uniqueValues = generateOptions(unfilteredData, property).sort();
    // normalize to make it friendler, so [1.3, 4.895] becomes [1, 5]
    var delta = uniqueValues[uniqueValues.length - 1] - uniqueValues[0];
    var interval = Number.parseFloat((delta / 3).toPrecision(1));
    var min = alignMin(uniqueValues[0], interval);
    var max = alignMax(uniqueValues[uniqueValues.length - 1], interval);
    return [min, max];
  }, [children, options, properties, property, rangeProp, unfilteredData]);

  // track range values so we can display them
  var _useState = useState(function () {
      var _view$properties;
      if (!range) return undefined;
      var _ref2 = (view == null ? void 0 : (_view$properties = view.properties) == null ? void 0 : _view$properties[property]) || {},
        min = _ref2.min,
        max = _ref2.max;
      return [min || range[0], max || range[1]];
    }, [range, view]),
    rangeValues = _useState[0],
    setRangeValues = _useState[1];

  // keep the text values size consistent
  useLayoutEffect(function () {
    if (maxRef.current && minRef.current) {
      var width = Math.max(maxRef.current.getBoundingClientRect().width, minRef.current.getBoundingClientRect().width);
      maxRef.current.style.width = width + "px";
      minRef.current.style.width = width + "px";
    }
  });
  var id = dataId + "-" + property;
  var content = children;
  if (!content) {
    if (range) {
      // consider moving the Text values inside RangeSelector
      content = /*#__PURE__*/React.createElement(Box, {
        direction: "row",
        justify: "between",
        align: "center",
        pad: "xsmall",
        gap: "small"
      }, /*#__PURE__*/React.createElement(Text, {
        ref: minRef,
        size: "small"
      }, rangeValues[0]), /*#__PURE__*/React.createElement(RangeSelector, {
        id: id,
        name: property + "._range",
        defaultValues: range,
        direction: "horizontal",
        invert: false,
        min: range[0],
        max: range[1],
        step: (range[1] - range[0]) / 20,
        size: "full",
        round: "small",
        onChange: setRangeValues
      }), /*#__PURE__*/React.createElement(Text, {
        ref: maxRef,
        size: "small"
      }, rangeValues[1]));
    } else if (options.length === 2 && options[1] === true && options[0] === false) {
      // special case boolean properties
      content = /*#__PURE__*/React.createElement(CheckBoxGroup, {
        id: id,
        name: property,
        options: booleanOptions
      });
    } else if (options.length < 7) {
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
        options: options
      });
    }
  }
  return /*#__PURE__*/React.createElement(FormField, _extends({
    htmlFor: id,
    name: property,
    label: (properties == null ? void 0 : (_properties$property4 = properties[property]) == null ? void 0 : _properties$property4.label) || property
  }, rest), content);
};
DataFilter.propTypes = DataFilterPropTypes;