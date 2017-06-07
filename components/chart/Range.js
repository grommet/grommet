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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Drag = require('../icons/base/Drag');

var _Drag2 = _interopRequireDefault(_Drag);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.CHART_RANGE;

// Allows selecting a region.
// Click to select one.
// Press and Drag to select multiple.
// Drag edges to adjust.

var Range = function (_Component) {
  _inherits(Range, _Component);

  function Range(props, context) {
    _classCallCheck(this, Range);

    var _this = _possibleConstructorReturn(this, (Range.__proto__ || Object.getPrototypeOf(Range)).call(this, props, context));

    _this._onMouseMove = _this._onMouseMove.bind(_this);
    _this._onMouseUp = _this._onMouseUp.bind(_this);
    _this.state = {};
    return _this;
  }

  _createClass(Range, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var mouseDownSource = this.state.mouseDownSource;

      if (mouseDownSource) {
        window.removeEventListener('mouseup', this._onMouseUp);
      }
    }
  }, {
    key: '_mouseIndex',
    value: function _mouseIndex(event, source) {
      var _props = this.props,
          active = _props.active,
          count = _props.count,
          vertical = _props.vertical;
      var mouseDownIndex = this.state.mouseDownIndex;

      var rect = this._rangeRef.getBoundingClientRect();
      var value = vertical ? event.clientY - rect.top : event.clientX - rect.left;
      // convert value to index
      var total = vertical ? rect.height : rect.width;
      var index = Math.round(value / total * (count - 1));

      // constrain index to keep it within range as needed
      if ('active' === source && mouseDownIndex >= 0) {
        if (index > mouseDownIndex) {
          // moving right/down
          index = Math.min(mouseDownIndex + count - 1 - active.end, index);
        } else if (index < mouseDownIndex) {
          // moving up/left
          index = Math.max(mouseDownIndex - active.start, index);
        }
      } else if ('start' === source) {
        index = Math.min(active.end, index);
      } else if ('end' === source) {
        index = Math.max(active.start, index);
      }

      return index;
    }
  }, {
    key: '_mouseDown',
    value: function _mouseDown(source) {
      var _this2 = this;

      return function (event) {
        event.stopPropagation(); // so start and end don't trigger range
        var index = _this2._mouseIndex(event, source);
        _this2.setState({
          mouseDownSource: source,
          mouseDownIndex: index
        });
        window.addEventListener('mouseup', _this2._onMouseUp);
      };
    }
  }, {
    key: '_onMouseUp',
    value: function _onMouseUp(event) {
      window.removeEventListener('mouseup', this._onMouseUp);
      var _props2 = this.props,
          active = _props2.active,
          onActive = _props2.onActive,
          count = _props2.count;
      var _state = this.state,
          mouseDownSource = _state.mouseDownSource,
          mouseDownIndex = _state.mouseDownIndex,
          moved = _state.moved;

      var mouseUpIndex = this._mouseIndex(event, mouseDownSource);

      if (mouseUpIndex < 0) {
        mouseUpIndex = 0;
      } else if (mouseUpIndex > count) {
        mouseUpIndex = count;
      }

      this.setState({
        mouseDownSource: false,
        mouseDownIndex: undefined,
        mouseMoveIndex: undefined,
        moved: false
      });

      if (onActive) {
        var nextActive = void 0;

        if ('range' === mouseDownSource) {
          if (moved) {
            nextActive = {
              start: Math.min(mouseDownIndex, mouseUpIndex),
              end: Math.max(mouseDownIndex, mouseUpIndex)
            };
          }
        } else if ('active' === mouseDownSource) {
          var delta = mouseUpIndex - mouseDownIndex;
          nextActive = {
            start: active.start + delta,
            end: active.end + delta
          };
        } else if ('start' === mouseDownSource) {
          nextActive = {
            start: Math.min(mouseUpIndex, active.end),
            end: active.end
          };
        } else if ('end' === mouseDownSource) {
          nextActive = {
            start: active.start,
            end: Math.max(mouseUpIndex, active.start)
          };
        }

        onActive(nextActive);
      }
    }
  }, {
    key: '_onMouseMove',
    value: function _onMouseMove(event) {
      var _state2 = this.state,
          mouseDownSource = _state2.mouseDownSource,
          mouseMoveIndex = _state2.mouseMoveIndex;

      var index = this._mouseIndex(event, mouseDownSource);
      if (index !== mouseMoveIndex) {
        this.setState({ mouseMoveIndex: index, moved: true });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames,
          _this3 = this;

      var _props3 = this.props,
          active = _props3.active,
          className = _props3.className,
          count = _props3.count,
          onActive = _props3.onActive,
          vertical = _props3.vertical,
          props = _objectWithoutProperties(_props3, ['active', 'className', 'count', 'onActive', 'vertical']);

      var _state3 = this.state,
          mouseDownSource = _state3.mouseDownSource,
          mouseDownIndex = _state3.mouseDownIndex,
          mouseMoveIndex = _state3.mouseMoveIndex;


      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--vertical', vertical), _defineProperty(_classnames, CLASS_ROOT + '--dragging', mouseDownSource), _classnames), className);

      var layers = void 0;
      if (active || mouseDownSource) {

        var start = void 0,
            end = void 0;
        if ('range' === mouseDownSource) {
          start = Math.min(mouseDownIndex, mouseMoveIndex);
          end = Math.max(mouseDownIndex, mouseMoveIndex);
        } else if ('active' === mouseDownSource && mouseMoveIndex >= 0) {
          var delta = mouseMoveIndex - mouseDownIndex;
          start = active.start + delta;
          end = active.end + delta;
        } else if ('start' === mouseDownSource && mouseMoveIndex >= 0) {
          start = Math.min(mouseMoveIndex, active.end);
          end = active.end;
        } else if ('end' === mouseDownSource && mouseMoveIndex >= 0) {
          start = active.start;
          end = Math.max(mouseMoveIndex, active.start);
        } else {
          start = active.start;
          end = active.end;
        }
        // in case the user resizes the window
        start = Math.max(0, Math.min(count - 1, start));
        end = Math.max(0, Math.min(count - 1, end));
        // calculate flex basis
        var beforePercent = Math.max(0, 100 / (count - 1) * Math.min(start, count - 1));
        var beforeOffset = beforePercent * (_utils.padding * 2) / 100;
        var beforeBasis = 'calc(' + beforePercent + '% - ' + beforeOffset + 'px)';
        var afterPercent = Math.min(100, 100 / (count - 1) * Math.max(count - 1 - end, 0));
        var afterOffset = afterPercent * (_utils.padding * 2) / 100;
        var afterBasis = 'calc(' + afterPercent + '% - ' + afterOffset + 'px)';

        // We need a class when on the edge so we can keep the control visible.
        var startClasses = [CLASS_ROOT + '__start'];
        if (beforePercent < 5) {
          startClasses.push(CLASS_ROOT + '__start--edge');
        }
        var beforeClasses = [CLASS_ROOT + '__before'];
        if (beforePercent > 95) {
          beforeClasses.push(CLASS_ROOT + '__before--end');
        }
        var endClasses = [CLASS_ROOT + '__end'];
        if (afterPercent < 5) {
          endClasses.push(CLASS_ROOT + '__end--edge');
        }

        layers = [_react2.default.createElement(
          'div',
          { key: 'before', className: beforeClasses.join(' '),
            style: { flexBasis: beforeBasis } },
          _react2.default.createElement(
            'div',
            { className: startClasses.join(' '),
              onMouseDown: onActive ? this._mouseDown('start') : undefined },
            _react2.default.createElement(_Drag2.default, null)
          )
        ), _react2.default.createElement('div', _extends({ key: 'active' }, props, { className: CLASS_ROOT + '__active',
          onMouseDown: this._mouseDown('active') })), _react2.default.createElement(
          'div',
          { key: 'after', className: CLASS_ROOT + '__after',
            style: { flexBasis: afterBasis } },
          _react2.default.createElement(
            'div',
            { className: endClasses.join(' '),
              onMouseDown: onActive ? this._mouseDown('end') : undefined },
            _react2.default.createElement(_Drag2.default, null)
          )
        )];
      }

      var onMouseMove = void 0;
      if (onActive && mouseDownSource) {
        onMouseMove = this._onMouseMove;
      }

      return _react2.default.createElement(
        'div',
        { ref: function ref(_ref) {
            return _this3._rangeRef = _ref;
          }, className: classes,
          onMouseMove: onMouseMove,
          onMouseDown: onActive ? this._mouseDown('range') : undefined },
        layers
      );
    }
  }]);

  return Range;
}(_react.Component);

Range.displayName = 'Range';
exports.default = Range;


Range.propTypes = {
  active: _propTypes2.default.shape({
    end: _propTypes2.default.number.isRequired,
    start: _propTypes2.default.number.isRequired
  }),
  count: _propTypes2.default.number.isRequired,
  onActive: _propTypes2.default.func, // (start, end)
  vertical: _propTypes2.default.bool
};
module.exports = exports['default'];