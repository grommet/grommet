// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Legend from './Legend';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';
import Intl from '../utils/Intl';

const CLASS_ROOT = "distribution";

const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 200;

const SMALL_SIZE = 120;
const THIN_HEIGHT = 72;

const GUTTER_SIZE = 4;

export default class Distribution extends Component {

  constructor(props) {
    super();

    this._onEnter = this._onEnter.bind(this);
    this._onPreviousDistribution = this._onPreviousDistribution.bind(this);
    this._onNextDistribution = this._onNextDistribution.bind(this);
    this._onActivate = this._onActivate.bind(this);
    this._onDeactivate = this._onDeactivate.bind(this);
    this._onResize = this._onResize.bind(this);
    this._layout = this._layout.bind(this);
    this._groupItems = this._groupItems.bind(this);

    this.state = this._stateFromProps(props);
    this.state.legendPosition = 'bottom';
    this.state.width = DEFAULT_WIDTH;
    this.state.height = DEFAULT_HEIGHT;
    this.state.activeIndex = 0;
  }

  componentDidMount () {
    this._keyboardHandlers = {
      left: this._onPreviousDistribution,
      up: this._onPreviousDistribution,
      right: this._onNextDistribution,
      down: this._onNextDistribution,
      enter: this._onEnter,
      space: this._onEnter
    };
    KeyboardAccelerators.startListeningToKeyboard(
      this, this._keyboardHandlers
    );

    window.addEventListener('resize', this._onResize);
    this._onResize();
  }

  componentWillReceiveProps (newProps) {
    let state = this._stateFromProps(newProps);
    // preserve width and height we calculated already
    state.width = this.state.width;
    state.height = this.state.height;
    this.setState(state, this._layout);
  }

  componentDidUpdate () {
    this._placeLabels();
  }

