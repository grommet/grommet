"use strict";

exports.__esModule = true;
exports.WordBreak = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var wordBreakValues = ['normal', 'break-all', 'keep-all', 'break-word'];
/* eslint-disable max-len */

var WordBreak = function WordBreak() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, wordBreakValues.map(function (value) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      key: value,
      margin: "small",
      width: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
      level: 4
    }, "word-break: " + value + ";"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      wordBreak: value
    }, "Honorificabilitudinitatibus califragilisticexpialidocious Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu \u30B0\u30EC\u30FC\u30C8\u30D6\u30EA\u30C6\u30F3\u304A\u3088\u3073\u5317\u30A2\u30A4\u30EB\u30E9\u30F3\u30C9\u9023\u5408\u738B\u56FD\u3068\u3044\u3046\u8A00\u8449\u306F\u672C\u5F53\u306B\u9577\u3044\u8A00\u8449"));
  }));
};
/* eslint-enable max-len */


exports.WordBreak = WordBreak;
WordBreak.story = {
  name: 'Word break'
};