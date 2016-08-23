'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Box = require('../Box');

var _Box2 = _interopRequireDefault(_Box);

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.VIDEO; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var ProgressBar = function (_Component) {
  (0, _inherits3.default)(ProgressBar, _Component);

  function ProgressBar() {
    (0, _classCallCheck3.default)(this, ProgressBar);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ProgressBar).call(this));

    _this._onProgressBarChange = _this._onProgressBarChange.bind(_this);
    return _this;
  }

  // prevents unnecessarily updates/re-renders


  (0, _createClass3.default)(ProgressBar, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return this.props.progress !== nextProps.progress;
    }
  }, {
    key: '_onProgressBarChange',
    value: function _onProgressBarChange(e) {
      this.props.onChange(e.target.value * this.props.duration / 100);
    }
  }, {
    key: 'render',
    value: function render() {
      var progress = this.props.progress;


      return _react2.default.createElement(
        _Box2.default,
        { pad: 'none', className: CLASS_ROOT + '__progress', direction: 'row' },
        _react2.default.createElement('div', { className: CLASS_ROOT + '__progress-bar-fill', style: {
            width: progress + '%'
          } }),
        _react2.default.createElement('input', { className: CLASS_ROOT + '__progress-bar-input',
          ref: 'input',
          onChange: this._onProgressBarChange,
          type: 'range',
          min: '0',
          max: '100',
          value: progress || '',
          step: '0.1' })
      );
    }
  }]);
  return ProgressBar;
}(_react.Component);

ProgressBar.displayName = 'ProgressBar';
exports.default = ProgressBar;


ProgressBar.propTypes = {
  onClick: _react.PropTypes.func,
  duration: _react.PropTypes.number,
  progress: _react.PropTypes.number
};

ProgressBar.defaultProps = {
  duration: 0,
  progress: 0
};
module.exports = exports['default'];