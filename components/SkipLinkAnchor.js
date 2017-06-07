'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.SKIP_LINK_ANCHOR;

var SkipLinkAnchor = function (_Component) {
  _inherits(SkipLinkAnchor, _Component);

  function SkipLinkAnchor() {
    _classCallCheck(this, SkipLinkAnchor);

    return _possibleConstructorReturn(this, (SkipLinkAnchor.__proto__ || Object.getPrototypeOf(SkipLinkAnchor)).apply(this, arguments));
  }

  _createClass(SkipLinkAnchor, [{
    key: 'render',
    value: function render() {
      var id = 'skip-link-' + this.props.label.toLowerCase().replace(/ /g, '_');

      return _react2.default.createElement(
        'a',
        { tabIndex: '-1', 'aria-hidden': 'true', id: id, className: CLASS_ROOT },
        this.props.label
      );
    }
  }]);

  return SkipLinkAnchor;
}(_react.Component);

SkipLinkAnchor.displayName = 'SkipLinkAnchor';
exports.default = SkipLinkAnchor;


SkipLinkAnchor.propTypes = {
  label: _propTypes2.default.node.isRequired
};
module.exports = exports['default'];