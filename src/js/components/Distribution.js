// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';
import Intl from '../utils/Intl';
import CSSClassnames from '../utils/CSSClassnames';
import { announce } from '../utils/Announcer';

const CLASS_ROOT = CSSClassnames.DISTRIBUTION;
const COLOR_INDEX = CSSClassnames.COLOR_INDEX;
const BACKGROUND_COLOR_INDEX = CSSClassnames.BACKGROUND_COLOR_INDEX;

const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 200;

const SMALL_SIZE = 120;
const THIN_HEIGHT = 72;

const GUTTER_SIZE = 4;

export default class Distribution extends Component {

  constructor(props, context) {
    super(props, context);

    this._onEnter = this._onEnter.bind(this);
    this._onPreviousDistribution = this._onPreviousDistribution.bind(this);
    this._onNextDistribution = this._onNextDistribution.bind(this);
    this._onActivate = this._onActivate.bind(this);
    this._onDeactivate = this._onDeactivate.bind(this);
    this._onResize = this._onResize.bind(this);
    this._layout = this._layout.bind(this);
    this._placeItems = this._placeItems.bind(this);

    this.state = this._stateFromProps(props);
    this.state.width = DEFAULT_WIDTH;
    this.state.height = DEFAULT_HEIGHT;
    this.state.activeIndex = -1;
    this.state.mouseActive = false;
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
    // delay to allow page layout to settle
    this._resizeTimer = setTimeout(this._layout, 200);
  }

  componentWillReceiveProps (newProps) {
    let state = this._stateFromProps(newProps);
    // preserve width and height we calculated already
    state.width = this.state.width;
    state.height = this.state.height;
    state.needLayout = true;
    this.setState(state);
  }

  componentDidUpdate () {
    if (this.state.needLayout) {
      this.setState({ needLayout: false, items: undefined }, this._layout);
    }
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
    series.some(function (datum) {
      total += datum.value;
    });
    return total;
  }

  // Generates state based on the provided props.
  _stateFromProps (props) {
    let total;
    let allIcons = false;
    if (props.series) {
      total = this._seriesTotal(props.series);
      allIcons = ! props.series.some((datum) => {
        return ! datum.icon;
      });
    } else {
      total = 100;
    }

    return {
      allIcons: allIcons,
      total: total
    };
  }

  _boxRect (itemRect, width, height) {
    // leave a gutter between items, if we're not at the edge
    let boxRect = { ...itemRect };
    if (0 !== boxRect.x &&
      width > (boxRect.x + boxRect.width)) {
      boxRect.x += (GUTTER_SIZE / 2);
      boxRect.width -= GUTTER_SIZE;
    }
    if (0 !== boxRect.y &&
      height > (boxRect.y + boxRect.height)) {
      boxRect.y += (GUTTER_SIZE / 2);
      boxRect.height -= GUTTER_SIZE;
    }
    boxRect.width -= GUTTER_SIZE;
    boxRect.height -= GUTTER_SIZE;
    // flush the right edge
    if (boxRect.x + boxRect.width > width - (4 * GUTTER_SIZE)) {
      boxRect.width = width - boxRect.x;
    }
    // flush the bottom edge
    if (boxRect.y + boxRect.height > height - (4 * GUTTER_SIZE)) {
      boxRect.height = height - boxRect.y;
    }
    return boxRect;
  }

  _labelRect (boxRect) {
    let labelRect = { ...boxRect };
    return labelRect;
  }

