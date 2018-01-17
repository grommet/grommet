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

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Intl = require('../../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.CHART_GRAPH;
var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

var Graph = function (_Component) {
  _inherits(Graph, _Component);

  function Graph(props, context) {
    _classCallCheck(this, Graph);

    var _this = _possibleConstructorReturn(this, (Graph.__proto__ || Object.getPrototypeOf(Graph)).call(this, props, context));

    _this._renderA11YTitle = _this._renderA11YTitle.bind(_this);
    return _this;
  }

  // Determines what the appropriate control coordinates are on
  // either side of the coordinate at the specified index.
  // This calculation is a simplified smoothing function that
  // just looks at whether the line through this coordinate is
  // ascending, descending or not. Peaks, valleys, and flats are
  // treated the same.


  _createClass(Graph, [{
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
      var _props = this.props,
          a11yTitle = _props.a11yTitle,
          max = _props.max,
          min = _props.min,
          type = _props.type,
          values = _props.values;
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
        highest: Math.max.apply(Math, _toConsumableArray(definedValues)).toString(),
        smallest: Math.min.apply(Math, _toConsumableArray(definedValues)).toString()
      });

      return typeLabel + ' ' + minLabel + ' ' + maxLabel + '. ' + valueLabel;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          activeIndex = _props2.activeIndex,
          className = _props2.className,
          colorIndex = _props2.colorIndex,
          max = _props2.max,
          min = _props2.min,
          reverse = _props2.reverse,
          smooth = _props2.smooth,
          type = _props2.type,
          values = _props2.values,
          vertical = _props2.vertical,
          width = _props2.width,
          height = _props2.height,
          props = _objectWithoutProperties(_props2, ['activeIndex', 'className', 'colorIndex', 'max', 'min', 'reverse', 'smooth', 'type', 'values', 'vertical', 'width', 'height']);

      delete props.points;
      var pad = Math.min(width, height) < _utils.padding * 6 ? 2 : _utils.padding;

      var classes = (0, _classnames4.default)(CLASS_ROOT, CLASS_ROOT + '--' + type, _defineProperty({}, CLASS_ROOT + '--vertical', vertical), COLOR_INDEX + '-' + (colorIndex || 'graph-1'), className);

      var scale = 1;
      var step = void 0;
      if (vertical) {
        if (max - min > 0) {
          scale = (width - 2 * pad) / (max - min);
        }
        if (values.length <= 1) {
          step = height - 2 * pad;
        } else {
          step = (height - 2 * pad) / (values.length - 1);
        }
      } else {
        if (max - min > 0) {
          scale = (height - 2 * pad) / (max - min);
        }
        if (values.length <= 1) {
          step = width - 2 * pad;
        } else {
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
            var _classes = (0, _classnames4.default)(CLASS_ROOT + '__point', COLOR_INDEX + '-' + (colorIndex || 'graph-1'), _defineProperty({}, CLASS_ROOT + '__point--active', index === activeIndex));
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
      if (coordinates.length > 0) {
        var pathProps = {};
        var commands = void 0;

        // Build the commands for this set of coordinates.

        if ('area' === type || 'line' === type) {

          if (smooth) {
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

        path = _react2.default.createElement('path', _extends({}, pathProps, { d: commands }));
      }

      return _react2.default.createElement(
        'svg',
        _extends({ ref: function ref(_ref) {
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


Graph.contextTypes = {
  intl: _propTypes2.default.object
};

Graph.defaultProps = {
  min: 0,
  max: 100
};

Graph.propTypes = {
  a11yTitle: _propTypes2.default.string,
  activeIndex: _propTypes2.default.number,
  colorIndex: _propTypes2.default.string,
  height: _propTypes2.default.number, // only from Chart
  max: _propTypes2.default.number.isRequired,
  min: _propTypes2.default.number.isRequired,
  points: _propTypes2.default.bool,
  reverse: _propTypes2.default.bool,
  smooth: _propTypes2.default.bool,
  values: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,
  // type comes from extending the component
  type: _propTypes2.default.oneOf(['area', 'line', 'bar']).isRequired,
  vertical: _propTypes2.default.bool,
  width: _propTypes2.default.number // only from Chart
};
module.exports = exports['default'];