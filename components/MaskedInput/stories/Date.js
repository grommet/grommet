"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var daysInMonth = function daysInMonth(month) {
  return new Date(2019, month, 0).getDate();
};

var DateMaskedInput =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(DateMaskedInput, _Component);

  function DateMaskedInput() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      value: ''
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
      _this.setState({
        value: event.target.value
      });
    });

    return _this;
  }

  var _proto = DateMaskedInput.prototype;

  _proto.render = function render() {
    var value = this.state.value;
    return _react.default.createElement(_grommet.Grommet, {
      full: true,
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, _react.default.createElement(_grommet.Box, {
      width: "medium"
    }, _react.default.createElement(_grommet.MaskedInput, {
      mask: [{
        length: [1, 2],
        options: Array.from({
          length: 12
        }, function (v, k) {
          return k + 1;
        }),
        regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
        placeholder: 'mm'
      }, {
        fixed: '/'
      }, {
        length: [1, 2],
        options: Array.from({
          length: daysInMonth(parseInt(value.split('/')[0], 10))
        }, function (v, k) {
          return k + 1;
        }),
        regexp: /^[1-2][0-9]$|^3[0-1]$|^0?[1-9]$|^0$/,
        placeholder: 'dd'
      }, {
        fixed: '/'
      }, {
        length: 4,
        options: Array.from({
          length: 100
        }, function (v, k) {
          return 2019 - k;
        }),
        regexp: /^[1-2]$|^19$|^20$|^19[0-9]$|^20[0-9]$|^19[0-9][0-9]$|^20[0-9][0-9]$/,
        placeholder: 'yyyy'
      }],
      value: value,
      onChange: this.onChange
    }))));
  };

  return DateMaskedInput;
}(_react.Component);

(0, _react2.storiesOf)('MaskedInput', module).add('Date', function () {
  return _react.default.createElement(DateMaskedInput, null);
});