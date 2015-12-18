// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodashObjectKeys = require('lodash/object/keys');

var _lodashObjectKeys2 = _interopRequireDefault(_lodashObjectKeys);

var CLASS_ROOT = "form";

var Form = (function (_Component) {
  _inherits(Form, _Component);

  function Form() {
    _classCallCheck(this, Form);

    _get(Object.getPrototypeOf(Form.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Form, [{
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.compact) {
        classes.push(CLASS_ROOT + "--compact");
      }
      if (this.props.fill) {
        classes.push(CLASS_ROOT + "--fill");
      }
      if (this.props.pad) {
        if (typeof this.props.pad === 'string') {
          classes.push(CLASS_ROOT + "--pad-" + this.props.pad);
        } else if (typeof this.props.pad === 'object') {
          (0, _lodashObjectKeys2['default'])(this.props.pad).forEach((function (key) {
            classes.push(CLASS_ROOT + '--pad-' + key + '-' + this.props.pad[key]);
          }).bind(this));
        }
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }
      return _react2['default'].createElement(
        'form',
        { className: classes.join(' '), onSubmit: this.props.onSubmit },
        this.props.children
      );
    }
  }]);

  return Form;
})(_react.Component);

Form.propTypes = {
  compact: _react.PropTypes.bool,
  fill: _react.PropTypes.bool,
  flush: _react.PropTypes.bool,
  onSubmit: _react.PropTypes.func,
  pad: _react.PropTypes.oneOfType([_react.PropTypes.oneOf(['none', 'small', 'medium', 'large']), _react.PropTypes.shape({
    horizontal: _react.PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    vertical: _react.PropTypes.oneOf(['none', 'small', 'medium', 'large'])
  })])
};

Form.defaultProps = {
  compact: false,
  fill: false,
  flush: true,
  pad: 'none'
};

module.exports = Form;