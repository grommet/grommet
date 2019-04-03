"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _styledComponents = require("styled-components");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _utils = require("grommet/utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var checkboxCheckStyle = (0, _styledComponents.css)(["background-color:#2196f3;border-color:#2196f3;"]);
var customToggleTheme = {
  global: {
    colors: {
      'toggle-bg': '#757575',
      'toggle-knob': 'white',
      'toggle-accent': 'accent-2'
    }
  },
  checkBox: {
    border: {
      color: {
        light: 'toggle-bg'
      }
    },
    color: {
      light: 'toggle-knob'
    },
    check: {
      radius: '2px'
    },
    hover: {
      border: {
        color: undefined
      }
    },
    toggle: {
      background: {
        light: 'toggle-accent'
      },
      color: {
        light: 'toggle-knob'
      },
      size: '36px',
      knob: {
        extend: "\n          top: -4px;\n          box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.12), 0px 2px 2px 0px rgba(0,0,0,0.24);\n        "
      },
      extend: function extend(_ref) {
        var checked = _ref.checked;
        return "\n        height: 14px;\n        " + (checked && checkboxCheckStyle) + "\n      ";
      }
    },
    gap: 'xsmall',
    size: '18px'
  }
};

var ThemedToggle =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(ThemedToggle, _Component);

  function ThemedToggle() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      checked: false
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
      return _this.setState({
        checked: event.target.checked
      });
    });

    return _this;
  }

  var _proto = ThemedToggle.prototype;

  _proto.render = function render() {
    var checked = this.state.checked;
    return _react.default.createElement(_grommet.Grommet, {
      theme: (0, _utils.deepMerge)(_themes.grommet, customToggleTheme)
    }, _react.default.createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, _react.default.createElement(_grommet.CheckBox, _extends({}, this.props, {
      label: "Choice",
      checked: checked,
      onChange: this.onChange,
      toggle: true
    }))));
  };

  return ThemedToggle;
}(_react.Component);

(0, _react2.storiesOf)('CheckBox', module).add('Custom Toggle', function () {
  return _react.default.createElement(ThemedToggle, null);
});