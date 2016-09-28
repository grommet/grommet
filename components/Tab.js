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

var _KeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.TAB;

var Tab = function (_Component) {
  (0, _inherits3.default)(Tab, _Component);

  function Tab() {
    (0, _classCallCheck3.default)(this, Tab);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Tab.__proto__ || (0, _getPrototypeOf2.default)(Tab)).call(this));

    _this._onClickTab = _this._onClickTab.bind(_this);
    _this._startKeyboardListener = _this._startKeyboardListener.bind(_this);
    _this._stopKeybardListener = _this._stopKeybardListener.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Tab, [{
    key: '_startKeyboardListener',
    value: function _startKeyboardListener() {
      this._listeners = {
        space: this._onClickTab,
        enter: this._onClickTab
      };
      _KeyboardAccelerators2.default.startListeningToKeyboard(this.tabRef, this._listeners);
    }
  }, {
    key: '_stopKeybardListener',
    value: function _stopKeybardListener() {
      _KeyboardAccelerators2.default.stopListeningToKeyboard(this.tabRef, this._listeners);
    }
  }, {
    key: '_onClickTab',
    value: function _onClickTab(event) {
      var onRequestForActive = this.props.onRequestForActive;

      if (event) {
        event.preventDefault();
      }
      onRequestForActive();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var active = _props.active;
      var id = _props.id;
      var title = _props.title;


      var classes = (0, _classnames3.default)(CLASS_ROOT, (0, _defineProperty3.default)({}, CLASS_ROOT + '--active', active));

      return _react2.default.createElement(
        'li',
        { className: classes, id: id },
        _react2.default.createElement(
          'a',
          { href: '#', role: 'tab', ref: function ref(_ref) {
              return _this2.tabRef = _ref;
            },
            onClick: this._onClickTab, 'aria-expanded': active,
            onFocus: this._startKeyboardListener, 'aria-selected': active,
            onBlur: this._stopKeybardListener },
          _react2.default.createElement(
            'label',
            { className: CLASS_ROOT + '__label', htmlFor: id },
            title
          )
        )
      );
    }
  }]);
  return Tab;
}(_react.Component);

Tab.displayName = 'Tab';
exports.default = Tab;


Tab.propTypes = {
  title: _react.PropTypes.string.isRequired,
  active: _react.PropTypes.bool,
  id: _react.PropTypes.string
};
module.exports = exports['default'];