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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.HEADER; // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var Header = function (_Component) {
  (0, _inherits3.default)(Header, _Component);

  function Header(props, context) {
    (0, _classCallCheck3.default)(this, Header);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Header).call(this, props, context));

    _this._onResize = _this._onResize.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Header, [{
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
      var other = _Props2.default.pick(this.props, (0, _keys2.default)(_Box2.default.propTypes));
      if (this.props.fixed) {
        containerClasses.push(CLASS_ROOT + '__container--fixed');

        // add default color index if none is provided
        if (!this.props.colorIndex) {
          containerClasses.push(CLASS_ROOT + '__container--fill');
        }
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
              (0, _extends3.default)({ ref: 'content', tag: this.props.header }, other, {
                className: classes.join(' ') }),
              this.props.children
            )
          )
        );
      } else {
        return _react2.default.createElement(
          _Box2.default,
          (0, _extends3.default)({ tag: this.props.header }, other, { className: classes.join(' '),
            containerClassName: containerClasses.join(' ') }),
          this.props.children
        );
      }
    }
  }]);
  return Header;
}(_react.Component);

Header.displayName = 'Header';
exports.default = Header;


Header.propTypes = (0, _extends3.default)({
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