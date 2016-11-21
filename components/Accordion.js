'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _isInteger = require('babel-runtime/core-js/number/is-integer');

var _isInteger2 = _interopRequireDefault(_isInteger);

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.ACCORDION; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var Accordion = function (_Component) {
  (0, _inherits3.default)(Accordion, _Component);

  function Accordion(props, context) {
    (0, _classCallCheck3.default)(this, Accordion);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Accordion.__proto__ || (0, _getPrototypeOf2.default)(Accordion)).call(this, props, context));

    _this._onPanelChange = _this._onPanelChange.bind(_this);

    var active = void 0;
    if ((0, _isInteger2.default)(_this.props.active)) {
      active = [_this.props.active];
    } else {
      active = _this.props.active || [];
    }
    _this.state = {
      active: active
    };
    return _this;
  }

  (0, _createClass3.default)(Accordion, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.active !== this.props.active) {
        this.setState({ active: newProps.active || [] });
      }
    }
  }, {
    key: '_onPanelChange',
    value: function _onPanelChange(index) {
      var active = [].concat((0, _toConsumableArray3.default)(this.state.active));
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
        return _react2.default.cloneElement(child, {
          active: _this2.state.active.indexOf(index) > -1,
          onChange: function onChange() {
            _this2._onPanelChange(index);
          },
          animate: animate
        });
      });

      var restProps = _Props2.default.omit(this.props, (0, _keys2.default)(Accordion.propTypes));
      return _react2.default.createElement(
        _List2.default,
        (0, _extends3.default)({ role: 'tablist', className: classes }, restProps),
        accordionChildren
      );
    }
  }]);
  return Accordion;
}(_react.Component);

Accordion.displayName = 'Accordion';
exports.default = Accordion;
;

Accordion.propTypes = {
  active: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.arrayOf(_react.PropTypes.number)]),
  animate: _react.PropTypes.bool,
  onActive: _react.PropTypes.func,
  openMulti: _react.PropTypes.bool
};

Accordion.defaultProps = {
  openMulti: false,
  animate: true
};
module.exports = exports['default'];