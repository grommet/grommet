'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Anchor = require('./Anchor');

var _Anchor2 = _interopRequireDefault(_Anchor);

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.TAG;

var Tag = function (_Component) {
  (0, _inherits3.default)(Tag, _Component);

  function Tag() {
    (0, _classCallCheck3.default)(this, Tag);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Tag.__proto__ || (0, _getPrototypeOf2.default)(Tag)).call(this));

    console.warn('Tag: component has been deprecated. Use Button instead.');
    return _this;
  }

  (0, _createClass3.default)(Tag, [{
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];

      if (this.props.className) {
        classes.push(this.props.className);
      }

      var other = _Props2.default.pick(this.props, (0, _keys2.default)(_Anchor2.default.propTypes));

      return _react2.default.createElement(
        'div',
        { className: classes.join(' '), onClick: this.props.onClick },
        this.props.children,
        _react2.default.createElement(
          _Anchor2.default,
          (0, _extends3.default)({}, other, { className: CLASS_ROOT + '--label' }),
          _react2.default.createElement(
            'span',
            null,
            this.props.label
          )
        )
      );
    }
  }]);
  return Tag;
}(_react.Component);

Tag.displayName = 'Tag';
exports.default = Tag;


Tag.propTypes = (0, _extends3.default)({
  label: _react2.default.PropTypes.string
}, _Anchor2.default.propTypes);
module.exports = exports['default'];