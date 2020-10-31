function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useReducer, useEffect } from 'react';
import { Grommet, Box, Diagram, Stack, Text } from 'grommet';
import { grommet } from 'grommet/themes';

var Node = function Node(_ref) {
  var id = _ref.id,
      rest = _objectWithoutPropertiesLoose(_ref, ["id"]);

  return /*#__PURE__*/React.createElement(Box, _extends({
    id: id,
    basis: "xxsmall",
    margin: "small",
    pad: "medium",
    round: "small",
    background: "dark-3"
  }, rest));
};

var connection = function connection(fromTarget, toTarget, _temp) {
  var _ref2 = _temp === void 0 ? {} : _temp,
      color = _ref2.color,
      rest = _objectWithoutPropertiesLoose(_ref2, ["color"]);

  return _extends({
    fromTarget: fromTarget,
    toTarget: toTarget,
    anchor: 'vertical',
    color: color,
    thickness: 'xsmall',
    round: true,
    type: 'rectilinear'
  }, rest);
};

var fullTopRow = [1, 2, 3];
export var Progressing = function Progressing() {
  var reducer = function reducer(topRow) {
    var sliceEnd = topRow.length < fullTopRow.length ? topRow.length + 1 : 1;
    return fullTopRow.slice(0, sliceEnd);
  };

  var _useReducer = useReducer(reducer, fullTopRow.slice(0, 1)),
      topRow = _useReducer[0],
      dispatch = _useReducer[1];

  useEffect(function () {
    var timer = setInterval(function () {
      dispatch();
    }, 2000);
    return function () {
      return clearInterval(timer);
    };
  }, [dispatch]);
  var connections = [connection('1', '5')];

  if (topRow.length >= 2) {
    connections.push(connection('1', '2', {
      anchor: 'horizontal'
    }));
  }

  if (topRow.length >= 3) {
    connections.push(connection('3', '5', {
      anchor: 'horizontal',
      color: 'brand'
    }));
  }

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Text, null, " Adding and removing nodes"), /*#__PURE__*/React.createElement(Stack, null, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Box, {
    direction: "row"
  }, topRow.map(function (id) {
    return /*#__PURE__*/React.createElement(Node, {
      key: id,
      id: id
    });
  })), /*#__PURE__*/React.createElement(Box, {
    direction: "row"
  }, [4, 5].map(function (id) {
    return /*#__PURE__*/React.createElement(Node, {
      key: id,
      id: id,
      background: "dark-2"
    });
  }))), /*#__PURE__*/React.createElement(Diagram, {
    connections: connections
  }))));
};