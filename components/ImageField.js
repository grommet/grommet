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

var _FormField = require('./FormField');

var _FormField2 = _interopRequireDefault(_FormField);

var _Anchor = require('./Anchor');

var _Anchor2 = _interopRequireDefault(_Anchor);

var _Upgrade = require('./icons/base/Upgrade');

var _Upgrade2 = _interopRequireDefault(_Upgrade);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.IMAGE_FIELD;

var ImageField = function (_Component) {
  (0, _inherits3.default)(ImageField, _Component);

  function ImageField() {
    (0, _classCallCheck3.default)(this, ImageField);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ImageField).call(this));

    _this._onChange = _this._onChange.bind(_this);
    _this._onDrop = _this._onDrop.bind(_this);
    _this._onClear = _this._onClear.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(ImageField, [{
    key: '_processFiles',
    value: function _processFiles(files) {
      var onChange = this.props.onChange;

      if (files && files[0]) {
        (function () {
          var file = files[0];
          var reader = new FileReader();

          reader.addEventListener("load", function () {
            var fileData = {
              data: reader.result,
              name: file.name,
              size: file.size,
              type: file.type
            };

            onChange(fileData);
          });

          reader.readAsDataURL(file);
        })();
      }
    }
  }, {
    key: '_onChange',
    value: function _onChange(event) {
      var files = event.target.files;
      this._processFiles(files);
    }
  }, {
    key: '_onDrop',
    value: function _onDrop(event) {
      event.preventDefault();
      var files = event.dataTransfer.files;
      this._processFiles(files);
    }
  }, {
    key: '_onClear',
    value: function _onClear(event) {
      event.preventDefault();
      var onChange = this.props.onChange;

      onChange(undefined);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var error = _props.error;
      var help = _props.help;
      var icon = _props.icon;
      var id = _props.id;
      var label = _props.label;
      var name = _props.name;
      var value = _props.value;


      var Icon = icon ? icon : _Upgrade2.default;

      var result = void 0;
      if (value) {
        result = _react2.default.createElement(
          _FormField2.default,
          { label: label, help: help, className: CLASS_ROOT,
            error: error },
          _react2.default.createElement(
            'div',
            { className: CLASS_ROOT + '__container' },
            _react2.default.createElement('img', { className: CLASS_ROOT + '__image', src: value.data })
          ),
          _react2.default.createElement(
            _Anchor2.default,
            { href: '#', onClick: this._onClear,
              className: CLASS_ROOT + '__clear' },
            'Clear'
          )
        );
      } else {
        result = _react2.default.createElement(
          _FormField2.default,
          { label: label, help: help, className: CLASS_ROOT,
            onDrop: this._onDrop, htmlFor: id, error: error },
          _react2.default.createElement(Icon, { colorIndex: 'grey-4', className: CLASS_ROOT + '__icon' }),
          _react2.default.createElement('input', { id: id, name: name, type: 'file',
            onChange: this._onChange })
        );
      }

      return result;
    }
  }]);
  return ImageField;
}(_react.Component);

ImageField.displayName = 'ImageField';
exports.default = ImageField;


ImageField.propTypes = {
  error: _react.PropTypes.string,
  help: _react.PropTypes.string,
  icon: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func]),
  id: _react.PropTypes.string.isRequired,
  label: _react.PropTypes.string.isRequired,
  name: _react.PropTypes.string.isRequired,
  value: _react.PropTypes.shape({
    data: _react.PropTypes.string.isRequired
  }),
  onChange: _react.PropTypes.func.isRequired
};
module.exports = exports['default'];