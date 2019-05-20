"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SimpleSelect =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SimpleSelect, _Component);

  function SimpleSelect() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      options: ['one', 'two'],
      value: '',
      open: false
    });

    return _this;
  }

  var _proto = SimpleSelect.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        theme = _this$props.theme,
        rest = _objectWithoutPropertiesLoose(_this$props, ["theme"]);

    var _this$state = this.state,
        options = _this$state.options,
        value = _this$state.value,
        open = _this$state.open;
    return _react.default.createElement(_grommet.Grommet, {
      full: true,
      theme: theme || _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large",
      gap: "small"
    }, _react.default.createElement(_grommet.Button, {
      onClick: function onClick() {
        return _this2.setState({
          open: !open
        });
      },
      label: "Control the select"
    }), _react.default.createElement(_grommet.Select, _extends({
      id: "select",
      name: "select",
      placeholder: "Select",
      open: open,
      value: value,
      options: options,
      onChange: function onChange(_ref) {
        var option = _ref.option;
        return _this2.setState({
          value: option
        });
      }
    }, rest))));
  };

  return SimpleSelect;
}(_react.Component);

(0, _react2.storiesOf)('Select', module).add('Controlled', function () {
  return _react.default.createElement(SimpleSelect, null);
});