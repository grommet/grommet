'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LinkNext = require('./icons/base/LinkNext');

var _LinkNext2 = _interopRequireDefault(_LinkNext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "anchor";

var Anchor = (function (_Component) {
  _inherits(Anchor, _Component);

  function Anchor() {
    _classCallCheck(this, Anchor);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Anchor).apply(this, arguments));
  }

  _createClass(Anchor, [{
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      var icon = undefined;

      if (this.props.primary) {
        classes.push(CLASS_ROOT + "--primary");
        icon = _react2.default.createElement(_LinkNext2.default, null);
      }
      if (!this.props.onClick && !this.props.href) {
        classes.push(CLASS_ROOT + "--disabled");
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }
      var children = _react2.default.Children.map(this.props.children, function (child) {
        if (child && child.type && child.type.icon) {
          return _react2.default.createElement(
            'span',
            { className: CLASS_ROOT + '__icon' },
            child
          );
        } else {
          return child;
        }
      });

      return _react2.default.createElement(
        this.props.tag,
        { id: this.props.id, className: classes.join(' '),
          href: this.props.href,
          target: this.props.target,
          onClick: this.props.onClick },
        icon,
        children
      );
    }
  }]);

  return Anchor;
})(_react.Component);

exports.default = Anchor;

Anchor.propTypes = {
  href: _react.PropTypes.string,
  id: _react.PropTypes.string,
  onClick: _react.PropTypes.func,
  primary: _react.PropTypes.bool,
  tag: _react.PropTypes.string,
  target: _react.PropTypes.string
};

Anchor.defaultProps = {
  tag: 'a'
};