'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _pick = require('lodash/object/pick');

var _pick2 = _interopRequireDefault(_pick);

var _keys = require('lodash/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "tags";

var Tags = (function (_Component) {
  _inherits(Tags, _Component);

  function Tags() {
    _classCallCheck(this, Tags);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Tags).apply(this, arguments));
  }

  _createClass(Tags, [{
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];

      if (this.props.className) {
        classes.push(this.props.className);
      }

      var other = (0, _pick2.default)(this.props, (0, _keys2.default)(_Box2.default.propTypes));

      return _react2.default.createElement(
        _Box2.default,
        _extends({}, other, {
          className: classes.join(' '),
          direction: this.props.direction,
          align: this.props.align,
          wrap: true }),
        this.props.children
      );
    }
  }]);

  return Tags;
})(_react.Component);

exports.default = Tags;

Tags.propTypes = _extends({}, _Box2.default.propTypes);

Tags.defaultProps = {
  direction: 'row',
  align: 'start'
};
module.exports = exports['default'];