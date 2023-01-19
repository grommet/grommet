var _excluded = ["drop", "children", "heading"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { Children, useContext, useMemo, useState } from 'react';
import { Filter } from 'grommet-icons/icons/Filter';
import { Box } from '../Box';
import { Button } from '../Button';
import { DataFilter } from '../DataFilter';
import { DataForm } from '../Data/DataForm';
import { DataSort } from '../DataSort';
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
  // touched is a map of form field name to its value, it only has fields that
  // were changed as part of the DataForm here. This is so we can track based
  // on what's inside DataFilters as opposed to trying to track from the view
  // object.
  var _useState2 = useState({}),
    touched = _useState2[0],
    setTouched = _useState2[1];
  var controlled = useMemo(function () {
    return drop;
  }, [drop]);
  // generate the badge value based on touched fields that have a value
  var badge = useMemo(function () {
    return controlled && Object.keys(touched).filter(function (k) {
      return touched[k];
    }).length || undefined;
  }, [controlled, touched]);
  var clearControl = badge && /*#__PURE__*/React.createElement(Box, {
    flex: false
  }, /*#__PURE__*/React.createElement(Button, {
    label: format({
      id: 'dataFilters.clear',
      messages: messages == null ? void 0 : messages.dataFilters
    }),
    onClick: function onClick() {
      setTouched({});
      clearFilters();
    }
  }));
  var filters;
  if (Children.count(children) === 0) {
    var filtersFor;
    if (!properties && data && data.length)
      // build from a piece of data, ignore object values
      filtersFor = Object.keys(data[0]).filter(function (k) {
        return typeof data[0][k] !== 'object';
      });else if (Array.isArray(properties)) filtersFor = properties;else if (typeof properties === 'object') filtersFor = Object.keys(properties);else filtersFor = [];
    filters = filtersFor.map(function (property) {
      return /*#__PURE__*/React.createElement(DataFilter, {
        key: property,
        property: property
      });
    });
    if (view != null && view.sort) {
      filters.push( /*#__PURE__*/React.createElement(DataSort, {
        key: "_sort"
      }));
    }
  }
  var content = /*#__PURE__*/React.createElement(DataForm, _extends({
    pad: controlled ? 'medium' : undefined,
    gap: "small",
    onDone: function onDone() {
      return setShowContent(false);
    },
    onTouched: controlled ? function (currentTouched) {
      return (
        // we merge this with our prior state to handle the case where the
        // user opens and closes the drop multiple times and we want to
        // track both new changes and prior changes.
        setTouched(function (prevTouched) {
          return _extends({}, prevTouched, currentTouched);
        })
      );
    } : undefined
  }, !controlled ? rest : {}), !drop && /*#__PURE__*/React.createElement(Header, null, /*#__PURE__*/React.createElement(Heading, {
    margin: "none",
    level: 2,
    size: "small"
  }, heading || format({
    id: 'dataFilters.heading',
    messages: messages == null ? void 0 : messages.dataFilters
  })), !controlled && clearControl), filters, children);
  if (!controlled) return content;

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