'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pick = require('lodash/object/pick');

var _pick2 = _interopRequireDefault(_pick);

var _keys = require('lodash/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "list-item";

var ListItem = (function (_Component) {
  _inherits(ListItem, _Component);

  function ListItem() {
    _classCallCheck(this, ListItem);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ListItem).apply(this, arguments));
  }

  _createClass(ListItem, [{
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      var other = (0, _pick2.default)(this.props, (0, _keys2.default)(_Box2.default.propTypes));
      if (this.props.selected) {
        classes.push(CLASS_ROOT + "--selected");
      }
      if (this.props.onClick) {
        classes.push(CLASS_ROOT + "--selectable");
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var children = undefined;
      if (this.props.label) {
        var image = undefined;
        if (this.props.image) {
          image = _react2.default.createElement(
            'span',
            { className: CLASS_ROOT + "__image" },
            this.props.image
          );
        }
        children = [image, _react2.default.createElement(
          'span',
          { key: 'label', className: CLASS_ROOT + "__label" },
          this.props.label
        ), _react2.default.createElement(
          'span',
          { key: 'annotation', className: CLASS_ROOT + "__annotation" },
          this.props.annotation
        )];
      } else {
        children = this.props.children;
      }

      return _react2.default.createElement(
        _Box2.default,
        _extends({ tag: 'li', className: classes.join(' ') }, other, {
          onClick: this.props.onClick }),
        children
      );
    }
  }]);

  return ListItem;
})(_react.Component);

exports.default = ListItem;

ListItem.propTypes = _extends({
  onClick: _react.PropTypes.func,
  selected: _react.PropTypes.bool
}, _Box2.default.propTypes, {
  // deprecated properties
  annotation: _react.PropTypes.node,
  image: _react.PropTypes.node,
  label: _react.PropTypes.node
});

ListItem.defaultProps = {
  align: 'center',
  direction: 'row',
  pad: { horizontal: 'medium', vertical: 'small' },
  separator: 'bottom'
};
module.exports = exports['default'];