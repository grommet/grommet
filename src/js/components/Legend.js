// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import FormattedMessage from './FormattedMessage';

const CLASS_ROOT = "legend";

class Legend extends Component {

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
      var colorIndex = this._itemColorIndex(item, index);
      totalValue += item.value;

      var valueClasses = [CLASS_ROOT + "__item-value"];
      if (1 === this.props.series.length) {
        valueClasses.push("large-number-font");
      }

      var swatch;
      if (item.hasOwnProperty('colorIndex')) {
        swatch = (
          <svg className={CLASS_ROOT + "__item-swatch color-index-" + colorIndex}
            viewBox="0 0 12 12">
            <path className={item.className} d="M 5 0 l 0 12" />
          </svg>
        );
      }

      var label;
      if (item.hasOwnProperty('label')) {
        label = (
          <span className={CLASS_ROOT + "__item-label"}>{item.label}</span>
        );
      }

      var value;
      if (item.hasOwnProperty('value')) {
        value = (
          <span className={valueClasses.join(' ')}>
            {item.value}
            <span className={CLASS_ROOT + "__item-units"}>{this.props.units}</span>
          </span>
        );
      }

      return (
        <li key={item.label || index} className={legendClasses.join(' ')}
          onClick={item.onClick}
          onMouseOver={this._onActive.bind(this, index)}
          onMouseOut={this._onActive.bind(this, null)} >
          {swatch}
          {label}
          {value}
        </li>
      );
    }, this);

    var total = null;
    if (this.props.total && this.props.series.length > 1) {
      total = (
        <li className={CLASS_ROOT + "__total"}>
          <span className={CLASS_ROOT + "__total-label"}>
            <FormattedMessage id="Total" defaultMessage="Total" />
          </span>
          <span className={CLASS_ROOT + "__total-value"}>
            {totalValue}
            <span className={CLASS_ROOT + "__total-units"}>{this.props.units}</span>
          </span>
        </li>
      );
    }

    return (
      <ol className={classes.join(' ')}>
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
    value: PropTypes.number,
    units: PropTypes.string,
    colorIndex: PropTypes.oneOfType([
      PropTypes.number, // 1-6
      PropTypes.string // status
    ]),
    onClick: PropTypes.func
  })).isRequired,
  total: PropTypes.bool,
  units: PropTypes.string,
  value: PropTypes.number
};

module.exports = Legend;
