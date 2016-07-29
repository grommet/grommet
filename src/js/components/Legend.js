// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import FormattedMessage from './FormattedMessage';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.LEGEND;
const COLOR_INDEX = CSSClassnames.COLOR_INDEX;

export default class Legend extends Component {

  constructor(props) {
    super(props);

    this._onActive = this._onActive.bind(this);

    this.state = {activeIndex: this.props.activeIndex};
  }

  componentWillReceiveProps (newProps) {
    this.setState({activeIndex: newProps.activeIndex});
  }

  _onActive (index) {
    this.setState({activeIndex: index});
    if (this.props.onActive) {
      this.props.onActive(index);
    }
  }

  _itemColorIndex (item, index) {
    return item.colorIndex || ('graph-' + (index + 1));
  }

  render () {
    var classes = [CLASS_ROOT];
    if (this.props.series.length === 1) {
      classes.push(CLASS_ROOT + "--single");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var totalValue = 0;
    var items = this.props.series.map(function (item, index) {
      var legendClasses = [CLASS_ROOT + "__item"];
      if (index === this.state.activeIndex) {
        legendClasses.push(CLASS_ROOT + "__item--active");
      }
      if (item.onClick) {
        legendClasses.push(CLASS_ROOT + "__item--clickable");
      }
      var colorIndex = this._itemColorIndex(item, index);
      if (typeof item.value === 'number') {
        totalValue += item.value;
      }

      var valueClasses = [CLASS_ROOT + "__item-value"];
      if (1 === this.props.series.length) {
        valueClasses.push("large-number-font");
      }

      var swatch;
      if (item.hasOwnProperty('colorIndex')) {
        swatch = (
          <svg className={`${CLASS_ROOT}__item-swatch ${COLOR_INDEX}-${colorIndex}`}
            viewBox="0 0 12 12">
            <path className={item.className} d="M 5 0 l 0 12" />
          </svg>
        );
      }

      var label;
      if (item.hasOwnProperty('label')) {
        if (swatch) {
          label = (
            <span className={CLASS_ROOT + "__item-label"}>
              {swatch}
              {item.label}
            </span>
          );
        } else {
          label = (
            <span className={CLASS_ROOT + "__item-label"}>{item.label}</span>
          );
        }
      }

      var value;
      if (item.hasOwnProperty('value')) {
        var unitsValue = item.units || this.props.units;
        var unitsPrefix;
        var unitsSuffix;
        if (unitsValue) {
          if (unitsValue.prefix) {
            unitsPrefix = (
              <span className={CLASS_ROOT + "__item-units"}>
                {unitsValue.prefix}
              </span>
            );
          }
          if (unitsValue.suffix || (typeof unitsValue === 'string' || unitsValue instanceof String)) {
            unitsSuffix = (
              <span className={CLASS_ROOT + "__item-units"}>
                {unitsValue.suffix || unitsValue}
              </span>
            );
          }
        }
        value = (
          <span className={valueClasses.join(' ')}>
            {unitsPrefix}
            {item.value}
            {unitsSuffix}
          </span>
        );
      }

      return (
        <li key={item.label || index} className={legendClasses.join(' ')}
          onClick={item.onClick}
          onMouseOver={this._onActive.bind(this, index)}
          onMouseOut={this._onActive.bind(this, undefined)} >
          {label}
          {value}
        </li>
      );
    }, this);

    // build legend from bottom to top, to align with Meter bar stacking
    items.reverse();

    var total;
    if (this.props.total && this.props.series.length > 1) {
      if (true !== this.props.total) {
        totalValue = this.props.total;
      }
      var unitsPrefix;
      var unitsSuffix;

      if (this.props.units.prefix) {
        unitsPrefix = (
          <span className={CLASS_ROOT + "__total-units"}>{this.props.units.prefix}</span>
        );
      }
      if (this.props.units.suffix || (typeof this.props.units === 'string' || this.props.units instanceof String)) {
        unitsSuffix = (
          <span className={CLASS_ROOT + "__total-units"}>
            {this.props.units.suffix || this.props.units}
          </span>
        );
      }

      total = (
        <li className={CLASS_ROOT + "__total"}>
          <span className={CLASS_ROOT + "__total-label"}>
            <FormattedMessage id="Total" defaultMessage="Total" />
          </span>
          <span className={CLASS_ROOT + "__total-value"}>
            {unitsPrefix}
            {totalValue}
            {unitsSuffix}
          </span>
        </li>
      );
    }

    return (
      <ol className={classes.join(' ')} role="presentation">
        {items.reverse()}
        {total}
      </ol>
    );
  }

}

Legend.propTypes = {
  activeIndex: PropTypes.number,
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
  value: PropTypes.number
};
