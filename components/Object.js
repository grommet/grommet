'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.OBJECT;
var LIST_ITEM = _CSSClassnames2.default.LIST_ITEM;

var GrommetObject = function (_Component) {
  _inherits(GrommetObject, _Component);

  function GrommetObject() {
    _classCallCheck(this, GrommetObject);

    return _possibleConstructorReturn(this, (GrommetObject.__proto__ || Object.getPrototypeOf(GrommetObject)).apply(this, arguments));
  }

  _createClass(GrommetObject, [{
    key: '_renderArray',
    value: function _renderArray(array) {
      return array.map(function (item, index) {
        var itemContent = item;
        if ('object' === (typeof item === 'undefined' ? 'undefined' : _typeof(item))) {
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
          } else if ('object' === (typeof value === 'undefined' ? 'undefined' : _typeof(value))) {
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
  data: _propTypes2.default.object
};
module.exports = exports['default'];