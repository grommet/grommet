"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sizes = ['xxlarge', 'xlarge', 'large', 'medium', 'small'];
var paragraphFiller = "\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua.\n";

var All = function All() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, sizes.map(function (size) {
    return _react.default.createElement(_grommet.Paragraph, {
      key: size,
      size: size
    }, "Paragraph " + size, paragraphFiller);
  }), _react.default.createElement(_grommet.Paragraph, {
    color: "status-critical"
  }, "This is an error message."));
};

(0, _react2.storiesOf)('Paragraph', module).add('All', function () {
  return _react.default.createElement(All, null);
});