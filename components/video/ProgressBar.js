'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Box = require('../Box');

var _Box2 = _interopRequireDefault(_Box);

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.VIDEO;

var ProgressBar = function (_Component) {
  (0, _inherits3.default)(ProgressBar, _Component);

  function ProgressBar() {
    (0, _classCallCheck3.default)(this, ProgressBar);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ProgressBar.__proto__ || (0, _getPrototypeOf2.default)(ProgressBar)).call(this));

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
    key: '_onChapterClick',
    value: function _onChapterClick(time) {
      this.props.onChange(time);
    }
  }, {
    key: '_onMouseOver',
    value: function _onMouseOver(index) {
      this.props.onChapterHover(index);
    }
  }, {
    key: '_renderChapterMarkers',
    value: function _renderChapterMarkers() {
      var _this2 = this;

      var _props = this.props,
          duration = _props.duration,
          timeline = _props.timeline;


      if (timeline) {
        var chapters = timeline.map(function (chapter, index, chapters) {
          var percent = chapter.time / duration * 100;
          var tickClasses = (0, _classnames3.default)(CLASS_ROOT + '__chapter-marker-tick', (0, _defineProperty3.default)({}, CLASS_ROOT + '__chapter-marker-tick-start', percent === 0));

          return _react2.default.createElement(
            'div',
            { className: CLASS_ROOT + '__chapter-marker', key: chapter.time,
              style: { width: percent + '%' } },
            _react2.default.createElement('div', { className: tickClasses,
              onMouseOver: _this2._onMouseOver.bind(_this2, index),
              onMouseOut: _this2.props.onChapterHover,
              onFocus: _this2._onMouseOver.bind(_this2, index),
              onBlur: _this2.props.onChapterHover,
              onClick: _this2._onChapterClick.bind(_this2, chapter.time) }),
            _react2.default.createElement('div', { className: CLASS_ROOT + '__chapter-marker-track' })
          );
        });

        return _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__chapter-markers' },
          chapters
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          progress = _props2.progress,
          timeline = _props2.timeline;


      return _react2.default.createElement(
        _Box2.default,
        { pad: 'none', className: CLASS_ROOT + '__progress', direction: 'row' },
        _react2.default.createElement('div', { className: CLASS_ROOT + '__progress-bar-fill', style: {
            width: progress + '%'
          } }),
        timeline ? this._renderChapterMarkers() : undefined,
        _react2.default.createElement('input', { className: CLASS_ROOT + '__progress-bar-input',
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
  progress: _react.PropTypes.number,
  onChapterHover: _react.PropTypes.func
};

ProgressBar.defaultProps = {
  duration: 0,
  progress: 0
};
module.exports = exports['default'];