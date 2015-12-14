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
      var classes = [CLASS_ROOT, CLASS_ROOT + '-payment-paypal'];
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

      var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "payment-paypal";
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
          { id: 'payment-paypal' },
          _react2['default'].createElement('rect', { id: '_x2E_svg_294_', x: '0', y: '0', fill: 'none', width: '24', height: '24' }),
          _react2['default'].createElement('path', { d: 'M18.2812,2.477c-0.978-1.1147-2.7457-1.5925-5.0072-1.5925H6.7105c-0.4627,0-0.8559,0.3365-0.9283,0.7928L3.0494,19.0098\r c-0.0543,0.3418,0.2103,0.6514,0.5567,0.6514h4.052l1.0177-6.4548l-0.0315,0.2021c0.0724-0.4563,0.4627-0.7928,0.9248-0.7928\r h1.9255c3.7827,0,6.7446-1.5364,7.6098-5.981c0.0257-0.1314,0.0479-0.2594,0.0672-0.3844\r C19.4292,4.6076,19.1698,3.4894,18.2812,2.477 M20.0516,7.1303L20.0516,7.1303c-0.0199,0.1256-0.0415,0.253-0.0672,0.3844\r c-0.8652,4.444-3.8271,5.981-7.6098,5.981h-1.9261c-0.4621,0-0.8523,0.3365-0.9242,0.7928l-0.9861,6.2521l-0.2798,1.7736\r c-0.0473,0.2991,0.184,0.5702,0.4866,0.5702h3.4158c0.4043,0,0.7484-0.2944,0.8115-0.6934l0.0333-0.1741l0.6438-4.0801\r l0.0415-0.2255c0.0631-0.399,0.4072-0.6934,0.8115-0.6934h0.5112c3.3089,0,5.8998-1.3442,6.657-5.2321\r c0.3161-1.6247,0.1525-2.9812-0.6835-3.934C20.7334,7.5632,20.4185,7.3249,20.0516,7.1303' })
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