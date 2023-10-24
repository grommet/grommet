"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var items = [{
  label: 'Item A',
  href: '#'
}, {
  label: 'Item B',
  href: '#'
}, {
  label: 'Item C',
  href: '#'
}, {
  label: 'Item D',
  href: '#'
}];
var SimpleNav = function SimpleNav() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Nav, {
      pad: "large"
    }, items.map(function (item) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
        href: item.href,
        label: item.label,
        key: item.label
      });
    }))
    // </Grommet>
  );
};

var Simple = exports.Simple = function Simple() {
  return /*#__PURE__*/_react["default"].createElement(SimpleNav, null);
};
var _default = exports["default"] = {
  title: 'Controls/Nav/Simple'
};