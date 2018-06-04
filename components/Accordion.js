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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.ACCORDION;

var Accordion = function (_Component) {
  _inherits(Accordion, _Component);

  function Accordion(props, context) {
    _classCallCheck(this, Accordion);

    var _this = _possibleConstructorReturn(this, (Accordion.__proto__ || Object.getPrototypeOf(Accordion)).call(this, props, context));

    _this._onPanelChange = _this._onPanelChange.bind(_this);

    var active = void 0;
    // active in state should always be an array
    if (typeof _this.props.active === 'number') {
      active = [_this.props.active];
    } else {
      active = _this.props.active || [];
    }
    _this.state = {
      active: active
    };
    return _this;
  }

  _createClass(Accordion, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.active !== this.props.active) {
        this.setState({ active: newProps.active || [] });
      }
    }
  }, {
    key: '_onPanelChange',
    value: function _onPanelChange(index) {
      var active = [].concat(_toConsumableArray(this.state.active));
      var _props = this.props,
          onActive = _props.onActive,
          openMulti = _props.openMulti;


      var activeIndex = active.indexOf(index);
      if (activeIndex > -1) {
        active.splice(activeIndex, 1);
      } else {
        if (openMulti) {
          active.push(index);
        } else {
          active = [index];
        }
      }
      this.setState({ active: active }, function () {
        if (onActive) {
          if (!openMulti) {
            onActive(active[0]);
          } else {
            onActive(active);
          }
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          animate = _props2.animate,
          className = _props2.className,
          children = _props2.children;


      var classes = (0, _classnames2.default)(CLASS_ROOT, className);

      var accordionChildren = _react2.default.Children.map(children, function (child, index) {
        if (!child) return null;

        return _react2.default.cloneElement(child, {
          active: _this2.state.active.indexOf(index) > -1,
          onChange: function onChange() {
            _this2._onPanelChange(index);
          },
          animate: animate
        });
      });

      var restProps = _Props2.default.omit(this.props, Object.keys(Accordion.propTypes));
      return _react2.default.createElement(
        _List2.default,
        _extends({ role: 'tablist', className: classes }, restProps),
        accordionChildren
      );
    }
  }]);

  return Accordion;
}(_react.Component);

Accordion.displayName = 'Accordion';
exports.default = Accordion;


Accordion.propTypes = {
  active: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.arrayOf(_propTypes2.default.number)]),
  animate: _propTypes2.default.bool,
  onActive: _propTypes2.default.func,
  openMulti: _propTypes2.default.bool
};

Accordion.defaultProps = {
  openMulti: false,
  animate: true
};
module.exports = exports['default'];