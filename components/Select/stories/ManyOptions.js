"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Option = /*#__PURE__*/function (_PureComponent) {
  _inheritsLoose(Option, _PureComponent);

  function Option() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Option.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        value = _this$props.value,
        selected = _this$props.selected;
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      direction: "row",
      gap: "small",
      align: "center",
      pad: "xsmall"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
      tabIndex: "-1",
      checked: selected,
      onChange: function onChange() {}
    }), value);
  };

  return Option;
}(_react.PureComponent);

var dummyOptions = Array(2000).fill().map(function (_, i) {
  return "option " + i;
}).sort(function (a, b) {
  return a.localeCompare(b, undefined, {
    numeric: true,
    sensitivity: 'base'
  });
});

var ManyOptions = function ManyOptions() {
  var _React$useState = _react["default"].useState([]),
      selected = _React$useState[0],
      setSelected = _React$useState[1];

  var _React$useState2 = _react["default"].useState(dummyOptions),
      options = _React$useState2[0],
      setOptions = _React$useState2[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
    multiple: true,
    closeOnChange: false,
    placeholder: "select an option...",
    selected: selected,
    options: options,
    dropHeight: "medium",
    onClose: function onClose() {
      return setOptions(options.sort(function (p1, p2) {
        var p1Exists = selected.includes(p1);
        var p2Exists = selected.includes(p2);

        if (!p1Exists && p2Exists) {
          return 1;
        }

        if (p1Exists && !p2Exists) {
          return -1;
        }

        return p1.localeCompare(p2, undefined, {
          numeric: true,
          sensitivity: 'base'
        });
      }));
    },
    onChange: function onChange(_ref) {
      var nextSelected = _ref.selected;
      setSelected(nextSelected);
    }
  }, function (option, index) {
    return /*#__PURE__*/_react["default"].createElement(Option, {
      value: option,
      selected: selected.indexOf(index) !== -1
    });
  })));
};

(0, _react2.storiesOf)('Select', module).add('Lots of options', function () {
  return /*#__PURE__*/_react["default"].createElement(ManyOptions, null);
});