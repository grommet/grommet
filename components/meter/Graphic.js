// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

var CLASS_ROOT = _utils.classRoot;

var Graphic = (function (_Component) {
  _inherits(Graphic, _Component);

  function Graphic(props) {
    _classCallCheck(this, Graphic);

    _get(Object.getPrototypeOf(Graphic.prototype), 'constructor', this).call(this);
    this.state = this._stateFromProps(props);
  }

  _createClass(Graphic, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var state = this._stateFromProps(newProps);
      this.setState(state);
    }

    // override
  }, {
    key: '_stateFromProps',
    value: function _stateFromProps(props) {
      return {};
    }

    // override
  }, {
    key: '_sliceCommands',
    value: function _sliceCommands(trackIndex, item, startValue) {
      return "";
    }
  }, {
    key: '_renderSlice',
    value: function _renderSlice(trackIndex, item, itemIndex, startValue) {
      var classes = [CLASS_ROOT + "__slice"];
      if (itemIndex === this.props.activeIndex) {
        classes.push(CLASS_ROOT + "__slice--active");
      }
      classes.push("color-index-" + item.colorIndex);

      var commands = this._sliceCommands(trackIndex, item, startValue);

      var path = (0, _utils.buildPath)(itemIndex, commands, classes, this.props.onActivate, item.onClick, this.props.a11yDescId);

      return path;
    }
  }, {
    key: '_renderTrack',
    value: function _renderTrack(series, trackIndex) {
      var startValue = this.props.min.value;

      var paths = series.map(function (item, itemIndex) {
        var path = this._renderSlice(trackIndex, item, itemIndex, startValue);
        startValue += item.value;
        return path;
      }, this);

      return paths;
    }
  }, {
    key: '_loadingCommands',
    value: function _loadingCommands() {
      return this._sliceCommands(0, this.props.max, this.props.min.value);
    }
  }, {
    key: '_renderLoading',
    value: function _renderLoading() {
      var classes = [CLASS_ROOT + "__slice"];
      classes.push(CLASS_ROOT + "__slice--loading");
      classes.push("color-index-loading");
      var commands = this._loadingCommands();
      return [_react2['default'].createElement('path', { key: 'loading', className: classes.join(' '), d: commands })];
    }
  }, {
    key: '_renderValues',
    value: function _renderValues() {
      var _this = this;

      var values;
      if (this.props.stacked) {
        values = this._renderTrack(this.props.series, 0);
      } else {
        values = this.props.series.map(function (item, index) {
          return _this._renderSlice(index, item, index, _this.props.min.value);
        });
      }
      if (values.length === 0) {
        values = this._renderLoading();
      }
      return _react2['default'].createElement(
        'g',
        { className: CLASS_ROOT + "__values" },
        values
      );
    }
  }, {
    key: '_renderThresholds',
    value: function _renderThresholds() {
      var _this2 = this;

      var result;
      var thresholds;
      if (this.props.stacked) {
        thresholds = this._renderTrack(this.props.thresholds, 0);
      } else {
        thresholds = this.props.series.map(function (item, index) {
          return _this2._renderTrack(_this2.props.thresholds, index);
        });
      }
      if (thresholds.length > 0) {
        result = _react2['default'].createElement(
          'g',
          { className: CLASS_ROOT + "__thresholds" },
          thresholds
        );
      }
      return result;
    }
  }, {
    key: '_renderTopLayer',
    value: function _renderTopLayer() {
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var values = this._renderValues();
      var thresholds = this._renderThresholds();
      var topLayer = this._renderTopLayer();

      return _react2['default'].createElement(
        'svg',
        { className: CLASS_ROOT + "__graphic",
          width: this.props.vertical ? null : this.state.viewBoxWidth,
          height: this.props.vertical ? this.state.viewBoxHeight : null,
          viewBox: "0 0 " + this.state.viewBoxWidth + " " + this.state.viewBoxHeight,
          preserveAspectRatio: 'xMidYMid meet' },
        _react2['default'].createElement(
          'desc',
          { id: this.props.a11yDescId },
          this.props.a11yDesc
        ),
        thresholds,
        values,
        topLayer
      );
    }
  }]);

  return Graphic;
})(_react.Component);

Graphic.propTypes = _extends({
  stacked: _react.PropTypes.bool,
  thresholds: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string,
    value: _react.PropTypes.number.isRequired,
    colorIndex: _react.PropTypes.string
  })).isRequired,
  vertical: _react.PropTypes.bool
}, _utils.propTypes);

Graphic.contextTypes = {
  intl: _react.PropTypes.object
};

module.exports = Graphic;