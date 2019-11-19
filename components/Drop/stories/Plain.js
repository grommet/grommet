"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PlainDrop =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(PlainDrop, _Component);

  function PlainDrop() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "targetRef", (0, _react.createRef)());

    return _this;
  }

  var _proto = PlainDrop.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.forceUpdate();
  };

  _proto.render = function render() {
    return _react["default"].createElement(_grommet.Grommet, {
      theme: _themes.grommet,
      full: true
    }, _react["default"].createElement(_grommet.Box, {
      background: "brand",
      fill: true,
      align: "center",
      justify: "center"
    }, _react["default"].createElement(_grommet.Box, {
      background: "dark-3",
      pad: "medium",
      align: "center",
      justify: "start",
      ref: this.targetRef
    }, "Target"), this.targetRef.current && _react["default"].createElement(_grommet.Drop, {
      plain: true,
      align: {
        top: 'bottom',
        left: 'left'
      },
      target: this.targetRef.current
    }, _react["default"].createElement(_grommet.Box, {
      pad: "large"
    }, "No background no shadow"))));
  };

  return PlainDrop;
}(_react.Component);

(0, _react2.storiesOf)('Drop', module).add('Plain', function () {
  return _react["default"].createElement(PlainDrop, null);
});