"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TooltipDrop =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(TooltipDrop, _Component);

  function TooltipDrop() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "ref", (0, _react.createRef)());

    return _this;
  }

  var _proto = TooltipDrop.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var over = this.state.over;
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet,
      full: true
    }, _react.default.createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, _react.default.createElement(_grommet.Button, {
      label: "Button",
      ref: this.ref,
      onMouseOver: function onMouseOver() {
        return _this2.setState({
          over: true
        });
      },
      onMouseOut: function onMouseOut() {
        return _this2.setState({
          over: false
        });
      },
      onFocus: function onFocus() {},
      onBlur: function onBlur() {}
    }), this.ref.current && over && _react.default.createElement(_grommet.Drop, {
      align: {
        left: 'right'
      },
      target: this.ref.current,
      plain: true
    }, _react.default.createElement(_grommet.Box, {
      margin: "xsmall",
      pad: "small",
      background: "dark-3",
      round: {
        size: 'medium',
        corner: 'left'
      }
    }, "tooltip contents"))));
  };

  return TooltipDrop;
}(_react.Component);

(0, _react2.storiesOf)('Drop', module).add('Tooltip', function () {
  return _react.default.createElement(TooltipDrop, null);
});