'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Box = require('../Box');

var _Box2 = _interopRequireDefault(_Box);

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.VIDEO;

var ProgressBar = function (_Component) {
  _inherits(ProgressBar, _Component);

  function ProgressBar() {
    _classCallCheck(this, ProgressBar);

    var _this = _possibleConstructorReturn(this, (ProgressBar.__proto__ || Object.getPrototypeOf(ProgressBar)).call(this));

    _this._onProgressBarChange = _this._onProgressBarChange.bind(_this);
    return _this;
  }

  // prevents unnecessarily updates/re-renders


  _createClass(ProgressBar, [{
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
          var tickClasses = (0, _classnames3.default)(CLASS_ROOT + '__chapter-marker-tick', _defineProperty({}, CLASS_ROOT + '__chapter-marker-tick-start', percent === 0));

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
  onClick: _propTypes2.default.func,
  duration: _propTypes2.default.number,
  progress: _propTypes2.default.number,
  onChapterHover: _propTypes2.default.func
};

ProgressBar.defaultProps = {
  duration: 0,
  progress: 0
};
module.exports = exports['default'];