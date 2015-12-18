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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utils = require('./utils');

var _utilsIntl = require('../../utils/Intl');

var _utilsIntl2 = _interopRequireDefault(_utilsIntl);

var _utilsKeyboardAccelerators = require('../../utils/KeyboardAccelerators');

var _utilsKeyboardAccelerators2 = _interopRequireDefault(_utilsKeyboardAccelerators);

var CLASS_ROOT = _utils.classRoot;

var Graphic = (function (_Component) {
  _inherits(Graphic, _Component);

  function Graphic(props) {
    _classCallCheck(this, Graphic);

    _get(Object.getPrototypeOf(Graphic.prototype), 'constructor', this).call(this);
    this.state = this._stateFromProps(props);

    this._onRequestForNextLegend = this._onRequestForNextLegend.bind(this);
    this._onRequestForPreviousLegend = this._onRequestForPreviousLegend.bind(this);
  }

  _createClass(Graphic, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._keyboardHandlers = {
        left: this._onRequestForPreviousLegend,
        right: this._onRequestForNextLegend
      };
      _utilsKeyboardAccelerators2['default'].startListeningToKeyboard(this, this._keyboardHandlers);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var state = this._stateFromProps(newProps);
      this.setState(state);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _utilsKeyboardAccelerators2['default'].stopListeningToKeyboard(this, this._keyboardHandlers);
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
    value: function _renderSlice(trackIndex, item, itemIndex, startValue, threshold) {
      var classes = [CLASS_ROOT + "__slice"];
      if (itemIndex === this.props.activeIndex) {
        classes.push(CLASS_ROOT + "__slice--active");
      }
      classes.push("color-index-" + item.colorIndex);

      var commands = this._sliceCommands(trackIndex, item, startValue);

      var a11yDescId = '' + (threshold ? 'threshold_' : '') + this.props.a11yDescId + '_' + itemIndex;
      var a11yTitle = item.value + ' ' + (item.label || this.props.units || '');

      var path = (0, _utils.buildPath)(itemIndex, commands, classes, this.props.onActivate, item.onClick, a11yDescId, a11yTitle);

      return path;
    }
  }, {
    key: '_renderTrack',
    value: function _renderTrack(series, trackIndex, threshold) {
      var startValue = this.props.min.value;

      var paths = series.map(function (item, itemIndex) {
        var path = this._renderSlice(trackIndex, item, itemIndex, startValue, threshold);
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
    key: '_onRequestForPreviousLegend',
    value: function _onRequestForPreviousLegend(e) {
      e.stopPropagation();
      e.stopImmediatePropagation();
      if (document.activeElement === this.refs.meter) {
        var totalValueCount = _reactDom2['default'].findDOMNode(this.refs.meterValues).childNodes.length;

        if (this.props.activeIndex - 1 < 0) {
          this.props.onActivate(totalValueCount - 1);
        } else {
          this.props.onActivate(this.props.activeIndex - 1);
        }
      }
    }
  }, {
    key: '_onRequestForNextLegend',
    value: function _onRequestForNextLegend(e) {
      e.stopPropagation();
      e.stopImmediatePropagation();
      if (document.activeElement === this.refs.meter) {
        var totalValueCount = _reactDom2['default'].findDOMNode(this.refs.meterValues).childNodes.length;

        if (this.props.activeIndex + 1 >= totalValueCount) {
          this.props.onActivate(0);
        } else {
          this.props.onActivate(this.props.activeIndex + 1);
        }
      }
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

      var values = undefined;
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
        { ref: 'meterValues', className: CLASS_ROOT + "__values", role: 'row' },
        values
      );
    }
  }, {
    key: '_renderThresholds',
    value: function _renderThresholds() {
      var _this2 = this;

      var result = undefined;
      var thresholds = undefined;
      if (this.props.stacked) {
        thresholds = this._renderTrack(this.props.thresholds, 0, true);
      } else {
        thresholds = this.props.series.map(function (item, index) {
          return _this2._renderTrack(_this2.props.thresholds, index, true);
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
    key: '_renderTotal',
    value: function _renderTotal() {
      return this.props.series.map(function (s) {
        return s.value;
      }).reduce(function (prev, curr) {
        return prev + curr;
      }, 0);
    }
  }, {
    key: '_renderTopLayer',
    value: function _renderTopLayer() {
      return null;
    }
  }, {
    key: '_renderA11YTitle',
    value: function _renderA11YTitle() {
      var a11yTitle = this.props.a11yTitle;
      if (!a11yTitle) {
        var graphicTitle = _utilsIntl2['default'].getMessage(this.context.intl, this.constructor.name);
        var meterTitle = _utilsIntl2['default'].getMessage(this.context.intl, 'Meter');

        a11yTitle = graphicTitle + ' ' + meterTitle;
      }

      return a11yTitle;
    }
  }, {
    key: '_renderA11YDesc',
    value: function _renderA11YDesc() {
      var _this3 = this;

      var a11yDesc = this.props.a11yDesc;
      var units = this.props.units || '';
      if (!a11yDesc) {
        var valueLabel = _utilsIntl2['default'].getMessage(this.context.intl, 'Value');
        a11yDesc = ', ' + valueLabel + ': ' + this._renderTotal() + ' ' + units;

        if (this.props.min) {
          var minLabel = _utilsIntl2['default'].getMessage(this.context.intl, 'Min');
          a11yDesc += ', ' + minLabel + ': ' + this.props.min.value + ' ' + units;
        }

        if (this.props.max) {
          var maxLabel = _utilsIntl2['default'].getMessage(this.context.intl, 'Max');
          a11yDesc += ', ' + maxLabel + ': ' + this.props.max.value + ' ' + units;
        }

        if (this.props.thresholds) {
          (function () {
            var thresholdLabel = _utilsIntl2['default'].getMessage(_this3.context.intl, 'Threshold');
            _this3.props.thresholds.forEach(function (threshold) {
              if (threshold.ariaLabel) {
                a11yDesc += ', ' + thresholdLabel + ': ' + threshold.ariaLabel;
              }
            });
          })();
        }
      }

      return a11yDesc;
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

      var a11yTitle = this._renderA11YTitle();
      var a11yDesc = this._renderA11YDesc();

      var activeDescendant = this.props.a11yDescId + '_' + (this.props.activeIndex || 0);

      return _react2['default'].createElement(
        'svg',
        { ref: 'meter', className: CLASS_ROOT + "__graphic",
          tabIndex: '0', role: this.props.a11yRole,
          width: this.props.vertical ? null : this.state.viewBoxWidth,
          height: this.props.vertical ? this.state.viewBoxHeight : null,
          viewBox: "0 0 " + this.state.viewBoxWidth + " " + this.state.viewBoxHeight,
          preserveAspectRatio: 'xMidYMid meet',
          'aria-activedescendant': activeDescendant,
          'aria-labelledby': this.props.a11yTitleId + ' ' + this.props.a11yDescId },
        _react2['default'].createElement(
          'title',
          { id: this.props.a11yTitleId },
          a11yTitle
        ),
        _react2['default'].createElement(
          'desc',
          { id: this.props.a11yDescId },
          a11yDesc
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
  a11yRole: _react.PropTypes.string,
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

Graphic.defaultProps = {
  a11yRole: 'img'
};

module.exports = Graphic;