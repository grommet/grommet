'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pick2 = require('lodash/object/pick');

var _pick3 = _interopRequireDefault(_pick2);

var _keys = require('lodash/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  pick: function pick(props, comp) {
    return (0, _pick3.default)(props, (0, _keys2.default)(comp.propTypes));
  }
};
module.exports = exports['default'];