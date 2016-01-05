'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormattedMessage = require('../../../components/FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "control-icon";

var Icon = (function (_Component) {
  _inherits(Icon, _Component);

  function Icon() {
    _classCallCheck(this, Icon);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Icon).apply(this, arguments));
  }

  _createClass(Icon, [{
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT, CLASS_ROOT + '-document-update'];
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

      var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "document-update";
      var a11yTitle = _react2.default.createElement(_FormattedMessage2.default, { id: titleLabel, defaultMessage: titleLabel });

      return _react2.default.createElement(
        'svg',
        { version: '1.1', viewBox: '0 0 24.0872 24', width: '24px', height: '24px', className: classes.join(' '), 'aria-labelledby': this.props.a11yTitleId },
        _react2.default.createElement(
          'title',
          { id: this.props.a11yTitleId },
          a11yTitle
        ),
        _react2.default.createElement(
          'g',
          { id: 'document-update' },
          _react2.default.createElement('rect', { id: '_x2E_svg_285_', x: '0.0872', fill: 'none', width: '24', height: '24' }),
          _react2.default.createElement('polyline', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', points: '4.0872,8 4.0872,1 17.0874,1 \r 22.0872,5.9999 22.0872,23 15.0872,23 \t' }),
          _react2.default.createElement('polyline', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', points: '16.0872,2 16.0872,7 22.0872,7 \t' }),
          _react2.default.createElement('path', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', d: 'M15,16c0,3.866-3.134,7-7,7s-7-3.134-7-7\r s3.134-7,7-7S15,12.134,15,16z M8,20v-6 M11,16l-3-3l-3,3' })
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