  componentWillUnmount () {
    KeyboardAccelerators.stopListeningToKeyboard(
      this, this._keyboardHandlers
    );

    clearTimeout(this._resizeTimer);
    window.removeEventListener('resize', this._onResize);
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
    let allIcons = false;
    if (props.series) {
      total = this._seriesTotal(props.series);
      allIcons = ! props.series.some((item) => {
        return ! item.icon;
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

  _groupItems () {
    // group items to enable us to lay them out better
    const width = this.state.width;
    const height = this.state.height;
    const areaPer = (width * height) / this.state.total;
    let groups = [];
    let group;
    let targetValue;
    let elapsedWidth = 0;
    (this.props.series || []).filter(function(item) {
      return item.value > 0;
    }).forEach((item) => {
      if (! group || group.value >= targetValue) {
        if (group) {
          elapsedWidth += Math.round(areaPer * group.value / height);
        }
        group = { items: [], value: 0 };
        groups.push(group);

        // make the item as square as possible, without exceeding the height
        const itemArea = areaPer * item.value;
        const itemHeight = Math.min(height, Math.round(Math.sqrt(itemArea)));
        let itemWidth = Math.round(itemArea / itemHeight);
        // avoid slivers on the right
        if (width - elapsedWidth - itemWidth < (height / 2)) {
          itemWidth = width - elapsedWidth;
        }
        targetValue = Math.round((itemWidth * height) / areaPer);
      }
      group.items.push(item);
      group.value += item.value;
    });
    this.setState({ groups: groups });
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

    let graphic = this.refs.distribution;
    let rect = graphic.getBoundingClientRect();
    if (rect.width !== this.state.width || rect.height !== this.state.height ||
      ! this.state.groups) {
      this.setState({
        width: rect.width,
        height: rect.height
      }, this._groupItems);
    }
  }

  _placeLabels () {
    // Align labels over their corresponding boxes
    let graphic = this.refs.distribution;
    let rect = graphic.getBoundingClientRect();
    let container = this.refs.container;
    let labels = container.querySelectorAll(`.${CLASS_ROOT}__label`);
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
      label.style.maxWidth = boxRect.width + 'px';
      label.style.maxHeight = boxRect.height + 'px';
    }
  }

  _itemColorIndex (item, index) {
    return item.colorIndex || ('graph-' + (index + 1));
  }

  _onPreviousDistribution (e) {
    e.preventDefault();
    if (document.activeElement === this.refs.distribution) {
      var totalDistributionCount = (
        ReactDOM.findDOMNode(this.refs.distributionItems).childNodes.length
      );

      if (this.state.activeIndex - 1 < 0) {
        this._onActivate(totalDistributionCount - 1);
      } else {
        this._onActivate(this.state.activeIndex - 1);
      }
    }
  }

  _onNextDistribution (e) {
    e.preventDefault();
    if (document.activeElement === this.refs.distribution) {
      var totalDistributionCount = (
        ReactDOM.findDOMNode(this.refs.distributionItems).childNodes.length
      );

      if (this.state.activeIndex + 1 >= totalDistributionCount) {
        this._onActivate(0);
      } else {
        this._onActivate(this.state.activeIndex + 1);
      }
    }
  }

  _onEnter (event) {
    if (document.activeElement === this.refs.distribution) {
      if (this.refs.activeDistribution) {
        let index = this.refs.activeDistribution.getAttribute('data-index');

        let activeDistribution = this.props.series.filter(function(item) {
          return item.value > 0;
        })[index];

        //trigger click on active distribution
        if (activeDistribution.onClick) {
          activeDistribution.onClick();
        }
      }
    }
  }

  _onActivate (index) {
    this.setState({activeIndex: index});
  }

  _onDeactivate () {
    this.setState({activeIndex: 0});
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
    if (! item.icon) {
      labelClasses.push('color-index-' + this._itemColorIndex(item, index));
    }
    if (item.icon) {
      labelClasses.push(`${CLASS_ROOT}__label--icons`);
    }
    if (boundingBox.width < SMALL_SIZE || boundingBox.height < SMALL_SIZE) {
      labelClasses.push(`${CLASS_ROOT}__label--small`);
    }
    if (boundingBox.height < THIN_HEIGHT) {
      labelClasses.push(`${CLASS_ROOT}__label--thin`);
    }

    if (index === this.state.activeIndex) {
      labelClasses.push(`${CLASS_ROOT}__label--active`);
    }

    const value = (item.labelValue !== undefined ? item.labelValue : item.value);

    return (
      <div key={index} className={labelClasses.join(' ')}
        data-box-index={index} role="tab"
        id={`${this.props.a11yTitleId}_item_${index}`}>
        <span className={`${CLASS_ROOT}__label-value`}>
          {value}
          <span className={`${CLASS_ROOT}__label-units`}>
            {this.props.units}
          </span>
        </span>
        <span className={`${CLASS_ROOT}__label-label`}>
          {item.label}
        </span>
      </div>
    );
  }

  _updateItemPlacement (item, placement) {
    let result = {
      x: placement.group.x + placement.item.x,
      y: placement.group.y + placement.item.y
    };
    if (placement.across) {
      result.width = placement.group.width - placement.item.x;
      result.height = (placement.areaPer * item.value) / result.width;
      placement.item.y += result.height;
      placement.across = (result.width <
        ((placement.group.height - placement.item.y) * 1.5));
    } else {
      result.height = placement.group.height - placement.item.y;
      result.width = (placement.areaPer * item.value) / result.height;
      placement.item.x += result.width;
      placement.across = (result.height >
        ((placement.group.width - placement.item.x) * 1.5));
    }
    return result;
  }

  _renderItemBox (boundingBox, colorIndex) {
    let boxClasses = [`${CLASS_ROOT}__item-box`];
    if (colorIndex) {
      boxClasses.push(`color-index-${colorIndex}`);
    }

    return (
      <rect className={boxClasses.join(' ')}
        x={boundingBox.x + (GUTTER_SIZE / 2)}
        y={boundingBox.y + (GUTTER_SIZE / 2)}
        width={boundingBox.width - GUTTER_SIZE}
        height={boundingBox.height - GUTTER_SIZE}>
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

    let activeDistribution;
    if (index === this.state.activeIndex) {
      activeDistribution = 'activeDistribution';
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
        onMouseOver={this._onActivate.bind(this, index)}
        onMouseLeave={this._onDeactivate}
        ref={activeDistribution} role="presentation"
        data-index={index} onClick={item.onClick}>
        {contents}
      </g>
    );
  }

  _renderItems () {
    let placement = {
      areaPer: (this.state.width * this.state.height) / this.state.total,
      group: { x: 0, y: 0, width: 0, height: 0
      },
      item: { x: 0, y: 0 },
      across: false,
      icons: false
    };
    let index = 0;

    let labels = [];
    let boxes = this.state.groups.map(function(group) {

      placement.group.x = placement.group.x + placement.group.width;
      placement.group.y = 0;
      placement.group.width = (placement.areaPer * group.value) / this.state.height;
      placement.group.height = this.state.height;
      placement.item = { x: 0, y: 0 };
      placement.across = true;

      return group.items.map(function (item) {
        let boundingBox = this._updateItemPlacement(item, placement);
        labels.push(this._renderLabel(item, index, boundingBox));
        let result = this._renderItem(item, index, boundingBox);
        index += 1;
        return result;
      }, this);
    }, this);

    return { boxes: boxes, labels: labels };
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
    if (this.props.size) {
      classes.push(`${CLASS_ROOT}--${this.props.size}`);
    }
    if (this.props.full) {
      classes.push(`${CLASS_ROOT}--full`);
    }
    if (this.props.vertical) {
      classes.push(`${CLASS_ROOT}--vertical`);
    }
    if (this.state.allIcons) {
      classes.push(`${CLASS_ROOT}--icons`);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    let legend;
    if (this.props.legend) {
      legend = this._renderLegend();
    }

    let background;
    if (! this.state.allIcons) {
      background = (
        <rect className={`${CLASS_ROOT}__background`} x={0} y={0} stroke="none"
          width={this.state.width} height={this.state.height}></rect>
      );
    }

    let boxes = [];
    let labels;
    if (this.props.series && this.state.groups) {
      let items = this._renderItems();
      boxes = items.boxes;
      labels = items.labels;
      // if (placement.smallLabel) {
      //   classes.push(`${CLASS_ROOT}--small-label`);
      // }
    }

    let role = 'tablist';
    let a11yTitle = (
      this.props.a11yTitle ||
      Intl.getMessage(this.context.intl, 'Distribution')
    );

    if (boxes.length === 0) {
      classes.push(`${CLASS_ROOT}--loading`);
      boxes.push(this._renderLoading());
      role = 'img';
      a11yTitle = Intl.getMessage(this.context.intl, 'Loading');
    }

    let activeDescendant;
    if (this.state.activeIndex >= 0) {
      activeDescendant = `${this.props.a11yTitleId}_item_${this.state.activeIndex}`;
    }

    let a11yTitleNode = (
      <title id={this.props.a11yTitleId}>{a11yTitle}</title>
    );

    let a11yDescNode;
    if (this.props.a11yDesc) {
      a11yDescNode = (
        <desc id={this.props.a11yDescId}>
          {this.props.a11yDesc}
        </desc>
      );
    }

    return (
      <div ref="container" className={classes.join(' ')}>
        <svg ref="distribution" className={`${CLASS_ROOT}__graphic`}
          viewBox={`0 0 ${this.state.width} ${this.state.height}`}
          preserveAspectRatio="none" tabIndex="0" role={role}
          aria-activedescendant={activeDescendant}
          aria-labelledby={this.props.a11yTitleId + ' ' + this.props.a11yDescId}>
          {background}
          {a11yTitleNode}
          {a11yDescNode}
          {boxes}
        </svg>
        <div ref="distributionItems">
          {labels}
        </div>
        {legend}
      </div>
    );
  }

}

Distribution.contextTypes = {
  intl: PropTypes.object
};

Distribution.propTypes = {
  a11yTitle: PropTypes.string,
  a11yTitleId: PropTypes.string,
  a11yDescId: PropTypes.string,
  a11yDesc: PropTypes.string,
  full: PropTypes.bool,
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
  units: PropTypes.string,
  vertical: PropTypes.bool
};

Distribution.defaultProps = {
  a11yTitleId: 'distribution-title',
  a11yDescId: 'distribution-desc'
};
