// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var CLASS_ROOT = "form-field";

var FormField = (function (_Component) {
  _inherits(FormField, _Component);

  function FormField() {
    _classCallCheck(this, FormField);

    _get(Object.getPrototypeOf(FormField.prototype), 'constructor', this).call(this);

    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onClick = this._onClick.bind(this);

    this.state = { focus: false };
  }

  _createClass(FormField, [{
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

      var error;
      if (this.props.error) {
        classes.push(CLASS_ROOT + "--error");
        error = _react2['default'].createElement(
          'span',
          { className: CLASS_ROOT + "__error" },
          this.props.error
        );
      }
      var help;
      if (this.props.help !== null && this.props.help !== undefined) {
        help = _react2['default'].createElement(
          'span',
          { className: CLASS_ROOT + "__help" },
          this.props.help
        );
      }

      return _react2['default'].createElement(
        'div',
        { className: classes.join(' '), onClick: this._onClick },
        error,
        _react2['default'].createElement(
          'label',
          { className: CLASS_ROOT + "__label", htmlFor: this.props.htmlFor },
          this.props.label
        ),
        help,
        _react2['default'].createElement(
          'span',
          { ref: 'contents', className: CLASS_ROOT + "__contents" },
          this.props.children
        )
      );
    }
  }]);

  return FormField;
})(_react.Component);

FormField.propTypes = {
  error: _react.PropTypes.node,
  help: _react.PropTypes.node,
  hidden: _react.PropTypes.bool,
  htmlFor: _react.PropTypes.string,
  label: _react.PropTypes.node,
  required: _react.PropTypes.bool
};

module.exports = FormField;