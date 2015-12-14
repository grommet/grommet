// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentsFormattedMessage = require('../../../components/FormattedMessage');

var _componentsFormattedMessage2 = _interopRequireDefault(_componentsFormattedMessage);

var CLASS_ROOT = "control-icon";

var Icon = (function (_Component) {
  _inherits(Icon, _Component);

  function Icon() {
    _classCallCheck(this, Icon);

    _get(Object.getPrototypeOf(Icon.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Icon, [{
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT, CLASS_ROOT + '-social-slack'];
      if (this.props.size) {
        classes.push(CLASS_ROOT + "--" + this.props.size);
      } else if (this.props.large) {
        classes.push(CLASS_ROOT + "--large");
      }
      if (this.props.colorIndex) {
        classes.push("color-index-" + this.props.colorIndex);
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "social-slack";
      var a11yTitle = _react2['default'].createElement(_componentsFormattedMessage2['default'], { id: titleLabel, defaultMessage: titleLabel });

      return _react2['default'].createElement(
        'svg',
        { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', className: classes.join(' '), 'aria-labelledby': this.props.a11yTitleId },
        _react2['default'].createElement(
          'title',
          { id: this.props.a11yTitleId },
          a11yTitle
        ),
        _react2['default'].createElement(
          'g',
          { id: 'social-slack' },
          _react2['default'].createElement('rect', { id: '_x2E_svg_281_', x: '0', y: '0', fill: 'none', width: '24', height: '24' }),
          _react2['default'].createElement('path', { d: 'M21.1667,14.6344h-2.75v-5.5h2.75C22.1792,9.1344,23,8.3136,23,7.3011s-0.8208-1.8333-1.8333-1.8333h-2.75v-2.75\r c0-1.0125-0.8208-1.8333-1.8333-1.8333c-1.0125,0-1.8333,0.8209-1.8333,1.8333v2.75h-5.5v-2.75\r c0-1.0125-0.8208-1.8333-1.8333-1.8333c-1.0125,0-1.8333,0.8209-1.8333,1.8333v2.75h-2.75C1.8208,5.4678,1,6.2887,1,7.3011\r s0.8208,1.8333,1.8333,1.8333h2.75v5.5h-2.75C1.8208,14.6344,1,15.4553,1,16.4678s0.8208,1.8333,1.8333,1.8333h2.75v2.75\r c0,1.0125,0.8208,1.8333,1.8333,1.8333c1.0126,0,1.8333-0.8209,1.8333-1.8333v-2.75h5.5v2.75c0,1.0125,0.8208,1.8333,1.8333,1.8333\r c1.0126,0,1.8333-0.8209,1.8333-1.8333v-2.75h2.75c1.0126,0,1.8333-0.8209,1.8333-1.8333S22.1792,14.6344,21.1667,14.6344z\r M9.25,14.6344v-5.5h5.5v5.5H9.25z' })
        )
      );
    }
  }]);

  return Icon;
})(_react.Component);

Icon.propTypes = {
  a11yTitle: _react.PropTypes.string,
  a11yTitleId: _react.PropTypes.string,
  colorIndex: _react.PropTypes.string,
  large: _react.PropTypes.bool,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large'])
};

Icon.defaultProps = {
  a11yTitleId: '" + resolve.fileName + "-title'
};

module.exports = Icon;