'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  activeIndex: _propTypes2.default.number,
  max: _propTypes2.default.number.isRequired,
  min: _propTypes2.default.number.isRequired,
  onActivate: _propTypes2.default.func.isRequired,
  series: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    label: _propTypes2.default.string, // used in Spiral
    value: _propTypes2.default.number.isRequired,
    colorIndex: _propTypes2.default.string,
    onClick: _propTypes2.default.func
  })).isRequired,
  stacked: _propTypes2.default.bool,
  thresholds: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    value: _propTypes2.default.number.isRequired,
    colorIndex: _propTypes2.default.string
  })).isRequired,
  total: _propTypes2.default.number.isRequired,
  vertical: _propTypes2.default.bool
};
module.exports = exports['default'];