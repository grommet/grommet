'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Drop = require('../utils/Drop');

var _Drop2 = _interopRequireDefault(_Drop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.TIP; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var Tip = function (_Component) {
  (0, _inherits3.default)(Tip, _Component);

  function Tip(props) {
    (0, _classCallCheck3.default)(this, Tip);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Tip.__proto__ || (0, _getPrototypeOf2.default)(Tip)).call(this));

    _this._getTarget = _this._getTarget.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Tip, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props,
          onClose = _props.onClose,
          colorIndex = _props.colorIndex;

      var target = this._getTarget();
      if (target) {
        (function () {
          var _classnames;

          var rect = target.getBoundingClientRect();
          var align = {
            left: rect.left < window.innerWidth - rect.right ? 'left' : undefined,
            right: rect.left >= window.innerWidth - rect.right ? 'right' : undefined,
            top: rect.top < window.innerHeight - rect.bottom ? 'bottom' : undefined,
            bottom: rect.top >= window.innerHeight - rect.bottom ? 'top' : undefined
          };

          var classNames = (0, _classnames3.default)(CLASS_ROOT + '__drop', (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__drop--left', align.left), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__drop--right', align.right), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__drop--top', align.top), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__drop--bottom', align.bottom), _classnames));

          // we need a timeout here to avoid wrong bounding rect
          // for the target element
          setTimeout(function () {
            _this2._drop = _Drop2.default.add(target, _this2._renderDrop(), {
              align: align,
              className: classNames,
              colorIndex: colorIndex,
              responsive: false
            });
          }, 1);

          target.addEventListener('click', onClose);
          target.addEventListener('blur', onClose);
        })();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var onClose = this.props.onClose;

      var target = this._getTarget();
      this._drop.remove();

      if (target) {
        target.removeEventListener('click', onClose);
        target.removeEventListener('blur', onClose);
      }
    }
  }, {
    key: '_getTarget',
    value: function _getTarget() {
      var target = this.props.target;


      return document.getElementById(target) || document.querySelector('.' + target);
    }
  }, {
    key: '_renderDrop',
    value: function _renderDrop() {
      var onClose = this.props.onClose;

      return _react2.default.createElement(
        _Box2.default,
        { className: CLASS_ROOT,
          pad: { horizontal: 'medium', vertical: 'small' },
          onClick: onClose },
        this.props.children
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('span', null);
    }
  }]);
  return Tip;
}(_react.Component);

Tip.displayName = 'Tip';
exports.default = Tip;


Tip.propTypes = {
  colorIndex: _react.PropTypes.string,
  onClose: _react.PropTypes.func.isRequired,
  target: _react.PropTypes.string.isRequired
};

Tip.defaultProps = {
  colorIndex: 'accent-1'
};
module.exports = exports['default'];