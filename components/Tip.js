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

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Drop = require('../utils/Drop');

var _Drop2 = _interopRequireDefault(_Drop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.TIP; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var Tip = function (_Component) {
  (0, _inherits3.default)(Tip, _Component);

  function Tip() {
    (0, _classCallCheck3.default)(this, Tip);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Tip).apply(this, arguments));
  }

  (0, _createClass3.default)(Tip, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props;
      var targetId = _props.targetId;
      var onClose = _props.onClose;
      var colorIndex = _props.colorIndex;

      var target = document.getElementById(targetId);
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
      var _props2 = this.props;
      var targetId = _props2.targetId;
      var onClose = _props2.onClose;

      var target = document.getElementById(targetId);
      if (target) {
        this._drop.remove();
        target.removeEventListener('click', onClose);
        target.removeEventListener('blur', onClose);
      }
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
  targetId: _react.PropTypes.string.isRequired
};

Tip.defaultProps = {
  colorIndex: 'accent-1'
};
module.exports = exports['default'];