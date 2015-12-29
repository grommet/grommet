// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var CLASS_ROOT = "list-item";

var ListItem = (function (_Component) {
  _inherits(ListItem, _Component);

  function ListItem() {
    _classCallCheck(this, ListItem);

    _get(Object.getPrototypeOf(ListItem.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ListItem, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      console.warn('ListItem is deprecated and will be removed in an upcoming version');
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.onClick) {
        classes.push(CLASS_ROOT + "--selectable");
      }
      if (this.props.selected) {
        classes.push(CLASS_ROOT + "--selected");
      }
      if (this.props.direction) {
        classes.push(CLASS_ROOT + "--" + this.props.direction);
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }
      var image;
      if (this.props.image) {
        image = _react2['default'].createElement(
          'span',
          { className: CLASS_ROOT + "__image" },
          this.props.image
        );
      }

      return _react2['default'].createElement(
        'li',
        { className: classes.join(' '), onClick: this.props.onClick },
        image,
        _react2['default'].createElement(
          'span',
          { className: CLASS_ROOT + "__label" },
          this.props.label
        ),
        _react2['default'].createElement(
          'span',
          { className: CLASS_ROOT + "__annotation" },
          this.props.annotation
        )
      );
    }
  }]);

  return ListItem;
})(_react.Component);

exports['default'] = ListItem;

ListItem.propTypes = {
  annotation: _react.PropTypes.node,
  direction: _react.PropTypes.oneOf(['row', 'column']),
  image: _react.PropTypes.node,
  label: _react.PropTypes.node,
  onClick: _react.PropTypes.func,
  selected: _react.PropTypes.bool
};
module.exports = exports['default'];