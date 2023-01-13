var _excluded = ["drop", "children", "heading"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { Children, useContext, useState } from 'react';
import { Filter } from 'grommet-icons/icons/Filter';
import { Box } from '../Box';
import { Button } from '../Button';
import { DataFilter } from '../DataFilter';
import { DataForm } from '../Data/DataForm';
import { DropButton } from '../DropButton';
import { Header } from '../Header';
import { Heading } from '../Heading';
import { DataContext } from '../../contexts/DataContext';
import { MessageContext } from '../../contexts/MessageContext';
import { DataFiltersPropTypes } from './propTypes';
var dropProps = {
  align: {
    top: 'bottom',
    right: 'right'
  }
};
export var DataFilters = function DataFilters(_ref) {
  var drop = _ref.drop,
    children = _ref.children,
    heading = _ref.heading,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = useContext(DataContext),
    clearFilters = _useContext.clearFilters,
    data = _useContext.data,
    messages = _useContext.messages,
    properties = _useContext.properties,
    view = _useContext.view;
  var _useContext2 = useContext(MessageContext),
    format = _useContext2.format;
  var _useState = useState(),
    showContent = _useState[0],
    setShowContent = _useState[1];
  var controlled = drop;
  var clearControl = clearFilters && /*#__PURE__*/React.createElement(Box, {
    flex: false
  }, /*#__PURE__*/React.createElement(Button, {
    label: format({
      id: 'dataFilters.clear',
      messages: messages == null ? void 0 : messages.dataFilters
    }),
    onClick: clearFilters
  }));
  var filters;
  if (Children.count(children) === 0) {
    var filtersFor;
    if (!properties && data && data.length) filtersFor = Object.keys(data[0]);else if (Array.isArray(properties)) filtersFor = properties;else if (typeof properties === 'object') filtersFor = Object.keys(properties);else filtersFor = [];
    filters = filtersFor.map(function (property) {
      return /*#__PURE__*/React.createElement(DataFilter, {
        key: property,
        property: property
      });
    });
  }
  var content = /*#__PURE__*/React.createElement(DataForm, _extends({
    pad: controlled ? 'medium' : undefined,
    gap: "small",
    onDone: function onDone() {
      return setShowContent(false);
    }
  }, !controlled ? rest : {}), !drop && /*#__PURE__*/React.createElement(Header, null, /*#__PURE__*/React.createElement(Heading, {
    margin: "none",
    level: 2,
    size: "small"
  }, heading || format({
    id: 'dataFilters.heading',
    messages: messages == null ? void 0 : messages.dataFilters
  })), !controlled && clearControl), filters, children);
  if (!controlled) return content;
  var badge = 0;
  if (view != null && view.properties) badge += Object.keys(view.properties).length;
  if (view != null && view.search) badge += 1;
  if (view != null && view.sort) badge += 1;
  if (!badge) badge = undefined;

  // drop
  var control = /*#__PURE__*/React.createElement(DropButton, {
    "aria-label": format({
      id: 'dataFilters.open',
      messages: messages == null ? void 0 : messages.dataFilters
    }),
    kind: "toolbar",
    icon: /*#__PURE__*/React.createElement(Filter, null),
    dropProps: dropProps,
    dropContent: content,
    badge: badge,
    open: showContent,
    onOpen: function onOpen() {
      return setShowContent(undefined);
    },
    onClose: function onClose() {
      return setShowContent(undefined);
    }
  });
  return /*#__PURE__*/React.createElement(Box, _extends({
    flex: false,
    direction: "row",
    gap: "small"
  }, rest), control, clearControl);
};
DataFilters.propTypes = DataFiltersPropTypes;