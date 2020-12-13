"use strict";

exports.__esModule = true;
exports.LazyLoadingOptions = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var dummyOptions = Array(2000).fill().map(function (_, i) {
  return "option " + i;
}).sort(function (a, b) {
  return a.localeCompare(b, undefined, {
    numeric: true,
    sensitivity: 'base'
  });
});

var Option = function Option(_ref) {
  var value = _ref.value,
      selected = _ref.selected;
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

var LazyLoadingOptions = function LazyLoadingOptions() {
  var _React$useState = _react["default"].useState([]),
      selected = _React$useState[0],
      setSelected = _React$useState[1];

  var _React$useState2 = _react["default"].useState(dummyOptions.slice(0, 200)),
      options = _React$useState2[0],
      setOptions = _React$useState2[1];

  var onMore = function onMore() {
    setTimeout(function () {
      setOptions(dummyOptions.slice(0, options.length + 200));
    }, 1000);
  };

  var onClose = function onClose() {
    setOptions(options.sort(function (p1, p2) {
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
  };

  var onChange = function onChange(_ref2) {
    var nextSelected = _ref2.selected;
    return setSelected(nextSelected);
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
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
    onMore: onMore,
    onClose: onClose,
    onChange: onChange
  }, function (option, index) {
    return /*#__PURE__*/_react["default"].createElement(Option, {
      value: option,
      selected: selected.indexOf(index) !== -1
    });
  })));
};

exports.LazyLoadingOptions = LazyLoadingOptions;
LazyLoadingOptions.story = {
  name: 'Lazy loading options',
  parameters: {
    chromatic: {
      disable: true
    }
  }
};