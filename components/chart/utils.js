'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackSize = exports.debounceDelay = exports.padding = exports.pointSize = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

exports.graphValue = graphValue;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

function graphValue(value, min, max, size) {
  var scale = size / (max - min);
  return Math.floor(scale * (value - min));
};

var pointSize = exports.pointSize = 12;
var padding = exports.padding = pointSize / 2 + 2;
var debounceDelay = exports.debounceDelay = 50;

var trackSize = exports.trackSize = function () {
  function trackSize(props, onSize) {
    (0, _classCallCheck3.default)(this, trackSize);

    this._onResize = this._onResize.bind(this);
    this._measure = this._measure.bind(this);
    this._width = props.width;
    this._height = props.height;
    this._size = { width: props.width || 0, height: props.height || 0 };
    this._onSize = onSize;
  }

  (0, _createClass3.default)(trackSize, [{
    key: '_measure',
    value: function _measure() {
      if (this._element) {
        var rect = this._element.getBoundingClientRect();
        this._size.width = this._width || Math.round(rect.width);
        this._size.height = this._height || Math.round(rect.height);
        this._onSize(this._size);
      }
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      // debounce
      clearTimeout(this._resizeTimer);
      // delay should be greater than Chart's delay
      this._resizeTimer = setTimeout(this._measure, debounceDelay + 10);
    }
  }, {
    key: 'size',
    value: function size() {
      return this._size;
    }
  }, {
    key: 'start',
    value: function start(element) {
      this._element = element;
      if (!this._width || !this._height) {
        window.addEventListener('resize', this._onResize);
        // delay just a bit to allow the browser to lay things out
        setTimeout(this._measure.bind(this), 3);
      }
    }
  }, {
    key: 'reset',
    value: function reset(props) {
      this._width = props.width;
      this._height = props.height;
      this._size.width = props.width || this._size.width;
      this._size.height = props.height || this._size.height;
      this._onSize(this._size);
    }
  }, {
    key: 'stop',
    value: function stop() {
      window.removeEventListener('resize', this._onResize);
      this._element = undefined;
    }
  }]);
  return trackSize;
}();