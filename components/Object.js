'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.OBJECT;
var LIST_ITEM = _CSSClassnames2.default.LIST_ITEM;

var GrommetObject = function (_Component) {
  (0, _inherits3.default)(GrommetObject, _Component);

  function GrommetObject() {
    (0, _classCallCheck3.default)(this, GrommetObject);
    return (0, _possibleConstructorReturn3.default)(this, (GrommetObject.__proto__ || (0, _getPrototypeOf2.default)(GrommetObject)).apply(this, arguments));
  }

  (0, _createClass3.default)(GrommetObject, [{
    key: '_renderArray',
    value: function _renderArray(array) {
      return array.map(function (item, index) {
        var itemContent = item;
        if ('object' === (typeof item === 'undefined' ? 'undefined' : (0, _typeof3.default)(item))) {
          itemContent = this._renderObject(item);
        }
        return _react2.default.createElement(
          'li',
          { key: 'i_' + index, className: LIST_ITEM },
          itemContent
        );
      }, this);
    }
  }, {
    key: '_renderObject',
    value: function _renderObject(obj) {
      var attrs = [];
      for (var name in obj) {
        if (obj.hasOwnProperty(name)) {
          var value = obj[name];
          var classes = [CLASS_ROOT + "__attribute"];
          if (null === value) {
            value = 'null';
            classes.push(CLASS_ROOT + "__attribute--unset");
          } else if (Array.isArray(value)) {
            var items = this._renderArray(value);
            value = _react2.default.createElement(
              'ol',
              null,
              items
            );
            classes.push(CLASS_ROOT + "__attribute--array");
          } else if ('object' === (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value))) {
            value = this._renderObject(value);
            classes.push(CLASS_ROOT + "__attribute--container");
          } else {
            value = value.toString();
          }
          attrs.push(_react2.default.createElement(
            'li',
            { key: 'n_' + name, className: classes.join(' ') },
            _react2.default.createElement(
              'span',
              { className: CLASS_ROOT + "__attribute-name" },
              name
            ),
            _react2.default.createElement(
              'span',
              { className: CLASS_ROOT + "__attribute-value" },
              value
            )
          ));
        }
      }

      return _react2.default.createElement(
        'ul',
        null,
        attrs
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: CLASS_ROOT },
        _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + "__container" },
          this._renderObject(this.props.data)
        )
      );
    }
  }]);
  return GrommetObject;
}(_react.Component);

GrommetObject.displayName = 'GrommetObject';
exports.default = GrommetObject;


GrommetObject.propTypes = {
  data: _react.PropTypes.object
};
module.exports = exports['default'];