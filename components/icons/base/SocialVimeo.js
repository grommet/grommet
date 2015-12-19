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
      var classes = [CLASS_ROOT, CLASS_ROOT + '-social-vimeo'];
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

      var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "social-vimeo";
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
          { id: 'social-vimeo' },
          _react2['default'].createElement('rect', { id: '_x2E_svg_311_', x: '0', y: '0', fill: 'none', width: '24', height: '24' }),
          _react2['default'].createElement('path', { d: 'M20.1611,6.6903c-0.48,2.8577-1.7372,5.528-3.7716,8.0108c-2.0115,2.4595-3.8402,4.2631-5.486,5.4108\r c-0.96,0.4919-1.8058,0.5036-2.5373,0.0351c-0.7086-0.445-1.2686-1.0892-1.6801-1.9324c-0.2286-0.445-0.7943-2.2545-1.6972-5.4284\r S3.5432,7.9083,3.3603,7.6741C3.2003,7.3696,2.8289,7.3579,2.246,7.639C1.6631,7.92,1.2688,8.166,1.0631,8.3768L0.2745,7.3227\r l0.8915-1.0892c0.7086-0.773,1.5429-1.5401,2.503-2.3014s1.8172-1.2239,2.5715-1.3878c1.0058-0.2108,1.7487,0.2928,2.2287,1.5108\r C8.7663,4.7579,9.052,6.0227,9.3263,7.8498C9.372,8.2011,9.4978,8.7984,9.7035,9.6417c0.6629,2.8342,1.1886,4.2514,1.5772,4.2514\r c0.5715,0,1.5086-1.2649,2.8116-3.7946c0.5943-1.1478,0.6286-2.0964,0.1029-2.846c-0.5257-0.7496-1.3486-0.7613-2.4687-0.0351\r c0.1829-1.1712,0.6743-2.1667,1.4744-2.9865c1.4858-1.6162,3.0973-2.2135,4.8345-1.7919\r C19.864,2.7903,20.5726,4.2074,20.1611,6.6903L20.1611,6.6903z' })
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

Icon.icon = true;

module.exports = Icon;