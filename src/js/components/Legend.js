// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import FormattedMessage from './FormattedMessage';
import List from './List';
import ListItem from './ListItem';
import CSSClassnames from '../utils/CSSClassnames';
import Announcer from '../utils/Announcer';

const CLASS_ROOT = CSSClassnames.LEGEND;
const COLOR_INDEX = CSSClassnames.COLOR_INDEX;

function getMaxDecimalDigits(series) {
  let maxDigits = 0;
  series.forEach((item) => {
    const currentDigitsGroup = /\.(\d*)$/.exec(item.value.toString());
    if (currentDigitsGroup) {
      const currentDigits = currentDigitsGroup[1].length;
      maxDigits = Math.max(maxDigits, currentDigits);
    }
  });

  return Math.pow(10, maxDigits);
}

export default class Legend extends Component {

  constructor(props, context) {
    super(props, context);

    this._onActive = this._onActive.bind(this);
    this._renderSeries = this._renderSeries.bind(this);
    this._renderSwatch = this._renderSwatch.bind(this);
    this._renderLabel = this._renderLabel.bind(this);
    this._renderValue = this._renderValue.bind(this);
    this._renderTotal = this._renderTotal.bind(this);
    this._seriesTotal = this._seriesTotal.bind(this);

    this.state = {activeIndex: this.props.activeIndex};
  }

  componentWillReceiveProps (newProps) {
    if (newProps.activeIndex !== this.state.activeIndex) {
      this.setState({activeIndex: newProps.activeIndex});
    }
  }

  componentDidUpdate () {
    const { announce } = this.props;
    if (announce) {
      Announcer.announce(this.legendRef.textContent);
    }
  }

  _onActive (index) {
    const { onActive } = this.props;
    this.setState({activeIndex: index});
    if (onActive) {
      onActive(index);
    }
  }

  _itemColorIndex (item, index) {
    return item.colorIndex || `graph-${index + 1}`;
  }

  _renderSwatch (item, index) {
    const colorIndex = this._itemColorIndex(item, index);
    return (
      <svg className={
          `${CLASS_ROOT}__item-swatch ${COLOR_INDEX}-${colorIndex}`
        } viewBox="0 0 12 12">
        <path className={item.className} d="M 5 0 l 0 12" />
      </svg>
    );
  }

  _renderLabel (item, swatch) {
    if (swatch) {
      return (
        <span className={`${CLASS_ROOT}__item-label`}>
          {swatch}
          {item.label}
        </span>
      );
    } else {
      return (
        <span className={`${CLASS_ROOT}__item-label`}>{item.label}</span>
      );
    }
  }

  _renderValue (item) {
    const { units } = this.props;
    const unitsValue = item.units || units;
    const valueClasses = `${CLASS_ROOT}__item-value`;
    let unitsPrefix;
    let unitsSuffix;
    if (unitsValue) {
      if (unitsValue.prefix) {
        unitsPrefix = (
          <span className={`${CLASS_ROOT}__item-units`}>
            {unitsValue.prefix}
          </span>
        );
      }
      if (unitsValue.suffix ||
        (typeof unitsValue === 'string' || unitsValue instanceof String)) {
        unitsSuffix = (
          <span className={`${CLASS_ROOT}__item-units`}>
            {unitsValue.suffix || unitsValue}
          </span>
        );
      }
    }
    return (
      <span className={valueClasses}>
        {unitsPrefix}
        {item.value}
        {unitsSuffix}
      </span>
    );
  }

  _seriesTotal () {
    const { series } = this.props;
    const maxDecimalDigits = getMaxDecimalDigits(series);
    let total = 0;
    series.forEach(item =>
      total += (typeof item.value === 'number' ?
       item.value : 0) * maxDecimalDigits );
    return total / maxDecimalDigits;
  }

  _renderSeries () {
    const { series, responsive } = this.props;
    const { activeIndex } = this.state;

    return series.map((item, index) => {
      const legendClasses = classnames(
        `${CLASS_ROOT}__item`, {
          [`${CLASS_ROOT}__item--active`]: index === activeIndex,
          [`${CLASS_ROOT}__item--clickable`]: item.onClick
        }
      );

      let swatch;
      if (item.hasOwnProperty('colorIndex')) {
        swatch = this._renderSwatch(item, index);
      }

      let label;
      if (item.hasOwnProperty('label')) {
        label = this._renderLabel(item, swatch);
      }

      let value;
      if (item.hasOwnProperty('value')) {
        value = this._renderValue(item);
      }

      return (
        <ListItem onClick={item.onClick} justify='between'
          separator='none' pad={{ horizontal: 'small' }}
          key={item.label || index} className={legendClasses}
          onMouseOver={this._onActive.bind(this, index)}
          onMouseOut={this._onActive.bind(this, undefined)}
          responsive={responsive} >
          {label}
          {value}
        </ListItem>
      );
    }, this);
  }

  _renderTotal () {
    const { total, units, responsive } = this.props;
    let totalValue;
    if (total !== true) {
      totalValue = total;
    } else {
      totalValue = this._seriesTotal();
    }
    let unitsPrefix;
    let unitsSuffix;
    if (units && units.prefix) {
      unitsPrefix = (
        <span className={`${CLASS_ROOT}__total-units`}>
          {units.prefix}
        </span>
      );
    }
    if (units &&
      (units.suffix ||
        (typeof units === 'string' ||
        units instanceof String))) {
      unitsSuffix = (
        <span className={`${CLASS_ROOT}__total-units`}>
          {units.suffix || units}
        </span>
      );
    }

    return (
      <ListItem className={`${CLASS_ROOT}__total`}
        justify='between' separator='none' pad={{ horizontal: 'small' }}
        responsive={responsive} >
        <span className={`${CLASS_ROOT}__total-label`}>
          <FormattedMessage id="Total" defaultMessage="Total" />
        </span>
        <span className={`${CLASS_ROOT}__total-value`}>
          {unitsPrefix}
          {totalValue}
          {unitsSuffix}
        </span>
      </ListItem>
    );
  }

  render () {
    const { className, series, total, ...props } = this.props;
    delete props.activeIndex;
    delete props.announce;
    delete props.onActive;
    delete props.units;
    delete props.responsive;

    const classes = classnames(
      CLASS_ROOT,
      className
    );

    let items = this._renderSeries();

    // build legend from bottom to top, to align with Meter bar stacking
    items.reverse();

    let totalNode;
    if (total && series.length > 1) {
      totalNode = this._renderTotal();
    }

    return (
      <List ref={ref => this.legendRef = ref} {...props} className={classes}>
        {items.reverse()}
        {totalNode}
      </List>
    );
  }

}

Legend.defaultProps = {
  announce: false
};

Legend.propTypes = {
  activeIndex: PropTypes.number,
  announce: PropTypes.bool,
  onActive: PropTypes.func,
  series: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.node
    ]),
    units: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        prefix: PropTypes.string,
        suffix: PropTypes.string
      })
    ]),
    colorIndex: PropTypes.oneOfType([
      PropTypes.number, // 1-6
      PropTypes.string // status
    ]),
    onClick: PropTypes.func
  })).isRequired,
  total: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.node
  ]),
  units: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      prefix: PropTypes.string,
      suffix: PropTypes.string
    })
  ]),
  responsive: PropTypes.bool
};
