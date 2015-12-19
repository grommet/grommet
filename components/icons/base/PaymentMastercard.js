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
      var classes = [CLASS_ROOT, CLASS_ROOT + '-payment-mastercard'];
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

      var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "payment-mastercard";
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
          { id: 'payment-mastercard' },
          _react2['default'].createElement('rect', { id: '_x2E_svg_291_', x: '0', y: '0', fill: 'none', width: '24', height: '24' }),
          _react2['default'].createElement(
            'g',
            { id: 'path2268' },
            _react2['default'].createElement(
              'g',
              null,
              _react2['default'].createElement('path', { d: 'M16.8179,5.6966c3.4079,0,6.1812,2.7728,6.1821,6.1848c0.0005,1.6514-0.6422,3.2042-1.8096,4.3722\r c-1.1674,1.168-2.7199,1.8115-4.3729,1.8119c-3.4082,0-6.1817-2.7728-6.1826-6.1846c-0.0005-1.6514,0.6422-3.2042,1.8097-4.3722\r c1.1674-1.1681,2.7198-1.8116,4.371-1.812H16.8179 M16.8174,4.6966c-0.0005,0-0.0014,0-0.0019,0\r c-3.9667,0.001-7.1817,3.2177-7.1807,7.1844c0,0.0013,0,0.0024,0,0.0037c0.0011,3.9664,3.2163,7.1807,7.1826,7.1807\r c0.0005,0,0.0013,0,0.0018,0c3.9669-0.001,7.1819-3.2175,7.1808-7.1844c0-0.0013,0-0.0024,0-0.0037\r C23.9989,7.9111,20.7838,4.6964,16.8174,4.6966L16.8174,4.6966z' })
            )
          ),
          _react2['default'].createElement('path', { d: 'M14.2193,13.3257H9.7496c-0.0481-0.2432-0.0838-0.4864-0.1069-0.7296h4.6857c0.0233-0.2354,0.0367-0.4736,0.0367-0.7151\r c0-0.0319-0.0009-0.0637-0.0013-0.0955H9.6127c0.0024-0.2432,0.0176-0.4864,0.0449-0.7296h4.66\r c-0.0277-0.2415-0.067-0.4864-0.118-0.7296H9.809C9.8634,10.0832,9.932,9.84,10.0139,9.5968h3.9772\r c-0.0889-0.2432-0.1922-0.5674-0.3097-0.8106h-3.3619c0.1213-0.2432,0.2587-0.4864,0.4121-0.7296h2.5361\r c-0.1688-0.2432-0.3555-0.4864-0.5575-0.7296h-1.414c0.2186-0.3243,0.4593-0.498,0.7206-0.7239\r C10.7405,5.4407,9.0438,4.733,7.1826,4.733c-0.0155,0-0.0308,0-0.0463,0C3.1929,4.733,0,7.949,0,11.8984\r c0,3.9647,3.2178,7.1739,7.1826,7.1739c1.8608,0,3.557-0.701,4.8333-1.8633c0,0-0.0002,0.0078-0.0006,0.0078h0.0015\r c0.2613-0.2432,0.5051-0.4864,0.7292-0.8106h-1.4715c-0.1965-0.2432-0.3751-0.4864-0.5355-0.7296h2.5379\r c0.1543-0.2432,0.2941-0.4864,0.4181-0.7296H10.32c-0.115-0.2432-0.2149-0.5674-0.3002-0.8106h3.9757\r C14.0863,13.8932,14.1611,13.6099,14.2193,13.3257z' })
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