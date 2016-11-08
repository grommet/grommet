'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Intl = require('../../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.CHART_GRAPH; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

var Graph = function (_Component) {
  (0, _inherits3.default)(Graph, _Component);

  function Graph(props, context) {
    (0, _classCallCheck3.default)(this, Graph);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Graph.__proto__ || (0, _getPrototypeOf2.default)(Graph)).call(this, props, context));

    _this._onResize = _this._onResize.bind(_this);
    _this._layout = _this._layout.bind(_this);
    _this._renderA11YTitle = _this._renderA11YTitle.bind(_this);
    _this.state = { height: props.height || 1, width: props.width || 1 };
    return _this;
  }

  (0, _createClass3.default)(Graph, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', this._onResize);
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
      // delay should be greater than Chart's delay
      this._resizeTimer = setTimeout(this._layout, _utils.debounceDelay + 10);
    }
  }, {
    key: '_layout',
    value: function _layout() {
      var _props = this.props,
          height = _props.height,
          width = _props.width;

      var graph = this.graphRef;
      var rect = graph.parentNode.getBoundingClientRect();
      this.setState({
        height: height || Math.floor(rect.height),
        width: width || Math.floor(rect.width)
      });
    }

    // Determines what the appropriate control coordinates are on
    // either side of the coordinate at the specified index.
    // This calculation is a simplified smoothing function that
    // just looks at whether the line through this coordinate is
    // ascending, descending or not. Peaks, valleys, and flats are
    // treated the same.

  }, {
    key: '_controlCoordinates',
    value: function _controlCoordinates(coordinates, index) {
      var current = coordinates[index];
      // Use previous and next coordinates when available, otherwise use
      // the current coordinate for them.
      var previous = current;
      if (index > 0) {
        previous = coordinates[index - 1];
      }
      var next = current;
      if (index < coordinates.length - 1) {
        next = coordinates[index + 1];
      }

      // Put the control X coordinates midway between the coordinates.
      var deltaX = (current[0] - previous[0]) / 2.4;
      var deltaY = void 0;

      // Start with a flat slope. This works for peaks, valleys, and flats.
      var first = [current[0] - deltaX, current[1]];
      var second = [current[0] + deltaX, current[1]];

      if (previous[1] < current[1] && current[1] < next[1]) {
        // Ascending, use the minimum positive slope.
        deltaY = Math.min((current[1] - previous[1]) / 2, (next[1] - current[1]) / 2);
        first[1] = current[1] - deltaY;
        second[1] = current[1] + deltaY;
      } else if (previous[1] > current[1] && current[1] > next[1]) {
        // Descending, use the minimum negative slope.
        deltaY = Math.min((previous[1] - current[1]) / 2, (current[1] - next[1]) / 2);
        first[1] = current[1] + deltaY;
        second[1] = current[1] - deltaY;
      }
      return [first, second];
    }
  }, {
    key: '_renderA11YTitle',
    value: function _renderA11YTitle() {
      var _props2 = this.props,
          a11yTitle = _props2.a11yTitle,
          max = _props2.max,
          min = _props2.min,
          type = _props2.type,
          values = _props2.values;
      var intl = this.context.intl;


      if (a11yTitle) {
        return a11yTitle;
      }

      var typeLabel = _Intl2.default.getMessage(intl, type);

      var minLabel = ', ' + _Intl2.default.getMessage(intl, 'Min') + ': ' + min;

      var maxLabel = ', ' + _Intl2.default.getMessage(intl, 'Max') + ': ' + max;

      var definedValues = values.filter(function (value) {
        return value;
      });
      var valueLabel = _Intl2.default.getMessage(intl, 'GraphValues', {
        count: values.length,
        highest: Math.max.apply(Math, (0, _toConsumableArray3.default)(definedValues)).toString(),
        smallest: Math.min.apply(Math, (0, _toConsumableArray3.default)(definedValues)).toString()
      });

      return typeLabel + ' ' + minLabel + ' ' + maxLabel + '. ' + valueLabel;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props,
          activeIndex = _props3.activeIndex,
          className = _props3.className,
          colorIndex = _props3.colorIndex,
          max = _props3.max,
          min = _props3.min,
          reverse = _props3.reverse,
          smooth = _props3.smooth,
          type = _props3.type,
          values = _props3.values,
          vertical = _props3.vertical,
          props = (0, _objectWithoutProperties3.default)(_props3, ['activeIndex', 'className', 'colorIndex', 'max', 'min', 'reverse', 'smooth', 'type', 'values', 'vertical']);

      delete props.height;
      delete props.width;
      delete props.points;
      var _state = this.state,
          height = _state.height,
          width = _state.width;

      var pad = Math.min(width, height) < _utils.padding * 8 ? 2 : _utils.padding;

      var classes = (0, _classnames4.default)(CLASS_ROOT, CLASS_ROOT + '--' + type, (0, _defineProperty3.default)({}, CLASS_ROOT + '--vertical', vertical), COLOR_INDEX + '-' + (colorIndex || 'graph-1'), className);

      var scale = 1;
      var step = void 0;
      if (vertical) {
        if (values.length <= 1) {
          step = height - 2 * pad;
        } else {
          if (max - min > 0) {
            scale = (width - 2 * pad) / (max - min);
          }
          step = (height - 2 * pad) / (values.length - 1);
        }
      } else {
        if (values.length <= 1) {
          step = width - 2 * pad;
        } else {
          if (max - min > 0) {
            scale = (height - 2 * pad) / (max - min);
          }
          step = (width - 2 * pad) / (values.length - 1);
        }
      }

      // Get all coordinates up front so they are available
      // if we are drawing a smooth chart.
      var points = [];
      var coordinates = values.map(function (value, index) {
        var coordinate = void 0;
        if (undefined !== value) {
          if (vertical) {
            coordinate = [(value - min) * scale + pad, (reverse ? index * step : height - 2 * pad - index * step) + pad];
          } else {
            coordinate = [(reverse ? width - 2 * pad - index * step : index * step) + pad, height - 2 * pad - (value - min) * scale + pad];
          }

          if ((_this2.props.points || index === activeIndex) && !_this2.props.sparkline) {
            var _classes = (0, _classnames4.default)(CLASS_ROOT + '__point', COLOR_INDEX + '-' + (colorIndex || 'graph-1'), (0, _defineProperty3.default)({}, CLASS_ROOT + '__point--active', index === activeIndex));
            var radius = _utils.pointSize / 3;
            if (index === activeIndex) {
              radius = _utils.pointSize / 2;
            }
            points.push(_react2.default.createElement('circle', { key: index, className: _classes,
              cx: coordinate[0], cy: coordinate[1], r: radius }));
          }
        }

        return coordinate;
      }).filter(function (coordinate) {
        return coordinate;
      });

      var path = void 0;
      if (coordinates.length > 1) {
        var pathProps = {};
        var commands = void 0;

        // Build the commands for this set of coordinates.

        if ('area' === type || 'line' === type) {

          if (smooth) {
            (function () {
              var controlCoordinates = coordinates.map(function (coord, index) {
                return _this2._controlCoordinates(coordinates, index);
              });
              commands = '';
              coordinates.forEach(function (coord, index) {
                if (0 === index) {
                  commands += 'M' + coord.join(',');
                } else {
                  // Use the previous right control coordinate and the current
                  // left control coordinate. We do this because we calculate
                  // the left and right sides for a particular index together,
                  // so the path is smooth but the SVG C command needs the
                  // right one from the previous index and the left one from
                  // the current index.
                  commands += ' C' + controlCoordinates[index - 1][1].join(',') + '\n                ' + controlCoordinates[index][0].join(',') + ' ' + coord.join(',');
                }
              });
            })();
          } else {
            commands = 'M' + coordinates.map(function (c) {
              return c.join(',');
            }).join(' L');
          }

          if ('area' === type) {
            if (vertical) {
              if (reverse) {
                // Close the path by drawing to the left
                // and across to the top of where we started.
                commands += 'L' + pad + ',' + coordinates[coordinates.length - 1][1] + '\n                L' + pad + ',' + coordinates[0][1] + ' Z';
              } else {
                // Close the path by drawing to the left
                // and across to the bottom of where we started.
                commands += 'L' + pad + ',' + coordinates[coordinates.length - 1][1] + '\n                L' + pad + ',' + (height - pad) + ' Z';
              }
            } else {
              // Close the path by drawing down to the bottom
              // and across to the left of where we started.
              commands += 'L' + coordinates[coordinates.length - 1][0] + ',' + (height - pad) + '\n              L' + coordinates[0][0] + ',' + (height - pad) + ' Z';
            }
            pathProps.stroke = 'none';
          } else {
            pathProps.fill = 'none';
          }
        } else if ('bar' === type) {
          commands = coordinates.map(function (c) {
            return 'M' + c.join(',') + 'L' + (vertical ? pad + ',' + c[1] : c[0] + ',' + (height - pad));
          }).join(' ');
          pathProps.fill = 'none';
        }

        path = _react2.default.createElement('path', (0, _extends3.default)({}, pathProps, { d: commands }));
      }

      return _react2.default.createElement(
        'svg',
        (0, _extends3.default)({ ref: function ref(_ref) {
            return _this2.graphRef = _ref;
          } }, props, { className: classes,
          viewBox: '0 0 ' + width + ' ' + height, preserveAspectRatio: 'none',
          role: 'row', 'aria-label': this._renderA11YTitle() }),
        _react2.default.createElement(
          'g',
          null,
          path
        ),
        points
      );
    }
  }]);
  return Graph;
}(_react.Component);

Graph.displayName = 'Graph';
exports.default = Graph;
;

Graph.contextTypes = {
  intl: _react.PropTypes.object
};

Graph.defaultProps = {
  min: 0,
  max: 100
};

Graph.propTypes = {
  a11yTitle: _react.PropTypes.string,
  activeIndex: _react.PropTypes.number,
  colorIndex: _react.PropTypes.string,
  height: _react.PropTypes.number, // only from Chart
  max: _react.PropTypes.number.isRequired,
  min: _react.PropTypes.number.isRequired,
  points: _react.PropTypes.bool,
  reverse: _react.PropTypes.bool,
  smooth: _react.PropTypes.bool,
  values: _react.PropTypes.arrayOf(_react.PropTypes.number).isRequired,
  // type comes from extending the component
  type: _react.PropTypes.oneOf(['area', 'line', 'bar']).isRequired,
  vertical: _react.PropTypes.bool,
  width: _react.PropTypes.number // only from Chart
};
module.exports = exports['default'];