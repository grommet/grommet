'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Intl = require('../../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _KeyboardAccelerators = require('../../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.METER; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

var Graphic = function (_Component) {
  (0, _inherits3.default)(Graphic, _Component);

  function Graphic(props, context) {
    (0, _classCallCheck3.default)(this, Graphic);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Graphic.__proto__ || (0, _getPrototypeOf2.default)(Graphic)).call(this, props, context));

    _this.state = _this._stateFromProps(props);

    _this._onNextBand = _this._onNextBand.bind(_this);
    _this._onPreviousBand = _this._onPreviousBand.bind(_this);
    _this._onGraphicFocus = _this._onGraphicFocus.bind(_this);
    _this._onGraphicBlur = _this._onGraphicBlur.bind(_this);
    _this._onBandClick = _this._onBandClick.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Graphic, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var state = this._stateFromProps(newProps);
      this.setState(state);
    }
  }, {
    key: '_onGraphicFocus',
    value: function _onGraphicFocus() {
      this._keyboardHandlers = {
        left: this._onPreviousBand,
        up: this._onPreviousBand,
        right: this._onNextBand,
        down: this._onNextBand,
        enter: this._onBandClick
      };
      _KeyboardAccelerators2.default.startListeningToKeyboard(this, this._keyboardHandlers);
    }
  }, {
    key: '_onGraphicBlur',
    value: function _onGraphicBlur() {
      _KeyboardAccelerators2.default.stopListeningToKeyboard(this, this._keyboardHandlers);
    }
  }, {
    key: '_onBandClick',
    value: function _onBandClick() {
      if (this.props.activeIndex !== undefined) {
        var activeBand = this.props.series[this.props.activeIndex];
        if (activeBand && activeBand.onClick) {
          activeBand.onClick();
        }
      }
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
    value: function _renderSlice(trackIndex, item, itemIndex, startValue, max, track, threshold) {
      var _props = this.props,
          activeIndex = _props.activeIndex,
          onActivate = _props.onActivate;

      var path = void 0;
      if (!item.hidden) {
        var _classnames;

        var classes = (0, _classnames3.default)(CLASS_ROOT + '__slice', (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__slice--active', itemIndex === activeIndex), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__slice--clickable', item.onClick), (0, _defineProperty3.default)(_classnames, COLOR_INDEX + '-' + item.colorIndex, item.colorIndex), _classnames));

        var commands = this._sliceCommands(trackIndex, item, startValue, max);

        if (threshold) {
          path = (0, _utils.buildPath)(itemIndex, commands, classes);
        } else if (track) {
          path = (0, _utils.buildPath)(itemIndex, commands, classes, onActivate, item.onClick);
        } else {
          var a11yTitle = '' + item.value;
          var role = this.props.series.length > 1 ? 'img' : undefined;
          path = (0, _utils.buildPath)(itemIndex, commands, classes, onActivate, item.onClick, a11yTitle, role);
        }
      }

      return path;
    }
  }, {
    key: '_renderSlices',
    value: function _renderSlices(series, trackIndex, track, threshold) {
      var _this2 = this;

      var _props2 = this.props,
          min = _props2.min,
          max = _props2.max;

      var startValue = min;

      var paths = series.map(function (item, itemIndex) {
        var path = _this2._renderSlice(trackIndex, item, itemIndex, startValue, max, track, threshold);

        startValue += item.value;

        return path;
      });

      return paths;
    }
  }, {
    key: '_loadingCommands',
    value: function _loadingCommands() {
      return this._sliceCommands(0, { value: this.props.max }, this.props.min);
    }
  }, {
    key: '_onPreviousBand',
    value: function _onPreviousBand(event) {
      event.preventDefault();
      var activeIndex = this.props.activeIndex !== undefined ? this.props.activeIndex : -1;

      if (activeIndex - 1 >= 0) {
        this.props.onActivate(activeIndex - 1);
      }

      //stop event propagation
      return true;
    }
  }, {
    key: '_onNextBand',
    value: function _onNextBand(event) {
      event.preventDefault();
      var activeIndex = this.props.activeIndex !== undefined ? this.props.activeIndex : -1;

      var totalBands = _reactDom2.default.findDOMNode(this.meterValuesRef).childNodes.length;

      if (activeIndex + 1 < totalBands) {
        this.props.onActivate(activeIndex + 1);
      }

      //stop event propagation
      return true;
    }
  }, {
    key: '_renderLoading',
    value: function _renderLoading() {
      var classes = (0, _classnames3.default)(CLASS_ROOT + '__slice', CLASS_ROOT + '__slice--loading', COLOR_INDEX + '-loading');
      var commands = this._loadingCommands();
      return [_react2.default.createElement('path', { key: 'loading', className: classes, d: commands })];
    }
  }, {
    key: '_renderValues',
    value: function _renderValues() {
      var _this3 = this;

      var _props3 = this.props,
          min = _props3.min,
          max = _props3.max;

      var values = void 0;
      if (this.props.stacked) {
        values = this._renderSlices(this.props.series, 0);
      } else {
        values = this.props.series.map(function (item, index) {
          return _this3._renderSlice(index, item, index, min, max);
        });
      }
      if (values.length === 0) {
        values = this._renderLoading();
      }
      return _react2.default.createElement(
        'g',
        { ref: function ref(_ref) {
            return _this3.meterValuesRef = _ref;
          },
          className: CLASS_ROOT + '__values' },
        values
      );
    }
  }, {
    key: '_renderTracks',
    value: function _renderTracks() {
      var _this4 = this;

      var _props4 = this.props,
          min = _props4.min,
          max = _props4.max;

      var trackValue = { value: max };
      var tracks = void 0;
      if (this.props.stacked) {
        tracks = this._renderSlice(0, trackValue, 0, min, max, true, false);
      } else {
        tracks = this.props.series.map(function (item, index) {
          return _this4._renderSlice(index, trackValue, index, min, max, true, false);
        });
      }
      return _react2.default.createElement(
        'g',
        { className: CLASS_ROOT + '__tracks' },
        tracks
      );
    }
  }, {
    key: '_renderThresholds',
    value: function _renderThresholds() {
      var result = void 0;
      var thresholds = this._renderSlices(this.props.thresholds, -0.4, false, true);
      if (thresholds.length > 0) {
        result = _react2.default.createElement(
          'g',
          { className: CLASS_ROOT + '__thresholds' },
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
      return undefined;
    }
  }, {
    key: '_renderA11YTitle',
    value: function _renderA11YTitle() {
      var a11yTitle = this.props.a11yTitle;
      if (!a11yTitle) {
        var graphicTitle = _Intl2.default.getMessage(this.context.intl, this.displayName);
        var meterTitle = _Intl2.default.getMessage(this.context.intl, 'Meter');

        a11yTitle = graphicTitle + ' ' + meterTitle;
      }

      return a11yTitle + '. ' + this._renderA11YDesc();
    }
  }, {
    key: '_renderA11YDesc',
    value: function _renderA11YDesc() {
      var _this5 = this;

      var a11yDesc = this.props.a11yDesc;
      if (!a11yDesc) {
        var valueLabel = _Intl2.default.getMessage(this.context.intl, 'Value');
        a11yDesc = ', ' + valueLabel + ': ' + this._renderTotal();

        if (this.props.min) {
          var minLabel = _Intl2.default.getMessage(this.context.intl, 'Min');
          a11yDesc += ', ' + minLabel + ': ' + this.props.min;
        }

        if (this.props.max) {
          var maxLabel = _Intl2.default.getMessage(this.context.intl, 'Max');
          a11yDesc += ', ' + maxLabel + ': ' + this.props.max;
        }

        if (this.props.thresholds) {
          (function () {
            var thresholdLabel = _Intl2.default.getMessage(_this5.context.intl, 'Threshold');
            _this5.props.thresholds.forEach(function (threshold) {
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
      var _props5 = this.props,
          series = _props5.series,
          tabIndex = _props5.tabIndex;
      var _state = this.state,
          viewBoxHeight = _state.viewBoxHeight,
          viewBoxWidth = _state.viewBoxWidth;

      var tracks = this._renderTracks();
      var values = this._renderValues();
      var thresholds = this._renderThresholds();
      var topLayer = this._renderTopLayer();

      var a11yTitle = this._renderA11YTitle();

      var role = series.length > 1 ? 'group' : 'img';

      return _react2.default.createElement(
        'svg',
        { className: CLASS_ROOT + '__graphic',
          tabIndex: role === 'img' ? undefined : tabIndex || '0',
          width: viewBoxWidth, role: role,
          height: viewBoxHeight,
          viewBox: '0 0 ' + viewBoxWidth + ' ' + viewBoxHeight,
          preserveAspectRatio: 'xMidYMid meet',
          'aria-label': a11yTitle, onFocus: this._onGraphicFocus,
          onBlur: this._onGraphicBlur },
        tracks,
        thresholds,
        values,
        topLayer
      );
    }
  }]);
  return Graphic;
}(_react.Component);

Graphic.displayName = 'Graphic';
exports.default = Graphic;


Graphic.propTypes = (0, _extends3.default)({
  stacked: _react.PropTypes.bool,
  tabIndex: _react.PropTypes.string,
  thresholds: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    value: _react.PropTypes.number.isRequired,
    colorIndex: _react.PropTypes.string
  })).isRequired,
  vertical: _react.PropTypes.bool
}, _utils.propTypes);

Graphic.contextTypes = {
  intl: _react.PropTypes.object
};

Graphic.defaultProps = {
  tabIndex: '0'
};
module.exports = exports['default'];