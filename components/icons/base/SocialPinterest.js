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
      a11yTitleId: 'social-pinterest-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-social-pinterest'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "social-pinterest";
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
        { id: 'social-pinterest' },
        React.createElement('rect', { id: '_x2E_svg_283_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { d: 'M15.5749,21.7809c0-0.9238,0.1943-1.8403,0.5829-2.7494c0.3886-0.9092,0.9458-1.7523,1.6717-2.5295 s1.679-1.4077,2.8594-1.8916c1.1804-0.4839,2.4892-0.7259,3.9262-0.7259c2.3315,0,4.2452,0.7185,5.7409,2.1556 c1.4957,1.437,2.2436,3.1307,2.2436,5.081c0,2.5075-0.6342,4.5788-1.9026,6.2138s-2.9071,2.4525-4.916,2.4525 c-0.6599,0-1.2794-0.154-1.8586-0.4619c-0.5792-0.3079-0.9861-0.6819-1.2208-1.1218l-0.8798,3.4753 c-0.0733,0.2786-0.1686,0.5609-0.2859,0.8468c-0.1173,0.2859-0.2456,0.5609-0.3849,0.8248 c-0.1393,0.264-0.2786,0.5132-0.4179,0.7479s-0.2786,0.4546-0.4179,0.6599s-0.2603,0.3776-0.3629,0.5169 s-0.198,0.2603-0.2859,0.3629l-0.132,0.176c-0.044,0.0587-0.1026,0.0807-0.176,0.066s-0.1173-0.0587-0.132-0.132 c0-0.0147-0.011-0.1173-0.033-0.3079s-0.044-0.3923-0.066-0.6049c-0.022-0.2126-0.044-0.4876-0.066-0.8248 s-0.0293-0.6635-0.022-0.9788s0.0293-0.6635,0.066-1.0448c0.0367-0.3813,0.0916-0.7332,0.165-1.0558 c0.1613-0.6892,0.7039-2.9841,1.6277-6.8846c-0.1173-0.2346-0.2126-0.5169-0.2859-0.8468c-0.0733-0.3299-0.11-0.5975-0.11-0.8028 l-0.022-0.3299c0-0.9385,0.2383-1.7193,0.7149-2.3425c0.4766-0.6232,1.0521-0.9348,1.7267-0.9348 c0.5426,0,0.9641,0.1796,1.2647,0.5389c0.3006,0.3593,0.4509,0.8102,0.4509,1.3527c0,0.3373-0.0623,0.7515-0.187,1.2428 c-0.1246,0.4912-0.2896,1.0558-0.4949,1.6937c-0.2053,0.6379-0.3519,1.1548-0.4399,1.5507 c-0.1466,0.6599-0.0183,1.2318,0.3849,1.7157c0.4033,0.4839,0.9421,0.7259,1.6167,0.7259c1.1584,0,2.1152-0.6562,2.8704-1.9686 c0.7552-1.3124,1.1328-2.8998,1.1328-4.762c0-1.4224-0.4619-2.5845-1.3857-3.4863c-0.9238-0.9018-2.2142-1.3527-3.8712-1.3527 c-1.8476,0-3.347,0.5939-4.4981,1.7816s-1.7267,2.6101-1.7267,4.2671c0,0.9825,0.2786,1.811,0.8358,2.4855 c0.1906,0.22,0.2493,0.4546,0.176,0.7039c-0.0293,0.0733-0.0733,0.242-0.132,0.5059c-0.0587,0.2639-0.1026,0.4326-0.132,0.5059 c-0.0293,0.1613-0.1026,0.2676-0.22,0.3189s-0.2493,0.0477-0.3959-0.011c-0.8652-0.3519-1.514-0.9568-1.9466-1.8146 C15.7912,23.9254,15.5749,22.9246,15.5749,21.7809z' })
      )
    );
  }

});

module.exports = Icon;