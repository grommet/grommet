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

var connection = function connection(fromTarget, toTarget, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      rest = _extends({}, _ref);

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

var DiamondContainer = function DiamondContainer(_ref2) {
  var carat = _ref2.carat,
      color = _ref2.color,
      cut = _ref2.cut,
      align = _ref2.align,
      id = _ref2.id,
      name = _ref2.name,
      textSize = _ref2.textSize;
  return /*#__PURE__*/React.createElement(Box, {
    align: align || 'center',
    alignSelf: "center",
    direction: "row",
    gap: "medium",
    key: id
  }, /*#__PURE__*/React.createElement(Diamond, {
    id: id,
    size: "xlarge",
    color: "neutral-3"
  }), /*#__PURE__*/React.createElement(Box, {
    align: align
  }, /*#__PURE__*/React.createElement(Text, {
    size: "medium",
    weight: "bold"
  }, name), carat && /*#__PURE__*/React.createElement(Text, {
    size: textSize
  }, " Carat: ", carat, " "), color && /*#__PURE__*/React.createElement(Text, {
    size: textSize
  }, " Color: ", color, " "), cut && /*#__PURE__*/React.createElement(Text, {
    size: textSize
  }, " Cut: ", cut, " ")));
};

var Container = function Container(_ref3) {
  var node = _ref3.node,
      index = _ref3.index;
  return /*#__PURE__*/React.createElement(DiamondContainer, {
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

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: customTheme
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center"
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "large"
  }, /*#__PURE__*/React.createElement(Stack, null, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Box, {
    alignSelf: "center",
    margin: {
      bottom: 'large'
    }
  }, /*#__PURE__*/React.createElement(Container, {
    node: data[0],
    index: 1
  }), /*#__PURE__*/React.createElement(Box, {
    pad: "small"
  }), /*#__PURE__*/React.createElement(Box, {
    id: "4",
    width: "xsmall",
    margin: {
      bottom: 'large',
      top: 'xlarge'
    }
  })), /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    gap: "xlarge"
  }, [2, 3].map(function (id) {
    return /*#__PURE__*/React.createElement(Container, {
      key: id,
      node: data[id - 1],
      index: id
    });
  }))), /*#__PURE__*/React.createElement(Diagram, {
    connections: connections
  })))));
};

storiesOf('Diagram', module).add('Animated', function () {
  return /*#__PURE__*/React.createElement(Animated, null);
});