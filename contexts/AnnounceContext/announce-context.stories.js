"use strict";

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react2 = require("@storybook/react");

var _themes = require("grommet/themes");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Announcer =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Announcer, _Component);

  function Announcer() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Announcer.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this$props = this.props,
        announce = _this$props.announce,
        message = _this$props.message,
        mode = _this$props.mode;
    var timeout = 3000;
    announce(message, mode, timeout);
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        message = _this$props2.message,
        mode = _this$props2.mode,
        role = _this$props2.role;
    return _react.default.createElement(_grommet.Text, {
      align: "center",
      role: role,
      "aria-live": mode
    }, message);
  };

  return Announcer;
}(_react.Component);

_defineProperty(Announcer, "propTypes", {
  announce: _propTypes.default.func.isRequired,
  message: _propTypes.default.string,
  mode: _propTypes.default.string,
  role: _propTypes.default.string
});

_defineProperty(Announcer, "defaultProps", {
  message: 'Here is a simple announcement. This will soon disappear',
  mode: 'polite',
  role: 'log'
});

var AnnounceContextComponent = function AnnounceContextComponent(props) {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, _react.default.createElement(_grommet.Box, {
    justify: "center",
    align: "center",
    background: "brand",
    fill: true
  }, _react.default.createElement(_grommet.Heading, null, "Welcome to announcement section"), _react.default.createElement(_grommet.AnnounceContext.Consumer, null, function (announce) {
    return _react.default.createElement(Announcer, _extends({
      announce: announce
    }, props));
  })));
};

(0, _react2.storiesOf)('AnnounceContext', module).add('Polite', function () {
  return _react.default.createElement(AnnounceContextComponent, null);
}).add('Assertive', function () {
  return _react.default.createElement(AnnounceContextComponent, {
    message: "Turn on Accessibility feature to listen to this announcement. This will soon disappear",
    mode: "assertive",
    role: "alert"
  });
});