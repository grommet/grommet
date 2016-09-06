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

var _Graphics = require('../utils/Graphics');

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _KeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.SUN_BURST; // (C) Copyright 2016 Hewlett Packard Enterprise Development LP

var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;
var UNIT_FACTOR = _Graphics.baseUnit * 0.75;
var PAD_FACTOR = _Graphics.baseUnit * 8;

var SunBurst = function (_Component) {
  (0, _inherits3.default)(SunBurst, _Component);

  function SunBurst(props, context) {
    (0, _classCallCheck3.default)(this, SunBurst);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SunBurst.__proto__ || (0, _getPrototypeOf2.default)(SunBurst)).call(this, props, context));

    _this._layout = _this._layout.bind(_this);
    _this._onResize = _this._onResize.bind(_this);
    _this._onPreviousSunBurst = _this._onPreviousSunBurst.bind(_this);
    _this._onNextSunBurst = _this._onNextSunBurst.bind(_this);
    _this._onParentSunBurst = _this._onParentSunBurst.bind(_this);
    _this._onChildSunBurst = _this._onChildSunBurst.bind(_this);
    _this._onSunBurstFocus = _this._onSunBurstFocus.bind(_this);
    _this._onSunBurstBlur = _this._onSunBurstBlur.bind(_this);
    _this._onSunBurstClick = _this._onSunBurstClick.bind(_this);

    _this.state = { height: 100, width: 100, activeSunBurst: [-1] };

    _this.sunBurstPaths = {};
    return _this;
  }

  (0, _createClass3.default)(SunBurst, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', this._onResize);
      this._onResize();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this._onResize();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this._resizeTimer);
      window.removeEventListener('resize', this._onResize);
    }
  }, {
    key: '_onSunBurstFocus',
    value: function _onSunBurstFocus() {
      this._keyboardHandlers = {
        left: this._onPreviousSunBurst,
        up: this._onParentSunBurst,
        right: this._onNextSunBurst,
        down: this._onChildSunBurst,
        enter: this._onSunBurstClick
      };
      _KeyboardAccelerators2.default.startListeningToKeyboard(this, this._keyboardHandlers);
    }
  }, {
    key: '_onSunBurstBlur',
    value: function _onSunBurstBlur() {
      _KeyboardAccelerators2.default.stopListeningToKeyboard(this, this._keyboardHandlers);
    }
  }, {
    key: '_onPreviousSunBurst',
    value: function _onPreviousSunBurst() {
      var onActive = this.props.onActive;

      var previousSunBurst = this.state.activeSunBurst.slice();

      previousSunBurst[previousSunBurst.length - 1] -= 1;
      var id = previousSunBurst.join(',');
      if (this.sunBurstPaths[id]) {
        onActive(previousSunBurst);
        this.setState({ activeSunBurst: previousSunBurst });
      }

      //stop event propagation
      return true;
    }
  }, {
    key: '_onParentSunBurst',
    value: function _onParentSunBurst(event) {
      event.preventDefault();
      var onActive = this.props.onActive;

      var parentSunBurst = this.state.activeSunBurst.slice(0, this.state.activeSunBurst.length - 1);

      var id = parentSunBurst.join(',');
      if (this.sunBurstPaths[id]) {
        onActive(parentSunBurst);
        this.setState({ activeSunBurst: parentSunBurst });
      }

      //stop event propagation
      return true;
    }
  }, {
    key: '_onChildSunBurst',
    value: function _onChildSunBurst(event) {
      event.preventDefault();
      var onActive = this.props.onActive;

      var childSunBurst = this.state.activeSunBurst.slice();
      childSunBurst.push(0);

      var id = childSunBurst.join(',');
      if (this.sunBurstPaths[id]) {
        onActive(childSunBurst);
        this.setState({ activeSunBurst: childSunBurst });
      }

      //stop event propagation
      return true;
    }
  }, {
    key: '_onNextSunBurst',
    value: function _onNextSunBurst() {
      var onActive = this.props.onActive;

      var nextSunBurst = this.state.activeSunBurst.slice();

      nextSunBurst[nextSunBurst.length - 1] += 1;
      var id = nextSunBurst.join(',');
      if (this.sunBurstPaths[id]) {
        onActive(nextSunBurst);
        this.setState({ activeSunBurst: nextSunBurst });
      }

      //stop event propagation
      return true;
    }
  }, {
    key: '_onSunBurstClick',
    value: function _onSunBurstClick() {
      var onClick = this.props.onClick;
      var activeSunBurst = this.state.activeSunBurst;


      if (this.sunBurstPaths[activeSunBurst.join(',')] && onClick) {
        onClick(activeSunBurst);
      }
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      // debounce
      clearTimeout(this._resizeTimer);
      this._resizeTimer = setTimeout(this._layout, 50);
    }
  }, {
    key: '_layout',
    value: function _layout() {
      var rect = this.svgRef.getBoundingClientRect();
      if (rect.width !== this.state.width || rect.height !== this.state.height) {
        this.setState({ height: rect.height, width: rect.width });
      }
    }
  }, {
    key: '_renderData',
    value: function _renderData(path, data, total, centerX, centerY, radius, startAngle, endAngle, role, value) {
      var _this2 = this;

      var _props = this.props;
      var active = _props.active;
      var onActive = _props.onActive;
      var onClick = _props.onClick;
      var width = this.state.width;

      var unit = width / UNIT_FACTOR;
      var ringPad = width / PAD_FACTOR;
      if (!total) {
        total = 0;
        data.forEach(function (datum) {
          return total += datum.value;
        });
      }
      // reserve 1 degree per data item for margin between slices
      var padCount = endAngle - startAngle === 360 ? data.length : data.length - 1;
      var anglePer = (endAngle - startAngle - padCount) / total;

      var result = [];
      data.forEach(function (datum, index) {
        var datumPath = path.concat([index]);
        var colorIndex = datum.colorIndex || 'graph-' + (index % 4 + 1);
        var className = [CLASS_ROOT + '__slice', COLOR_INDEX + '-' + colorIndex];
        if (onActive || onClick) {
          className.push(CLASS_ROOT + '__slice--hot');
        }
        if (active && active.length === datumPath.length && active.every(function (v, i) {
          return v === datumPath[i];
        })) {
          className.push(CLASS_ROOT + '__slice--active');
        }
        var endAngle = (0, _Graphics.translateEndAngle)(startAngle, anglePer, datum.value);
        var commands = (0, _Graphics.arcCommands)(centerX, centerY, radius, startAngle, endAngle);

        var id = datumPath.join(',');

        result.push(_react2.default.createElement('path', { ref: function ref(_ref) {
            return _this2.sunBurstPaths[id] = _ref;
          }, id: id, key: id,
          className: className.join(' '),
          fill: 'none', strokeWidth: unit * 2, d: commands,
          'aria-label': datum.children ? undefined : datum.value,
          role: datum.children ? undefined : 'row',
          onMouseOver: onActive ? function () {
            return onActive(datumPath);
          } : undefined,
          onMouseOut: onActive ? function () {
            return onActive(undefined);
          } : undefined,
          onClick: onClick ? function () {
            return onClick(datumPath);
          } : undefined }));

        if (datum.children) {
          result = result.concat(_this2._renderData(datumPath, datum.children, datum.total, centerX, centerY, radius + unit * 2 + ringPad, startAngle, endAngle, 'group', datum.value));
        }

        // + 1 is for margin between slices
        startAngle = endAngle + 1;
      });

      return _react2.default.createElement(
        'g',
        { key: '' + radius + total, role: role || 'rowgroup',
          'aria-label': value || total },
        result
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props;
      var a11yTitle = _props2.a11yTitle;
      var active = _props2.active;
      var data = _props2.data;
      var label = _props2.label;
      var size = _props2.size;
      var _state = this.state;
      var width = _state.width;
      var height = _state.height;
      var intl = this.context.intl;


      var unit = width / UNIT_FACTOR;
      var classes = [CLASS_ROOT];
      if (size) {
        classes.push(CLASS_ROOT + '--' + size);
      }
      if (active) {
        classes.push(CLASS_ROOT + '--active');
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var centerX = width / 2;
      var centerY = height / 2;
      var paths = this._renderData([], data, undefined, centerX, centerY, unit * 2, 0, 360);

      var labelElement = void 0;
      if (label) {
        labelElement = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__label' },
          label
        );
      }

      var sunBurstLabel = a11yTitle || _Intl2.default.getMessage(intl, 'SunBurstLabel');

      return _react2.default.createElement(
        'div',
        { className: CLASS_ROOT + '__container' },
        _react2.default.createElement(
          'svg',
          { ref: function ref(_ref2) {
              return _this3.svgRef = _ref2;
            }, className: classes.join(' '),
            viewBox: '0 0 ' + width + ' ' + height, role: 'group',
            'aria-label': sunBurstLabel, tabIndex: '0',
            onFocus: this._onSunBurstFocus, onBlur: this._onSunBurstBlur },
          paths
        ),
        labelElement
      );
    }
  }]);
  return SunBurst;
}(_react.Component);

SunBurst.displayName = 'SunBurst';
exports.default = SunBurst;


SunBurst.contextTypes = {
  intl: _react.PropTypes.object
};

SunBurst.propTypes = {
  a11yTitle: _react.PropTypes.string,
  active: _react.PropTypes.arrayOf(_react.PropTypes.number),
  data: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    children: _react.PropTypes.arrayOf(_react.PropTypes.object),
    colorIndex: _react.PropTypes.string,
    total: _react.PropTypes.number, // sum of all values otherwise
    value: _react.PropTypes.number.isRequired
  })),
  label: _react.PropTypes.node,
  onActive: _react.PropTypes.func,
  onClick: _react.PropTypes.func,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'full'])
};

SunBurst.defaultProps = {
  size: 'medium'
};
module.exports = exports['default'];