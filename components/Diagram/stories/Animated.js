"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _grommetIcons = require("grommet-icons");

var _utils = require("grommet/utils");

var _data = require("./data");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var customTheme = (0, _utils.deepMerge)(_grommet.grommet, {
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
  return _react["default"].createElement(_grommet.Box, {
    align: align || 'center',
    alignSelf: "center",
    direction: "row",
    gap: "medium",
    key: id
  }, _react["default"].createElement(_grommetIcons.Diamond, {
    id: id,
    size: "xlarge",
    color: "neutral-3"
  }), _react["default"].createElement(_grommet.Box, {
    align: align
  }, _react["default"].createElement(_grommet.Text, {
    size: "medium",
    weight: "bold"
  }, name), carat && _react["default"].createElement(_grommet.Text, {
    size: textSize
  }, " Carat: ", carat, " "), color && _react["default"].createElement(_grommet.Text, {
    size: textSize
  }, " Color: ", color, " "), cut && _react["default"].createElement(_grommet.Text, {
    size: textSize
  }, " Cut: ", cut, " ")));
};

var Container = function Container(_ref4) {
  var node = _ref4.node,
      index = _ref4.index;
  return _react["default"].createElement(DiamondContainer, {
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

  var _useReducer = (0, _react.useReducer)(reducer, true),
      draw = _useReducer[0],
      toogleDraw = _useReducer[1];

  (0, _react.useEffect)(function () {
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

  return _react["default"].createElement(_grommet.Grommet, {
    theme: customTheme
  }, _react["default"].createElement(_grommet.Box, {
    align: "center"
  }, _react["default"].createElement(_grommet.Box, {
    pad: "large"
  }, _react["default"].createElement(_grommet.Stack, null, _react["default"].createElement(_grommet.Box, null, _react["default"].createElement(_grommet.Box, {
    alignSelf: "center",
    margin: {
      bottom: 'large'
    }
  }, _react["default"].createElement(Container, {
    node: _data.data[0],
    index: 1
  }), _react["default"].createElement(_grommet.Box, {
    pad: "small"
  }), _react["default"].createElement(_grommet.Box, {
    id: "4",
    width: "xsmall",
    margin: {
      bottom: 'large',
      top: 'xlarge'
    }
  })), _react["default"].createElement(_grommet.Box, {
    direction: "row",
    gap: "xlarge"
  }, [2, 3].map(function (id) {
    return _react["default"].createElement(Container, {
      key: id,
      node: _data.data[id - 1],
      index: id
    });
  }))), _react["default"].createElement(_grommet.Diagram, {
    connections: connections
  })))));
};

(0, _react2.storiesOf)('Diagram', module).add('Animated', function () {
  return _react["default"].createElement(Animated, null);
});