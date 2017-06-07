'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Drop = require('../utils/Drop');

var _Drop2 = _interopRequireDefault(_Drop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.TIP;

var Tip = function (_Component) {
  _inherits(Tip, _Component);

  function Tip(props) {
    _classCallCheck(this, Tip);

    var _this = _possibleConstructorReturn(this, (Tip.__proto__ || Object.getPrototypeOf(Tip)).call(this));

    _this._getTarget = _this._getTarget.bind(_this);
    _this._onResize = _this._onResize.bind(_this);
    return _this;
  }

  _createClass(Tip, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          onClose = _props.onClose,
          colorIndex = _props.colorIndex;

      var target = this._getTarget();
      if (target) {
        var _classnames;

        var rect = target.getBoundingClientRect();
        var align = {
          left: rect.left < window.innerWidth - rect.right ? 'left' : undefined,
          right: rect.left >= window.innerWidth - rect.right ? 'right' : undefined,
          top: rect.top < window.innerHeight - rect.bottom ? 'bottom' : undefined,
          bottom: rect.top >= window.innerHeight - rect.bottom ? 'top' : undefined
        };

        var classNames = (0, _classnames3.default)(CLASS_ROOT + '__drop', (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '__drop--left', align.left), _defineProperty(_classnames, CLASS_ROOT + '__drop--right', align.right), _defineProperty(_classnames, CLASS_ROOT + '__drop--top', align.top), _defineProperty(_classnames, CLASS_ROOT + '__drop--bottom', align.bottom), _classnames));

        this._drop = new _Drop2.default(target, this._renderDropContent(), {
          align: align,
          className: classNames,
          colorIndex: colorIndex,
          responsive: false
        });

        target.addEventListener('click', onClose);
        target.addEventListener('blur', onClose);
        window.addEventListener('resize', this._onResize);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var onClose = this.props.onClose;

      var target = this._getTarget();

      // if the drop was created successfully, remove it
      if (this._drop) {
        this._drop.remove();
      }
      if (target) {
        target.removeEventListener('click', onClose);
        target.removeEventListener('blur', onClose);
        window.removeEventListener('resize', this._onResize);
      }
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      if (this._drop) {
        this._drop.place();
      }
    }
  }, {
    key: '_getTarget',
    value: function _getTarget() {
      var target = this.props.target;


      return document.getElementById(target) || document.querySelector('.' + target);
    }
  }, {
    key: '_renderDropContent',
    value: function _renderDropContent() {
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
  colorIndex: _propTypes2.default.string,
  onClose: _propTypes2.default.func.isRequired,
  target: _propTypes2.default.string.isRequired
};

Tip.defaultProps = {
  colorIndex: 'accent-1'
};
module.exports = exports['default'];