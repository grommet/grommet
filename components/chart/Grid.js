'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.CHART_GRID;

// Underlying grid lines for rows and/or columns.

var Grid = function (_Component) {
  _inherits(Grid, _Component);

  function Grid() {
    _classCallCheck(this, Grid);

    return _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).apply(this, arguments));
  }

  _createClass(Grid, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          columns = _props.columns,
          rows = _props.rows,
          width = _props.width,
          height = _props.height,
          props = _objectWithoutProperties(_props, ['className', 'columns', 'rows', 'width', 'height']);

      var classes = (0, _classnames2.default)(CLASS_ROOT, className);

      var commands = '';

      if (columns > 1) {
        var basis = (width - 2 * _utils.padding) / (columns - 1);
        for (var i = 0; i < columns; i += 1) {
          var x = i * basis;
          commands += 'M' + (x + _utils.padding) + ',' + _utils.padding + ' L' + (x + _utils.padding) + ',' + (height - _utils.padding) + ' ';
        }
      }

      if (rows === 1) {
        var y = height - 2 * _utils.padding;
        commands += 'M' + _utils.padding + ',' + (y + _utils.padding) + ' L' + (width - _utils.padding) + ',' + (y + _utils.padding) + ' ';
      } else if (rows > 1) {
        var _basis = (height - 2 * _utils.padding) / (rows - 1);
        for (var _i = 0; _i < rows; _i += 1) {
          var _y = _i * _basis;
          commands += 'M' + _utils.padding + ',' + (_y + _utils.padding) + ' L' + (width - _utils.padding) + ',' + (_y + _utils.padding) + ' ';
        }
      }

      return _react2.default.createElement(
        'svg',
        _extends({ ref: function ref(_ref) {
            return _this2.gridRef = _ref;
          } }, props, { className: classes,
          viewBox: '0 0 ' + width + ' ' + height,
          preserveAspectRatio: 'none' }),
        _react2.default.createElement('path', { fill: 'none', d: commands })
      );
    }
  }]);

  return Grid;
}(_react.Component);

Grid.displayName = 'Grid';
exports.default = Grid;


Grid.propTypes = {
  columns: _propTypes2.default.number,
  rows: _propTypes2.default.number
};
module.exports = exports['default'];