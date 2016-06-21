'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _FormattedMessage = require('../../../components/FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = 'control-icon';

var Icon = function (_Component) {
  _inherits(Icon, _Component);

  function Icon() {
    _classCallCheck(this, Icon);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Icon).apply(this, arguments));
  }

  _createClass(Icon, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props;
      var a11yTitleId = _props.a11yTitleId;
      var className = _props.className;
      var colorIndex = _props.colorIndex;
      var _props2 = this.props;
      var a11yTitle = _props2.a11yTitle;
      var size = _props2.size;


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-document-sound', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, 'color-index-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _react2.default.createElement(_FormattedMessage2.default, { id: 'document-sound', defaultMessage: 'document-sound' });

      return _react2.default.createElement(
        'svg',
        { version: '1.1', viewBox: '0 0 25 24.0806', width: '24px', height: '24px', role: 'img', className: classes, 'aria-labelledby': a11yTitleId },
        _react2.default.createElement(
          'title',
          { id: a11yTitleId },
          a11yTitle
        ),
        _react2.default.createElement(
          'g',
          { id: 'document-sound' },
          _react2.default.createElement('rect', { id: '_x2E_svg_287_', x: '1', fill: 'none', width: '24', height: '24' }),
          _react2.default.createElement('polyline', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', points: '5,8 5,1 18.0002,1 23,5.9999 23,23 19,23 \r ' }),
          _react2.default.createElement('polyline', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', points: '17,2 17,7 23,7 \t' }),
          _react2.default.createElement('path', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', d: 'M11.5,13L11.5,13c1.6569,0,3,1.3431,3,3v0\r c0,1.6569-1.3431,3-3,3h0' }),
          _react2.default.createElement('path', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', d: 'M11.5,9L11.5,9c3.866,0,7,3.134,7,7v0\r c0,3.866-3.134,7-7,7h0' }),
          _react2.default.createElement('polygon', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', points: '4,14 1,14 1,18 4,18 9,22 9,10 \t' })
        )
      );
    }
  }]);

  return Icon;
}(_react.Component);

exports.default = Icon;
;

Icon.propTypes = {
  a11yTitle: _react.PropTypes.string,
  a11yTitleId: _react.PropTypes.string,
  colorIndex: _react.PropTypes.string,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge'])
};

Icon.defaultProps = {
  a11yTitleId: 'document-sound-title'
};

Icon.icon = true;

Icon.displayName = 'DocumentSound';
module.exports = exports['default'];