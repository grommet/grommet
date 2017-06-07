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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.CHART_BASE;

// Placeholder that reserves space on the screen for Layers to be
// positioned over.

var Base = function (_Component) {
  _inherits(Base, _Component);

  function Base() {
    _classCallCheck(this, Base);

    return _possibleConstructorReturn(this, (Base.__proto__ || Object.getPrototypeOf(Base)).apply(this, arguments));
  }

  _createClass(Base, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props = this.props,
          height = _props.height,
          width = _props.width;

      if (nextProps.width !== width || nextProps.height !== height) {
        this._notifySizeChange = true;
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this._notifySizeChange) {
        this._notifySizeChange = false;
        var event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var _props2 = this.props,
          children = _props2.children,
          className = _props2.className,
          height = _props2.height,
          vertical = _props2.vertical,
          width = _props2.width,
          props = _objectWithoutProperties(_props2, ['children', 'className', 'height', 'vertical', 'width']);

      var childCount = _react.Children.count(children);
      var finalHeight = !childCount && !height ? 'medium' : height;
      var finalWidth = !childCount && !width && 'sparkline' !== height ? 'medium' : width;

      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--vertical', vertical), _defineProperty(_classnames, CLASS_ROOT + '--height-' + finalHeight, finalHeight), _defineProperty(_classnames, CLASS_ROOT + '--width-' + finalWidth, finalWidth), _classnames), className);

      var mappedChildren = children;
      // We can't distribute children when vertical because our height isn't
      // known.
      if (!vertical) {
        // Round to hundredths of a % so things line up reasonably accurately
        var basis = Math.floor(10000 / childCount) / 100.0 + '%';
        mappedChildren = _react.Children.map(children, function (child) {
          return child ? _react2.default.cloneElement(child, { style: { flexBasis: basis } }) : child;
        });
      }

      return _react2.default.createElement(
        'div',
        _extends({}, props, { className: classes }),
        mappedChildren
      );
    }
  }]);

  return Base;
}(_react.Component);

Base.displayName = 'Base';
exports.default = Base;


Base.propTypes = {
  height: _propTypes2.default.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'sparkline']),
  vertical: _propTypes2.default.bool,
  width: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'full'])
};
module.exports = exports['default'];