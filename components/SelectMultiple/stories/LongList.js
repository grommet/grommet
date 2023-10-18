"use strict";

exports.__esModule = true;
exports["default"] = exports.LongList = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var dummyOptions = Array(2000).fill().map(function (_, i) {
  return "option " + i;
}).sort(function (a, b) {
  return a.localeCompare(b, undefined, {
    numeric: true,
    sensitivity: 'base'
  });
});
var LongList = exports.LongList = function LongList() {
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
  var onChange = function onChange(_ref) {
    var nextSelected = _ref.value;
    return setSelected(nextSelected);
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.SelectMultiple, {
      showSelectedInline: true,
      placeholder: "select an option...",
      value: selected,
      options: options,
      dropHeight: "medium",
      onMore: onMore,
      onChange: onChange
    }))
    // </Grommet>
  );
};

LongList.storyName = 'Long list';
LongList.parameters = {
  chromatic: {
    disable: true
  }
};
LongList.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Input/SelectMultiple/Long list'
};