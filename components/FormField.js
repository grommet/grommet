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

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.FORM_FIELD;

var FormField = function (_Component) {
  _inherits(FormField, _Component);

  function FormField(props, context) {
    _classCallCheck(this, FormField);

    var _this = _possibleConstructorReturn(this, (FormField.__proto__ || Object.getPrototypeOf(FormField)).call(this, props, context));

    _this._onFocus = _this._onFocus.bind(_this);
    _this._onBlur = _this._onBlur.bind(_this);
    _this._onClick = _this._onClick.bind(_this);

    _this.state = { focus: false };
    return _this;
  }

  _createClass(FormField, [{
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
          props = _objectWithoutProperties(_props, ['children', 'className', 'help', 'hidden', 'htmlFor', 'label', 'size', 'strong', 'error']);

      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--focus', this.state.focus), _defineProperty(_classnames, CLASS_ROOT + '--hidden', hidden), _defineProperty(_classnames, CLASS_ROOT + '--text', htmlFor), _defineProperty(_classnames, CLASS_ROOT + '--size-' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--strong', strong), _defineProperty(_classnames, CLASS_ROOT + '--error', error), _classnames), className);

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
        _extends({ className: classes }, props, { onClick: this._onClick }),
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
  error: _propTypes2.default.node,
  help: _propTypes2.default.node,
  hidden: _propTypes2.default.bool,
  htmlFor: _propTypes2.default.string,
  label: _propTypes2.default.node,
  size: _propTypes2.default.oneOf(['medium', 'large']),
  strong: _propTypes2.default.bool
};

FormField.defaultProps = {
  size: 'medium',
  strong: false
};
module.exports = exports['default'];