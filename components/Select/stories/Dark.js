"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DarkSelect =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(DarkSelect, _Component);

  function DarkSelect() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      options: ['one', 'two'],
      value: ''
    });

    return _this;
  }

  var _proto = DarkSelect.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$state = this.state,
        options = _this$state.options,
        value = _this$state.value;
    return _react.default.createElement(_grommet.Grommet, _extends({
      full: true,
      theme: _themes.grommet
    }, this.props), _react.default.createElement(_grommet.Box, {
      fill: true,
      background: "dark-1",
      align: "center",
      justify: "center"
    }, _react.default.createElement(_grommet.Select, {
      placeholder: "Select",
      value: value,
      options: options,
      onChange: function onChange(_ref) {
        var option = _ref.option;
        return _this2.setState({
          value: option
        });
      }
    })));
  };

  return DarkSelect;
}(_react.Component);

(0, _react2.storiesOf)('Select', module).add('Dark', function () {
  return _react.default.createElement(DarkSelect, null);
});