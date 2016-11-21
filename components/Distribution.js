'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var CLASS_ROOT = _CSSClassnames2.default.DISTRIBUTION; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

var DEFAULT_WIDTH = 400;
var DEFAULT_HEIGHT = 200;

var SMALL_SIZE = 120;
var THIN_HEIGHT = 72;

var GUTTER_SIZE = 4;
// We pad the labels here instead of CSS to keep the DOM simple for handling
// text overflow.
var LABEL_PAD_VERTICAL = 6;
var LABEL_PAD_HORIZONTAL = 12;

var Distribution = function (_Component) {
  (0, _inherits3.default)(Distribution, _Component);

  function Distribution(props, context) {
    (0, _classCallCheck3.default)(this, Distribution);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Distribution.__proto__ || (0, _getPrototypeOf2.default)(Distribution)).call(this, props, context));

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
    _this.state.activeIndex = 0;
    _this.state.mouseActive = false;
    return _this;
  }

  (0, _createClass3.default)(Distribution, [{
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
      this._onResize();
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
      var boxRect = (0, _extends3.default)({}, itemRect);
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
      if (boxRect.x + boxRect.width > width - 2 * GUTTER_SIZE) {
        boxRect.width = width - boxRect.x;
      }
      // flush the bottom edge
      if (boxRect.y + boxRect.height > height - 2 * GUTTER_SIZE) {
        boxRect.height = height - boxRect.y;
      }
      return boxRect;
    }
  }, {
    key: '_labelRect',
    value: function _labelRect(boxRect) {
      // pad the labels here to keep the DOM simple w.r.t overflow text
      var labelRect = (0, _extends3.default)({}, boxRect);
      labelRect.x += LABEL_PAD_HORIZONTAL;
      labelRect.width -= LABEL_PAD_HORIZONTAL * 2;
      labelRect.y += LABEL_PAD_VERTICAL;
      labelRect.height -= LABEL_PAD_VERTICAL * 2;
      return labelRect;
    }
  }, {
    key: '_placeItems',
    value: function _placeItems() {
      var _this2 = this;

      var width = this.state.width;
      var height = this.state.height;
      var areaPer = width * height / this.state.total;
      var remainingRect = { x: 0, y: 0, width: width, height: height };
      var items = [];
      var series = this.props.series ? this.props.series.slice(0) : [];

      var _loop = function _loop() {
        var datum = series.shift();
        if (datum.value <= 0) {
          return 'continue';
        }

        // Start a new group.
        var groupValue = datum.value;
        var targetGroupValue = void 0;

        // Make the first item as square as possible.
        var itemArea = areaPer * datum.value;
        var edgeLength = Math.round(Math.sqrt(itemArea));
        var itemHeight = void 0;
        var itemWidth = void 0;

        // Figure out how much value we can fit inside a rectangle
        // that takes the full minor axis length
        if (remainingRect.width > remainingRect.height) {
          // landscape, lay out left to right
          itemHeight = Math.min(remainingRect.height, edgeLength);
          itemWidth = Math.round(itemArea / itemHeight);
          targetGroupValue = Math.round(itemWidth * remainingRect.height / areaPer);
        } else {
          // portrait, lay out top to bottom
          itemWidth = Math.min(remainingRect.width, edgeLength);
          itemHeight = Math.round(itemArea / itemWidth);
          targetGroupValue = Math.round(itemHeight * remainingRect.width / areaPer);
        }

        // Group items until we reach the target group value.
        var group = [datum];
        while (groupValue < targetGroupValue && series.length > 0) {
          var datum2 = series.shift();
          groupValue += datum2.value;
          group.push(datum2);
        }

        // Now that we know the actual value of the group, give it a
        // rectangle whose area corresponds to the actual group value.
        var groupRect = void 0;
        if (remainingRect.width > remainingRect.height) {
          // landscape, lay out left to right
          groupRect = { x: remainingRect.x, y: remainingRect.y,
            width: Math.round(areaPer * groupValue / remainingRect.height),
            height: remainingRect.height };
          remainingRect.x += groupRect.width;
          remainingRect.width -= groupRect.width;
        } else {
          // portrait, lay out top to bottom
          groupRect = { x: remainingRect.x, y: remainingRect.y,
            width: remainingRect.width,
            height: Math.round(areaPer * groupValue / remainingRect.width) };
          remainingRect.y += groupRect.height;
          remainingRect.height -= groupRect.height;
        }

        // Place items within the group rectangle.
        // We take the full minor axis length and as much major axis length
        // as needed to match the item's area.
        group.forEach(function (datum) {
          var itemRect = void 0;
          if (groupRect.width > groupRect.height) {
            // landscape, use full height
            itemRect = { x: groupRect.x, y: groupRect.y,
              width: Math.round(areaPer * datum.value / groupRect.height),
              height: groupRect.height };
            groupRect.x += itemRect.width;
            groupRect.width -= itemRect.width;
          } else {
            // portrait, use full width
            itemRect = { x: groupRect.x, y: groupRect.y,
              width: groupRect.width,
              height: Math.round(areaPer * datum.value / groupRect.width) };
            groupRect.y += itemRect.height;
            groupRect.height -= itemRect.height;
          }

          var boxRect = _this2._boxRect(itemRect, width, height);
          var labelRect = _this2._labelRect(boxRect);

          // Save this so we can render the item's box and label
          // in the correct location.

          items.push({ datum: datum, rect: itemRect,
            boxRect: boxRect, labelRect: labelRect });
        });
      };

      while (series.length > 0) {
        var _ret = _loop();

        if (_ret === 'continue') continue;
      }

      this.setState({ items: items });
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
      event.preventDefault();
      if (this._distributionRef.contains(document.activeElement)) {
        if (this.state.activeIndex - 1 >= 0) {
          this._onActivate(this.state.activeIndex - 1);
        }
      }
      //stop event propagation
      return true;
    }
  }, {
    key: '_onNextDistribution',
    value: function _onNextDistribution(event) {
      event.preventDefault();
      if (this._distributionRef.contains(document.activeElement)) {
        var totalDistributionCount = _reactDom2.default.findDOMNode(this.distributionItemsRef).childNodes.length;

        if (this.state.activeIndex + 1 < totalDistributionCount) {
          this._onActivate(this.state.activeIndex + 1);
        }
      }
      //stop event propagation
      return true;
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
      var _this3 = this;

      var intl = this.context.intl;

      this.setState({ activeIndex: index }, function () {
        var activeMessage = _this3.activeDistributionRef.getAttribute('aria-label');
        var clickable = _this3.state.items[_this3.state.activeIndex].datum.onClick;
        var enterSelectMessage = '(' + _Intl2.default.getMessage(intl, 'Enter Select') + ')';
        (0, _Announcer.announce)(activeMessage + ' ' + (clickable ? enterSelectMessage : ''));
      });
    }
  }, {
    key: '_onDeactivate',
    value: function _onDeactivate() {
      this.setState({ activeIndex: 0 });
    }
  }, {
    key: '_renderItemLabel',
    value: function _renderItemLabel(datum, labelRect, index) {
      var _classnames;

      var activeIndex = this.state.activeIndex;

      var labelClasses = (0, _classnames7.default)(CLASS_ROOT + '__label', (_classnames = {}, (0, _defineProperty3.default)(_classnames, COLOR_INDEX + '-' + this._itemColorIndex(datum, index), !datum.icon), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__label--icons', datum.icon), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__label--small', labelRect.width < SMALL_SIZE || labelRect.height < SMALL_SIZE), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__label--thin', labelRect.height < THIN_HEIGHT), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__label--active', index === activeIndex), _classnames));

      var value = datum.labelValue !== undefined ? datum.labelValue : datum.value;

      return _react2.default.createElement(
        'div',
        { key: index, className: labelClasses,
          'data-box-index': index, role: 'presentation',
          style: { top: labelRect.y, left: labelRect.x, maxWidth: labelRect.width,
            maxHeight: labelRect.height } },
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
      var boxClasses = (0, _classnames7.default)(CLASS_ROOT + '__item-box', (0, _defineProperty3.default)({}, COLOR_INDEX + '-' + colorIndex, colorIndex));

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
      var _this4 = this;

      var units = this.props.units;


      var itemClasses = (0, _classnames7.default)(CLASS_ROOT + '__item', (0, _defineProperty3.default)({}, CLASS_ROOT + '__item--clickable', datum.onClick));

      var activeDistributionRef = void 0;
      if (index === this.state.activeIndex) {
        activeDistributionRef = function activeDistributionRef(ref) {
          return _this4.activeDistributionRef = ref;
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
          onMouseOver: this._onActivate.bind(this, index),
          onMouseLeave: this._onDeactivate, tabIndex: '-1',
          role: datum.onClick ? 'button' : 'row',
          ref: activeDistributionRef, 'aria-label': labelMessage,
          onFocus: function onFocus() {
            return _this4.setState({ activeIndex: index });
          },
          'data-index': index, onClick: datum.onClick },
        contents
      );
    }
  }, {
    key: '_renderBoxes',
    value: function _renderBoxes() {
      var _this5 = this;

      return this.state.items.map(function (item, index) {
        return _this5._renderItem(item.datum, item.boxRect, index);
      });
    }
  }, {
    key: '_renderLabels',
    value: function _renderLabels() {
      var _this6 = this;

      return this.state.items.map(function (item, index) {
        return _this6._renderItemLabel(item.datum, item.labelRect, index);
      });
    }
  }, {
    key: '_renderLoading',
    value: function _renderLoading() {
      var _state = this.state,
          height = _state.height,
          width = _state.width;

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
          _this7 = this;

      var _props = this.props,
          a11yTitle = _props.a11yTitle,
          className = _props.className,
          full = _props.full,
          size = _props.size,
          vertical = _props.vertical,
          props = (0, _objectWithoutProperties3.default)(_props, ['a11yTitle', 'className', 'full', 'size', 'vertical']);

      delete props.series;
      delete props.units;
      var intl = this.context.intl;
      var _state2 = this.state,
          allIcons = _state2.allIcons,
          focus = _state2.focus,
          height = _state2.height,
          items = _state2.items,
          mouseActive = _state2.mouseActive,
          width = _state2.width;

      var classes = (0, _classnames7.default)(CLASS_ROOT, (_classnames4 = {}, (0, _defineProperty3.default)(_classnames4, CLASS_ROOT + '--full', full), (0, _defineProperty3.default)(_classnames4, CLASS_ROOT + '--icons', allIcons), (0, _defineProperty3.default)(_classnames4, CLASS_ROOT + '--' + size, size), (0, _defineProperty3.default)(_classnames4, CLASS_ROOT + '--vertical', vertical), (0, _defineProperty3.default)(_classnames4, CLASS_ROOT + '--loading', (items || []).length === 0), _classnames4), className);

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

      var graphicClasses = (0, _classnames7.default)(CLASS_ROOT + '__graphic', (0, _defineProperty3.default)({}, CLASS_ROOT + '__graphic--focus', focus));

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ ref: function ref(_ref3) {
            return _this7._containerRef = _ref3;
          } }, props, { className: classes }),
        _react2.default.createElement(
          'svg',
          { ref: function ref(_ref) {
              return _this7._distributionRef = _ref;
            },
            className: graphicClasses,
            viewBox: '0 0 ' + this.state.width + ' ' + this.state.height,
            preserveAspectRatio: 'none', tabIndex: '0', role: role,
            'aria-label': ariaLabel,
            onMouseDown: function onMouseDown() {
              return _this7.setState({ mouseActive: true });
            },
            onMouseUp: function onMouseUp() {
              return _this7.setState({ mouseActive: false });
            },
            onFocus: function onFocus() {
              if (mouseActive === false) {
                _this7.setState({ focus: true });
              }
            },
            onBlur: function onBlur() {
              return _this7.setState({
                focus: false
              });
            } },
          background,
          boxes
        ),
        _react2.default.createElement(
          'div',
          { ref: function ref(_ref2) {
              return _this7.distributionItemsRef = _ref2;
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
  intl: _react.PropTypes.object
};

Distribution.propTypes = {
  a11yTitle: _react.PropTypes.string,
  full: _react.PropTypes.bool, // deprecated, use size='full'
  series: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.node,
    value: _react.PropTypes.number.isRequired,
    colorIndex: _react.PropTypes.string,
    important: _react.PropTypes.bool,
    onClick: _react.PropTypes.func,
    icon: _react.PropTypes.shape({
      width: _react.PropTypes.number,
      height: _react.PropTypes.number,
      svgElement: _react.PropTypes.node
    })
  })),
  size: _react.PropTypes.oneOf(['small', 'medium', 'large', 'full']),
  units: _react.PropTypes.string,
  vertical: _react.PropTypes.bool
};

Distribution.defaultProps = {
  size: 'medium'
};
module.exports = exports['default'];