var _excluded = ["children", "footer", "onDone", "onTouched", "pad", "updateOn"];
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box } from '../Box';
import { Button } from '../Button';
import { Footer } from '../Footer';
import { Form } from '../Form';
import { DataContext } from '../../contexts/DataContext';
import { MessageContext } from '../../contexts/MessageContext';
var HideableButton = styled(Button).withConfig({
  displayName: "DataForm__HideableButton",
  componentId: "sc-v64e1r-0"
})(["", ""], function (props) {
  return props.disabled && "\n  opacity: 0;";
});
var MaxForm = styled(Form).withConfig({
  displayName: "DataForm__MaxForm",
  componentId: "sc-v64e1r-1"
})(["max-width:100%;", ""], function (props) {
  return props.fill && 'max-height: 100%;';
});
var hideButtonProps = {
  'aria-hidden': true,
  disabled: true,
  tabIndex: -1
};

// We convert the view structure to something more flat to work better
// with the Form inputs. These keys are how we flatten the Form value object
// from the view object.
export var formSearchKey = '_search';
export var formSortKey = '_sort';
export var formRangeKey = '_range';
export var formStepKey = '_step';
export var formPageKey = '_page';
export var formColumnsKey = '_columns';
export var formGroupByKey = '_groupBy';
export var formViewNameKey = '_view';
var viewFormKeyMap = {
  search: formSearchKey,
  sort: formSortKey,
  step: formStepKey,
  page: formPageKey,
  columns: formColumnsKey,
  groupBy: formGroupByKey,
  view: formViewNameKey
};

// flatten nested objects.
// For example: { a: { b: v, c: z } } -> { 'a.b': v, 'a.c': z }
var flatten = function flatten(formValue, options) {
  var result = JSON.parse(JSON.stringify(formValue));
  Object.keys(result).forEach(function (i) {
    // We check the type of the i using
    // typeof() function and recursively
    // call the function again
    // ignore _range situations
    if (typeof result[i] === 'object' && !Array.isArray(result[i]) && (options != null && options.full || !result[i][formRangeKey])) {
      var temp = flatten(result[i]);
      Object.keys(temp).forEach(function (j) {
        // Store temp in result
        // ignore empty arrays
        if (!Array.isArray(temp[j]) || Array.isArray(temp[j]) && temp[j].length) result[i + "." + j] = temp[j];
      });
      delete result[i];
    }
  });
  return result;
};

// unflatten nested objects. For example: { 'a.b': v } -> { a: { b: v } }
var unflatten = function unflatten(formValue) {
  var result = JSON.parse(JSON.stringify(formValue));
  var specialKeys = Object.values(viewFormKeyMap);
  Object.keys(result).filter(function (k) {
    return !specialKeys.includes(k);
  }).forEach(function (k) {
    var parts = k.split('.');
    var val = result[k];
    delete result[k];
    var parent = result;
    while (parts.length > 1) {
      var sub = parts.shift();
      if (!parent[sub]) parent[sub] = {};
      parent = parent[sub];
    }
    parent[parts.shift()] = val;
  });
  return result;
};

// converts from the external view format to the internal Form value format
var viewToFormValue = function viewToFormValue(view) {
  var result = _extends({}, (view == null ? void 0 : view.properties) || {});
  // convert { min: , max: } range to [min, max] for RangeSelector
  Object.keys(result).forEach(function (key) {
    var _result$key, _result$key2;
    if (typeof ((_result$key = result[key]) == null ? void 0 : _result$key.min) === 'number' || typeof ((_result$key2 = result[key]) == null ? void 0 : _result$key2.max) === 'number') {
      var _result$key3;
      result[key] = (_result$key3 = {}, _result$key3[formRangeKey] = [result[key].min, result[key].max], _result$key3);
    }
  });

  // convert formal view keys to their form '_' prefixed counterparts
  Object.keys(viewFormKeyMap).forEach(function (key) {
    if (view != null && view[key]) result[viewFormKeyMap[key]] = view[key];
  });
  // always have some blank search text
  if (!result[formSearchKey]) result[formSearchKey] = '';
  if (view != null && view.sort) result[formSortKey] = view.sort;
  if (view != null && view.name) result[formViewNameKey] = view.name;
  if (view != null && view.columns) result[formColumnsKey] = view.columns;
  if (view != null && view.groupBy) result[formGroupByKey] = view.groupBy;
  return unflatten(result);
};

// converts from the internal Form value format to the external view format
var formValueToView = function formValueToView(value, views) {
  var result = {};

  // if the user chose a view, use that
  if (value[formViewNameKey]) result = JSON.parse(JSON.stringify(views.find(function (v) {
    return v.name === value[formViewNameKey];
  })));
  var valueCopy = _extends({}, value);
  Object.keys(viewFormKeyMap).forEach(function (key) {
    if (valueCopy[viewFormKeyMap[key]]) {
      result[key] = valueCopy[viewFormKeyMap[key]];
    }
    delete valueCopy[viewFormKeyMap[key]];
  });

  // flatten any nested objects
  var flatValue = flatten(valueCopy);
  result.properties = _extends({}, result.properties || {}, flatValue);

  // convert any ranges
  Object.keys(result.properties).forEach(function (key) {
    if (result.properties[key][formRangeKey]) {
      result.properties[key] = {
        min: result.properties[key][formRangeKey][0],
        max: result.properties[key][formRangeKey][1]
      };
    }
  });
  return result;
};

