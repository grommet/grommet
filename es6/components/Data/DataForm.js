var _excluded = ["children", "footer", "gap", "onDone", "onTouched", "pad"];
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useContext, useEffect, useState } from 'react';
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
var hideButtonProps = {
  'aria-hidden': true,
  disabled: true,
  tabIndex: -1
};

// We convert the view structure to something more flat to work better
// with the Form inputs. These keys are how we flatten the Form value object
// from the view object.
var formSearchKey = '_search';
var formSortKey = '_sort';
var formRangeKey = '_range';
var formStepKey = '_step';
var formPageKey = '_page';
var viewFormKeyMap = {
  search: formSearchKey,
  sort: formSortKey,
  step: formStepKey,
  page: formPageKey
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
  return result;
};

// converts from the internal Form value format to the external view format
var formValueToView = function formValueToView(value) {
  var result = {};
  var valueCopy = _extends({}, value);
  Object.keys(viewFormKeyMap).forEach(function (key) {
    if (valueCopy[viewFormKeyMap[key]]) {
      result[key] = valueCopy[viewFormKeyMap[key]];
      delete valueCopy[viewFormKeyMap[key]];
    }
  });
  result.properties = valueCopy;

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
var clearEmpty = function clearEmpty(properties) {
  Object.keys(properties).filter(function (k) {
    return k !== formSearchKey;
  }).forEach(function (k) {
    if (Array.isArray(properties[k]) && properties[k].length === 0)
      // eslint-disable-next-line no-param-reassign
      delete properties[k];
  });
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
    result[key] = value[key];
  });
  return result;
};
export var DataForm = function DataForm(_ref) {
  var children = _ref.children,
    footer = _ref.footer,
    gap = _ref.gap,
    onDone = _ref.onDone,
    onTouched = _ref.onTouched,
    pad = _ref.pad,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = useContext(DataContext),
    messages = _useContext.messages,
    onView = _useContext.onView,
    updateOn = _useContext.updateOn,
    view = _useContext.view;
  var _useContext2 = useContext(MessageContext),
    format = _useContext2.format;
  var _useState = useState(viewToFormValue(view)),
    formValue = _useState[0],
    setFormValue = _useState[1];
  var _useState2 = useState(),
    changed = _useState2[0],
    setChanged = _useState2[1];
  useEffect(function () {
    return setFormValue(viewToFormValue(view));
  }, [view]);
  return /*#__PURE__*/React.createElement(Form, _extends({}, rest, {
    value: formValue,
    onSubmit: updateOn === 'submit' ? function (_ref2) {
      var nextValue = _ref2.value,
        touched = _ref2.touched;
      clearEmpty(nextValue);
      resetPage(nextValue, formValue);
      setFormValue(nextValue);
      setChanged(false);
      if (onTouched) onTouched(transformTouched(touched, nextValue));
      onView(formValueToView(nextValue));
      if (onDone) onDone();
    } : undefined,
    onChange: function onChange(nextValue, _ref3) {
      var touched = _ref3.touched;
      clearEmpty(nextValue);
      resetPage(nextValue, formValue);
      setFormValue(nextValue);
      setChanged(true);
      if (updateOn === 'change') {
        if (onTouched) onTouched(transformTouched(touched, nextValue));
        onView(formValueToView(nextValue));
      }
    }
  }), /*#__PURE__*/React.createElement(Box, {
    flex: false,
    pad: pad,
    gap: gap
  }, children, footer !== false && updateOn === 'submit' && /*#__PURE__*/React.createElement(Footer, null, /*#__PURE__*/React.createElement(Button, {
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
    onClick: function onClick() {
      setFormValue(viewToFormValue(view));
      setChanged(false);
    }
  }, !changed ? hideButtonProps : {})))));
};