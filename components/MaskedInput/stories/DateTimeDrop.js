"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _grommetIcons = require("grommet-icons");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DropContent = function DropContent(props) {
  var initialDate = props.date,
      initialTime = props.time,
      onClose = props.onClose;

  var _useState = (0, _react.useState)(),
      date = _useState[0],
      setDate = _useState[1];

  var _useState2 = (0, _react.useState)(),
      time = _useState2[0],
      setTime = _useState2[1];

  var close = function close() {
    return onClose(date || initialDate, time || initialTime);
  };

  return _react.default.createElement(_grommet.Box, {
    align: "center"
  }, _react.default.createElement(_grommet.Calendar, {
    animate: false,
    date: date || initialDate,
    onSelect: setDate,
    showAdjacentDays: false
  }), _react.default.createElement(_grommet.Box, {
    flex: false,
    pad: "medium",
    gap: "medium"
  }, _react.default.createElement(_grommet.Keyboard, {
    onEnter: function onEnter(event) {
      event.preventDefault(); // so drop doesn't re-open

      close();
    }
  }, _react.default.createElement(_grommet.MaskedInput, {
    mask: [{
      length: [1, 2],
      options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      regexp: /^1[1-2]$|^[0-9]$/,
      placeholder: 'hh'
    }, {
      fixed: ':'
    }, {
      length: 2,
      options: ['00', '15', '30', '45'],
      regexp: /^[0-5][0-9]$|^[0-9]$/,
      placeholder: 'mm'
    }, {
      fixed: ' '
    }, {
      length: 2,
      options: ['am', 'pm'],
      regexp: /^[ap]m$|^[AP]M$|^[aApP]$/,
      placeholder: 'ap'
    }],
    value: time || initialTime,
    name: "maskedInput",
    onChange: function onChange(event) {
      return setTime(event.target.value);
    }
  })), _react.default.createElement(_grommet.Box, {
    flex: false
  }, _react.default.createElement(_grommet.Button, {
    label: "Done",
    onClick: close
  }))));
};

var DateTimeDropButton =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(DateTimeDropButton, _Component);

  function DateTimeDropButton() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      date: undefined,
      time: ''
    });

    _defineProperty(_assertThisInitialized(_this), "onClose", function (date, time) {
      _this.setState({
        date: date,
        time: time,
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

  var _proto = DateTimeDropButton.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$state = this.state,
        date = _this$state.date,
        open = _this$state.open,
        time = _this$state.time;
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, _react.default.createElement(_grommet.DropButton, {
      open: open,
      onClose: function onClose() {
        return _this2.setState({
          open: false
        });
      },
      onOpen: function onOpen() {
        return _this2.setState({
          open: true
        });
      },
      dropContent: _react.default.createElement(DropContent, {
        date: date,
        time: time,
        onClose: this.onClose
      })
    }, _react.default.createElement(_grommet.Box, {
      direction: "row",
      gap: "medium",
      align: "center",
      pad: "small"
    }, _react.default.createElement(_grommet.Text, {
      color: date ? undefined : 'dark-5'
    }, date ? new Date(date).toLocaleDateString() + " " + time : 'Select date & time'), _react.default.createElement(_grommetIcons.Schedule, null)))));
  };

  return DateTimeDropButton;
}(_react.Component);

(0, _react2.storiesOf)('MaskedInput', module).add('Date Time Drop', function () {
  return _react.default.createElement(DateTimeDropButton, null);
});