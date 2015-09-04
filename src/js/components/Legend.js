// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

var React = require('react');
var IntlMixin = require('../mixins/GrommetIntlMixin');

var CLASS_ROOT = "legend";

var Legend = React.createClass({

  propTypes: {
    activeIndex: React.PropTypes.number,
    onActive: React.PropTypes.func,
    series: React.PropTypes.arrayOf(React.PropTypes.shape({
      label: React.PropTypes.string,
      value: React.PropTypes.number,
      units: React.PropTypes.string,
      colorIndex: React.PropTypes.oneOfType([
        React.PropTypes.number, // 1-6
        React.PropTypes.string // status
      ]),
      onClick: React.PropTypes.func
    })).isRequired,
    total: React.PropTypes.bool,
    units: React.PropTypes.string,
    value: React.PropTypes.number
  },

  mixins: [IntlMixin],

  getInitialState: function () {
    return {activeIndex: this.props.activeIndex};
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({activeIndex: newProps.activeIndex});
  },

  _onActive: function (index) {
    this.setState({activeIndex: index});
    if (this.props.onActive) {
      this.props.onActive(index);
    }
  },

  _itemColorIndex: function (item, index) {
    return item.colorIndex || ('graph-' + (index + 1));
  },

  render: function () {
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
          onMouseOut={this._onActive.bind(this, this.props.activeIndex)} >
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
            {this.getGrommetIntlMessage('Total')}
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

});

module.exports = Legend;
