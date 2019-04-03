"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _utils = require("grommet/utils");

var _grommetIcons = require("grommet-icons");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var customCheckBoxTheme = {
  checkBox: {
    border: {
      color: {
        light: 'accent-2'
      },
      // width: 'xsmall',
      radius: '2px'
    },
    check: {
      extend: function extend(_ref) {
        var theme = _ref.theme,
            checked = _ref.checked;
        return "\n        " + (checked && "background-color: " + (0, _utils.normalizeColor)('neutral-1', theme) + ";") + "\n        ";
      }
    },
    color: {
      light: 'neutral-3',
      dark: 'neutral-3'
    },
    gap: 'xsmall',
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
    size: '18px',
    extend: "\n      color: #9C9C9C;\n    "
  }
};

var ThemedCheckBox =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(ThemedCheckBox, _Component);

  function ThemedCheckBox() {
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

  var _proto = ThemedCheckBox.prototype;

  _proto.render = function render() {
    var checked = this.state.checked;
    return _react.default.createElement(_grommet.Grommet, {
      theme: (0, _utils.deepMerge)(_themes.grommet, customCheckBoxTheme)
    }, _react.default.createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, _react.default.createElement(_grommet.CheckBox, _extends({}, this.props, {
      label: "Choice",
      checked: checked,
      onChange: this.onChange
    }))));
  };

  return ThemedCheckBox;
}(_react.Component);

(0, _react2.storiesOf)('CheckBox', module).add('Custom', function () {
  return _react.default.createElement(ThemedCheckBox, null);
});