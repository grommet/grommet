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
      a11yTitleId: 'social-vimeo-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-social-vimeo'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "social-vimeo";
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
        { id: 'social-vimeo' },
        React.createElement('rect', { id: '_x2E_svg_311_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { d: 'M32.1611,18.6903c-0.48,2.8577-1.7372,5.528-3.7716,8.0108c-2.0115,2.4595-3.8402,4.2631-5.486,5.4108 c-0.96,0.4919-1.8058,0.5036-2.5373,0.0351c-0.7086-0.445-1.2686-1.0892-1.6801-1.9324c-0.2286-0.445-0.7943-2.2545-1.6972-5.4284 s-1.4458-4.878-1.6286-5.1122c-0.16-0.3045-0.5315-0.3162-1.1143-0.0351c-0.5829,0.2811-0.9772,0.527-1.1829,0.7378l-0.7886-1.0541 l0.8915-1.0892c0.7086-0.773,1.5429-1.5401,2.503-2.3014s1.8172-1.2239,2.5715-1.3878c1.0058-0.2108,1.7487,0.2928,2.2287,1.5108 c0.2972,0.7027,0.5829,1.9676,0.8572,3.7946c0.0457,0.3514,0.1714,0.9487,0.3772,1.7919c0.6629,2.8342,1.1886,4.2514,1.5772,4.2514 c0.5715,0,1.5086-1.2649,2.8116-3.7946c0.5943-1.1478,0.6286-2.0964,0.1029-2.846c-0.5257-0.7496-1.3486-0.7613-2.4687-0.0351 c0.1829-1.1712,0.6743-2.1667,1.4744-2.9865c1.4858-1.6162,3.0973-2.2135,4.8345-1.7919 C31.864,14.7903,32.5726,16.2074,32.1611,18.6903L32.1611,18.6903z' })
      )
    );
  }

});

module.exports = Icon;