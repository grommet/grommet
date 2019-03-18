"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Node = function Node(_ref) {
  var id = _ref.id,
      rest = _objectWithoutPropertiesLoose(_ref, ["id"]);

  return _react.default.createElement(_grommet.Box, _extends({
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

var fullTopRow = [1, 2, 3];

var SimpleDiagram =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(SimpleDiagram, _React$Component);

  function SimpleDiagram() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      topRow: fullTopRow.slice(0, 1)
    });

    return _this;
  }

  var _proto = SimpleDiagram.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    this.timer = setInterval(function () {
      var topRow = _this2.state.topRow;

      _this2.setState({
        topRow: fullTopRow.slice(0, topRow.length < fullTopRow.length ? topRow.length + 1 : 1)
      });
    }, 2000);
  };

  _proto.render = function render() {
    var topRow = this.state.topRow;
    var connections = [connection('1', '5', {
      color: 'accent-2'
    })];

    if (topRow.length >= 2) {
      connections.push(connection('1', '2', {
        color: 'accent-1',
        anchor: 'horizontal'
      }));
    }

    if (topRow.length >= 3) {
      connections.push(connection('3', '5', {
        color: 'accent-2',
        anchor: 'horizontal'
      }));
    }

    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      align: "start",
      pad: "large"
    }, _react.default.createElement(_grommet.Stack, null, _react.default.createElement(_grommet.Box, null, _react.default.createElement(_grommet.Box, {
      direction: "row"
    }, topRow.map(function (id) {
      return _react.default.createElement(Node, {
        key: id,
        id: id
      });
    })), _react.default.createElement(_grommet.Box, {
      direction: "row"
    }, [4, 5].map(function (id) {
      return _react.default.createElement(Node, {
        key: id,
        id: id,
        background: "neutral-2"
      });
    }))), _react.default.createElement(_grommet.Diagram, {
      connections: connections
    }))));
  };

  return SimpleDiagram;
}(_react.default.Component);

(0, _react2.storiesOf)('Diagram', module).add('Simple Diagram', function () {
  return _react.default.createElement(SimpleDiagram, null);
});