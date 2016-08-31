'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _KeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.TAB; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var Tab = function (_Component) {
  (0, _inherits3.default)(Tab, _Component);

  function Tab(props, context) {
    (0, _classCallCheck3.default)(this, Tab);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Tab.__proto__ || (0, _getPrototypeOf2.default)(Tab)).call(this, props, context));

    _this._processSpace = _this._processSpace.bind(_this);
    _this._onClickTab = _this._onClickTab.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Tab, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _KeyboardAccelerators2.default.startListeningToKeyboard(this, {
        space: this._processSpace
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _KeyboardAccelerators2.default.stopListeningToKeyboard(this, {
        space: this._processSpace
      });
    }
  }, {
    key: '_processSpace',
    value: function _processSpace(event) {
      if (event.target === this.tabRef) {
        this._onClickTab(event);
      }
    }
  }, {
    key: '_onClickTab',
    value: function _onClickTab(event) {
      if (event) {
        event.preventDefault();
      }
      this.props.onRequestForActive();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var classes = [CLASS_ROOT];

      if (this.props.active) {
        classes.push(CLASS_ROOT + "--active");
      }

      return _react2.default.createElement(
        'li',
        { className: classes.join(' '), id: this.props.id },
        _react2.default.createElement(
          'a',
          { ref: function ref(_ref) {
              return _this2.tabRef = _ref;
            }, role: 'tab',
            href: '#', onClick: this._onClickTab,
            'aria-expanded': this.props.active, 'aria-selected': this.props.active,
            className: CLASS_ROOT + "__link", 'aria-labelledby': this.props.id },
          _react2.default.createElement(
            'label',
            { className: CLASS_ROOT + '__label', htmlFor: this.props.id },
            this.props.title
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