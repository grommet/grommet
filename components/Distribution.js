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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames6 = require('classnames');

var _classnames7 = _interopRequireDefault(_classnames6);

var _KeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Announcer = require('../utils/Announcer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.DISTRIBUTION;
var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;
var BACKGROUND_COLOR_INDEX = _CSSClassnames2.default.BACKGROUND_COLOR_INDEX;

var DEFAULT_WIDTH = 400;
var DEFAULT_HEIGHT = 200;

var SMALL_SIZE = 120;
var THIN_HEIGHT = 72;

var GUTTER_SIZE = 4;

var Distribution = function (_Component) {
  _inherits(Distribution, _Component);

  function Distribution(props, context) {
    _classCallCheck(this, Distribution);

    var _this = _possibleConstructorReturn(this, (Distribution.__proto__ || Object.getPrototypeOf(Distribution)).call(this, props, context));

    _this._onEnter = _this._onEnter.bind(_this);
    _this._onPreviousDistribution = _this._onPreviousDistribution.bind(_this);
    _this._onNextDistribution = _this._onNextDistribution.bind(_this);
    _this._onActivate = _this._onActivate.bind(_this);
    _this._onDeactivate = _this._onDeactivate.bind(_this);
    _this._onResize = _this._onResize.bind(_this);
    _this._layout = _this._layout.bind(_this);
    _this._placeItems = _this._placeItems.bind(_this);

    _this.state = _this._stateFromProps(props);
    _this.state.width = DEFAULT_WIDTH;
    _this.state.height = DEFAULT_HEIGHT;
    _this.state.activeIndex = -1;
    _this.state.mouseActive = false;
    return _this;
  }

  _createClass(Distribution, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._keyboardHandlers = {
        left: this._onPreviousDistribution,
        up: this._onPreviousDistribution,
        right: this._onNextDistribution,
        down: this._onNextDistribution,
        enter: this._onEnter,
        space: this._onEnter
      };
      _KeyboardAccelerators2.default.startListeningToKeyboard(this, this._keyboardHandlers);

      window.addEventListener('resize', this._onResize);
      // delay to allow page layout to settle
      this._resizeTimer = setTimeout(this._layout, 200);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var state = this._stateFromProps(newProps);
      // preserve width and height we calculated already
      state.width = this.state.width;
      state.height = this.state.height;
      state.needLayout = true;
      this.setState(state);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.state.needLayout) {
        this.setState({ needLayout: false, items: undefined }, this._layout);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _KeyboardAccelerators2.default.stopListeningToKeyboard(this, this._keyboardHandlers);

      clearTimeout(this._resizeTimer);
      window.removeEventListener('resize', this._onResize);
    }
  }, {
    key: '_seriesTotal',
    value: function _seriesTotal(series) {
      var total = 0;
      series.some(function (datum) {
        total += datum.value;
      });
      return total;
    }

    // Generates state based on the provided props.

  }, {
    key: '_stateFromProps',
    value: function _stateFromProps(props) {
      var total = void 0;
      var allIcons = false;
      if (props.series) {
        total = this._seriesTotal(props.series);
        allIcons = !props.series.some(function (datum) {
          return !datum.icon;
        });
      } else {
        total = 100;
      }

      return {
        allIcons: allIcons,
        total: total
      };
    }
  }, {
    key: '_boxRect',
    value: function _boxRect(itemRect, width, height) {
      // leave a gutter between items, if we're not at the edge
      var boxRect = _extends({}, itemRect);
      if (0 !== boxRect.x && width > boxRect.x + boxRect.width) {
        boxRect.x += GUTTER_SIZE / 2;
        boxRect.width -= GUTTER_SIZE;
      }
      if (0 !== boxRect.y && height > boxRect.y + boxRect.height) {
        boxRect.y += GUTTER_SIZE / 2;
        boxRect.height -= GUTTER_SIZE;
      }
      boxRect.width -= GUTTER_SIZE;
      boxRect.height -= GUTTER_SIZE;
      // flush the right edge
      if (boxRect.x + boxRect.width > width - 4 * GUTTER_SIZE) {
        boxRect.width = width - boxRect.x;
      }
      // flush the bottom edge
      if (boxRect.y + boxRect.height > height - 4 * GUTTER_SIZE) {
        boxRect.height = height - boxRect.y;
      }
      return boxRect;
    }
  }, {
    key: '_labelRect',
    value: function _labelRect(boxRect) {
      var labelRect = _extends({}, boxRect);
      return labelRect;
    }
  }, {
    key: '_placeItems',
    value: function _placeItems() {
      var width = this.state.width;
      var height = this.state.height;
      var areaPer = width * height / this.state.total;
      var remainingRect = { x: 0, y: 0, width: width, height: height };
      var items = [];
      var series = this.props.series ? this.props.series.slice(0) : [];

      while (series.length > 0) {
        var datum = series.shift();
        if (datum.value <= 0) {
          continue;
        }

        // Now that we know the actual value of the group, give it a
        // rectangle whose area corresponds to the actual group value.
        var itemRect = void 0;
        var boxWidth = Math.round(areaPer * datum.value / remainingRect.height);
        var boxHeight = Math.round(areaPer * datum.value / remainingRect.width);
        if (remainingRect.width - boxWidth >= SMALL_SIZE && remainingRect.width > remainingRect.height) {
          // landscape, lay out left to right
          itemRect = { x: remainingRect.x, y: remainingRect.y,
            width: boxWidth,
            height: remainingRect.height };
          remainingRect.x += itemRect.width;
          remainingRect.width -= itemRect.width;
        } else {
          // portrait, lay out top to bottom
          itemRect = { x: remainingRect.x, y: remainingRect.y,
            width: remainingRect.width,
            height: boxHeight };
          remainingRect.y += itemRect.height;
          remainingRect.height -= itemRect.height;
        }

        var boxRect = this._boxRect(itemRect, width, height);
        var labelRect = this._labelRect(boxRect);

        // Save this so we can render the item's box and label
        // in the correct location.
        items.push({ datum: datum, rect: itemRect,
          boxRect: boxRect, labelRect: labelRect });
      }

      this.setState({ items: items });
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      // debounce
      clearTimeout(this._resizeTimer);
      this._resizeTimer = setTimeout(this._layout, 0);
    }
  }, {
    key: '_layout',
    value: function _layout() {
      var container = this._containerRef;
      var rect = container.getBoundingClientRect();
      var width = Math.round(rect.width);
      var height = Math.round(rect.height);
      if (width !== this.state.width || height !== this.state.height || !this.state.items) {
        this.setState({
          width: width,
          height: height
        }, this._placeItems);
      }
    }
  }, {
    key: '_itemColorIndex',
    value: function _itemColorIndex(item, index) {
      return item.colorIndex || 'graph-' + (index + 1);
    }
  }, {
    key: '_onPreviousDistribution',
    value: function _onPreviousDistribution(event) {
      if (this._distributionRef.contains(document.activeElement)) {
        event.preventDefault();
        if (this.state.activeIndex - 1 >= 0) {
          this._onActivate(this.state.activeIndex - 1);
        }
        //stop event propagation
        return true;
      }
      return false;
    }
  }, {
    key: '_onNextDistribution',
    value: function _onNextDistribution(event) {
      if (this._distributionRef.contains(document.activeElement)) {
        event.preventDefault();
        var totalDistributionCount = _reactDom2.default.findDOMNode(this.distributionItemsRef).childNodes.length;

        if (this.state.activeIndex + 1 < totalDistributionCount) {
          this._onActivate(this.state.activeIndex + 1);
        }
        //stop event propagation
        return true;
      }
      return false;
    }
  }, {
    key: '_onEnter',
    value: function _onEnter(event) {
      if (this._distributionRef.contains(document.activeElement) && this.activeDistributionRef) {
        var index = this.activeDistributionRef.getAttribute('data-index');

        var activeDistribution = this.props.series.filter(function (item) {
          return item.value > 0;
        })[index];

        //trigger click on active distribution
        if (activeDistribution.onClick) {
          activeDistribution.onClick();
        }
      }
    }
  }, {
    key: '_onActivate',
    value: function _onActivate(index) {
      var _this2 = this;

      var intl = this.context.intl;

      this.setState({ activeIndex: index }, function () {
        var activeMessage = _this2.activeDistributionRef.getAttribute('aria-label');
        var clickable = _this2.state.items[_this2.state.activeIndex].datum.onClick;
        var enterSelectMessage = '(' + _Intl2.default.getMessage(intl, 'Enter Select') + ')';
        (0, _Announcer.announce)(activeMessage + ' ' + (clickable ? enterSelectMessage : ''));
      });
    }
  }, {
    key: '_onDeactivate',
    value: function _onDeactivate() {
      this.setState({ activeIndex: -1 });
    }
  }, {
    key: '_renderItemLabel',
    value: function _renderItemLabel(datum, labelRect, index) {
      var _classnames;

      var _state = this.state,
          activeIndex = _state.activeIndex,
          width = _state.width;

      var labelClasses = (0, _classnames7.default)(CLASS_ROOT + '__label', (_classnames = {}, _defineProperty(_classnames, BACKGROUND_COLOR_INDEX + '-' + this._itemColorIndex(datum, index), !datum.icon), _defineProperty(_classnames, CLASS_ROOT + '__label--icons', datum.icon), _defineProperty(_classnames, CLASS_ROOT + '__label--small', labelRect.width < SMALL_SIZE || labelRect.height < SMALL_SIZE), _defineProperty(_classnames, CLASS_ROOT + '__label--thin', labelRect.height < THIN_HEIGHT), _defineProperty(_classnames, CLASS_ROOT + '__label--active', index === activeIndex), _classnames));

      var value = datum.labelValue !== undefined ? datum.labelValue : datum.value;
      var style = { top: labelRect.y };
      if (index !== activeIndex) {
        style.left = labelRect.x;
        style.maxWidth = labelRect.width;
        style.maxHeight = labelRect.height;
      } else {
        // 4 is to align with styled border width
        if (labelRect.width < SMALL_SIZE && labelRect.x + labelRect.width >= width) {
          style.right = width - (labelRect.x + labelRect.width + 4);
        } else {
          style.left = labelRect.x - 2;
        }
        style.minWidth = labelRect.width + 4;
        style.minHeight = labelRect.height;
      }

      return _react2.default.createElement(
        'div',
        { key: index, className: labelClasses,
          'data-box-index': index, role: 'presentation',
          style: style },
        _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__label-value' },
          value,
          _react2.default.createElement(
            'span',
            { className: CLASS_ROOT + '__label-units' },
            this.props.units
          )
        ),
        _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__label-label' },
          datum.label
        )
      );
    }
  }, {
    key: '_renderItemBox',
    value: function _renderItemBox(boxRect, colorIndex) {
      var boxClasses = (0, _classnames7.default)(CLASS_ROOT + '__item-box', _defineProperty({}, COLOR_INDEX + '-' + colorIndex, colorIndex));

      return _react2.default.createElement('rect', { className: boxClasses, x: boxRect.x, y: boxRect.y,
        width: boxRect.width, height: boxRect.height });
    }
  }, {
    key: '_renderItemIcon',
    value: function _renderItemIcon(icon, itemRect, colorIndex) {
      var iconClasses = (0, _classnames7.default)(CLASS_ROOT + '__item-icons', COLOR_INDEX + '-' + colorIndex);

      var icons = [];
      // fill box with icons
      var iconX = 0;
      var iconY = 0;
      var iconIndex = 1;

      while (iconY < itemRect.height - icon.height) {
        while (iconX < itemRect.width - icon.width) {
          var transform = 'translate(' + (itemRect.x + iconX) + ', ' + (itemRect.y + iconY) + ')';
          icons.push(_react2.default.createElement(
            'g',
            { key: iconIndex, transform: transform },
            icon.svgElement
          ));
          iconX += icon.width;
          iconIndex += 1;
        }
        iconY += icon.height;
        iconX = 0;
      }

      return _react2.default.createElement(
        'g',
        { className: iconClasses },
        icons
      );
    }
  }, {
    key: '_renderItem',
    value: function _renderItem(datum, rect, index) {
      var _this3 = this;

      var units = this.props.units;


      var itemClasses = (0, _classnames7.default)(CLASS_ROOT + '__item', _defineProperty({}, CLASS_ROOT + '__item--clickable', datum.onClick));

      var activeDistributionRef = void 0;
      if (index === this.state.activeIndex) {
        activeDistributionRef = function activeDistributionRef(ref) {
          return _this3.activeDistributionRef = ref;
        };
      }

      var colorIndex = this._itemColorIndex(datum, index);

      var contents = void 0;
      if (datum.icon) {
        contents = this._renderItemIcon(datum.icon, rect, colorIndex);
      } else {
        contents = this._renderItemBox(rect, colorIndex);
      }

      var value = datum.labelValue !== undefined ? datum.labelValue : datum.value;
      var labelMessage = value + ' ' + (units || '') + ' ' + datum.label;

      return _react2.default.createElement(
        'g',
        { key: index, className: itemClasses,
          role: datum.onClick ? 'button' : 'row',
          ref: activeDistributionRef, 'aria-label': labelMessage,
          onFocus: function onFocus() {
            return _this3.setState({ activeIndex: index });
          },
          'data-index': index, onClick: datum.onClick },
        contents
      );
    }
  }, {
    key: '_renderBoxes',
    value: function _renderBoxes() {
      var _this4 = this;

      return this.state.items.map(function (item, index) {
        return _this4._renderItem(item.datum, item.boxRect, index);
      });
    }
  }, {
    key: '_renderLabels',
    value: function _renderLabels() {
      var _this5 = this;

      return this.state.items.map(function (item, index) {
        return _this5._renderItemLabel(item.datum, item.labelRect, index);
      });
    }
  }, {
    key: '_renderLoading',
    value: function _renderLoading() {
      var _state2 = this.state,
          height = _state2.height,
          width = _state2.width;

      var loadingClasses = (0, _classnames7.default)(CLASS_ROOT + '__loading-indicator', COLOR_INDEX + '-loading');
      var loadingHeight = height / 2;
      var loadingWidth = width;
      var commands = 'M0,' + loadingHeight + ' L' + loadingWidth + ',' + loadingHeight;

      return _react2.default.createElement(
        'g',
        { key: 'loading' },
        _react2.default.createElement('path', { stroke: 'none', className: loadingClasses, d: commands })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames4,
          _this6 = this;

      var _props = this.props,
          a11yTitle = _props.a11yTitle,
          className = _props.className,
          full = _props.full,
          size = _props.size,
          vertical = _props.vertical,
          props = _objectWithoutProperties(_props, ['a11yTitle', 'className', 'full', 'size', 'vertical']);

      delete props.series;
      delete props.units;
      var intl = this.context.intl;
      var _state3 = this.state,
          allIcons = _state3.allIcons,
          focus = _state3.focus,
          height = _state3.height,
          items = _state3.items,
          mouseActive = _state3.mouseActive,
          width = _state3.width;

      var classes = (0, _classnames7.default)(CLASS_ROOT, (_classnames4 = {}, _defineProperty(_classnames4, CLASS_ROOT + '--full', full), _defineProperty(_classnames4, CLASS_ROOT + '--icons', allIcons), _defineProperty(_classnames4, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames4, CLASS_ROOT + '--vertical', vertical), _defineProperty(_classnames4, CLASS_ROOT + '--loading', (items || []).length === 0), _classnames4), className);

      var background = void 0;
      if (!allIcons) {
        background = _react2.default.createElement('rect', { className: CLASS_ROOT + '__background', x: 0, y: 0, stroke: 'none',
          width: width, height: height });
      }

      var boxes = [];
      var labels = void 0;
      if (items) {
        boxes = this._renderBoxes();
        labels = this._renderLabels();
      }

      var role = 'group';
      var ariaLabel = a11yTitle || _Intl2.default.getMessage(intl, 'Distribution');
      var navigationHelpMessage = _Intl2.default.getMessage(intl, 'Navigation Help');
      ariaLabel += ' (' + navigationHelpMessage + ')';
      if (boxes.length === 0) {
        boxes.push(this._renderLoading());
        role = 'img';
        ariaLabel = _Intl2.default.getMessage(intl, 'Loading');
      }

      var graphicClasses = (0, _classnames7.default)(CLASS_ROOT + '__graphic', _defineProperty({}, CLASS_ROOT + '__graphic--focus', focus));

      return _react2.default.createElement(
        'div',
        _extends({ ref: function ref(_ref3) {
            return _this6._containerRef = _ref3;
          } }, props, { className: classes }),
        _react2.default.createElement(
          'svg',
          { ref: function ref(_ref) {
              return _this6._distributionRef = _ref;
            },
            className: graphicClasses,
            viewBox: '0 0 ' + this.state.width + ' ' + this.state.height,
            preserveAspectRatio: 'none', tabIndex: '0', role: role,
            'aria-label': ariaLabel,
            onMouseDown: function onMouseDown() {
              return _this6.setState({ mouseActive: true });
            },
            onMouseUp: function onMouseUp() {
              return _this6.setState({ mouseActive: false });
            },
            onFocus: function onFocus() {
              if (mouseActive === false) {
                _this6.setState({ focus: true });
              }
            },
            onBlur: function onBlur() {
              return _this6.setState({
                focus: false
              });
            } },
          background,
          boxes
        ),
        _react2.default.createElement(
          'div',
          { ref: function ref(_ref2) {
              return _this6.distributionItemsRef = _ref2;
            },
            className: CLASS_ROOT + '__labels', role: 'presentation',
            'aria-hidden': true },
          labels
        )
      );
    }
  }]);

  return Distribution;
}(_react.Component);

Distribution.displayName = 'Distribution';
exports.default = Distribution;


Distribution.contextTypes = {
  intl: _propTypes2.default.object
};

Distribution.propTypes = {
  a11yTitle: _propTypes2.default.string,
  full: _propTypes2.default.bool, // deprecated, use size='full'
  series: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    label: _propTypes2.default.node,
    value: _propTypes2.default.number.isRequired,
    colorIndex: _propTypes2.default.string,
    important: _propTypes2.default.bool,
    onClick: _propTypes2.default.func,
    icon: _propTypes2.default.shape({
      width: _propTypes2.default.number,
      height: _propTypes2.default.number,
      svgElement: _propTypes2.default.node
    })
  })),
  size: _propTypes2.default.oneOf(['small', 'medium', 'large', 'full']),
  units: _propTypes2.default.string,
  vertical: _propTypes2.default.bool
};

Distribution.defaultProps = {
  size: 'medium'
};
module.exports = exports['default'];