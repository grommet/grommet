// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');
var Legend = require('./Legend');

var CLASS_ROOT = "distribution";

var DEFAULT_WIDTH = 400;
var DEFAULT_HEIGHT = 200;

var Distribution = React.createClass({
  displayName: 'Distribution',

  propTypes: {
    large: React.PropTypes.bool,
    legend: React.PropTypes.bool,
    legendTotal: React.PropTypes.bool,
    series: React.PropTypes.arrayOf(React.PropTypes.shape({
      label: React.PropTypes.string,
      value: React.PropTypes.number.isRequired,
      colorIndex: React.PropTypes.string,
      important: React.PropTypes.bool,
      onClick: React.PropTypes.func,
      icon: React.PropTypes.shape({
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        svgElement: React.PropTypes.node
      })
    })),
    size: React.PropTypes.oneOf(['small', 'medium', 'large']),
    small: React.PropTypes.bool,
    units: React.PropTypes.string,
    vertical: React.PropTypes.bool
  },

  getInitialState: function getInitialState() {
    var state = this._stateFromProps(this.props);
    state.legendPosition = 'bottom';
    state.width = DEFAULT_WIDTH;
    state.height = DEFAULT_HEIGHT;
    return state;
  },

  componentDidMount: function componentDidMount() {
    this._initialTimer = setTimeout(this._initialTimeout, 10);
    window.addEventListener('resize', this._onResize);
    this._onResize();
  },

  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    var state = this._stateFromProps(newProps);
    state.width = this.state.width;
    state.height = this.state.height;
    this.setState(state);
    this._onResize();
  },

  componentWillUnmount: function componentWillUnmount() {
    clearTimeout(this._resizeTimer);
    window.removeEventListener('resize', this._onResize);
  },

  _onResize: function _onResize() {
    // debounce
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(this._layout, 50);
  },

  _layout: function _layout() {
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
      var boxIndex = label.getAttribute('data-box-index');
      var box = container.querySelectorAll('[data-index="' + boxIndex + '"]')[0];
      var boxRect = box.getBoundingClientRect();
      var labelRect = label.getBoundingClientRect();
      label.style.top = boxRect.top - rect.top + boxRect.height / 2 - labelRect.height / 2 + 'px';
      label.style.left = boxRect.left - rect.left + boxRect.width / 2 - labelRect.width / 2 + 'px';
    }
  },

  _seriesTotal: function _seriesTotal(series) {
    var total = 0;
    series.some(function (item) {
      total += item.value;
    });
    return total;
  },

  // Generates state based on the provided props.
  _stateFromProps: function _stateFromProps(props) {
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
  },

  _itemColorIndex: function _itemColorIndex(item, index) {
    return item.colorIndex || 'graph-' + (index + 1);
  },

  _renderLegend: function _renderLegend() {
    return React.createElement(Legend, { className: CLASS_ROOT + "__legend",
      series: this.props.series,
      units: this.props.units,
      activeIndex: this.state.activeIndex,
      onActive: this._onActive });
  },

  render: function render() {
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
      var areaPer = this.state.width * this.state.height / this.state.total;
      var origin = [0, 0];
      var across = false;
      boxes = this.props.series.filter(function (item) {
        return item.value > 0;
      }).map(function (item, index) {
        var boxClasses = [CLASS_ROOT + "__box"];
        var iconClasses = [CLASS_ROOT + "__icons"];
        var labelClasses = [CLASS_ROOT + "__label"];
        var colorIndex = this._itemColorIndex(item, index);
        boxClasses.push("color-index-" + colorIndex);
        iconClasses.push("color-index-" + colorIndex);
        var x = origin[0];
        var y = origin[1];
        var width, height;
        if (across) {
          width = this.state.width - x;
          height = areaPer * item.value / width;
          across = false;
          origin[1] += height;
        } else {
          height = this.state.height - y;
          width = areaPer * item.value / height;
          across = true;
          origin[0] += width;
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
          labelClasses.push(CLASS_ROOT + "__label--icons");
          var icons = [];
          // fill box with icons
          var iconX = 0;
          var iconY = 0;
          var iconIndex = 1;
          while (iconY < height - item.icon.height) {
            while (iconX < width - item.icon.width) {
              icons.push(React.createElement(
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
          contents = React.createElement(
            'g',
            { className: iconClasses.join(' ') },
            icons
          );
        } else {
          contents = React.createElement('rect', { className: boxClasses.join(' '),
            x: x, y: y, width: width, height: height });
        }

        if (width < 144 || height < 144) {
          labelClasses.push(CLASS_ROOT + "__label--small");
        }

        labels.push(React.createElement(
          'div',
          { key: index, className: labelClasses.join(' '), 'data-box-index': index },
          React.createElement(
            'span',
            { className: CLASS_ROOT + "__label-value" },
            item.value,
            React.createElement(
              'span',
              { className: CLASS_ROOT + "__label-units" },
              this.props.units
            )
          ),
          React.createElement(
            'span',
            { className: CLASS_ROOT + "__label-label", y: 24 },
            item.label
          )
        ));

        return React.createElement(
          'g',
          { key: index, 'data-index': index, onClick: item.onClick },
          contents
        );
      }, this);
    }

    if (boxes.length === 0) {
      classes.push(CLASS_ROOT + "--loading");
      var loadingClasses = [CLASS_ROOT + "__loading-indicator"];
      loadingClasses.push("color-index-loading");
      var commands = "M0," + this.state.height / 2 + " L" + this.state.width + "," + this.state.height / 2;
      boxes.push(React.createElement(
        'g',
        { key: 'loading' },
        React.createElement('path', { stroke: 'none', className: loadingClasses.join(' '), d: commands })
      ));
    }

    return React.createElement(
      'div',
      { ref: 'container', className: classes.join(' ') },
      React.createElement(
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

});

module.exports = Distribution;