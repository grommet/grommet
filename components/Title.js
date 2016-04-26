'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "title";

var Title = function (_Component) {
  _inherits(Title, _Component);

  function Title() {
    _classCallCheck(this, Title);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Title).apply(this, arguments));
  }

  _createClass(Title, [{
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.responsive) {
        classes.push(CLASS_ROOT + "--responsive");
      }
      if (this.props.onClick) {
        classes.push(CLASS_ROOT + "--interactive");
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var a11yTitle = this.props.a11yTitle || _Intl2.default.getMessage(this.context.intl, 'Title');

      return _react2.default.createElement(
        _Box2.default,
        { align: 'center', direction: 'row', responsive: false,
          className: classes.join(' '), a11yTitle: a11yTitle,
          onClick: this.props.onClick },
        this.props.children
      );
    }
  }]);

  return Title;
}(_react.Component);

exports.default = Title;


Title.propTypes = {
  a11yTitle: _react.PropTypes.string,
  onClick: _react.PropTypes.func,
  responsive: _react.PropTypes.bool
};

Title.contextTypes = {
  intl: _react.PropTypes.object
};

Title.defaultProps = {
  responsive: true
};
module.exports = exports['default'];