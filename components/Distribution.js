'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Legend = require('./Legend');

var _Legend2 = _interopRequireDefault(_Legend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "distribution";

var DEFAULT_WIDTH = 400;
var DEFAULT_HEIGHT = 200;

var SMALL_HEIGHT = 120;
var XSMALL_HEIGHT = 60;
var THIN_HEIGHT = 72;

var Distribution = (function (_Component) {
  _inherits(Distribution, _Component);

  function Distribution(props) {
    _classCallCheck(this, Distribution);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Distribution).call(this));

    _this._onResize = _this._onResize.bind(_this);
    _this._layout = _this._layout.bind(_this);
    // this._onActive = this._onActive.bind(this);

    _this.state = _this._stateFromProps(props);
    _this.state.legendPosition = 'bottom';
    _this.state.width = DEFAULT_WIDTH;
    _this.state.height = DEFAULT_HEIGHT;
    return _this;
  }

  _createClass(Distribution, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._initialTimer = setTimeout(this._initialTimeout, 10);
      window.addEventListener('resize', this._onResize);
      this._onResize();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var state = this._stateFromProps(newProps);
      state.width = this.state.width;
      state.height = this.state.height;
      this.setState(state);
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
      // legendPosition based on available window orientation
      var ratio = window.innerWidth / window.innerHeight;
      if (ratio < 0.8) {
        this.setState({ legendPosition: 'bottom' });
      } else if (ratio > 1.2) {
        this.setState({ legendPosition: 'right' });
      }

      var graphic = this.refs.graphic;
      var rect = graphic.getBoundingClientRect();
      if (rect.width !== this.state.width || rect.height !== this.state.height) {
        this.setState({
          width: rect.width,
          height: rect.height
        });
      }

      // adjust box label positions
      var container = this.refs.container;
      var labels = container.querySelectorAll('.distribution__label');
      for (var i = 0; i < labels.length; i += 1) {
        var label = labels[i];
        label.style.top = null;
        label.style.left = null;
        label.style.maxWidth = null;
        var boxIndex = label.getAttribute('data-box-index');
        var box = container.querySelectorAll('[data-index="' + boxIndex + '"]')[0];
        var boxRect = box.getBoundingClientRect();
        // var labelRect = label.getBoundingClientRect();
        label.style.left = boxRect.left - rect.left + 'px';
        label.style.top = boxRect.top - rect.top + 'px';
        // if (labelRect.width > boxRect.width) {
        //   label.style.left = (boxRect.left  - rect.left) + 'px';
        // } else {
        //   label.style.left = ((boxRect.left - rect.left) + (boxRect.width / 2) - (labelRect.width / 2)) + 'px';
        // }
        label.style.maxWidth = boxRect.width + 'px';
        label.style.maxHeight = boxRect.height + 'px';
        // have to set again after setting maxWidth in case text wraps and increases height
        // labelRect = label.getBoundingClientRect();
        // label.style.top = ((boxRect.top - rect.top) + (boxRect.height / 2) - (labelRect.height / 2)) + 'px';
      }
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
      var total;
      if (props.series) {
        total = this._seriesTotal(props.series);
      } else {
        total = 100;
      }

      // normalize size
      var size = props.size || (props.small ? 'small' : props.large ? 'large' : null);

      var state = {
        total: total,
        size: size
      };

      return state;
    }
  }, {
    key: '_itemColorIndex',
    value: function _itemColorIndex(item, index) {
      return item.colorIndex || 'graph-' + (index + 1);
    }
  }, {
    key: '_renderLegend',
    value: function _renderLegend() {
      return _react2.default.createElement(_Legend2.default, { className: CLASS_ROOT + "__legend",
        series: this.props.series,
        units: this.props.units,
        activeIndex: this.state.activeIndex,
        onActive: this._onActive });
    }
  }, {
    key: '_renderItem',
    value: function _renderItem(item, index, placement, labels) {
      var boxClasses = [CLASS_ROOT + "__box"];
      var iconClasses = [CLASS_ROOT + "__icons"];
      var labelClasses = [CLASS_ROOT + "__label"];
      var colorIndex = this._itemColorIndex(item, index);
      boxClasses.push("color-index-" + colorIndex);
      iconClasses.push("color-index-" + colorIndex);
      var x = placement.origin[0];
      var y = placement.origin[1];
      var width, height;
      if (placement.across) {
        width = this.state.width - x;
        height = placement.areaPer * item.value / width;
        placement.across = false;
        placement.origin[1] += height;
      } else {
        height = this.state.height - y;
        width = placement.areaPer * item.value / height;
        placement.across = true;
        placement.origin[0] += width;
      }

      var text = '' + item.value;
      if (this.props.units) {
        text += ' ' + this.props.units;
      }
      if (item.label) {
        text += ' ' + item.label;
      }

      var contents;
      if (item.icon) {
        placement.icons = true;
        labelClasses.push(CLASS_ROOT + "__label--icons");
        var icons = [];
        // fill box with icons
        var iconX = 0;
        var iconY = 0;
        var iconIndex = 1;
        while (iconY < height - item.icon.height) {
          while (iconX < width - item.icon.width) {
            icons.push(_react2.default.createElement(
              'g',
              { key: iconIndex,
                transform: "translate(" + (x + iconX) + "," + (y + iconY) + ")" },
              item.icon.svgElement
            ));
            iconX += item.icon.width;
            iconIndex += 1;
          }
          iconY += item.icon.height;
          iconX = 0;
        }
        contents = _react2.default.createElement(
          'g',
          { className: iconClasses.join(' ') },
          icons
        );
      } else {
        contents = _react2.default.createElement('rect', { className: boxClasses.join(' '),
          x: x, y: y, width: width, height: height });
      }

      if (width < XSMALL_HEIGHT || height < XSMALL_HEIGHT) {
        labelClasses.push(CLASS_ROOT + "__label--xsmall");
      } else if (width < SMALL_HEIGHT || height < SMALL_HEIGHT) {
        labelClasses.push(CLASS_ROOT + "__label--small");
      }

      if (height < THIN_HEIGHT) {
        labelClasses.push(CLASS_ROOT + "__label--thin");
      }

      labels.push(_react2.default.createElement(
        'div',
        { key: index, className: labelClasses.join(' '), 'data-box-index': index },
        _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + "__label-value" },
          item.value,
          _react2.default.createElement(
            'span',
            { className: CLASS_ROOT + "__label-units" },
            this.props.units
          )
        ),
        _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + "__label-label" },
          item.label
        )
      ));

      return _react2.default.createElement(
        'g',
        { key: index, 'data-index': index, onClick: item.onClick },
        contents
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      classes.push(CLASS_ROOT + "--legend-" + this.state.legendPosition);
      if (this.state.size) {
        classes.push(CLASS_ROOT + "--" + this.state.size);
      }
      if (this.props.vertical) {
        classes.push(CLASS_ROOT + "--vertical");
      }
      if (!this.props.series || this.props.series.length === 0) {
        classes.push(CLASS_ROOT + "--loading");
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var legend = null;
      if (this.props.legend) {
        legend = this._renderLegend();
      }

      var boxes = [];
      var labels = [];
      if (this.props.series) {
        var placement = {
          areaPer: this.state.width * this.state.height / this.state.total,
          origin: [0, 0],
          across: false,
          icons: false
        };
        boxes = this.props.series.filter(function (item) {
          return item.value > 0;
        }).map(function (item, index) {
          return this._renderItem(item, index, placement, labels);
        }, this);

        if (placement.icons) {
          classes.push(CLASS_ROOT + "--icons");
        }
      }

      if (boxes.length === 0) {
        classes.push(CLASS_ROOT + "--loading");
        var loadingClasses = [CLASS_ROOT + "__loading-indicator"];
        loadingClasses.push("color-index-loading");
        var commands = "M0," + this.state.height / 2 + " L" + this.state.width + "," + this.state.height / 2;
        boxes.push(_react2.default.createElement(
          'g',
          { key: 'loading' },
          _react2.default.createElement('path', { stroke: 'none', className: loadingClasses.join(' '), d: commands })
        ));
      }

      return _react2.default.createElement(
        'div',
        { ref: 'container', className: classes.join(' ') },
        _react2.default.createElement(
          'svg',
          { ref: 'graphic', className: CLASS_ROOT + "__graphic",
            viewBox: "0 0 " + this.state.width + " " + this.state.height,
            preserveAspectRatio: 'none' },
          boxes
        ),
        labels,
        legend
      );
    }
  }]);

  return Distribution;
})(_react.Component);

exports.default = Distribution;

Distribution.propTypes = {
  large: _react.PropTypes.bool,
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
  small: _react.PropTypes.bool,
  units: _react.PropTypes.string,
  vertical: _react.PropTypes.bool
};
module.exports = exports['default'];