var _excluded = ["drop", "options"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }
import React, { useContext, useMemo, useState } from 'react';
import { Descend } from 'grommet-icons/icons/Descend';
import { DataContext } from '../../contexts/DataContext';
import { Box } from '../Box';
import { DataForm } from '../Data/DataForm';
import { DropButton } from '../DropButton';
import { DataFormContext } from '../../contexts/DataFormContext';
import { FormField } from '../FormField';
import { RadioButtonGroup } from '../RadioButtonGroup';
import { Select } from '../Select';
import { MessageContext } from '../../contexts/MessageContext';
import { DataSortPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';
var dropProps = {
  align: {
    top: 'bottom',
    left: 'left'
  }
};
var Content = function Content(_ref) {
  var optionsArg = _ref.options;
  var _useContext = useContext(DataContext),
    data = _useContext.data,
    dataId = _useContext.id,
    messages = _useContext.messages,
    properties = _useContext.properties;
  var _useContext2 = useContext(MessageContext),
    format = _useContext2.format;
  var options = useMemo(function () {
    return optionsArg || properties && Object.keys(properties).sort().filter(function (property) {
      var _properties$property;
      return !((properties == null || (_properties$property = properties[property]) == null ? void 0 : _properties$property.sort) === false);
    }) || data.length > 0 && Object.keys(data[0]).sort() || data;
  }, [data, optionsArg, properties]);
  var directionOptions = [{
    label: format({
      id: 'dataSort.ascending',
      messages: messages == null ? void 0 : messages.dataSort
    }),
    value: 'asc'
  }, {
    label: format({
      id: 'dataSort.descending',
      messages: messages == null ? void 0 : messages.dataSort
    }),
    value: 'desc'
  }];
  var sortPropertyId = dataId + "--sort-property";
  var sortDirectionId = dataId + "--sort-direction";
  return [/*#__PURE__*/React.createElement(FormField, {
    key: "by",
    htmlFor: sortPropertyId,
    label: format({
      id: 'dataSort.by',
      messages: messages == null ? void 0 : messages.dataSort
    })
  }, /*#__PURE__*/React.createElement(Select, {
    id: sortPropertyId,
    name: "_sort.property",
    options: options
  })), /*#__PURE__*/React.createElement(FormField, {
    key: "dir",
    htmlFor: sortDirectionId,
    label: format({
      id: 'dataSort.direction',
      messages: messages == null ? void 0 : messages.dataSort
    })
  }, /*#__PURE__*/React.createElement(RadioButtonGroup, {
    id: sortDirectionId,
    name: "_sort.direction",
    options: directionOptions
  }))];
};
export var DataSort = function DataSort(_ref2) {
  var _theme$data$button;
  var drop = _ref2.drop,
    options = _ref2.options,
    rest = _objectWithoutPropertiesLoose(_ref2, _excluded);
  var _useContext3 = useContext(DataContext),
    dataId = _useContext3.id,
    messages = _useContext3.messages;
  var _useContext4 = useContext(DataFormContext),
    inDataForm = _useContext4.inDataForm;
  var _useContext5 = useContext(MessageContext),
    format = _useContext5.format;
  var theme = useThemeValue();
  var _useState = useState(),
    showContent = _useState[0],
    setShowContent = _useState[1];
  var content = /*#__PURE__*/React.createElement(Content, {
    options: options
  });
  if (!inDataForm) content = /*#__PURE__*/React.createElement(DataForm, {
    footer: false,
    updateOn: "change"
  }, content);
  if (!drop) return content;
  var tip = format({
    id: 'dataSort.open',
    messages: messages == null ? void 0 : messages.dataSort
  });
  var control = /*#__PURE__*/React.createElement(DropButton, _extends({
    id: dataId + "--sort-control",
    "aria-label": tip,
    tip: tip,
    kind: (_theme$data$button = theme.data.button) == null ? void 0 : _theme$data$button.kind,
    icon: /*#__PURE__*/React.createElement(Descend, null),
    dropProps: dropProps,
    dropContent: /*#__PURE__*/React.createElement(Box, {
      pad: "small"
    }, content),
    open: showContent,
    onOpen: function onOpen() {
      return setShowContent(undefined);
    },
    onClose: function onClose() {
      return setShowContent(undefined);
    }
  }, rest));
  return control;
};
DataSort.propTypes = DataSortPropTypes;