// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');
var FormattedMessage = require('../../../components/FormattedMessage');

var CLASS_ROOT = "control-icon";

var Icon = React.createClass({
  displayName: 'Icon',

  propTypes: {
    a11yTitle: React.PropTypes.string,
    a11yTitleId: React.PropTypes.string,
    colorIndex: React.PropTypes.string,
    large: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      a11yTitleId: 'payment-visa-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-payment-visa'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "payment-visa";
    var a11yTitle = React.createElement(FormattedMessage, { id: titleLabel, defaultMessage: titleLabel });

    return React.createElement(
      'svg',
      { version: '1.1', viewBox: '0 0 48 48', width: '48px', height: '48px', className: classes.join(' '), 'aria-labelledby': this.props.a11yTitleId },
      React.createElement(
        'title',
        { id: this.props.a11yTitleId },
        a11yTitle
      ),
      React.createElement(
        'g',
        { id: 'payment-visa' },
        React.createElement('rect', { id: '_x2E_svg_290_', x: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { d: 'M28.475,15.8444l-4.3012,10.9967l-0.4746-2.1981c0-0.0002,0,0.0126,0,0.0126L22.1836,17.24 c-0.2648-1.0163-1.0147-1.3956-1.9648-1.3956h-7.0541l-0.0558,0.3811c1.716,0.4154,3.2504,1.0384,4.5952,1.784l3.8893,13.9514 l4.6285-0.0514l6.8871-16.065H28.475z' })
      )
    );
  }

});

module.exports = Icon;