"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sizes = ['xxlarge', 'xlarge', 'large', 'medium', 'small', 'xsmall', '77px'];
var wordBreakValues = ['normal', 'break-all', 'keep-all', 'break-word'];

var All = function All() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, sizes.map(function (size) {
    return _react.default.createElement(_grommet.Box, {
      key: size,
      margin: "small"
    }, _react.default.createElement(_grommet.Text, {
      size: size
    }, "Text " + size));
  }));
};

var Color = function Color() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Text, {
    color: "accent-1"
  }, "Colored Text"));
};

var WordBreak = function WordBreak() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, wordBreakValues.map(function (value) {
    return _react.default.createElement(_grommet.Box, {
      key: value,
      margin: "small",
      width: "medium"
    }, _react.default.createElement(_grommet.Heading, {
      level: 4
    }, "word-break: " + value + ";"), _react.default.createElement(_grommet.Text, {
      wordBreak: value
    }, "Honorificabilitudinitatibus califragilisticexpialidocious Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu \u30B0\u30EC\u30FC\u30C8\u30D6\u30EA\u30C6\u30F3\u304A\u3088\u3073\u5317\u30A2\u30A4\u30EB\u30E9\u30F3\u30C9\u9023\u5408\u738B\u56FD\u3068\u3044\u3046\u8A00\u8449\u306F\u672C\u5F53\u306B\u9577\u3044\u8A00\u8449"));
  }));
};

(0, _react2.storiesOf)('Text', module).add('All', function () {
  return _react.default.createElement(All, null);
}).add('Color', function () {
  return _react.default.createElement(Color, null);
}).add('Word Break', function () {
  return _react.default.createElement(WordBreak, null);
});