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

var _classnames4 = require('classnames');

var _classnames5 = _interopRequireDefault(_classnames4);

var _Graphics = require('../utils/Graphics');

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _KeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

var _Announcer = require('../utils/Announcer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.SUN_BURST;
var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;
var UNIT_FACTOR = _Graphics.baseUnit * 0.75;
var PAD_FACTOR = _Graphics.baseUnit * 8;

var SunBurst = function (_Component) {
  _inherits(SunBurst, _Component);

  function SunBurst(props, context) {
    _classCallCheck(this, SunBurst);

    var _this = _possibleConstructorReturn(this, (SunBurst.__proto__ || Object.getPrototypeOf(SunBurst)).call(this, props, context));

    _this._layout = _this._layout.bind(_this);
    _this._onResize = _this._onResize.bind(_this);
    _this._onPreviousSunBurst = _this._onPreviousSunBurst.bind(_this);
    _this._onNextSunBurst = _this._onNextSunBurst.bind(_this);
    _this._onParentSunBurst = _this._onParentSunBurst.bind(_this);
    _this._onChildSunBurst = _this._onChildSunBurst.bind(_this);
    _this._onSunBurstFocus = _this._onSunBurstFocus.bind(_this);
    _this._onSunBurstBlur = _this._onSunBurstBlur.bind(_this);
    _this._onSunBurstClick = _this._onSunBurstClick.bind(_this);
    _this._onActiveSunBurst = _this._onActiveSunBurst.bind(_this);
    _this._announceSunBurst = _this._announceSunBurst.bind(_this);

    _this.state = {
      height: 100, width: 100, activeSunBurst: [-1], mouseActive: false
    };

    _this.sunBurstPaths = {};
    return _this;
  }

  _createClass(SunBurst, [{
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
      var mouseActive = this.state.mouseActive;

      this._keyboardHandlers = {
        left: this._onPreviousSunBurst,
        up: this._onParentSunBurst,
        right: this._onNextSunBurst,
        down: this._onChildSunBurst,
        enter: this._onSunBurstClick
      };
      _KeyboardAccelerators2.default.startListeningToKeyboard(this, this._keyboardHandlers);
      if (mouseActive === false) {
        this.setState({ focus: true });
      }
    }
  }, {
    key: '_onSunBurstBlur',
    value: function _onSunBurstBlur() {
      _KeyboardAccelerators2.default.stopListeningToKeyboard(this, this._keyboardHandlers);

      this.setState({ focus: false });
    }
  }, {
    key: '_announceSunBurst',
    value: function _announceSunBurst() {
      var activeSunBurst = this.state.activeSunBurst;


      var sunBurstRef = this.sunBurstPaths[activeSunBurst.join(',')];
      if (sunBurstRef) {
        (0, _Announcer.announce)(sunBurstRef.getAttribute('aria-label'));
      }
    }
  }, {
    key: '_onPreviousSunBurst',
    value: function _onPreviousSunBurst(event) {
      event.preventDefault();
      var onActive = this.props.onActive;

      var previousSunBurst = this.state.activeSunBurst.slice();

      previousSunBurst[previousSunBurst.length - 1] -= 1;
      var id = previousSunBurst.join(',');
      if (this.sunBurstPaths[id]) {
        onActive(previousSunBurst);
        this.setState({ activeSunBurst: previousSunBurst }, this._announceSunBurst);
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
        this.setState({ activeSunBurst: parentSunBurst }, this._announceSunBurst);
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
        this.setState({ activeSunBurst: childSunBurst }, this._announceSunBurst);
      }

      //stop event propagation
      return true;
    }
  }, {
    key: '_onNextSunBurst',
    value: function _onNextSunBurst(event) {
      event.preventDefault();
      var onActive = this.props.onActive;

      var nextSunBurst = this.state.activeSunBurst.slice();

      nextSunBurst[nextSunBurst.length - 1] += 1;
      var id = nextSunBurst.join(',');
      if (this.sunBurstPaths[id]) {
        onActive(nextSunBurst);
        this.setState({ activeSunBurst: nextSunBurst }, this._announceSunBurst);
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
      var rect = this._containerRef.getBoundingClientRect();
      if (rect.width !== this.state.width || rect.height !== this.state.height) {
        this.setState({ height: rect.height, width: rect.width });
      }
    }
  }, {
    key: '_onActiveSunBurst',
    value: function _onActiveSunBurst(sunBurst) {
      var onActive = this.props.onActive;

      this.setState({
        activeSunBurst: sunBurst ? sunBurst : [-1]
      });
      if (sunBurst && onActive) {
        onActive(sunBurst);
      }
    }
  }, {
    key: '_renderData',
    value: function _renderData(path, data, total, centerX, centerY, radius, startAngle, endAngle, role, value) {
      var _this2 = this;

      var _props = this.props,
          active = _props.active,
          onActive = _props.onActive,
          onClick = _props.onClick;
      var width = this.state.width;
      var intl = this.context.intl;

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
        var _classnames;

        var datumPath = path.concat([index]);
        var colorIndex = datum.colorIndex || 'graph-' + (index % 4 + 1);
        var className = (0, _classnames5.default)(CLASS_ROOT + '__slice', COLOR_INDEX + '-' + colorIndex, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '__slice--hot', onActive || onClick), _defineProperty(_classnames, CLASS_ROOT + '__slice--active', active && active.length === datumPath.length && active.every(function (v, i) {
          return v === datumPath[i];
        })), _classnames));
        var endAngle = (0, _Graphics.translateEndAngle)(startAngle, anglePer, datum.value);
        var commands = (0, _Graphics.arcCommands)(centerX, centerY, radius, startAngle, endAngle);

        var id = datumPath.join(',');

        var enterSelectMessage = '(' + _Intl2.default.getMessage(intl, 'Enter Select') + ')';
        var ariaLabel = datum.value + ' ' + (onClick ? enterSelectMessage : '');

        result.push(_react2.default.createElement('path', { ref: function ref(_ref) {
            return _this2.sunBurstPaths[id] = _ref;
          },
          key: datumPath + '_' + index,
          className: className, tabIndex: onClick ? '-1' : undefined,
          fill: 'none', strokeWidth: unit * 2, d: commands,
          'aria-label': ariaLabel, role: 'row',
          onMouseOver: _this2._onActiveSunBurst.bind(_this2, datumPath),
          onMouseOut: _this2._onActiveSunBurst.bind(_this2, undefined),
          onFocus: _this2._onActiveSunBurst.bind(_this2, datumPath),
          onBlur: _this2._onActiveSunBurst.bind(_this2, undefined),
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
        { key: path + '_' + radius + '_' + total, role: role || 'rowgroup',
          'aria-label': value || total },
        result
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames2,
          _this3 = this;

      var _props2 = this.props,
          a11yTitle = _props2.a11yTitle,
          active = _props2.active,
          className = _props2.className,
          data = _props2.data,
          label = _props2.label,
          size = _props2.size,
          props = _objectWithoutProperties(_props2, ['a11yTitle', 'active', 'className', 'data', 'label', 'size']);

      delete props.onActive;
      delete props.onClick;
      var _state = this.state,
          focus = _state.focus,
          height = _state.height,
          width = _state.width;
      var intl = this.context.intl;

      var classes = (0, _classnames5.default)(CLASS_ROOT, (_classnames2 = {}, _defineProperty(_classnames2, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames2, CLASS_ROOT + '--active', active), _classnames2), className);

      var unit = width / UNIT_FACTOR;
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

      var sunBurstMessage = a11yTitle || _Intl2.default.getMessage(intl, 'SunBurst');
      var navigationHelpMessage = _Intl2.default.getMessage(intl, 'Navigation Help');

      var graphicClasses = (0, _classnames5.default)(CLASS_ROOT + '__graphic', _defineProperty({}, CLASS_ROOT + '__graphic--focus', focus));
      return _react2.default.createElement(
        'div',
        _extends({ ref: function ref(_ref2) {
            return _this3._containerRef = _ref2;
          } }, props, { className: classes }),
        _react2.default.createElement(
          'svg',
          { className: graphicClasses, tabIndex: '0',
            viewBox: '0 0 ' + width + ' ' + height, role: 'group',
            'aria-label': sunBurstMessage + ' (' + navigationHelpMessage + ')',
            onFocus: this._onSunBurstFocus, onBlur: this._onSunBurstBlur,
            onMouseDown: function onMouseDown() {
              return _this3.setState({ mouseActive: true });
            },
            onMouseUp: function onMouseUp() {
              return _this3.setState({ mouseActive: false });
            } },
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


SunBurst.propTypes = {
  a11yTitle: _propTypes2.default.string,
  active: _propTypes2.default.arrayOf(_propTypes2.default.number),
  data: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    children: _propTypes2.default.arrayOf(_propTypes2.default.object),
    colorIndex: _propTypes2.default.string,
    total: _propTypes2.default.number, // sum of all values otherwise
    value: _propTypes2.default.number.isRequired
  })),
  label: _propTypes2.default.node,
  onActive: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  size: _propTypes2.default.oneOf(['small', 'medium', 'large', 'xlarge', 'full'])
};

SunBurst.defaultProps = {
  size: 'medium'
};

SunBurst.contextTypes = {
  intl: _propTypes2.default.object
};
module.exports = exports['default'];