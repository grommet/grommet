function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useReducer, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Diagram, Grommet, grommet, Stack, Text } from 'grommet';
import { Diamond } from "grommet-icons/es6/icons/Diamond";
import { deepMerge } from 'grommet/utils';
import { data } from './data';
var customTheme = deepMerge(grommet, {
  diagram: {
    extend: "@keyframes \n  example {\n    to {\n      stroke-dashoffset: 0;\n    }\n  }\n  path {\n    stroke-dasharray: 500;\n    stroke-dashoffset: 500;\n    animation: example 3s linear forwards;\n  }"
  }
});

var connection = function connection(fromTarget, toTarget, _ref) {
  if (_ref === void 0) {
    _ref = {};
  }

  var _ref2 = _ref,
      rest = _extends({}, _ref2);

  return _extends({
    fromTarget: fromTarget,
    toTarget: toTarget,
    anchor: 'vertical',
    color: 'accent-4',
    thickness: 'xsmall',
    round: true,
    type: 'curved'
  }, rest);
};

var DiamondContainer = function DiamondContainer(_ref3) {
  var carat = _ref3.carat,
      color = _ref3.color,
      cut = _ref3.cut,
      align = _ref3.align,
      id = _ref3.id,
      name = _ref3.name,
      textSize = _ref3.textSize;
  return React.createElement(Box, {
    align: align || 'center',
    alignSelf: "center",
    direction: "row",
    gap: "medium",
    key: id
  }, React.createElement(Diamond, {
    id: id,
    size: "xlarge",
    color: "neutral-3"
  }), React.createElement(Box, {
    align: align
  }, React.createElement(Text, {
    size: "medium",
    weight: "bold"
  }, name), carat && React.createElement(Text, {
    size: textSize
  }, " Carat: ", carat, " "), color && React.createElement(Text, {
    size: textSize
  }, " Color: ", color, " "), cut && React.createElement(Text, {
    size: textSize
  }, " Cut: ", cut, " ")));
};

var Container = function Container(_ref4) {
  var node = _ref4.node,
      index = _ref4.index;
  return React.createElement(DiamondContainer, {
    carat: node.carat,
    color: node.color,
    cut: node.cut,
    id: index,
    key: node.name,
    name: node.name,
    textSize: "small"
  });
};

var Animated = function Animated() {
  var reducer = function reducer(draw) {
    return !draw;
  };

  var _useReducer = useReducer(reducer, true),
      draw = _useReducer[0],
      toogleDraw = _useReducer[1];

  useEffect(function () {
    var timer = setInterval(function () {
      toogleDraw();
    }, 2000);
    return function () {
      return clearInterval(timer);
    };
  }, [toogleDraw]);
  var connections = [];

  if (draw) {
    connections.push(connection('4', '1', {
      anchor: 'vertical'
    }));
    connections.push(connection('4', '2', {
      anchor: 'vertical'
    }));
    connections.push(connection('4', '3', {
      anchor: 'vertical'
    }));
  }

  return React.createElement(Grommet, {
    theme: customTheme
  }, React.createElement(Box, {
    align: "center"
  }, React.createElement(Box, {
    pad: "large"
  }, React.createElement(Stack, null, React.createElement(Box, null, React.createElement(Box, {
    alignSelf: "center",
    margin: {
      bottom: 'large'
    }
  }, React.createElement(Container, {
    node: data[0],
    index: 1
  }), React.createElement(Box, {
    pad: "small"
  }), React.createElement(Box, {
    id: "4",
    width: "xsmall",
    margin: {
      bottom: 'large',
      top: 'xlarge'
    }
  })), React.createElement(Box, {
    direction: "row",
    gap: "xlarge"
  }, [2, 3].map(function (id) {
    return React.createElement(Container, {
      key: id,
      node: data[id - 1],
      index: id
    });
  }))), React.createElement(Diagram, {
    connections: connections
  })))));
};

storiesOf('Diagram', module).add('Animated', function () {
  return React.createElement(Animated, null);
});