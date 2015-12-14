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
      var classes = [CLASS_ROOT, CLASS_ROOT + '-platform-apple'];
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

      var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "platform-apple";
      var a11yTitle = _react2['default'].createElement(_componentsFormattedMessage2['default'], { id: titleLabel, defaultMessage: titleLabel });

      return _react2['default'].createElement(
        'svg',
        { version: '1.1', viewBox: '0 0 24 24.0009', width: '24px', height: '24px', className: classes.join(' '), 'aria-labelledby': this.props.a11yTitleId },
        _react2['default'].createElement(
          'title',
          { id: this.props.a11yTitleId },
          a11yTitle
        ),
        _react2['default'].createElement(
          'g',
          { id: 'platform-apple' },
          _react2['default'].createElement('rect', { id: '_x2E_svg_303_', x: '0', y: '0.0009', fill: 'none', width: '24', height: '24' }),
          _react2['default'].createElement('path', { d: 'M18.5499,12.7504c0.0337,3.632,3.1862,4.8406,3.2211,4.856c-0.0267,0.0852-0.5037,1.7224-1.6609,3.4135\r c-1.0003,1.462-2.0385,2.9187-3.674,2.9489c-1.607,0.0296-2.1237-0.953-3.961-0.953c-1.8367,0-2.4108,0.9228-3.932,0.9826\r c-1.5786,0.0597-2.7807-1.581-3.7894-3.0377c-2.061-2.9797-3.636-8.4198-1.5212-12.092c1.0506-1.8236,2.9282-2.9784,4.9661-3.008\r c1.5502-0.0296,3.0134,1.0429,3.961,1.0429c0.947,0,2.7251-1.2897,4.5943-1.1003c0.7825,0.0326,2.9791,0.3161,4.3895,2.3807\r C21.0299,8.2544,18.5226,9.714,18.5499,12.7504 M15.5297,3.832C16.3678,2.8175,16.9319,1.4052,16.778,0\r c-1.2081,0.0486-2.6689,0.805-3.5354,1.819c-0.7766,0.8979-1.4567,2.335-1.2732,3.7124C13.316,5.6355,14.6916,4.8471,15.5297,3.832\r ' })
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