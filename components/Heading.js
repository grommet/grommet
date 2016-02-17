'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = 'heading';

var Heading = function (_Component) {
  _inherits(Heading, _Component);

  function Heading() {
    _classCallCheck(this, Heading);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Heading).apply(this, arguments));
  }

  _createClass(Heading, [{
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.size) {
        classes.push(CLASS_ROOT + '--' + this.props.size);
      }
      if (this.props.strong) {
        classes.push(CLASS_ROOT + '--strong');
      }
      if (this.props.align) {
        classes.push(CLASS_ROOT + '--align-' + this.props.align);
      }
      if (this.props.margin) {
        classes.push(CLASS_ROOT + '--margin-' + this.props.margin);
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      return _react2.default.createElement(
        this.props.tag,
        { className: classes.join(' ') },
        _react2.default.createElement(
          'span',
          null,
          this.props.children
        )
      );
    }
  }]);

  return Heading;
}(_react.Component);

exports.default = Heading;

Heading.propTypes = {
  align: _react.PropTypes.oneOf(['start', 'center', 'end']),
  margin: _react.PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  size: _react.PropTypes.oneOf(['small', 'medium', 'large']),
  strong: _react.PropTypes.bool,
  tag: _react.PropTypes.string
};

Heading.defaultProps = {
  tag: 'h1'
};
module.exports = exports['default'];