// remove any empty arrays of property values by deleting the key for
// that property in the view properties
var clearEmpty = function clearEmpty(formValue) {
  var value = formValue;
  Object.keys(value).forEach(function (k) {
    if (Array.isArray(value[k]) && value[k].length === 0) delete value[k];
  });
  return value;
};

// if paging, when anything other than the page changes, reset the page to 1
var resetPage = function resetPage(nextFormValue, prevFormValue) {
  if (prevFormValue[formPageKey] && prevFormValue[formPageKey] > 1)
    // eslint-disable-next-line no-param-reassign
    nextFormValue[formPageKey] = 1;
};
var transformTouched = function transformTouched(touched, value) {
  var result = {};
  Object.keys(touched).forEach(function (key) {
    // special case _range fields
    var parts = key.split('.');
    if (parts[1] === formRangeKey) result[key] = value[parts[0]];else result[key] = flatten(value, {
      full: true
    })[key];
  });
  return result;
};

// function shared by onSubmit and onChange to coordinate view
// name changes
var normalizeValue = function normalizeValue(nextValue, prevValue, views) {
  if (nextValue[formViewNameKey] && nextValue[formViewNameKey] !== prevValue[formViewNameKey]) {
    // view name changed, reset view contents from named view
    return viewToFormValue(views.find(function (v) {
      return v.name === nextValue[formViewNameKey];
    }));
  }
  // something else changed

  // clear empty properties
  var result = clearEmpty(nextValue);

  // if we have a view and something related to it changed, clear the view
  if (result[formViewNameKey]) {
    var view = views.find(function (v) {
      return v.name === result[formViewNameKey];
    });
    var viewValue = viewToFormValue(view);
    clearEmpty(viewValue);
    if (Object.keys(viewValue).some(function (k) {
      return (
        // allow mismatch between empty and set strings
        viewValue[k] && result[k] && JSON.stringify(result[k]) !== JSON.stringify(viewValue[k])
      );
    })) {
      delete result[formViewNameKey];
    }
  }
  return result;
};
export var DataForm = function DataForm(_ref) {
  var children = _ref.children,
    footer = _ref.footer,
    onDone = _ref.onDone,
    onTouched = _ref.onTouched,
    pad = _ref.pad,
    updateOnProp = _ref.updateOn,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = useContext(DataContext),
    messages = _useContext.messages,
    onView = _useContext.onView,
    updateOnData = _useContext.updateOn,
    view = _useContext.view,
    views = _useContext.views;
  var updateOn = updateOnProp != null ? updateOnProp : updateOnData;
  var _useContext2 = useContext(MessageContext),
    format = _useContext2.format;
  var _useState = useState(viewToFormValue(view)),
    formValue = _useState[0],
    setFormValue = _useState[1];
  var _useState2 = useState(),
    changed = _useState2[0],
    setChanged = _useState2[1];
  var onSubmit = useCallback(function (_ref2) {
    var value = _ref2.value,
      touched = _ref2.touched;
    var nextValue = normalizeValue(value, formValue, views);
    resetPage(nextValue, formValue);
    setFormValue(nextValue);
    setChanged(false);
    if (onTouched) onTouched(transformTouched(touched, nextValue));
    onView(formValueToView(nextValue, views));
    if (onDone) onDone();
  }, [formValue, onDone, onTouched, onView, views]);
  var onChange = useCallback(function (value, _ref3) {
    var touched = _ref3.touched;
    var nextValue = normalizeValue(value, formValue, views);
    resetPage(nextValue, formValue);
    setFormValue(nextValue);
    setChanged(true);
    if (updateOn === 'change') {
      if (onTouched) onTouched(transformTouched(touched, nextValue));
      onView(formValueToView(nextValue, views));
    }
  }, [formValue, onTouched, onView, updateOn, views]);
  var onReset = useCallback(function () {
    setFormValue(viewToFormValue(view));
    setChanged(false);
  }, [view]);
  useEffect(function () {
    return setFormValue(viewToFormValue(view));
  }, [view]);
  var content = children;
  if (footer !== false && updateOn === 'submit' || pad) {
    content = /*#__PURE__*/React.createElement(Box, {
      fill: "vertical"
    }, /*#__PURE__*/React.createElement(Box, {
      flex: true,
      overflow: "auto",
      pad: {
        horizontal: pad,
        top: pad
      }
    }, /*#__PURE__*/React.createElement(Box, {
      flex: false
    }, content)), footer !== false && updateOn === 'submit' && /*#__PURE__*/React.createElement(Footer, {
      flex: false,
      margin: {
        top: 'small'
      },
      pad: {
        horizontal: pad,
        bottom: pad
      },
      gap: "small"
    }, /*#__PURE__*/React.createElement(Button, {
      label: format({
        id: 'dataForm.submit',
        messages: messages == null ? void 0 : messages.dataForm
      }),
      type: "submit",
      primary: true
    }), /*#__PURE__*/React.createElement(HideableButton, _extends({
      label: format({
        id: 'dataForm.reset',
        messages: messages == null ? void 0 : messages.dataForm
      }),
      type: "reset",
      onClick: onReset
    }, !changed ? hideButtonProps : {}))));
  }
  return /*#__PURE__*/React.createElement(MaxForm, _extends({}, rest, {
    value: formValue,
    onSubmit: updateOn === 'submit' ? onSubmit : undefined,
    onChange: onChange
  }), content);
};