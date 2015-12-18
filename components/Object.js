// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var CLASS_ROOT = "object";

var GrommetObject = (function (_Component) {
  _inherits(GrommetObject, _Component);

  function GrommetObject() {
    _classCallCheck(this, GrommetObject);

    _get(Object.getPrototypeOf(GrommetObject.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(GrommetObject, [{
    key: '_renderArray',
    value: function _renderArray(array) {
      return array.map(function (item, index) {
        var itemContent = item;
        if ('object' === typeof item) {
          itemContent = this._renderObject(item);
        }
        return _react2['default'].createElement(
          'li',
          { key: 'i_' + index, className: 'list-item' },
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
            value = _react2['default'].createElement(
              'ol',
              null,
              items
            );
            classes.push(CLASS_ROOT + "__attribute--array");
          } else if ('object' === typeof value) {
            value = this._renderObject(value);
            classes.push(CLASS_ROOT + "__attribute--container");
          } else {
            value = value.toString();
          }
          attrs.push(_react2['default'].createElement(
            'li',
            { key: 'n_' + name, className: classes.join(' ') },
            _react2['default'].createElement(
              'span',
              { className: CLASS_ROOT + "__attribute-name" },
              name
            ),
            _react2['default'].createElement(
              'span',
              { className: CLASS_ROOT + "__attribute-value" },
              value
            )
          ));
        }
      }

      return _react2['default'].createElement(
        'ul',
        null,
        attrs
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: CLASS_ROOT },
        _react2['default'].createElement(
          'div',
          { className: CLASS_ROOT + "__container" },
          this._renderObject(this.props.data)
        )
      );
    }
  }]);

  return GrommetObject;
})(_react.Component);

GrommetObject.propTypes = {
  data: _react.PropTypes.object
};

module.exports = GrommetObject;