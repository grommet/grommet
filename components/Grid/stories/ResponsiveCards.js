"use strict";

exports.__esModule = true;
exports.Example = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var cards = Array(20).fill() // eslint-disable-next-line react/no-array-index-key
.map(function (_, i) {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    key: i
  }, "Card " + i);
});

var Example = function Example() {
  var size = (0, _react.useContext)(_grommet.ResponsiveContext);
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
    columns: size !== 'small' ? 'small' : '100%',
    gap: "small"
  }, cards.map(function (card, index) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      _react["default"].createElement(_grommet.Card, {
        pad: "large",
        key: index
      }, card)
    );
  }))));
};

exports.Example = Example;
Example.story = {
  name: 'Responsive cards'
};