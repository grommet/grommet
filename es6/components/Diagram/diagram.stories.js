function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Diagram, Stack } from 'grommet';
import { grommet } from 'grommet/themes';

var Node = function Node(_ref) {
  var id = _ref.id,
      rest = _objectWithoutPropertiesLoose(_ref, ["id"]);

  return React.createElement(Box, _extends({
    id: id,
    basis: "xxsmall",
    margin: "small",
    pad: "medium",
    round: "small",
    background: "neutral-1"
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
    color: color || 'accent-1',
    thickness: 'xsmall',
    round: true,
    type: 'rectilinear'
  }, rest);
};

var SimpleDiagram = function SimpleDiagram() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Stack, null, React.createElement(Box, null, React.createElement(Box, {
    direction: "row"
  }, [1, 2, 3].map(function (id) {
    return React.createElement(Node, {
      key: id,
      id: id
    });
  })), React.createElement(Box, {
    direction: "row"
  }, [4, 5].map(function (id) {
    return React.createElement(Node, {
      key: id,
      id: id,
      background: "neutral-2"
    });
  }))), React.createElement(Diagram, {
    connections: [connection('1', '5', {
      color: 'accent-2'
    }), connection('3', '5', {
      color: 'accent-2',
      anchor: 'horizontal'
    })]
  })));
};

storiesOf('Diagram', module).add('Simple Diagram', function () {
  return React.createElement(SimpleDiagram, null);
});