// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _utilsIntl = require('../utils/Intl');

var _utilsIntl2 = _interopRequireDefault(_utilsIntl);

var CLASS_ROOT = "title";

var Title = (function (_Component) {
  _inherits(Title, _Component);

  function Title() {
    _classCallCheck(this, Title);

    _get(Object.getPrototypeOf(Title.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Title, [{
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.responsive) {
        classes.push(CLASS_ROOT + "--responsive");
      }
      if (this.props.onClick) {
        classes.push(CLASS_ROOT + "--interactive");
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var a11yTitle = _utilsIntl2['default'].getMessage(this.context.intl, this.props.a11yTitle);

      return _react2['default'].createElement(
        _Box2['default'],
        { align: 'center', direction: 'row', responsive: false,
          className: classes.join(' '), a11yTitle: a11yTitle,
          onClick: this.props.onClick },
        this.props.children
      );
    }
  }]);

  return Title;
})(_react.Component);

Title.propTypes = {
  a11yTitle: _react.PropTypes.string,
  onClick: _react.PropTypes.func,
  responsive: _react.PropTypes.bool
};

Title.contextTypes = {
  intl: _react.PropTypes.object
};

Title.defaultProps = {
  responsive: true,
  a11yTitle: 'Title'
};

module.exports = Title;