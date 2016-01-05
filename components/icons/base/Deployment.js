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
      var classes = [CLASS_ROOT, CLASS_ROOT + '-deployment'];
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

      var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "deployment";
      var a11yTitle = _react2.default.createElement(_FormattedMessage2.default, { id: titleLabel, defaultMessage: titleLabel });

      return _react2.default.createElement(
        'svg',
        { version: '1.1', viewBox: '0 0 24 25.9941', width: '24px', height: '24px', className: classes.join(' '), 'aria-labelledby': this.props.a11yTitleId },
        _react2.default.createElement(
          'title',
          { id: this.props.a11yTitleId },
          a11yTitle
        ),
        _react2.default.createElement(
          'g',
          { id: 'deployment' },
          _react2.default.createElement('rect', { id: '_x2E_svg_162_', y: '0', fill: 'none', width: '24', height: '24' }),
          _react2.default.createElement('path', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', d: 'M16.6159,19.7646\r c0,0.8825-0.3506,1.7289-0.9746,2.3529l-2.6321,2.6321c-0.4698,0.4698-1.2737,0.2264-1.404-0.4251l-0.674-3.3702\r c-0.1288-0.6442-0.4455-1.2358-0.91-1.7004l-1.6405-1.6405L6.74,15.973c-0.4645-0.4645-1.0562-0.7812-1.7004-0.91l-3.3702-0.674\r c-0.6515-0.1303-0.8949-0.9342-0.4251-1.404l2.6321-2.6321c0.624-0.624,1.4704-0.9746,2.3529-0.9746h3.5777\r c0.7522-0.9043,1.6371-1.8872,2.6911-2.9412c5.239-5.239,10-2.9412,10-2.9412s2.2978,4.761-2.9412,10\r c-1.054,1.054-2.0369,1.9389-2.9412,2.6911V19.7646z M6.1661,19.8339c-1.1119-1.1119-2.9147-1.1119-4.0266,0\r s-1.3212,4.7187-1.0067,5.0333c0.2936,0.2936,3.9213,0.1053,5.0333-1.0067S7.278,20.9459,6.1661,19.8339z' }),
          _react2.default.createElement('circle', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', cx: '17', cy: '9', r: '2' })
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