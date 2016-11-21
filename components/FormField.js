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

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.FORM_FIELD; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var FormField = function (_Component) {
  (0, _inherits3.default)(FormField, _Component);

  function FormField(props, context) {
    (0, _classCallCheck3.default)(this, FormField);

    var _this = (0, _possibleConstructorReturn3.default)(this, (FormField.__proto__ || (0, _getPrototypeOf2.default)(FormField)).call(this, props, context));

    _this._onFocus = _this._onFocus.bind(_this);
    _this._onBlur = _this._onBlur.bind(_this);
    _this._onClick = _this._onClick.bind(_this);

    _this.state = { focus: false };
    return _this;
  }

  (0, _createClass3.default)(FormField, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var contentsElement = this.contentsRef;
      if (contentsElement) {
        var inputElements = contentsElement.querySelectorAll('input, textarea, select');
        if (inputElements.length === 1) {
          this._inputElement = inputElements[0];
          this._inputElement.addEventListener('focus', this._onFocus);
          this._inputElement.addEventListener('blur', this._onBlur);
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._inputElement) {
        this._inputElement.removeEventListener('focus', this._onFocus);
        this._inputElement.removeEventListener('blur', this._onBlur);
        delete this._inputElement;
      }
    }
  }, {
    key: '_onFocus',
    value: function _onFocus() {
      this.setState({ focus: true });
    }
  }, {
    key: '_onBlur',
    value: function _onBlur() {
      this.setState({ focus: false });
    }
  }, {
    key: '_onClick',
    value: function _onClick() {
      if (this._inputElement) {
        this._inputElement.focus();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames,
          _this2 = this;

      var _props = this.props,
          children = _props.children,
          className = _props.className,
          help = _props.help,
          hidden = _props.hidden,
          htmlFor = _props.htmlFor,
          label = _props.label,
          size = _props.size,
          strong = _props.strong,
          error = _props.error,
          props = (0, _objectWithoutProperties3.default)(_props, ['children', 'className', 'help', 'hidden', 'htmlFor', 'label', 'size', 'strong', 'error']);


      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--focus', this.state.focus), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--hidden', hidden), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--text', htmlFor), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--size-' + size, size), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--strong', strong), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--error', error), _classnames), className);

      var fieldError = error ? _react2.default.createElement(
        'span',
        { className: CLASS_ROOT + "__error" },
        error
      ) : undefined;

      var fieldHelp = help !== null && help !== undefined ? _react2.default.createElement(
        'span',
        { className: CLASS_ROOT + "__help" },
        this.props.help
      ) : undefined;

      var labelNode = label ? _react2.default.createElement(
        'label',
        { className: CLASS_ROOT + "__label", htmlFor: htmlFor },
        label
      ) : undefined;

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ className: classes }, props, { onClick: this._onClick }),
        fieldError,
        labelNode,
        fieldHelp,
        _react2.default.createElement(
          'span',
          { ref: function ref(_ref) {
              return _this2.contentsRef = _ref;
            },
            className: CLASS_ROOT + "__contents" },
          children
        )
      );
    }
  }]);
  return FormField;
}(_react.Component);

FormField.displayName = 'FormField';
exports.default = FormField;


FormField.propTypes = {
  error: _react.PropTypes.node,
  help: _react.PropTypes.node,
  hidden: _react.PropTypes.bool,
  htmlFor: _react.PropTypes.string,
  label: _react.PropTypes.node,
  size: _react.PropTypes.oneOf(['medium', 'large']),
  strong: _react.PropTypes.bool
};

FormField.defaultProps = {
  size: 'medium',
  strong: false
};
module.exports = exports['default'];