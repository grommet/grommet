'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Legend = require('./Legend');

var _Legend2 = _interopRequireDefault(_Legend);

var _KeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "distribution";

var DEFAULT_WIDTH = 400;
var DEFAULT_HEIGHT = 200;

var SMALL_SIZE = 120;
var THIN_HEIGHT = 72;

var GUTTER_SIZE = 4;

var Distribution = (function (_Component) {
  _inherits(Distribution, _Component);

  function Distribution(props) {
    _classCallCheck(this, Distribution);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Distribution).call(this));

    _this._onEnter = _this._onEnter.bind(_this);
    _this._onPreviousDistribution = _this._onPreviousDistribution.bind(_this);
    _this._onNextDistribution = _this._onNextDistribution.bind(_this);
    _this._onActivate = _this._onActivate.bind(_this);
    _this._onDeactivate = _this._onDeactivate.bind(_this);
    _this._onResize = _this._onResize.bind(_this);
    _this._layout = _this._layout.bind(_this);
    _this._groupItems = _this._groupItems.bind(_this);

    _this.state = _this._stateFromProps(props);
    _this.state.legendPosition = 'bottom';
    _this.state.width = DEFAULT_WIDTH;
    _this.state.height = DEFAULT_HEIGHT;
    _this.state.activeIndex = 0;
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
      this._onResize();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var state = this._stateFromProps(newProps);
      // preserve width and height we calculated already
      state.width = this.state.width;
      state.height = this.state.height;
      this.setState(state, this._layout);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._placeLabels();
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
      series.some(function (item) {
        total += item.value;
      });
      return total;
    }

    // Generates state based on the provided props.

  }, {
    key: '_stateFromProps',
    value: function _stateFromProps(props) {
      var total = undefined;
      var allIcons = false;
      if (props.series) {
        total = this._seriesTotal(props.series);
        allIcons = !props.series.some(function (item) {
          return !item.icon;
        });
      } else {
        total = 100;
      }

      return {
        allIcons: allIcons,
        groups: null,
        total: total
      };
    }
  }, {
    key: '_groupItems',
    value: function _groupItems() {
      // group items to enable us to lay them out better
      var width = this.state.width;
      var height = this.state.height;
      var areaPer = width * height / this.state.total;
      var groups = [];
      var group = undefined;
      var targetValue = undefined;
      var elapsedWidth = 0;
      (this.props.series || []).filter(function (item) {
        return item.value > 0;
      }).forEach(function (item) {
        if (!group || group.value >= targetValue) {
          if (group) {
            elapsedWidth += Math.round(areaPer * group.value / height);
          }
          group = { items: [], value: 0 };
          groups.push(group);

          // make the item as square as possible, without exceeding the height
          var itemArea = areaPer * item.value;
          var itemHeight = Math.min(height, Math.round(Math.sqrt(itemArea)));
          var itemWidth = Math.round(itemArea / itemHeight);
          // avoid slivers on the right
          if (width - elapsedWidth - itemWidth < height / 2) {
            itemWidth = width - elapsedWidth;
          }
          targetValue = Math.round(itemWidth * height / areaPer);
        }
        group.items.push(item);
        group.value += item.value;
      });
      this.setState({ groups: groups });
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
      // legendPosition based on available window orientation
      var ratio = window.innerWidth / window.innerHeight;
      if (ratio < 0.8) {
        this.setState({ legendPosition: 'bottom' });
      } else if (ratio > 1.2) {
        this.setState({ legendPosition: 'right' });
      }

      var graphic = this.refs.distribution;
      var rect = graphic.getBoundingClientRect();
      if (rect.width !== this.state.width || rect.height !== this.state.height || !this.state.groups) {
        this.setState({
          width: rect.width,
          height: rect.height
        }, this._groupItems);
      }
    }
  }, {
    key: '_placeLabels',
    value: function _placeLabels() {
      // Align labels over their corresponding boxes
      var graphic = this.refs.distribution;
      var rect = graphic.getBoundingClientRect();
      var container = this.refs.container;
      var labels = container.querySelectorAll('.' + CLASS_ROOT + '__label');
      for (var i = 0; i < labels.length; i += 1) {
        var label = labels[i];
        label.style.top = undefined;
        label.style.left = undefined;
        label.style.maxWidth = undefined;
        var boxIndex = label.getAttribute('data-box-index');
        var box = container.querySelectorAll('[data-index="' + boxIndex + '"]')[0];
        var boxRect = box.getBoundingClientRect();
        // let labelRect = label.getBoundingClientRect();
        label.style.left = boxRect.left - rect.left + 'px';
        label.style.top = boxRect.top - rect.top + 'px';
        label.style.maxWidth = boxRect.width + 'px';
        label.style.maxHeight = boxRect.height + 'px';
      }
    }
  }, {
    key: '_itemColorIndex',
    value: function _itemColorIndex(item, index) {
      return item.colorIndex || 'graph-' + (index + 1);
    }
  }, {
    key: '_onPreviousDistribution',
    value: function _onPreviousDistribution(e) {
      e.preventDefault();
      if (document.activeElement === this.refs.distribution) {
        var totalDistributionCount = _reactDom2.default.findDOMNode(this.refs.distributionItems).childNodes.length;

        if (this.state.activeIndex - 1 < 0) {
          this._onActivate(totalDistributionCount - 1);
        } else {
          this._onActivate(this.state.activeIndex - 1);
        }
      }
    }
  }, {
    key: '_onNextDistribution',
    value: function _onNextDistribution(e) {
      e.preventDefault();
      if (document.activeElement === this.refs.distribution) {
        var totalDistributionCount = _reactDom2.default.findDOMNode(this.refs.distributionItems).childNodes.length;

        if (this.state.activeIndex + 1 >= totalDistributionCount) {
          this._onActivate(0);
        } else {
          this._onActivate(this.state.activeIndex + 1);
        }
      }
    }
  }, {
    key: '_onEnter',
    value: function _onEnter(event) {
      if (document.activeElement === this.refs.distribution) {
        if (this.refs.activeDistribution) {
          var index = this.refs.activeDistribution.getAttribute('data-index');

          var activeDistribution = this.props.series.filter(function (item) {
            return item.value > 0;
          })[index];

          //trigger click on active distribution
          if (activeDistribution.onClick) {
            activeDistribution.onClick();
          }
        }
      }
    }
  }, {
    key: '_onActivate',
    value: function _onActivate(index) {
      this.setState({ activeIndex: index });
    }
  }, {
    key: '_onDeactivate',
    value: function _onDeactivate() {
      this.setState({ activeIndex: 0 });
    }
  }, {
    key: '_renderLegend',
    value: function _renderLegend() {
      return _react2.default.createElement(_Legend2.default, { className: CLASS_ROOT + "__legend",
        series: this.props.series,
        units: this.props.units,
        activeIndex: this.state.activeIndex,
        onActive: this._onActivate });
    }
  }, {
    key: '_renderLabel',
    value: function _renderLabel(item, index, boundingBox) {
      var labelClasses = [CLASS_ROOT + '__label'];
      if (!item.icon) {
        labelClasses.push('color-index-' + this._itemColorIndex(item, index));
      }
      if (item.icon) {
        labelClasses.push(CLASS_ROOT + '__label--icons');
      }
      if (boundingBox.width < SMALL_SIZE || boundingBox.height < SMALL_SIZE) {
        labelClasses.push(CLASS_ROOT + '__label--small');
      }
      if (boundingBox.height < THIN_HEIGHT) {
        labelClasses.push(CLASS_ROOT + '__label--thin');
      }

      if (index === this.state.activeIndex) {
        labelClasses.push(CLASS_ROOT + '__label--active');
      }

      var value = item.labelValue !== undefined ? item.labelValue : item.value;

      return _react2.default.createElement(
        'div',
        { key: index, className: labelClasses.join(' '),
          'data-box-index': index, role: 'tab',
          id: this.props.a11yTitleId + '_item_' + index },
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
          item.label
        )
      );
    }
  }, {
    key: '_updateItemPlacement',
    value: function _updateItemPlacement(item, placement) {
      var result = {
        x: placement.group.x + placement.item.x,
        y: placement.group.y + placement.item.y
      };
      if (placement.across) {
        result.width = placement.group.width - placement.item.x;
        result.height = placement.areaPer * item.value / result.width;
        placement.item.y += result.height;
        placement.across = result.width < (placement.group.height - placement.item.y) * 1.5;
      } else {
        result.height = placement.group.height - placement.item.y;
        result.width = placement.areaPer * item.value / result.height;
        placement.item.x += result.width;
        placement.across = result.height > (placement.group.width - placement.item.x) * 1.5;
      }
      return result;
    }
  }, {
    key: '_renderItemBox',
    value: function _renderItemBox(boundingBox, colorIndex) {
      var boxClasses = [CLASS_ROOT + '__item-box'];
      if (colorIndex) {
        boxClasses.push('color-index-' + colorIndex);
      }

      return _react2.default.createElement('rect', { className: boxClasses.join(' '),
        x: boundingBox.x + GUTTER_SIZE / 2,
        y: boundingBox.y + GUTTER_SIZE / 2,
        width: boundingBox.width - GUTTER_SIZE,
        height: boundingBox.height - GUTTER_SIZE });
    }
  }, {
    key: '_renderItemIcon',
    value: function _renderItemIcon(item, boundingBox, colorIndex) {
      var iconClasses = [CLASS_ROOT + '__item-icons'];
      iconClasses.push('color-index-' + colorIndex);

      var icons = [];
      // fill box with icons
      var iconX = 0;
      var iconY = 0;
      var iconIndex = 1;

      while (iconY < boundingBox.height - item.icon.height) {
        while (iconX < boundingBox.width - item.icon.width) {
          var transform = 'translate(' + (boundingBox.x + iconX) + ', ' + (boundingBox.y + iconY) + ')';
          icons.push(_react2.default.createElement(
            'g',
            { key: iconIndex, transform: transform },
            item.icon.svgElement
          ));
          iconX += item.icon.width;
          iconIndex += 1;
        }
        iconY += item.icon.height;
        iconX = 0;
      }

      return _react2.default.createElement(
        'g',
        { className: iconClasses.join(' ') },
        icons
      );
    }
  }, {
    key: '_renderItem',
    value: function _renderItem(item, index, boundingBox) {
      var itemClass = CLASS_ROOT + '__item';
      var itemClasses = [itemClass];

      if (item.onClick) {
        itemClasses.push(itemClass + '--clickable');
      }

      var activeDistribution = undefined;
      if (index === this.state.activeIndex) {
        activeDistribution = 'activeDistribution';
      }

      var colorIndex = this._itemColorIndex(item, index);

      var contents = undefined;
      if (item.icon) {
        contents = this._renderItemIcon(item, boundingBox, colorIndex);
      } else {
        contents = this._renderItemBox(boundingBox, colorIndex);
      }

      return _react2.default.createElement(
        'g',
        { key: index, className: itemClasses.join(' '),
          onMouseOver: this._onActivate.bind(this, index),
          onMouseLeave: this._onDeactivate,
          ref: activeDistribution, role: 'presentation',
          'data-index': index, onClick: item.onClick },
        contents
      );
    }
  }, {
    key: '_renderItems',
    value: function _renderItems() {
      var placement = {
        areaPer: this.state.width * this.state.height / this.state.total,
        group: { x: 0, y: 0, width: 0, height: 0
        },
        item: { x: 0, y: 0 },
        across: false,
        icons: false
      };
      var index = 0;

      var labels = [];
      var boxes = this.state.groups.map(function (group) {

        placement.group.x = placement.group.x + placement.group.width;
        placement.group.y = 0;
        placement.group.width = placement.areaPer * group.value / this.state.height;
        placement.group.height = this.state.height;
        placement.item = { x: 0, y: 0 };
        placement.across = true;

        return group.items.map(function (item) {
          var boundingBox = this._updateItemPlacement(item, placement);
          labels.push(this._renderLabel(item, index, boundingBox));
          var result = this._renderItem(item, index, boundingBox);
          index += 1;
          return result;
        }, this);
      }, this);

      return { boxes: boxes, labels: labels };
    }
  }, {
    key: '_renderLoading',
    value: function _renderLoading() {
      var loadingClasses = [CLASS_ROOT + '__loading-indicator'];
      loadingClasses.push("color-index-loading");
      var loadingHeight = this.state.height / 2;
      var loadingWidth = this.state.width;
      var commands = 'M0,' + loadingHeight + ' L' + loadingWidth + ',' + loadingHeight;

      return _react2.default.createElement(
        'g',
        { key: 'loading' },
        _react2.default.createElement('path', { stroke: 'none', className: loadingClasses.join(' '), d: commands })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      classes.push(CLASS_ROOT + '--legend-' + this.state.legendPosition);
      if (this.props.size) {
        classes.push(CLASS_ROOT + '--' + this.props.size);
      }
      if (this.props.full) {
        classes.push(CLASS_ROOT + '--full');
      }
      if (this.props.vertical) {
        classes.push(CLASS_ROOT + '--vertical');
      }
      if (this.state.allIcons) {
        classes.push(CLASS_ROOT + '--icons');
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var legend = undefined;
      if (this.props.legend) {
        legend = this._renderLegend();
      }

      var background = undefined;
      if (!this.state.allIcons) {
        background = _react2.default.createElement('rect', { className: CLASS_ROOT + '__background', x: 0, y: 0, stroke: 'none',
          width: this.state.width, height: this.state.height });
      }

      var boxes = [];
      var labels = undefined;
      if (this.props.series && this.state.groups) {
        var items = this._renderItems();
        boxes = items.boxes;
        labels = items.labels;
        // if (placement.smallLabel) {
        //   classes.push(`${CLASS_ROOT}--small-label`);
        // }
      }

      var role = 'tablist';
      var a11yTitle = this.props.a11yTitle || _Intl2.default.getMessage(this.context.intl, 'Distribution');

      if (boxes.length === 0) {
        classes.push(CLASS_ROOT + '--loading');
        boxes.push(this._renderLoading());
        role = 'img';
        a11yTitle = _Intl2.default.getMessage(this.context.intl, 'Loading');
      }

      var activeDescendant = undefined;
      if (this.state.activeIndex >= 0) {
        activeDescendant = this.props.a11yTitleId + '_item_' + this.state.activeIndex;
      }

      var a11yTitleNode = _react2.default.createElement(
        'title',
        { id: this.props.a11yTitleId },
        a11yTitle
      );

      var a11yDescNode = undefined;
      if (this.props.a11yDesc) {
        a11yDescNode = _react2.default.createElement(
          'desc',
          { id: this.props.a11yDescId },
          this.props.a11yDesc
        );
      }

      return _react2.default.createElement(
        'div',
        { ref: 'container', className: classes.join(' ') },
        _react2.default.createElement(
          'svg',
          { ref: 'distribution', className: CLASS_ROOT + '__graphic',
            viewBox: '0 0 ' + this.state.width + ' ' + this.state.height,
            preserveAspectRatio: 'none', tabIndex: '0', role: role,
            'aria-activedescendant': activeDescendant,
            'aria-labelledby': this.props.a11yTitleId + ' ' + this.props.a11yDescId },
          background,
          a11yTitleNode,
          a11yDescNode,
          boxes
        ),
        _react2.default.createElement(
          'div',
          { ref: 'distributionItems' },
          labels
        ),
        legend
      );
    }
  }]);

  return Distribution;
})(_react.Component);

exports.default = Distribution;

Distribution.contextTypes = {
  intl: _react.PropTypes.object
};

Distribution.propTypes = {
  a11yTitle: _react.PropTypes.string,
  a11yTitleId: _react.PropTypes.string,
  a11yDescId: _react.PropTypes.string,
  a11yDesc: _react.PropTypes.string,
  full: _react.PropTypes.bool,
  legend: _react.PropTypes.bool,
  legendTotal: _react.PropTypes.bool,
  series: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string,
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
  size: _react.PropTypes.oneOf(['small', 'medium', 'large']),
  units: _react.PropTypes.string,
  vertical: _react.PropTypes.bool
};

Distribution.defaultProps = {
  a11yTitleId: 'distribution-title',
  a11yDescId: 'distribution-desc'
};
module.exports = exports['default'];