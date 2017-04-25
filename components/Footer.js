'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames4 = require('classnames');

var _classnames5 = _interopRequireDefault(_classnames4);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _SkipLinkAnchor = require('./SkipLinkAnchor');

var _SkipLinkAnchor2 = _interopRequireDefault(_SkipLinkAnchor);

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.FOOTER;

var Footer = function (_Component) {
  _inherits(Footer, _Component);

  function Footer(props, context) {
    _classCallCheck(this, Footer);

    var _this = _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props, context));

    _this._alignMirror = _this._alignMirror.bind(_this);
    _this._onResize = _this._onResize.bind(_this);
    return _this;
  }

  _createClass(Footer, [{
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
      var contentElement = _reactDom2.default.findDOMNode(this.contentRef);
      var mirrorElement = this.mirrorRef;

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
      var _classnames,
          _classnames2,
          _this2 = this;

      var _props = this.props,
          children = _props.children,
          className = _props.className,
          colorIndex = _props.colorIndex,
          fixed = _props.fixed,
          float = _props.float,
          primary = _props.primary,
          size = _props.size;

      var restProps = _Props2.default.omit(this.props, Object.keys(Footer.propTypes));
      var classes = (0, _classnames5.default)(CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size && typeof size === 'string'), _defineProperty(_classnames, CLASS_ROOT + '--float', float), _classnames), className);

      var containerClasses = (0, _classnames5.default)(CLASS_ROOT + '__container', (_classnames2 = {}, _defineProperty(_classnames2, CLASS_ROOT + '__container--float', float), _defineProperty(_classnames2, CLASS_ROOT + '__container--fixed', fixed), _defineProperty(_classnames2, CLASS_ROOT + '__container--fill',
      // add default color index if none is provided
      fixed && !colorIndex), _classnames2));

      var wrapperClasses = (0, _classnames5.default)(CLASS_ROOT + '__wrapper', _defineProperty({}, CLASS_ROOT + '__wrapper--' + size, size && typeof size === 'string'));

      var footerSkipLink = void 0;
      if (primary) {
        footerSkipLink = _react2.default.createElement(_SkipLinkAnchor2.default, { label: 'Footer' });
      }

      var boxProps = _Props2.default.pick(this.props, Object.keys(_Box2.default.propTypes));
      // don't transfer size to Box since it means something different
      delete boxProps.size;

      if (fixed) {
        return _react2.default.createElement(
          'div',
          _extends({ className: containerClasses }, restProps),
          _react2.default.createElement('div', { ref: function ref(_ref) {
              return _this2.mirrorRef = _ref;
            },
            className: CLASS_ROOT + '__mirror' }),
          _react2.default.createElement(
            'div',
            { className: wrapperClasses },
            _react2.default.createElement(
              _Box2.default,
              _extends({ ref: function ref(_ref2) {
                  return _this2.contentRef = _ref2;
                }
              }, boxProps, { tag: 'footer', className: classes,
                primary: false }),
              footerSkipLink,
              children
            )
          )
        );
      } else {
        return _react2.default.createElement(
          _Box2.default,
          _extends({}, restProps, boxProps, { tag: 'footer', className: classes,
            containerClassName: containerClasses,
            primary: false }),
          footerSkipLink,
          children
        );
      }
    }
  }]);

  return Footer;
}(_react.Component);

Footer.displayName = 'Footer';
exports.default = Footer;


Footer.propTypes = _extends({
  fixed: _propTypes2.default.bool,
  float: _propTypes2.default.bool,
  primary: _propTypes2.default.bool,
  size: _propTypes2.default.oneOf(['small', 'medium', 'large'])
}, _Box2.default.propTypes);

Footer.defaultProps = {
  align: 'center',
  direction: 'row',
  responsive: false
};
module.exports = exports['default'];