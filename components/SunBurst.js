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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.SUN_BURST; // (C) Copyright 2016 Hewlett Packard Enterprise Development LP

var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;
var UNIT_FACTOR = _Graphics.baseUnit * 0.75;
var PAD_FACTOR = _Graphics.baseUnit * 8;

var SunBurst = function (_Component) {
  (0, _inherits3.default)(SunBurst, _Component);

  function SunBurst(props, context) {
    (0, _classCallCheck3.default)(this, SunBurst);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SunBurst).call(this, props, context));

    _this._layout = _this._layout.bind(_this);
    _this._onResize = _this._onResize.bind(_this);

    _this.state = { height: 100, width: 100 };
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
    key: '_onResize',
    value: function _onResize() {
      // debounce
      clearTimeout(this._resizeTimer);
      this._resizeTimer = setTimeout(this._layout, 50);
    }
  }, {
    key: '_layout',
    value: function _layout() {
      var rect = this.refs.svg.getBoundingClientRect();
      if (rect.width !== this.state.width || rect.height !== this.state.height) {
        this.setState({ height: rect.height, width: rect.width });
      }
    }
  }, {
    key: '_renderData',
    value: function _renderData(path, data, total, centerX, centerY, radius, startAngle, endAngle) {
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

        result.push(_react2.default.createElement('path', { key: datumPath.join(','), className: className.join(' '),
          fill: 'none', strokeWidth: unit * 2, d: commands,
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
          result = result.concat(_this2._renderData(datumPath, datum.children, datum.total, centerX, centerY, radius + unit * 2 + ringPad, startAngle, endAngle));
        }

        // + 1 is for margin between slices
        startAngle = endAngle + 1;
      });

      return result;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var active = _props2.active;
      var data = _props2.data;
      var label = _props2.label;
      var size = _props2.size;
      var _state = this.state;
      var width = _state.width;
      var height = _state.height;

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

      return _react2.default.createElement(
        'div',
        { className: CLASS_ROOT + '__container' },
        _react2.default.createElement(
          'svg',
          { ref: 'svg', className: classes.join(' '),
            viewBox: '0 0 ' + width + ' ' + height },
          _react2.default.createElement(
            'g',
            null,
            paths
          )
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