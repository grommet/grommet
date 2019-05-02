"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultOptions = [];
var objectOptions = [];

for (var i = 1; i <= 200; i += 1) {
  defaultOptions.push("option " + i);
  objectOptions.push({
    lab: "option " + i,
    val: i,
    dis: i % 5 === 0,
    sel: i % 13 === 0
  });
}

var SearchSelect =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SearchSelect, _Component);

  function SearchSelect() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      options: defaultOptions,
      value: ''
    });

    return _this;
  }

  var _proto = SearchSelect.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$state = this.state,
        options = _this$state.options,
        value = _this$state.value;
    return _react.default.createElement(_grommet.Grommet, {
      full: true,
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, _react.default.createElement(_grommet.Select, {
      size: "medium",
      placeholder: "Select",
      value: value,
      options: options,
      onChange: function onChange(_ref) {
        var option = _ref.option;
        return _this2.setState({
          value: option
        });
      },
      onClose: function onClose() {
        return _this2.setState({
          options: defaultOptions
        });
      },
      onSearch: function onSearch(text) {
        var exp = new RegExp(text, 'i');

        _this2.setState({
          options: defaultOptions.filter(function (o) {
            return exp.test(o);
          })
        });
      }
    })));
  };

  return SearchSelect;
}(_react.Component);

(0, _react2.storiesOf)('Select', module).add('Search', function () {
  return _react.default.createElement(SearchSelect, null);
});