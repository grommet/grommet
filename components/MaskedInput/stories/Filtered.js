"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var data = {
  Cummings: ['a pretty day', 'i carry your heart with me', 'if you like my poems let them'],
  Chaucer: ["The Knight's Tale", 'The General Prologue', "The Friar's Tale"],
  Neruda: ['If You Forget Me', 'Love Sonnet XVII'],
  Poe: ['The Raven', 'Romance', 'Song'],
  Whitman: ['To You', 'O Captain! My Captain!', 'O Me! O Life!']
};

var FilteredMaskedInput = function FilteredMaskedInput() {
  var _React$useState = _react["default"].useState(''),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var _value$split = value.split(':'),
      first = _value$split[0],
      second = _value$split[1];

  var poets = first ? Object.keys(data).filter(function (k) {
    return k.toLowerCase().startsWith(first.toLowerCase());
  }) : Object.keys(data);
  var poems = data[first] && second ? data[first].filter(function (k) {
    return k.toLowerCase().startsWith(second.toLowerCase());
  }) : data[first] || [];
  var longestPoemLength = 0;
  poems.forEach(function (p) {
    longestPoemLength = Math.max(longestPoemLength, p.length);
  });
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.MaskedInput, {
    mask: [{
      options: poets,
      placeholder: 'poet'
    }, {
      fixed: ':'
    }, {
      options: poems,
      length: longestPoemLength,
      placeholder: 'poem'
    }],
    value: value,
    onChange: function onChange(event) {
      return setValue(event.target.value);
    }
  }))));
};

(0, _react2.storiesOf)('MaskedInput', module).add('Filtered', function () {
  return /*#__PURE__*/_react["default"].createElement(FilteredMaskedInput, null);
});