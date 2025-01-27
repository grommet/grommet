var _excluded = ["drop", "children", "clearFilters", "heading", "layer", "updateOn"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { Children, useContext, useEffect, useMemo, useState } from 'react';
import { Filter } from 'grommet-icons/icons/Filter';
import { Close } from 'grommet-icons/icons/Close';
import { Box } from '../Box';
import { Button } from '../Button';
import { DataClearFilters } from '../DataClearFilters';
import { DataFilter } from '../DataFilter';
import { DataForm } from '../Data/DataForm';
import { DropButton } from '../DropButton';
import { Header } from '../Header';
import { Heading } from '../Heading';
import { Layer } from '../Layer';
import { DataContext } from '../../contexts/DataContext';
import { MessageContext } from '../../contexts/MessageContext';
import { DataFiltersPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';
var dropProps = {
  align: {
    top: 'bottom',
    right: 'right'
  }
};
var layerProps = {
  full: 'vertical',
  position: 'right'
};
var defaultTouched = {};
export var DataFilters = function DataFilters(_ref) {
  var drop = _ref.drop,
    children = _ref.children,
    _ref$clearFilters = _ref.clearFilters,
    clearFilters = _ref$clearFilters === void 0 ? true : _ref$clearFilters,
    heading = _ref.heading,
    layer = _ref.layer,
    updateOn = _ref.updateOn,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = useContext(DataContext),
    dataId = _useContext.id,
    messages = _useContext.messages,
    properties = _useContext.properties,
    unfilteredData = _useContext.unfilteredData,
    filtersCleared = _useContext.filtersCleared,
    setFiltersCleared = _useContext.setFiltersCleared,
    view = _useContext.view;
  var _useContext2 = useContext(MessageContext),
    format = _useContext2.format;
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  var _useState = useState(),
    showContent = _useState[0],
    setShowContent = _useState[1];
  // touched is a map of property to its value based on if user interacts
  // with a filter or a view applies of set of filters
  var _useState2 = useState(defaultTouched),
    touched = _useState2[0],
    setTouched = _useState2[1];

  // if filters have been applied by this DataFilters, update
  // the DataContext that filters are not in a "cleared" state
  useEffect(function () {
    setFiltersCleared(!Object.keys(touched).length);
  }, [touched, setFiltersCleared]);

  // if filters have been cleared via clearFilters in DataContext,
  // reset touched to default state so badge is removed
  useEffect(function () {
    if (filtersCleared) {
      setTouched(defaultTouched);
    }
  }, [filtersCleared]);
  var controlled = useMemo(function () {
    return drop || layer;
  }, [drop, layer]);
  var configured = Children.count(children) === 0;
  useEffect(function () {
    // when view changes via DataView or user interacting with filters,
    // adjust badge to reflect that
    if (controlled && view.properties) {
      var nextTouched = _extends({}, view.properties);
      Object.keys(nextTouched).forEach(function (k) {
        var _properties$k;
        if ((properties == null || (_properties$k = properties[k]) == null ? void 0 : _properties$k.badge) === false || configured && properties && !(properties != null && properties[k])) {
          delete nextTouched[k];
        }
      });
      setTouched(nextTouched);
    }
  }, [configured, controlled, properties, view]);

  // generate the badge value based on touched fields that have a value.
  // only show the badge based off of what's included in this DataFilters
  // since multiple DataFilters may exist
  var badge = useMemo(function () {
    return controlled && Object.keys(touched).filter(function (k) {
      return touched[k];
    }).length || undefined;
  }, [controlled, touched]);
  var clearControl = badge && clearFilters && /*#__PURE__*/React.createElement(Box, {
    flex: false,
    margin: {
      start: 'small'
    }
  }, /*#__PURE__*/React.createElement(DataClearFilters, null));
  var content = children;
  if (Children.count(children) === 0) {
    var filtersFor;
    if (!properties && unfilteredData && unfilteredData.length)
      // build from a piece of data, ignore object values
      filtersFor = Object.keys(unfilteredData[0]).filter(function (k) {
        return typeof unfilteredData[0][k] !== 'object';
      });else if (Array.isArray(properties)) filtersFor = properties;else if (typeof properties === 'object') {
      filtersFor = Object.keys(properties).filter(function (property) {
        var _properties$property;
        return !(((_properties$property = properties[property]) == null ? void 0 : _properties$property.filter) === false);
      });
    } else filtersFor = [];
    content = filtersFor.map(function (property) {
      return /*#__PURE__*/React.createElement(DataFilter, {
        key: property,
        property: property
      });
    });
  }
  content = /*#__PURE__*/React.createElement(DataForm, _extends({
    pad: controlled ? 'medium' : undefined,
    onDone: function onDone() {
      return setShowContent(false);
    },
    updateOn: updateOn
  }, !controlled ? rest : {
    fill: 'vertical'
  }), layer && /*#__PURE__*/React.createElement(Header, null, /*#__PURE__*/React.createElement(Heading, {
    margin: "none",
    level: 2
  }, heading || format({
    id: 'dataFilters.heading',
    messages: messages == null ? void 0 : messages.dataFilters
  })), !controlled && clearControl, /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(Close, null),
    onClick: function onClick() {
      return setShowContent(undefined);
    }
  })), content);
  if (!controlled) return content;
  var tip = format({
    id: badge ? "dataFilters.openSet." + (badge === 1 ? 'singular' : 'plural') : 'dataFilters.open',
    messages: messages == null ? void 0 : messages.dataFilters,
    values: {
      number: badge
    }
  });
  var control;
  if (drop) {
    var _theme$data$button;
    control = /*#__PURE__*/React.createElement(DropButton, {
      id: dataId + "--filters-control",
      tip: tip,
      "aria-label": tip,
      kind: (_theme$data$button = theme.data.button) == null ? void 0 : _theme$data$button.kind,
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
  } else if (layer) {
    var _theme$data$button2;
    control = /*#__PURE__*/React.createElement(Button, {
      id: dataId + "--filters-control",
      tip: tip,
      "aria-label": tip,
      kind: (_theme$data$button2 = theme.data.button) == null ? void 0 : _theme$data$button2.kind,
      icon: /*#__PURE__*/React.createElement(Filter, null),
      badge: badge,
      onClick: function onClick() {
        return setShowContent(true);
      }
    });
  }
  return /*#__PURE__*/React.createElement(Box, _extends({
    flex: false,
    direction: "row"
  }, rest), control, clearControl, layer && showContent && /*#__PURE__*/React.createElement(Layer, _extends({
    id: dataId + "--filters-layer"
  }, typeof layer === 'object' ? layer : layerProps, {
    onClickOutside: function onClickOutside() {
      return setShowContent(undefined);
    },
    onEsc: function onEsc() {
      return setShowContent(undefined);
    }
  }), /*#__PURE__*/React.createElement(Box, {
    width: {
      min: 'medium'
    }
  }, content)));
};
DataFilters.propTypes = DataFiltersPropTypes;