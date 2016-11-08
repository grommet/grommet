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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Drag = require('../icons/base/Drag');

var _Drag2 = _interopRequireDefault(_Drag);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.CHART_RANGE;

// Allows selecting a region.
// Click to select one.
// Press and Drag to select multiple.
// Drag edges to adjust.

// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

var Range = function (_Component) {
  (0, _inherits3.default)(Range, _Component);

  function Range(props, context) {
    (0, _classCallCheck3.default)(this, Range);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Range.__proto__ || (0, _getPrototypeOf2.default)(Range)).call(this, props, context));

    _this._onMouseMove = _this._onMouseMove.bind(_this);
    _this._onMouseUp = _this._onMouseUp.bind(_this);
    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(Range, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var mouseDown = this.state.mouseDown;

      if (mouseDown) {
        window.removeEventListener('mouseup', this._onMouseUp);
      }
    }
  }, {
    key: '_valueToIndex',
    value: function _valueToIndex(value) {
      var _props = this.props,
          count = _props.count,
          vertical = _props.vertical;

      var rect = this.rangeRef.getBoundingClientRect();
      var total = vertical ? rect.height : rect.width;
      return Math.round(value / total * (count - 1));
    }
  }, {
    key: '_percentForIndex',
    value: function _percentForIndex(index) {
      var count = this.props.count;

      return 100 / (count - 1) * Math.min(index, count - 1);
    }
  }, {
    key: '_mouseIndex',
    value: function _mouseIndex(event) {
      var _props2 = this.props,
          active = _props2.active,
          count = _props2.count,
          vertical = _props2.vertical;
      var _state = this.state,
          mouseDown = _state.mouseDown,
          mouseDownIndex = _state.mouseDownIndex;

      var rect = this.rangeRef.getBoundingClientRect();
      var value = vertical ? event.clientY - rect.top : event.clientX - rect.left;
      var index = this._valueToIndex(value);

      // constrain index to keep it within range as needed
      if ('active' === mouseDown && mouseDownIndex >= 0) {
        if (index > mouseDownIndex) {
          // moving right/down
          index = Math.min(mouseDownIndex + count - 1 - active.end, index);
        } else if (index < mouseDownIndex) {
          // moving up/left
          index = Math.max(mouseDownIndex - active.start, index);
        }
      } else if ('start' === mouseDown) {
        index = Math.min(active.end, index);
      } else if ('end' === mouseDown) {
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
        var index = _this2._mouseIndex(event);
        _this2.setState({
          mouseDown: source,
          mouseDownIndex: index
        });
        window.addEventListener('mouseup', _this2._onMouseUp);
      };
    }
  }, {
    key: '_onMouseUp',
    value: function _onMouseUp(event) {
      window.removeEventListener('mouseup', this._onMouseUp);
      var _props3 = this.props,
          active = _props3.active,
          onActive = _props3.onActive,
          count = _props3.count;
      var _state2 = this.state,
          mouseDown = _state2.mouseDown,
          mouseDownIndex = _state2.mouseDownIndex,
          moved = _state2.moved;

      var mouseUpIndex = this._mouseIndex(event);

      if (mouseUpIndex < 0) {
        mouseUpIndex = 0;
      } else if (mouseUpIndex > count) {
        mouseUpIndex = count;
      }

      this.setState({
        mouseDown: false,
        mouseDownIndex: undefined,
        mouseMoveIndex: undefined,
        moved: false
      });

      if (onActive) {
        var nextActive = void 0;

        if ('range' === mouseDown) {
          if (moved) {
            nextActive = {
              start: Math.min(mouseDownIndex, mouseUpIndex),
              end: Math.max(mouseDownIndex, mouseUpIndex)
            };
          }
        } else if ('active' === mouseDown) {
          var delta = mouseUpIndex - mouseDownIndex;
          nextActive = {
            start: active.start + delta,
            end: active.end + delta
          };
        } else if ('start' === mouseDown) {
          nextActive = {
            start: mouseUpIndex,
            end: active.end
          };
        } else if ('end' === mouseDown) {
          nextActive = {
            start: active.start,
            end: mouseUpIndex
          };
        }

        onActive(nextActive);
      }
    }
  }, {
    key: '_onMouseMove',
    value: function _onMouseMove(event) {
      var mouseMoveIndex = this.state.mouseMoveIndex;

      var index = this._mouseIndex(event);
      if (index !== mouseMoveIndex) {
        this.setState({ mouseMoveIndex: index, moved: true });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames,
          _this3 = this;

      var _props4 = this.props,
          active = _props4.active,
          className = _props4.className,
          count = _props4.count,
          onActive = _props4.onActive,
          vertical = _props4.vertical,
          props = (0, _objectWithoutProperties3.default)(_props4, ['active', 'className', 'count', 'onActive', 'vertical']);
      var _state3 = this.state,
          mouseDown = _state3.mouseDown,
          mouseDownIndex = _state3.mouseDownIndex,
          mouseMoveIndex = _state3.mouseMoveIndex;


      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--vertical', vertical), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--dragging', mouseDown), _classnames), className);

      var indicator = void 0;
      if (active || mouseDown) {

        var start = void 0,
            end = void 0;
        if ('range' === mouseDown) {
          start = Math.min(mouseDownIndex, mouseMoveIndex);
          end = Math.max(mouseDownIndex, mouseMoveIndex);
        } else if ('active' === mouseDown && mouseMoveIndex >= 0) {
          var delta = mouseMoveIndex - mouseDownIndex;
          start = active.start + delta;
          end = active.end + delta;
        } else if ('start' === mouseDown && mouseMoveIndex >= 0) {
          start = mouseMoveIndex;
          end = active.end;
        } else if ('end' === mouseDown && mouseMoveIndex >= 0) {
          start = active.start;
          end = mouseMoveIndex;
        } else {
          start = active.start;
          end = active.end;
        }
        // in case the user resizes the window
        start = Math.max(0, Math.min(count - 1, start));
        end = Math.max(0, Math.min(count - 1, end));

        var style = void 0;
        if (vertical) {
          style = {
            top: this._percentForIndex(start) + '%',
            height: this._percentForIndex(end - start) + '%'
          };
        } else {
          style = {
            marginLeft: this._percentForIndex(start) + '%',
            width: this._percentForIndex(end - start) + '%'
          };
        }

        indicator = _react2.default.createElement(
          'div',
          (0, _extends3.default)({}, props, { className: CLASS_ROOT + '__active', style: style,
            onMouseDown: this._mouseDown('active') }),
          _react2.default.createElement(
            'div',
            { className: CLASS_ROOT + '__active-start',
              onMouseDown: onActive ? this._mouseDown('start') : undefined },
            _react2.default.createElement(_Drag2.default, null)
          ),
          _react2.default.createElement(
            'div',
            { className: CLASS_ROOT + '__active-end',
              onMouseDown: onActive ? this._mouseDown('end') : undefined },
            _react2.default.createElement(_Drag2.default, null)
          )
        );
      }

      var onMouseMove = void 0;
      if (onActive && mouseDown) {
        onMouseMove = this._onMouseMove;
      }

      return _react2.default.createElement(
        'div',
        { ref: function ref(_ref) {
            return _this3.rangeRef = _ref;
          }, className: classes,
          style: { padding: _utils.padding }, onMouseMove: onMouseMove,
          onMouseDown: onActive ? this._mouseDown('range') : undefined },
        indicator
      );
    }
  }]);
  return Range;
}(_react.Component);

Range.displayName = 'Range';
exports.default = Range;
;

Range.propTypes = {
  active: _react.PropTypes.shape({
    end: _react.PropTypes.number.isRequired,
    start: _react.PropTypes.number.isRequired
  }),
  count: _react.PropTypes.number.isRequired,
  onActive: _react.PropTypes.func, // (start, end)
  vertical: _react.PropTypes.bool
};
module.exports = exports['default'];