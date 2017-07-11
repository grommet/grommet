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

var _Intl = require('../../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _KeyboardAccelerators = require('../../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

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

    _this._onRangeMove = _this._onRangeMove.bind(_this);
    _this._onDragFinish = _this._onDragFinish.bind(_this);
    _this._onFocus = _this._onFocus.bind(_this);
    _this._onBlur = _this._onBlur.bind(_this);

    _this.state = {
      mouseActive: false,
      focus: false
    };
    return _this;
  }

  _createClass(Range, [{
    key: '_getRangePosition',
    value: function _getRangePosition(event, source) {
      var _props = this.props,
          active = _props.active,
          count = _props.count,
          vertical = _props.vertical;
      var dragStartIndex = this.state.dragStartIndex;

      var rect = this._rangeRef.getBoundingClientRect();
      // handle touch events
      var position = event;
      if (event.changedTouches && event.changedTouches.length > 0) {
        position = event.changedTouches[0];
      }
      var value = vertical ? position.clientY - rect.top : position.clientX - rect.left;
      // convert value to index
      var total = vertical ? rect.height : rect.width;
      var index = Math.round(value / total * (count - 1));

      // constrain index to keep it within range as needed
      if ('active' === source && dragStartIndex >= 0) {
        if (index > dragStartIndex) {
          // moving right/down
          index = Math.min(dragStartIndex + count - 1 - active.end, index);
        } else if (index < dragStartIndex) {
          // moving up/left
          index = Math.max(dragStartIndex - active.start, index);
        }
      } else if ('start' === source) {
        index = Math.min(active.end, index);
      } else if ('end' === source) {
        index = Math.max(active.start, index);
      }

      return index;
    }
  }, {
    key: '_onDragStart',
    value: function _onDragStart(source) {
      var _this2 = this;

      return function (event) {
        event.stopPropagation(); // so start and end don't trigger range
        var index = _this2._getRangePosition(event, source);
        _this2.setState({
          dragSource: source,
          dragStartIndex: index,
          mouseActive: true
        });
      };
    }
  }, {
    key: '_onDragFinish',
    value: function _onDragFinish(event) {
      var _props2 = this.props,
          active = _props2.active,
          onActive = _props2.onActive,
          count = _props2.count;
      var _state = this.state,
          dragSource = _state.dragSource,
          dragStartIndex = _state.dragStartIndex,
          moved = _state.moved;

      if (moved) {
        var dragEndIndex = this._getRangePosition(event, dragSource);

        if (dragEndIndex < 0) {
          dragEndIndex = 0;
        } else if (dragEndIndex > count) {
          dragEndIndex = count;
        }

        this.setState({
          dragSource: false,
          dragStartIndex: undefined,
          dragEndIndex: undefined,
          mouseActive: false,
          moved: false
        });

        if (onActive) {
          var nextActive = void 0;

          if ('range' === dragSource) {
            nextActive = {
              start: Math.min(dragStartIndex, dragEndIndex),
              end: Math.max(dragStartIndex, dragEndIndex)
            };
          } else if ('active' === dragSource) {
            var delta = dragEndIndex - dragStartIndex;
            nextActive = {
              start: active.start + delta,
              end: active.end + delta
            };
          } else if ('start' === dragSource) {
            nextActive = {
              start: Math.min(dragEndIndex, active.end),
              end: active.end
            };
          } else if ('end' === dragSource) {
            nextActive = {
              start: active.start,
              end: Math.max(dragEndIndex, active.start)
            };
          }

          onActive(nextActive);
        }
      }
    }
  }, {
    key: '_onRangeMove',
    value: function _onRangeMove(event) {
      var _state2 = this.state,
          dragSource = _state2.dragSource,
          dragEndIndex = _state2.dragEndIndex;

      var index = this._getRangePosition(event, dragSource);
      if (index !== dragEndIndex) {
        this.setState({ dragEndIndex: index, moved: true });
      }
    }
  }, {
    key: '_onRangeReduce',
    value: function _onRangeReduce(source) {
      var _props3 = this.props,
          active = _props3.active,
          onActive = _props3.onActive;

      if (onActive) {
        var nextActive = void 0;
        if ('start' === source) {
          nextActive = {
            start: Math.min(active.start - 1, active.end),
            end: active.end
          };
        } else {
          nextActive = {
            start: active.start,
            end: Math.max(active.end - 1, active.start)
          };
        }
        onActive(nextActive);
      }
    }
  }, {
    key: '_onRangeIncrease',
    value: function _onRangeIncrease(source) {
      var _props4 = this.props,
          active = _props4.active,
          onActive = _props4.onActive;

      if (onActive) {
        var nextActive = void 0;
        if ('start' === source) {
          nextActive = {
            start: Math.min(active.start + 1, active.end),
            end: active.end
          };
        } else {
          nextActive = {
            start: active.start,
            end: Math.max(active.end + 1, active.start)
          };
        }
        onActive(nextActive);
      }
    }
  }, {
    key: '_onFocus',
    value: function _onFocus(source) {
      var _this3 = this;

      return function (event) {
        var onFocus = _this3.props.onFocus;
        var mouseActive = _this3.state.mouseActive;

        if (mouseActive === false) {
          _this3.setState({ focus: true });
        }
        _this3._keyboardHandlers = {
          left: _this3._onRangeReduce.bind(_this3, source),
          up: _this3._onRangeReduce.bind(_this3, source),
          right: _this3._onRangeIncrease.bind(_this3, source),
          down: _this3._onRangeIncrease.bind(_this3, source)
        };
        _KeyboardAccelerators2.default.startListeningToKeyboard(_this3, _this3._keyboardHandlers);
        if (onFocus) {
          onFocus(event);
        }
      };
    }
  }, {
    key: '_onBlur',
    value: function _onBlur(event) {
      var onBlur = this.props.onBlur;

      _KeyboardAccelerators2.default.stopListeningToKeyboard(this, this._keyboardHandlers);
      this.setState({ focus: false });
      if (onBlur) {
        onBlur(event);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames,
          _this4 = this;

      var _props5 = this.props,
          active = _props5.active,
          className = _props5.className,
          count = _props5.count,
          onActive = _props5.onActive,
          vertical = _props5.vertical,
          props = _objectWithoutProperties(_props5, ['active', 'className', 'count', 'onActive', 'vertical']);

      var _state3 = this.state,
          focus = _state3.focus,
          dragSource = _state3.dragSource,
          dragStartIndex = _state3.dragStartIndex,
          dragEndIndex = _state3.dragEndIndex;
      var intl = this.context.intl;


      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--vertical', vertical), _defineProperty(_classnames, CLASS_ROOT + '--dragging', dragSource), _classnames), className);

      var layers = void 0;
      if (active || dragSource) {

        var start = void 0,
            end = void 0;
        if ('range' === dragSource) {
          start = Math.min(dragStartIndex, dragEndIndex);
          end = Math.max(dragStartIndex, dragEndIndex);
        } else if ('active' === dragSource && dragEndIndex >= 0) {
          var delta = dragEndIndex - dragStartIndex;
          start = active.start + delta;
          end = active.end + delta;
        } else if ('start' === dragSource && dragEndIndex >= 0) {
          start = Math.min(dragEndIndex, active.end);
          end = active.end;
        } else if ('end' === dragSource && dragEndIndex >= 0) {
          start = active.start;
          end = Math.max(dragEndIndex, active.start);
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
        if (focus && this.rangeStartRef.contains(document.activeElement)) {
          startClasses.push(CLASS_ROOT + '__start--focus');
        }
        if (beforePercent < 5) {
          startClasses.push(CLASS_ROOT + '__start--edge');
        }
        var beforeClasses = [CLASS_ROOT + '__before'];
        if (beforePercent > 95) {
          beforeClasses.push(CLASS_ROOT + '__before--end');
        }
        var endClasses = [CLASS_ROOT + '__end'];
        if (focus && this.rangeEndRef.contains(document.activeElement)) {
          endClasses.push(CLASS_ROOT + '__end--focus');
        }
        if (afterPercent < 5) {
          endClasses.push(CLASS_ROOT + '__end--edge');
        }

        var navigationHelp = _Intl2.default.getMessage(intl, 'Navigation Help');
        var rangeStartMessage = _Intl2.default.getMessage(intl, 'Range Start');
        var rangeEndMessage = _Intl2.default.getMessage(intl, 'Range End');

        layers = [_react2.default.createElement(
          'div',
          { key: 'before', className: beforeClasses.join(' '),
            style: { flexBasis: beforeBasis } },
          _react2.default.createElement(
            'div',
            {
              ref: function ref(_ref) {
                return _this4.rangeStartRef = _ref;
              },
              className: startClasses.join(' '),
              tabIndex: '0',
              role: 'slider',
              'aria-label': rangeStartMessage + ' (' + navigationHelp + ')',
              'aria-valuemin': '0',
              'aria-valuemax': count,
              'aria-valuenow': start,
              'aria-orientation': vertical ? 'vertical' : 'horizontal',
              onMouseDown: this._onDragStart('start'),
              onTouchStart: this._onDragStart('start'),
              onMouseUp: this._onDragFinish,
              onTouchEnd: this._onDragFinish,
              onFocus: this._onFocus('start'),
              onBlur: this._onBlur },
            _react2.default.createElement(_Drag2.default, null)
          )
        ), _react2.default.createElement('div', _extends({ key: 'active' }, props, { className: CLASS_ROOT + '__active',
          onMouseDown: this._onDragStart('active'),
          onTouchStart: this._onDragStart('active'),
          onMouseUp: this._onDragFinish,
          onTouchEnd: this._onDragFinish })), _react2.default.createElement(
          'div',
          { key: 'after', className: CLASS_ROOT + '__after',
            style: { flexBasis: afterBasis } },
          _react2.default.createElement(
            'div',
            {
              ref: function ref(_ref2) {
                return _this4.rangeEndRef = _ref2;
              },
              className: endClasses.join(' '),
              tabIndex: '0',
              'aria-label': rangeEndMessage + ' (' + navigationHelp + ')',
              'aria-valuemin': '0',
              'aria-valuemax': count,
              'aria-valuenow': end,
              'aria-orientation': vertical ? 'vertical' : 'horizontal',
              role: 'slider',
              onMouseDown: this._onDragStart('end'),
              onTouchStart: this._onDragStart('end'),
              onMouseUp: this._onDragFinish,
              onTouchEnd: this._onDragFinish,
              onFocus: this._onFocus('end'),
              onBlur: this._onBlur },
            _react2.default.createElement(_Drag2.default, null)
          )
        )];
      }

      var onRangeMove = void 0;
      if (onActive && dragSource) {
        onRangeMove = this._onRangeMove;
      }

      return _react2.default.createElement(
        'div',
        { ref: function ref(_ref3) {
            return _this4._rangeRef = _ref3;
          }, className: classes,
          onMouseMove: onRangeMove,
          onTouchMove: onRangeMove,
          onMouseDown: this._onDragStart('range'),
          onTouchStart: this._onDragStart('range'),
          onMouseUp: this._onDragFinish,
          onTouchEnd: this._onDragFinish },
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

Range.contextTypes = {
  intl: _propTypes2.default.object
};
module.exports = exports['default'];