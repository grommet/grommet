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

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.FORM_FIELD;

var FormField = function (_Component) {
  (0, _inherits3.default)(FormField, _Component);

  function FormField(props, context) {
    (0, _classCallCheck3.default)(this, FormField);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(FormField).call(this, props, context));

    _this._onFocus = _this._onFocus.bind(_this);
    _this._onBlur = _this._onBlur.bind(_this);
    _this._onClick = _this._onClick.bind(_this);

    _this.state = { focus: false };
    return _this;
  }

  (0, _createClass3.default)(FormField, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var contentsElement = this.refs.contents;
      var inputElements = contentsElement.querySelectorAll('input, textarea, select');
      if (inputElements.length === 1) {
        this._inputElement = inputElements[0];
        this._inputElement.addEventListener('focus', this._onFocus);
        this._inputElement.addEventListener('blur', this._onBlur);
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
      var classes = [CLASS_ROOT];
      if (this.state.focus) {
        classes.push(CLASS_ROOT + "--focus");
      }
      if (this.props.required) {
        classes.push(CLASS_ROOT + "--required");
      }
      if (this.props.hidden) {
        classes.push(CLASS_ROOT + "--hidden");
      }
      if (this.props.htmlFor) {
        classes.push(CLASS_ROOT + "--text");
      }
      if (this.props.size) {
        classes.push(CLASS_ROOT + "--size-" + this.props.size);
      }
      if (this.props.strong) {
        classes.push(CLASS_ROOT + '--strong');
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var error = void 0;
      if (this.props.error) {
        classes.push(CLASS_ROOT + "--error");
        error = _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + "__error" },
          this.props.error
        );
      }
      var help = void 0;
      if (this.props.help !== null && this.props.help !== undefined) {
        help = _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + "__help" },
          this.props.help
        );
      }

      var labelNode = void 0;
      if (this.props.label) {
        labelNode = _react2.default.createElement(
          'label',
          { className: CLASS_ROOT + "__label", htmlFor: this.props.htmlFor },
          this.props.label
        );
      }

      return _react2.default.createElement(
        'div',
        { className: classes.join(' '), onClick: this._onClick },
        error,
        labelNode,
        help,
        _react2.default.createElement(
          'span',
          { ref: 'contents', className: CLASS_ROOT + "__contents" },
          this.props.children
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
  required: _react.PropTypes.bool,
  size: _react.PropTypes.oneOf(['medium', 'large']),
  strong: _react.PropTypes.bool
};

FormField.defaultProps = {
  size: 'medium',
  strong: false
};
module.exports = exports['default'];