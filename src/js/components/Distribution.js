// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Legend from './Legend';

const CLASS_ROOT = "distribution";

const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 200;

const SMALL_SIZE = 120;
const THIN_HEIGHT = 72;

export default class Distribution extends Component {

  constructor(props) {
    super();

    this._onActivate = this._onActivate.bind(this);
    this._onDeactivate = this._onDeactivate.bind(this);
    this._onResize = this._onResize.bind(this);
    this._layout = this._layout.bind(this);

    this.state = this._stateFromProps(props);
    this.state.legendPosition = 'bottom';
    this.state.width = DEFAULT_WIDTH;
    this.state.height = DEFAULT_HEIGHT;
    this.state.activeIndex = -1;
  }

  componentDidMount () {
    this._initialTimer = setTimeout(this._initialTimeout, 10);
    window.addEventListener('resize', this._onResize);
    this._onResize();
  }

  componentWillReceiveProps (newProps) {
    let state = this._stateFromProps(newProps);
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
    let ratio = window.innerWidth / window.innerHeight;
    if (ratio < 0.8) {
      this.setState({legendPosition: 'bottom'});
    } else if (ratio > 1.2) {
      this.setState({legendPosition: 'right'});
    }

    let graphic = this.refs.graphic;
    let rect = graphic.getBoundingClientRect();
    if (rect.width !== this.state.width || rect.height !== this.state.height) {
      this.setState({
        width: rect.width,
        height: rect.height
      });
    }

    // adjust box label positions
    let container = this.refs.container;
    let labels = container.querySelectorAll('.distribution__label');
    for (let i = 0; i < labels.length; i += 1) {
      let label = labels[i];
      label.style.top = undefined;
      label.style.left = undefined;
      label.style.maxWidth = undefined;
      let boxIndex = label.getAttribute('data-box-index');
      let box = container.querySelectorAll('[data-index="' + boxIndex + '"]')[0];
      let boxRect = box.getBoundingClientRect();
      // let labelRect = label.getBoundingClientRect();
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
    let total = 0;
    series.some(function (item) {
      total += item.value;
    });
    return total;
  }

  // Generates state based on the provided props.
  _stateFromProps (props) {
    let total;
    if (props.series) {
      total = this._seriesTotal(props.series);
    } else {
      total = 100;
    }

    // normalize size
    let size = props.size ||
      (props.small ? 'small' :
        (props.large ? 'large' : undefined));

    let state = {
      total: total,
      size: size
    };

    return state;
  }

  _itemColorIndex (item, index) {
    return item.colorIndex || ('graph-' + (index + 1));
  }

  _onActivate (index) {
    this.setState({activeIndex: index});
  }

  _onDeactivate () {
    this.setState({activeIndex: -1});
  }

  _renderLegend () {
    return (
      <Legend className={CLASS_ROOT + "__legend"}
        series={this.props.series}
        units={this.props.units}
        activeIndex={this.state.activeIndex}
        onActive={this._onActivate} />
    );
  }

  _renderLabel (item, index, boundingBox) {
    let labelClasses = [`${CLASS_ROOT}__label`];

    if (item.icon) {
      labelClasses.push(`${CLASS_ROOT}__label--icons`);
    }

    if (boundingBox.height < THIN_HEIGHT) {
      labelClasses.push(`${CLASS_ROOT}__label--thin`);
    }

    if (index === this.state.activeIndex) {
      labelClasses.push(`${CLASS_ROOT}__label--active`);
    }

    return (
      <div key={index} className={labelClasses.join(' ')}
        data-box-index={index}>
        <span className={`${CLASS_ROOT}__label-value`}>
          {item.value}
          <span className={`${CLASS_ROOT}__label-units`}>
            {this.props.units}
          </span>
        </span>
        <span className={`${CLASS_ROOT}__label-label`}>{item.label}</span>
      </div>
    );
  }

  _updateItemPlacement (item, placement) {
    let x = placement.origin[0];
    let y = placement.origin[1];
    let width, height;
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

    if (item.icon) {
      placement.icons = true;
    }

    return {
      width: width,
      height: height,
      x: x,
      y: y
    };
  }

  _renderItemBox (boundingBox, colorIndex) {
    let boxClasses = [`${CLASS_ROOT}__item-box`];
    boxClasses.push(`color-index-${colorIndex}`);

    return (
      <rect className={boxClasses.join(' ')}
        x={boundingBox.x} y={boundingBox.y}
        width={boundingBox.width} height={boundingBox.height}>
      </rect>
    );
  }

  _renderItemIcon (item, boundingBox, colorIndex) {
    let iconClasses = [`${CLASS_ROOT}__item-icons`];
    iconClasses.push(`color-index-${colorIndex}`);

    let icons = [];
    // fill box with icons
    let iconX = 0;
    let iconY = 0;
    let iconIndex = 1;

    while (iconY < (boundingBox.height - item.icon.height)) {
      while (iconX < (boundingBox.width - item.icon.width)) {
        let transform = (
          `translate(${boundingBox.x + iconX}, ${boundingBox.y + iconY})`
        );
        icons.push(
          <g key={iconIndex} transform={transform}>
            {item.icon.svgElement}
          </g>
        );
        iconX += item.icon.width;
        iconIndex += 1;
      }
      iconY += item.icon.height;
      iconX = 0;
    }

    return (
      <g className={iconClasses.join(' ')}>
        {icons}
      </g>
    );
  }

  _renderItem (item, index, boundingBox) {
    let itemClass = `${CLASS_ROOT}__item`;
    let itemClasses = [itemClass];

    if (item.onClick) {
      itemClasses.push(`${itemClass}--clickable`);
    }

    let colorIndex = this._itemColorIndex(item, index);

    let contents;
    if (item.icon) {
      contents = this._renderItemIcon(item, boundingBox, colorIndex);
    } else {
      contents = this._renderItemBox(boundingBox, colorIndex);
    }

    return (
      <g key={index} className={itemClasses.join(' ')}
        onMouseEnter={this._onActivate.bind(this, index)}
        onMouseLeave={this._onDeactivate}
        data-index={index} onClick={item.onClick}>
        {contents}
      </g>
    );
  }

  _renderLoading () {
    let loadingClasses = [`${CLASS_ROOT}__loading-indicator`];
    loadingClasses.push("color-index-loading");
    let loadingHeight = this.state.height / 2;
    let loadingWidth = this.state.width;
    let commands = `M0,${loadingHeight} L${loadingWidth},${loadingHeight}`;

    return (
      <g key="loading">
        <path stroke="none" className={loadingClasses.join(' ')} d={commands} />
      </g>
    );
  }

  render () {
    let classes = [CLASS_ROOT];
    classes.push(`${CLASS_ROOT}--legend-${this.state.legendPosition}`);
    if (this.state.size) {
      classes.push(`${CLASS_ROOT}--${this.state.size}`);
    }
    if (this.props.vertical) {
      classes.push(`${CLASS_ROOT}--vertical`);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    let legend;
    if (this.props.legend) {
      legend = this._renderLegend();
    }

    let boxes = [];
    let labels = [];
    if (this.props.series) {
      let placement = {
        areaPer: (this.state.width * this.state.height) / this.state.total,
        origin: [0, 0],
        across: false,
        icons: false
      };

      boxes = this.props.series.filter(function(item) {
        return item.value > 0;
      }).map(function (item, index) {

        let boundingBox = this._updateItemPlacement(item, placement);

        if (boundingBox.width < SMALL_SIZE ||
          boundingBox.height < SMALL_SIZE) {
          placement.smallLabel = true;
        }

        labels.push(this._renderLabel(item, index, boundingBox));

        return this._renderItem(item, index, boundingBox);
      }, this);

      if (placement.icons) {
        classes.push(`${CLASS_ROOT}--icons`);
      }

      if (placement.smallLabel) {
        classes.push(`${CLASS_ROOT}--small-label`);
      }
    }

    if (boxes.length === 0) {
      classes.push(`${CLASS_ROOT}--loading`);
      boxes.push(this._renderLoading());
    }

    return (
      <div ref="container" className={classes.join(' ')}>
        <svg ref="graphic" className={`${CLASS_ROOT}__graphic`}
          viewBox={`0 0 ${this.state.width} ${this.state.height}`}
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