  _placeItems () {
    const width = this.state.width;
    const height = this.state.height;
    const areaPer = (width * height) / this.state.total;
    let remainingRect = { x: 0, y: 0, width: width, height: height };
    let items = [];
    let series = (this.props.series ? this.props.series.slice(0) : []);

    while (series.length > 0) {
      const datum = series.shift();
      if (datum.value <= 0) {
        continue;
      }

      // Start a new group.
      let groupValue = datum.value;
      let targetGroupValue;

      // Make the first item as square as possible.
      const itemArea = areaPer * datum.value;
      const edgeLength = Math.round(Math.sqrt(itemArea));
      let itemHeight;
      let itemWidth;

      // Figure out how much value we can fit inside a rectangle
      // that takes the full minor axis length
      if (remainingRect.width > remainingRect.height) {
        // landscape, lay out left to right
        itemHeight = Math.min(remainingRect.height, edgeLength);
        itemWidth = Math.round(itemArea / itemHeight);
        targetGroupValue =
          Math.round((itemWidth * remainingRect.height) / areaPer);
      } else {
        // portrait, lay out top to bottom
        itemWidth = Math.min(remainingRect.width, edgeLength);
        itemHeight = Math.round(itemArea / itemWidth);
        targetGroupValue =
          Math.round((itemHeight * remainingRect.width) / areaPer);
      }

      // Group items until we reach the target group value.
      let group = [datum];
      while (groupValue < targetGroupValue && series.length > 0) {
        const datum2 = series.shift();
        groupValue += datum2.value;
        group.push(datum2);
      }

      // Now that we know the actual value of the group, give it a
      // rectangle whose area corresponds to the actual group value.
      let groupRect;
      if (remainingRect.width > remainingRect.height) {
        // landscape, lay out left to right
        groupRect = { x: remainingRect.x, y: remainingRect.y,
          width: Math.round((areaPer * groupValue) / remainingRect.height),
          height: remainingRect.height };
        remainingRect.x += groupRect.width;
        remainingRect.width -= groupRect.width;
      } else {
        // portrait, lay out top to bottom
        groupRect = { x: remainingRect.x, y: remainingRect.y,
          width: remainingRect.width,
          height: Math.round((areaPer * groupValue) / remainingRect.width) };
        remainingRect.y += groupRect.height;
        remainingRect.height -= groupRect.height;
      }

      // Place items within the group rectangle.
      // We take the full minor axis length and as much major axis length
      // as needed to match the item's area.
      group.forEach((datum) => {
        let itemRect;
        if (groupRect.width > groupRect.height) {
          // landscape, use full height
          itemRect = { x: groupRect.x, y: groupRect.y,
            width: Math.round((areaPer * datum.value) / groupRect.height),
            height: groupRect.height };
          groupRect.x += itemRect.width;
          groupRect.width -= itemRect.width;
        } else {
          // portrait, use full width
          itemRect = { x: groupRect.x, y: groupRect.y,
            width: groupRect.width,
            height: Math.round((areaPer * datum.value) / groupRect.width) };
          groupRect.y += itemRect.height;
          groupRect.height -= itemRect.height;
        }

        let boxRect = this._boxRect(itemRect, width, height);
        let labelRect = this._labelRect(boxRect);

        // Save this so we can render the item's box and label
        // in the correct location.

        items.push({ datum: datum, rect: itemRect,
          boxRect: boxRect, labelRect: labelRect });
      });
    }

    this.setState({ items: items });
  }

  _onResize () {
    // debounce
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(this._layout, 0);
  }

  _layout () {
    const container = this._containerRef;
    const rect = container.getBoundingClientRect();
    const width = Math.round(rect.width);
    const height = Math.round(rect.height);
    if (width !== this.state.width || height !== this.state.height ||
      ! this.state.items) {
      this.setState({
        width: width,
        height: height
      }, this._placeItems);
    }
  }

  _itemColorIndex (item, index) {
    return item.colorIndex || ('graph-' + (index + 1));
  }

  _onPreviousDistribution (event) {
    event.preventDefault();
    if (this._distributionRef.contains(document.activeElement)) {
      if (this.state.activeIndex - 1 >= 0) {
        this._onActivate(this.state.activeIndex - 1);
      }
    }
    //stop event propagation
    return true;
  }

  _onNextDistribution (event) {
    event.preventDefault();
    if (this._distributionRef.contains(document.activeElement)) {
      var totalDistributionCount = (
        ReactDOM.findDOMNode(this.distributionItemsRef).childNodes.length
      );

      if (this.state.activeIndex + 1 < totalDistributionCount) {
        this._onActivate(this.state.activeIndex + 1);
      }
    }
    //stop event propagation
    return true;
  }

  _onEnter (event) {
    if (this._distributionRef.contains(document.activeElement) &&
      this.activeDistributionRef) {
      let index = this.activeDistributionRef.getAttribute('data-index');

      let activeDistribution = this.props.series.filter(function(item) {
        return item.value > 0;
      })[index];

      //trigger click on active distribution
      if (activeDistribution.onClick) {
        activeDistribution.onClick();
      }
    }
  }

