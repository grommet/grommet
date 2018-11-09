"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _utils = require("grommet/utils");

var _grommetIcons = require("grommet-icons");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SimpleCheckBox =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SimpleCheckBox, _Component);

  function SimpleCheckBox(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChange", function (event) {
      return _this.setState({
        checked: event.target.checked
      });
    });

    _this.state = {
      checked: !!props.checked
    };
    return _this;
  }

  var _proto = SimpleCheckBox.prototype;

  _proto.render = function render() {
    var checked = this.state.checked;
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.CheckBox, _extends({}, this.props, {
      label: "Choice",
      checked: checked,
      onChange: this.onChange
    })));
  };

  return SimpleCheckBox;
}(_react.Component);

var customCheckBoxTheme = {
  checkBox: {
    border: {
      color: {
        light: 'neutral-1'
      },
      radius: '2px'
    },
    color: {
      light: 'neutral-1'
    },
    check: {
      extend: function extend(_ref) {
        var theme = _ref.theme,
            checked = _ref.checked;
        return "\n        " + (checked && "background-color: " + (0, _utils.normalizeColor)('neutral-1', theme) + ";") + "\n      ";
      }
    },
    hover: {
      border: {
        color: undefined
      }
    },
    icon: {
      size: '18px',
      extend: 'stroke: white;'
    },
    icons: {
      checked: _grommetIcons.FormCheckmark
    },
    gap: 'xsmall',
    size: '18px',
    extend: "\n      color: #9C9C9C;\n    "
  }
};

var ThemedCheckBox =
/*#__PURE__*/
function (_Component2) {
  _inheritsLoose(ThemedCheckBox, _Component2);

  function ThemedCheckBox() {
    var _this2;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this2 = _Component2.call.apply(_Component2, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "state", {
      checked: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "onChange", function (event) {
      return _this2.setState({
        checked: event.target.checked
      });
    });

    return _this2;
  }

  var _proto2 = ThemedCheckBox.prototype;

  _proto2.render = function render() {
    var checked = this.state.checked;
    return _react.default.createElement(_grommet.Grommet, {
      theme: (0, _utils.deepMerge)(_themes.grommet, customCheckBoxTheme)
    }, _react.default.createElement(_grommet.CheckBox, _extends({}, this.props, {
      label: "Choice",
      checked: checked,
      onChange: this.onChange
    })));
  };

  return ThemedCheckBox;
}(_react.Component);

var customToggleTheme = {
  checkBox: {
    border: {
      color: {
        light: 'light-2'
      }
    },
    color: {
      light: 'neutral-1'
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
      background: 'light-2',
      color: {
        light: 'light-4'
      },
      size: '36px'
    },
    gap: 'xsmall',
    size: '18px'
  }
};

var ThemedToggle =
/*#__PURE__*/
function (_Component3) {
  _inheritsLoose(ThemedToggle, _Component3);

  function ThemedToggle() {
    var _this3;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = _Component3.call.apply(_Component3, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "state", {
      checked: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "onChange", function (event) {
      return _this3.setState({
        checked: event.target.checked
      });
    });

    return _this3;
  }

  var _proto3 = ThemedToggle.prototype;

  _proto3.render = function render() {
    var checked = this.state.checked;
    return _react.default.createElement(_grommet.Grommet, {
      theme: (0, _utils.deepMerge)(_themes.grommet, customToggleTheme)
    }, _react.default.createElement(_grommet.CheckBox, _extends({}, this.props, {
      label: "Choice",
      checked: checked,
      onChange: this.onChange,
      toggle: true
    })));
  };

  return ThemedToggle;
}(_react.Component);

var CheckBoxInsideButton =
/*#__PURE__*/
function (_Component4) {
  _inheritsLoose(CheckBoxInsideButton, _Component4);

  function CheckBoxInsideButton() {
    var _this4;

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this4 = _Component4.call.apply(_Component4, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this4)), "state", {
      checked: false
    });

    return _this4;
  }

  var _proto4 = CheckBoxInsideButton.prototype;

  _proto4.render = function render() {
    var _this5 = this;

    var checked = this.state.checked;
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, null, _react.default.createElement(_grommet.Button, {
      hoverIndicator: "background",
      onClick: function onClick() {
        _this5.setState({
          checked: !checked
        });
      }
    }, _react.default.createElement(_grommet.CheckBox, {
      tabIndex: "-1",
      checked: checked,
      label: _react.default.createElement(_grommet.Text, null, "Hi"),
      onChange: function onChange() {}
    }))));
  };

  return CheckBoxInsideButton;
}(_react.Component);

(0, _react2.storiesOf)('CheckBox', module).add('Simple', function () {
  return _react.default.createElement(SimpleCheckBox, null);
}).add('Toggle', function () {
  return _react.default.createElement(SimpleCheckBox, {
    toggle: true
  });
}).add('Disabled', function () {
  return _react.default.createElement(SimpleCheckBox, {
    checked: true,
    disabled: true
  });
}).add('Reverse', function () {
  return _react.default.createElement(SimpleCheckBox, {
    reverse: true
  });
}).add('Themed CheckBox', function () {
  return _react.default.createElement(ThemedCheckBox, null);
}).add('Themed Toggle', function () {
  return _react.default.createElement(ThemedToggle, null);
}).add('Inside a Button', function () {
  return _react.default.createElement(CheckBoxInsideButton, null);
});