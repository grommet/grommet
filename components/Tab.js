'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

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
    return _this;
  }

  (0, _createClass3.default)(Tab, [{
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
      var _props = this.props,
          active = _props.active,
          className = _props.className,
          id = _props.id,
          title = _props.title,
          props = (0, _objectWithoutProperties3.default)(_props, ['active', 'className', 'id', 'title']);

      delete props.onRequestForActive;
      var classes = (0, _classnames3.default)(CLASS_ROOT, (0, _defineProperty3.default)({}, CLASS_ROOT + '--active', active), className);

      return _react2.default.createElement(
        'li',
        (0, _extends3.default)({}, props, { className: classes, id: id }),
        _react2.default.createElement(
          _Button2.default,
          { plain: true, role: 'tab', 'aria-selected': active,
            onClick: this._onClickTab, 'aria-expanded': active },
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
  id: _react.PropTypes.string,
  onRequestForActive: _react.PropTypes.func // from Tabs
};
module.exports = exports['default'];