  _onActivate (index) {
    const { intl } = this.context;
    this.setState({ activeIndex: index }, () => {
      let activeMessage = this.activeDistributionRef.getAttribute('aria-label');
      const clickable = this.state.items[this.state.activeIndex].datum.onClick;
      const enterSelectMessage = `(${Intl.getMessage(intl, 'Enter Select')})`;
      announce(`${activeMessage} ${clickable ? enterSelectMessage : ''}`);
    });
  }

  _onDeactivate () {
    this.setState({ activeIndex: -1 });
  }

  _renderItemLabel (datum, labelRect, index) {
    const { activeIndex, width } = this.state;
    const labelClasses = classnames(
      `${CLASS_ROOT}__label`, {
        [`${BACKGROUND_COLOR_INDEX}-${this._itemColorIndex(datum, index)}`]:
          !datum.icon,
        [`${CLASS_ROOT}__label--icons`]: datum.icon,
        [`${CLASS_ROOT}__label--small`]: (
          labelRect.width < SMALL_SIZE || labelRect.height < SMALL_SIZE
        ),
        [`${CLASS_ROOT}__label--thin`]: labelRect.height < THIN_HEIGHT,
        [`${CLASS_ROOT}__label--active`]: index === activeIndex
      }
    );

    const value =
      (datum.labelValue !== undefined ? datum.labelValue : datum.value);
    const style = { top: labelRect.y };
    if (index !== activeIndex) {
      style.left = labelRect.x;
      style.maxWidth = labelRect.width;
      style.maxHeight = labelRect.height;
    } else {
      // 4 is to align with styled border width
      if (labelRect.width < SMALL_SIZE &&
        (labelRect.x + labelRect.width) >= width) {
        style.right = width - (labelRect.x + labelRect.width + 4);
      } else {
        style.left = labelRect.x - 2;
      }
      style.minWidth = labelRect.width + 4;
      style.minHeight = labelRect.height;
    }

    return (
      <div key={index} className={labelClasses}
        data-box-index={index} role='presentation'
        style={style}>
        <span className={`${CLASS_ROOT}__label-value`}>
          {value}
          <span className={`${CLASS_ROOT}__label-units`}>
            {this.props.units}
          </span>
        </span>
        <span className={`${CLASS_ROOT}__label-label`}>
          {datum.label}
        </span>
      </div>
    );
  }

