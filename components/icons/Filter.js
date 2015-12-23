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

var FormattedMessage = require('../FormattedMessage');

var Filter = (function (_Component) {
  _inherits(Filter, _Component);

  function Filter() {
    _classCallCheck(this, Filter);

    _get(Object.getPrototypeOf(Filter.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Filter, [{
    key: 'render',
    value: function render() {
      var className = 'control-icon control-icon-filter';
      var a11yTitle = _react2['default'].createElement(FormattedMessage, { id: this.props.a11yTitle, defaultMessage: this.props.a11yTitle });

      if (this.props.className) {
        className += ' ' + this.props.className;
      }

      if (typeof this.props.a11yTitle === "undefined") {
        // this.props.a11yTitle emplty string is an acceptable value only if undefined
        // should it use the default title value
        a11yTitle = _react2['default'].createElement(FormattedMessage, { id: 'Filter', defaultMessage: 'Filter' });
      }
      var filterTitleId = 'ok-title';

      var badge = null;
      if (this.props.notifications) {
        badge = _react2['default'].createElement(
          'g',
          { className: 'control-icon__badge' },
          _react2['default'].createElement('circle', { stroke: 'none', cx: '37', cy: '11', r: '10' }),
          _react2['default'].createElement(
            'text',
            { x: '33.5', y: '16', fontSize: 16 },
            this.props.notifications
          )
        );
      }

      return _react2['default'].createElement(
        'svg',
        { role: 'image', className: className, 'aria-labelledby': filterTitleId, viewBox: '0 0 48 48', version: '1.1' },
        _react2['default'].createElement(
          'title',
          { id: filterTitleId },
          a11yTitle
        ),
        _react2['default'].createElement(
          'g',
          { fill: 'none' },
          _react2['default'].createElement('polygon', { role: 'presentation', strokeWidth: '2', points: '14,15 24,27 34,15 \t' }),
          _react2['default'].createElement('line', { strokeWidth: '2', x1: '24', y1: '27', x2: '24', y2: '34' })
        ),
        badge
      );
    }
  }]);

  return Filter;
})(_react.Component);

exports['default'] = Filter;

Filter.propTypes = {
  a11yTitle: _react.PropTypes.string,
  notifications: _react.PropTypes.number
};
module.exports = exports['default'];