// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Legend from './Legend';

const CLASS_ROOT = "distribution";

const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 200;

const SMALL_HEIGHT = 120;
const THIN_HEIGHT = 72;

class Distribution extends Component {

  constructor(props) {
    super();

    this._onResize = this._onResize.bind(this);
    this._layout = this._layout.bind(this);
    // this._onActive = this._onActive.bind(this);

    this.state = this._stateFromProps(props);
    this.state.legendPosition = 'bottom';
    this.state.width = DEFAULT_WIDTH;
    this.state.height = DEFAULT_HEIGHT;
  }

  componentDidMount () {
    this._initialTimer = setTimeout(this._initialTimeout, 10);
    window.addEventListener('resize', this._onResize);
    this._onResize();
  }

  componentWillReceiveProps (newProps) {
    var state = this._stateFromProps(newProps);
    state.width = this.state.width;
    state.height = this.state.height;
    this.setState(state);
    this._onResize();
  }

  componentWillUnmount () {
    clearTimeout(this._resizeTimer);
    window.removeEventListener('resize', this._onResize);
  }

  _onResize () {
    // debounce
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(this._layout, 50);
  }

  _layout () {
    // legendPosition based on available window orientation
    var ratio = window.innerWidth / window.innerHeight;
    if (ratio < 0.8) {
      this.setState({legendPosition: 'bottom'});
    } else if (ratio > 1.2) {
      this.setState({legendPosition: 'right'});
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
      label.style.left = (boxRect.left - rect.left) + 'px';
      label.style.top = (boxRect.top - rect.top) + 'px';
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

  _seriesTotal (series) {
    var total = 0;
    series.some(function (item) {
      total += item.value;
    });
    return total;
  }

  // Generates state based on the provided props.
  _stateFromProps (props) {
    var total;
    if (props.series) {
      total = this._seriesTotal(props.series);
    } else {
      total = 100;
    }

    // normalize size
    var size = props.size ||
      (props.small ? 'small' :
        (props.large ? 'large' : null));

    var state = {
      total: total,
      size: size
    };

    return state;
  }

  _itemColorIndex (item, index) {
    return item.colorIndex || ('graph-' + (index + 1));
  }

  _renderLegend () {
    return (
      <Legend className={CLASS_ROOT + "__legend"}
        series={this.props.series}
        units={this.props.units}
        activeIndex={this.state.activeIndex}
        onActive={this._onActive} />
    );
  }

  _renderItem (item, index, placement, labels) {
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
      height = (placement.areaPer * item.value) / width;
      placement.across = false;
      placement.origin[1] += height;
    } else {
      height = this.state.height - y;
      width = (placement.areaPer * item.value) / height;
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
      while (iconY < (height - item.icon.height)) {
        while (iconX < (width - item.icon.width)) {
          icons.push(
            <g key={iconIndex}
              transform={"translate(" + (x + iconX) + "," + (y + iconY) + ")"}>
              {item.icon.svgElement}
            </g>
          );
          iconX += item.icon.width;
          iconIndex += 1;
        }
        iconY += item.icon.height;
        iconX = 0;
      }
      contents = (
        <g className={iconClasses.join(' ')}>
          {icons}
        </g>
      );
    } else {
      contents = (
        <rect className={boxClasses.join(' ')}
          x={x} y={y} width={width} height={height}>
        </rect>
      );
    }

    if (width < SMALL_HEIGHT || height < SMALL_HEIGHT) {
      labelClasses.push(CLASS_ROOT + "__label--small");
    }

    if (height < THIN_HEIGHT) {
      labelClasses.push(CLASS_ROOT + "__label--thin");
    }

    labels.push(
      <div key={index} className={labelClasses.join(' ')} data-box-index={index}>
        <span className={CLASS_ROOT + "__label-value"}>
          {item.value}
          <span className={CLASS_ROOT + "__label-units"}>{this.props.units}</span>
        </span>
        <span className={CLASS_ROOT + "__label-label"}>{item.label}</span>
      </div>
    );

    return (
      <g key={index} data-index={index} onClick={item.onClick}>
        {contents}
      </g>
    );
  }

  render () {
    var classes = [CLASS_ROOT];
    classes.push(CLASS_ROOT + "--legend-" + this.state.legendPosition);
    if (this.state.size) {
      classes.push(CLASS_ROOT + "--" + this.state.size);
    }
    if (this.props.vertical) {
      classes.push(CLASS_ROOT + "--vertical");
    }
    if (! this.props.series || this.props.series.length === 0) {
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
        areaPer: (this.state.width * this.state.height) / this.state.total,
        origin: [0, 0],
        across: false,
        icons: false
      };
      boxes = this.props.series.filter(function(item) {
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
      var commands = "M0," + (this.state.height / 2) +
        " L" + this.state.width + "," + (this.state.height / 2);
      boxes.push(
        <g key="loading">
          <path stroke="none" className={loadingClasses.join(' ')} d={commands} />
        </g>
      );
    }

    return (
      <div ref="container" className={classes.join(' ')}>
        <svg ref="graphic" className={CLASS_ROOT + "__graphic"}
          viewBox={"0 0 " + this.state.width + " " + this.state.height}
          preserveAspectRatio="none">
          {boxes}
        </svg>
        {labels}
        {legend}
      </div>
    );
  }

}

Distribution.propTypes = {
  large: PropTypes.bool,
  legend: PropTypes.bool,
  legendTotal: PropTypes.bool,
  series: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number.isRequired,
    colorIndex: PropTypes.string,
    important: PropTypes.bool,
    onClick: PropTypes.func,
    icon: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      svgElement: PropTypes.node
    })
  })),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  small: PropTypes.bool,
  units: PropTypes.string,
  vertical: PropTypes.bool
};

module.exports = Distribution;
