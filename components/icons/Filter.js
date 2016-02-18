'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var FormattedMessage = require('../FormattedMessage');

var Filter = function (_Component) {
  _inherits(Filter, _Component);

  function Filter() {
    _classCallCheck(this, Filter);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Filter).apply(this, arguments));
  }

  _createClass(Filter, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      console.warn('This icon has been deprecated. Please check http://www.grommet.io/docs/develop/icon for the new set of icons.');
    }
  }, {
    key: 'render',
    value: function render() {
      var className = 'control-icon control-icon-filter';
      var a11yTitle = _react2.default.createElement(FormattedMessage, { id: this.props.a11yTitle, defaultMessage: this.props.a11yTitle });

      if (this.props.className) {
        className += ' ' + this.props.className;
      }

      if (typeof this.props.a11yTitle === "undefined") {
        // this.props.a11yTitle emplty string is an acceptable value only if undefined
        // should it use the default title value
        a11yTitle = _react2.default.createElement(FormattedMessage, { id: 'Filter', defaultMessage: 'Filter' });
      }
      var filterTitleId = 'ok-title';

      var badge = null;
      if (this.props.notifications) {
        badge = _react2.default.createElement(
          'g',
          { className: 'control-icon__badge' },
          _react2.default.createElement('circle', { stroke: 'none', cx: '37', cy: '11', r: '10' }),
          _react2.default.createElement(
            'text',
            { x: '33.5', y: '16', fontSize: 16 },
            this.props.notifications
          )
        );
      }

      return _react2.default.createElement(
        'svg',
        { role: 'image', className: className, 'aria-labelledby': filterTitleId, viewBox: '0 0 48 48', version: '1.1' },
        _react2.default.createElement(
          'title',
          { id: filterTitleId },
          a11yTitle
        ),
        _react2.default.createElement(
          'g',
          { fill: 'none' },
          _react2.default.createElement('polygon', { role: 'presentation', strokeWidth: '2', points: '14,15 24,27 34,15 \t' }),
          _react2.default.createElement('line', { strokeWidth: '2', x1: '24', y1: '27', x2: '24', y2: '34' })
        ),
        badge
      );
    }
  }]);

  return Filter;
}(_react.Component);

exports.default = Filter;


Filter.propTypes = {
  a11yTitle: _react.PropTypes.string,
  notifications: _react.PropTypes.number
};
module.exports = exports['default'];