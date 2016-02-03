'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SkipLinkAnchor = function SkipLinkAnchor(_ref) {
  var label = _ref.label;

  var id = 'skip-link-' + label.toLowerCase().replace(/ /g, '_');

  return _react2.default.createElement(
    'a',
    { tabIndex: '-1', id: id, className: 'skip-link-anchor' },
    label
  );
}; // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

SkipLinkAnchor.propTypes = {
  label: _react.PropTypes.node.isRequired
};

SkipLinkAnchor.displayName = 'SkipLinkAnchor';

exports.default = SkipLinkAnchor;
module.exports = exports['default'];