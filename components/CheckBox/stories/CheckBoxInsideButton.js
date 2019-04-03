"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CheckBoxInsideButton =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(CheckBoxInsideButton, _Component);

  function CheckBoxInsideButton() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      checked: false
    });

    return _this;
  }

  var _proto = CheckBoxInsideButton.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var checked = this.state.checked;
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, _react.default.createElement(_grommet.Button, {
      hoverIndicator: "background",
      onClick: function onClick() {
        _this2.setState({
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

(0, _react2.storiesOf)('CheckBox', module).add('Inside a Button', function () {
  return _react.default.createElement(CheckBoxInsideButton, null);
});