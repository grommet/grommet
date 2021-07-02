"use strict";

exports.__esModule = true;
exports["default"] = exports.Animated = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _grommetIcons = require("grommet-icons");

var _data = require("./data");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: align || 'center',
    alignSelf: "center",
    direction: "row",
    gap: "medium",
    key: id
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Diamond, {
    id: id,
    size: "xlarge",
    color: "neutral-3"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: align
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "medium",
    weight: "bold"
  }, name), carat && /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: textSize
  }, " Carat: ", carat, " "), color && /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: textSize
  }, " Color: ", color, " "), cut && /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: textSize
  }, " Cut: ", cut, " ")));
};

var Container = function Container(_ref3) {
  var node = _ref3.node,
      index = _ref3.index;
  return /*#__PURE__*/_react["default"].createElement(DiamondContainer, {
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

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Stack, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    alignSelf: "center",
    margin: {
      bottom: 'large'
    }
  }, /*#__PURE__*/_react["default"].createElement(Container, {
    node: _data.data[0],
    index: 1
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    id: "4",
    width: "xsmall",
    margin: {
      bottom: 'large',
      top: 'xlarge'
    }
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    gap: "xlarge"
  }, [2, 3].map(function (id) {
    return /*#__PURE__*/_react["default"].createElement(Container, {
      key: id,
      node: _data.data[id - 1],
      index: id
    });
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Diagram, {
    animation: {
      type: 'draw',
      duration: 3000
    },
    connections: connections
  })))));
};

exports.Animated = Animated;
var _default = {
  title: 'Visualizations/Diagram/Animated'
};
exports["default"] = _default;