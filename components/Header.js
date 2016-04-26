'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "header";

var Header = function (_Component) {
  _inherits(Header, _Component);

  function Header() {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Header).call(this));

    _this._onResize = _this._onResize.bind(_this);
    return _this;
  }

  _createClass(Header, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.fixed) {
        this._alignMirror();
        window.addEventListener('resize', this._onResize);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.fixed) {
        this._alignMirror();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.fixed) {
        window.removeEventListener('resize', this._onResize);
      }
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      this._alignMirror();
    }
  }, {
    key: '_alignMirror',
    value: function _alignMirror() {
      var contentElement = _reactDom2.default.findDOMNode(this.refs.content);
      var mirrorElement = this.refs.mirror;

      // constrain fixed content to the width of the mirror
      var mirrorRect = mirrorElement.getBoundingClientRect();
      contentElement.style.width = Math.floor(mirrorRect.width) + 'px';

      // align the mirror height with the content's height
      var contentRect = contentElement.getBoundingClientRect();
      mirrorElement.style.height = Math.floor(contentRect.height) + 'px';
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      var containerClasses = [CLASS_ROOT + '__container'];
      var wrapperClasses = [CLASS_ROOT + '__wrapper'];
      var other = _Props2.default.pick(this.props, Object.keys(_Box2.default.propTypes));
      if (this.props.fixed) {
        containerClasses.push(CLASS_ROOT + '__container--fixed');
      }
      if (this.props.float) {
        classes.push(CLASS_ROOT + '--float');
        containerClasses.push(CLASS_ROOT + '__container--float');
      }
      if (this.props.size) {
        classes.push(CLASS_ROOT + '--' + this.props.size);
        wrapperClasses.push(CLASS_ROOT + '__wrapper--' + this.props.size);
        // don't transfer size to Box since it means something different
        delete other.size;
      }
      if (this.props.splash) {
        classes.push(CLASS_ROOT + '--splash');
      }
      if (this.props.strong) {
        classes.push(CLASS_ROOT + '--strong');
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      if (this.props.fixed) {
        return _react2.default.createElement(
          'div',
          { className: containerClasses.join(' ') },
          _react2.default.createElement('div', { ref: 'mirror', className: CLASS_ROOT + '__mirror' }),
          _react2.default.createElement(
            'div',
            { className: wrapperClasses.join(' ') },
            _react2.default.createElement(
              _Box2.default,
              _extends({ ref: 'content', tag: this.props.header }, other, {
                className: classes.join(' ') }),
              this.props.children
            )
          )
        );
      } else {
        return _react2.default.createElement(
          _Box2.default,
          _extends({ tag: this.props.header }, other, { className: classes.join(' '),
            containerClassName: containerClasses.join(' ') }),
          this.props.children
        );
      }
    }
  }]);

  return Header;
}(_react.Component);

exports.default = Header;


Header.propTypes = _extends({
  fixed: _react.PropTypes.bool,
  float: _react.PropTypes.bool,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large']),
  splash: _react.PropTypes.bool,
  strong: _react.PropTypes.bool,
  tag: _react.PropTypes.string
}, _Box2.default.propTypes);

Header.defaultProps = {
  pad: { horizontal: 'none', vertical: 'none', between: 'small' },
  direction: 'row',
  align: 'center',
  responsive: false,
  tag: 'header'
};
module.exports = exports['default'];