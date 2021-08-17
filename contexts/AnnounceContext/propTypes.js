"use strict";

exports.__esModule = true;
exports.AnnounceContextPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    children: _propTypes["default"].func
  };
}

var AnnounceContextPropTypes = PropType;
exports.AnnounceContextPropTypes = AnnounceContextPropTypes;