  _renderItemBox (boxRect, colorIndex) {
    const boxClasses = classnames(
      `${CLASS_ROOT}__item-box`, {
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    return (
      <rect className={boxClasses} x={boxRect.x} y={boxRect.y}
        width={boxRect.width} height={boxRect.height} />
    );
  }

  _renderItemIcon (icon, itemRect, colorIndex) {
    const iconClasses = classnames(
      `${CLASS_ROOT}__item-icons`,
      `${COLOR_INDEX}-${colorIndex}`
    );

    let icons = [];
    // fill box with icons
    let iconX = 0;
    let iconY = 0;
    let iconIndex = 1;

    while (iconY < (itemRect.height - icon.height)) {
      while (iconX < (itemRect.width - icon.width)) {
        let transform = (
          `translate(${itemRect.x + iconX}, ${itemRect.y + iconY})`
        );
        icons.push(
          <g key={iconIndex} transform={transform}>
            {icon.svgElement}
          </g>
        );
        iconX += icon.width;
        iconIndex += 1;
      }
      iconY += icon.height;
      iconX = 0;
    }

    return (
      <g className={iconClasses}>
        {icons}
      </g>
    );
  }

  _renderItem (datum, rect, index) {
    const { units } = this.props;

    const itemClasses = classnames(
      `${CLASS_ROOT}__item`, {
        [`${CLASS_ROOT}__item--clickable`]: datum.onClick
      }
    );

    let activeDistributionRef;
    if (index === this.state.activeIndex) {
      activeDistributionRef = (ref) => this.activeDistributionRef = ref;
    }

    const colorIndex = this._itemColorIndex(datum, index);

    let contents;
    if (datum.icon) {
      contents = this._renderItemIcon(datum.icon, rect, colorIndex);
    } else {
      contents = this._renderItemBox(rect, colorIndex);
    }

    const value =
      (datum.labelValue !== undefined ? datum.labelValue : datum.value);
    const labelMessage = `${value} ${units || ''} ${datum.label}`;

    return (
      <g key={index} className={itemClasses}
        role={datum.onClick ? 'button' : 'row'}
        ref={activeDistributionRef} aria-label={labelMessage}
        onFocus={() => this.setState({ activeIndex: index })}
        data-index={index} onClick={datum.onClick}>
        {contents}
      </g>
    );
  }

  _renderBoxes () {
    return this.state.items.map((item, index) => {
      return this._renderItem(item.datum, item.boxRect, index);
    });
  }

  _renderLabels () {
    return this.state.items.map((item, index) => {
      return this._renderItemLabel(item.datum, item.labelRect, index);
    });
  }

  _renderLoading () {
    const { height, width } = this.state;
    const loadingClasses = classnames(
      `${CLASS_ROOT}__loading-indicator`,
      `${COLOR_INDEX}-loading`
    );
    const loadingHeight = height / 2;
    const loadingWidth = width;
    const commands = `M0,${loadingHeight} L${loadingWidth},${loadingHeight}`;

    return (
      <g key='loading'>
        <path stroke='none' className={loadingClasses} d={commands} />
      </g>
    );
  }

  render () {
    const {
      a11yTitle, className, full, size, vertical, ...props
    } = this.props;
    delete props.series;
    delete props.units;
    const { intl } = this.context;
    const { allIcons, focus, height, items, mouseActive, width } = this.state;
    const classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--full`]: full,
        [`${CLASS_ROOT}--icons`]: allIcons,
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--vertical`]: vertical,
        [`${CLASS_ROOT}--loading`]: (items || []).length === 0
      },
      className
    );

    let background;
    if (!allIcons) {
      background = (
        <rect className={`${CLASS_ROOT}__background`} x={0} y={0} stroke='none'
          width={width} height={height} />
      );
    }

    let boxes = [];
    let labels;
    if (items) {
      boxes = this._renderBoxes();
      labels = this._renderLabels();
    }

    let role = 'group';
    let ariaLabel = a11yTitle || Intl.getMessage(intl, 'Distribution');
    const navigationHelpMessage = Intl.getMessage(intl, 'Navigation Help');
    ariaLabel += ` (${navigationHelpMessage})`;
    if (boxes.length === 0) {
      boxes.push(this._renderLoading());
      role = 'img';
      ariaLabel = Intl.getMessage(intl, 'Loading');
    }

    const graphicClasses = classnames(
      `${CLASS_ROOT}__graphic`, {
        [`${CLASS_ROOT}__graphic--focus`]: focus
      }
    );

    return (
      <div ref={ref => this._containerRef = ref} {...props} className={classes}>
        <svg ref={ref => this._distributionRef = ref}
          className={graphicClasses}
          viewBox={`0 0 ${this.state.width} ${this.state.height}`}
          preserveAspectRatio='none' tabIndex='0' role={role}
          aria-label={ariaLabel}
          onMouseDown={() => this.setState({ mouseActive: true })}
          onMouseUp={() => this.setState({ mouseActive: false })}
          onFocus={() => {
            if (mouseActive === false) {
              this.setState({ focus: true });
            }
          }}
          onBlur={() => this.setState({
            focus: false
          })}>
          {background}
          {boxes}
        </svg>
        <div ref={ref => this.distributionItemsRef = ref}
          className={`${CLASS_ROOT}__labels`} role='presentation'
          aria-hidden={true}>
          {labels}
        </div>
      </div>
    );
  }

}

Distribution.contextTypes = {
  intl: PropTypes.object
};

Distribution.propTypes = {
  a11yTitle: PropTypes.string,
  full: PropTypes.bool, // deprecated, use size='full'
  series: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.node,
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
  size: PropTypes.oneOf(['small', 'medium', 'large', 'full']),
  units: PropTypes.string,
  vertical: PropTypes.bool
};

Distribution.defaultProps = {
  size: 'medium'
};
