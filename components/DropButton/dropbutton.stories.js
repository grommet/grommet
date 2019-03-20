"use strict";

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DropContent = function DropContent(_ref) {
  var onClose = _ref.onClose;
  return _react.default.createElement(_grommet.Box, {
    pad: "small"
  }, _react.default.createElement(_grommet.Box, {
    direction: "row",
    justify: "between",
    align: "center"
  }, _react.default.createElement(_grommet.Heading, {
    level: 3,
    margin: "small"
  }, "Heading"), _react.default.createElement(_grommet.Button, {
    icon: _react.default.createElement(_grommetIcons.Close, null),
    onClick: onClose
  })), _react.default.createElement(_grommet.Text, null, "Content"));
};

DropContent.propTypes = {
  onClose: _propTypes.default.func.isRequired
};

var SimpleDropButton =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SimpleDropButton, _Component);

  function SimpleDropButton() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "onClose", function () {
      _this.setState({
        open: false
      });

      setTimeout(function () {
        return _this.setState({
          open: undefined
        });
      }, 1);
    });

    return _this;
  }

  var _proto = SimpleDropButton.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var open = this.state.open;
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, _react.default.createElement(_grommet.DropButton, {
      label: "Open",
      open: open,
      onClose: function onClose() {
        return _this2.setState({
          open: undefined
        });
      },
      dropContent: _react.default.createElement(DropContent, {
        onClose: this.onClose
      }),
      dropProps: {
        align: {
          top: 'bottom'
        }
      }
    })));
  };

  return SimpleDropButton;
}(_react.Component);

var CalendarDropButton =
/*#__PURE__*/
function (_Component2) {
  _inheritsLoose(CalendarDropButton, _Component2);

  function CalendarDropButton() {
    var _this3;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = _Component2.call.apply(_Component2, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this3), "state", {
      date: undefined
    });

    _defineProperty(_assertThisInitialized(_this3), "onClose", function () {
      _this3.setState({
        open: false
      });

      setTimeout(function () {
        return _this3.setState({
          open: undefined
        });
      }, 1);
    });

    _defineProperty(_assertThisInitialized(_this3), "onSelect", function (date) {
      return _this3.setState({
        date: date,
        open: false
      });
    });

    return _this3;
  }

  var _proto2 = CalendarDropButton.prototype;

  _proto2.render = function render() {
    var _this4 = this;

    var _this$state = this.state,
        date = _this$state.date,
        open = _this$state.open;
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, _react.default.createElement(_grommet.DropButton, {
      open: open,
      onClose: function onClose() {
        return _this4.setState({
          open: false
        });
      },
      onOpen: function onOpen() {
        return _this4.setState({
          open: true
        });
      },
      dropContent: _react.default.createElement(_grommet.Calendar, {
        date: date,
        onSelect: this.onSelect
      })
    }, _react.default.createElement(_grommet.Box, {
      direction: "row",
      gap: "medium",
      align: "center",
      pad: "small"
    }, _react.default.createElement(_grommet.Text, null, date ? new Date(date).toLocaleDateString() : 'Select date'), _react.default.createElement(_grommetIcons.FormDown, {
      color: "brand"
    })))));
  };

  return CalendarDropButton;
}(_react.Component);

var UserMenuDropButton =
/*#__PURE__*/
function (_Component3) {
  _inheritsLoose(UserMenuDropButton, _Component3);

  function UserMenuDropButton() {
    var _this5;

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this5 = _Component3.call.apply(_Component3, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this5), "renderItems", function () {
      return _react.default.createElement(_grommet.Box, null, _react.default.createElement("span", null, "hi"), _react.default.createElement("span", null, "hi"), _react.default.createElement("span", null, "hi"), _react.default.createElement("span", null, "hi"), _react.default.createElement("span", null, "hi"));
    });

    return _this5;
  }

  var _proto3 = UserMenuDropButton.prototype;

  _proto3.componentDidMount = function componentDidMount() {
    this.forceUpdate();
  };

  _proto3.render = function render() {
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet,
      full: true
    }, _react.default.createElement(_grommet.Box, {
      fill: true
    }, _react.default.createElement(_grommet.Box, {
      fill: "vertical",
      width: "60px",
      background: "dark-2"
    }, _react.default.createElement(_grommet.Box, {
      flex: true
    }), _react.default.createElement(_grommet.DropButton, {
      alignSelf: "center",
      margin: {
        vertical: 'small'
      },
      dropContent: this.renderItems(),
      dropProps: {
        align: {
          bottom: 'top'
        }
      }
    }, _react.default.createElement(_grommet.Box, {
      height: "36px",
      width: "36px",
      round: "full",
      background: "url(//s.gravatar.com/avatar/b226da5c619b18b44eb95c30be393953?s=80)"
    })))));
  };

  return UserMenuDropButton;
}(_react.Component);

(0, _react2.storiesOf)('DropButton', module).add('Simple', function () {
  return _react.default.createElement(SimpleDropButton, null);
}).add('Calendar', function () {
  return _react.default.createElement(CalendarDropButton, null);
}).add('UserMenu', function () {
  return _react.default.createElement(UserMenuDropButton, null);
});