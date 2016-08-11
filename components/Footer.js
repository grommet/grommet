'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var CLASS_ROOT = _CSSClassnames2.default.FOOTER; // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var Footer = function (_Component) {
  (0, _inherits3.default)(Footer, _Component);

  function Footer(props, context) {
    (0, _classCallCheck3.default)(this, Footer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Footer).call(this, props, context));

    _this._alignMirror = _this._alignMirror.bind(_this);
    _this._onResize = _this._onResize.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Footer, [{
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
      var _classnames, _classnames2;

      var classes = (0, _classnames5.default)(CLASS_ROOT, this.props.className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + this.props.size, this.props.size), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--float', this.props.float), _classnames));

      var containerClasses = (0, _classnames5.default)(CLASS_ROOT + '__container', (_classnames2 = {}, (0, _defineProperty3.default)(_classnames2, CLASS_ROOT + '__container--float', this.props.float), (0, _defineProperty3.default)(_classnames2, CLASS_ROOT + '__container--fixed', this.props.fixed), (0, _defineProperty3.default)(_classnames2, CLASS_ROOT + '__container--fill',
      // add default color index if none is provided
      this.props.fixed && !this.props.colorIndex), _classnames2));

      var wrapperClasses = (0, _classnames5.default)(CLASS_ROOT + '__wrapper', (0, _defineProperty3.default)({}, CLASS_ROOT + '__wrapper--' + this.props.size, this.props.size));

      var footerSkipLink = void 0;
      if (this.props.primary) {
        footerSkipLink = _react2.default.createElement(_SkipLinkAnchor2.default, { label: 'Footer' });
      }

      var boxProps = _Props2.default.pick(this.props, (0, _keys2.default)(_Box2.default.propTypes));
      // don't transfer size to Box since it means something different
      delete boxProps.size;

      if (this.props.fixed) {
        return _react2.default.createElement(
          'div',
          { className: containerClasses },
          _react2.default.createElement('div', { ref: 'mirror', className: CLASS_ROOT + '__mirror' }),
          _react2.default.createElement(
            'div',
            { className: wrapperClasses },
            _react2.default.createElement(
              _Box2.default,
              (0, _extends3.default)({ ref: 'content' }, boxProps, { tag: 'footer', className: classes,
                primary: false }),
              footerSkipLink,
              this.props.children
            )
          )
        );
      } else {
        return _react2.default.createElement(
          _Box2.default,
          (0, _extends3.default)({}, boxProps, { tag: 'footer', className: classes,
            containerClassName: containerClasses,
            primary: false }),
          footerSkipLink,
          this.props.children
        );
      }
    }
  }]);
  return Footer;
}(_react.Component);

Footer.displayName = 'Footer';
exports.default = Footer;
;

Footer.propTypes = (0, _extends3.default)({
  fixed: _react.PropTypes.bool,
  float: _react.PropTypes.bool,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large']),
  primary: _react.PropTypes.bool
}, _Box2.default.propTypes);

Footer.defaultProps = {
  direction: 'row',
  responsive: false
};
module.exports = exports['default'];