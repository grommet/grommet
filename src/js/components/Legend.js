// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

var React = require('react');
var IntlMixin = require('../mixins/GrommetIntlMixin');

var CLASS_ROOT = "legend";

var Legend = React.createClass({

  mixins: [IntlMixin],

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
    units: React.PropTypes.string,
    value: React.PropTypes.number
  },

  _onActive: function (index) {
    this.setState({activeIndex: index});
    if (this.props.onActive) {
      this.props.onActive(index);
    }
  },

  getInitialState: function () {
    return {activeIndex: this.props.activeIndex};
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({activeIndex: newProps.activeIndex});
  },

  _itemColorIndex: function (item, index) {
    return item.colorIndex || ('graph-' + (index + 1));
  },

  render: function () {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var total = 0;
    var items = this.props.series.map(function (item, index) {
      var legendClasses = [CLASS_ROOT + "__item"];
      if (index === this.state.activeIndex) {
        legendClasses.push(CLASS_ROOT + "__item--active");
      }
      var colorIndex = this._itemColorIndex(item, index);
      total += item.value;

      return(
        <li key={item.label} className={legendClasses.join(' ')}
          onClick={item.onClick}
          onMouseOver={this._onActive.bind(this, index)}
          onMouseOut={this._onActive.bind(this, this.props.activeIndex)} >
          <svg className={CLASS_ROOT + "__item-swatch color-index-" + colorIndex}
            viewBox="0 0 12 12">
            <path className={item.className} d="M 5 0 l 0 12" />
          </svg>
          <span className={CLASS_ROOT + "__item-label"}>{item.label}</span>
          <span className={CLASS_ROOT + "__item-value"}>{item.value}</span>
          <span className={CLASS_ROOT + "__item-units"}>{this.props.units}</span>
        </li>
      );
    }, this);

    return (
      <ol className={classes.join(' ')}>
        {items.reverse()}
        <li className={CLASS_ROOT + "__total"}>
          <span className={CLASS_ROOT + "__total-label"}>{this.getIntlMessage('Legend.total')}</span>
          <span className={CLASS_ROOT + "__total-value"}>{total}</span>
          <span className={CLASS_ROOT + "__total-units"}>{this.props.units}</span>
        </li>
      </ol>
    );
  }

});

module.exports = Legend;
