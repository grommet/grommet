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

var Person = (function (_Component) {
  _inherits(Person, _Component);

  function Person() {
    _classCallCheck(this, Person);

    _get(Object.getPrototypeOf(Person.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Person, [{
    key: 'render',
    value: function render() {
      var className = 'control-icon control-icon-person';
      if (this.props.className) {
        className += ' ' + this.props.className;
      }
      return _react2['default'].createElement(
        'svg',
        { className: className, viewBox: '0 0 48 48', version: '1.1',
          onClick: this.props.onClick },
        _react2['default'].createElement(
          'g',
          { fill: 'none', strokeWidth: '2' },
          _react2['default'].createElement('circle', { cx: '24', cy: '18', r: '5' }),
          _react2['default'].createElement('path', { d: 'M33,36 L33,31 C33,26.6 29.4,23 25,23 L23,23 C18.6,23 15,26.6 15,31 L15,36' }),
          _react2['default'].createElement('path', { d: 'M20,36 L20,31' }),
          _react2['default'].createElement('path', { d: 'M28,36 L28,31' })
        )
      );
    }
  }]);

  return Person;
})(_react.Component);

exports['default'] = Person;

Person.propTypes = {
  onClick: _react.PropTypes.func
};
module.exports = exports['default'];