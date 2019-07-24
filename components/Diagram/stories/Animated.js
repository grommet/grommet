"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _grommetIcons = require("grommet-icons");

var _utils = require("grommet/utils");

var _data = require("./data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var customTheme = (0, _utils.deepMerge)(_grommet.grommet, {
  diagram: {
    extend: '@keyframes example { to { stroke-dashoffset: 0; } } path { stroke-dasharray: 500; stroke-dashoffset: 500; animation: example 3s linear forwards; }'
  }
});

var connection = function connection(fromTarget, toTarget, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      color = _ref.color,
      rest = _objectWithoutPropertiesLoose(_ref, ["color"]);

  return _extends({
    fromTarget: fromTarget,
    toTarget: toTarget,
    anchor: 'vertical',
    color: 'accent-4',
    thickness: 'xsmall',
    round: true,
    type: 'direct'
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

var Container = function Container(_ref3) {
  var node = _ref3.node,
      index = _ref3.index;
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

var Animated =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Animated, _React$Component);

  function Animated() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      draw: true
    });

    return _this;
  }

  var _proto = Animated.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    this.timer = setInterval(function () {
      var draw = _this2.state.draw;

      _this2.setState({
        draw: !draw
      });
    }, 3000);
  };

  _proto.render = function render() {
    var draw = this.state.draw;
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
        node: _data.data[id - 1],
        index: id
      });
    }))), _react["default"].createElement(_grommet.Diagram, {
      connections: connections
    })))));
  };

  return Animated;
}(_react["default"].Component);

(0, _react2.storiesOf)('Diagram', module).add('Animated', function () {
  return _react["default"].createElement(Animated, null);
});