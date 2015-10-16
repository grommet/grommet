// (C) Copyright 2014-2015 Hewlett-Packard Development Company

'use strict';

var React = require('react');
var IntlMixin = require('../../../mixins/GrommetIntlMixin');

var CLASS_ROOT = "control-icon";

var Icon = React.createClass({
  displayName: 'Icon',

  propTypes: {
    a11yTitle: React.PropTypes.string,
    a11yTitleId: React.PropTypes.string,
    colorIndex: React.PropTypes.string,
    large: React.PropTypes.bool
  },

  mixins: [IntlMixin],

  getDefaultProps: function getDefaultProps() {
    return {
      a11yTitleId: 'social-google-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-social-google'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "social-google");

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
        { id: 'social-google' },
        React.createElement('rect', { id: '_x2E_svg_304_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { d: 'M24.6393,25.7007l-1.1254-0.874c-0.3427-0.2843-0.8115-0.6595-0.8115-1.3464c0-0.6897,0.4688-1.1283,0.8757-1.5343 c1.3111-1.0319,2.621-2.1302,2.621-4.4447c0-2.38-1.4976-3.632-2.2153-4.226h1.9352l2.0313-1.2763h-6.1539 c-1.6886,0-4.122,0.3995-5.9035,1.8703c-1.3427,1.1585-1.9977,2.7558-1.9977,4.1937c0,2.441,1.8742,4.9154,5.1838,4.9154 c0.3125,0,0.6544-0.0308,0.9986-0.0627c-0.1546,0.3761-0.3108,0.6892-0.3108,1.2207c0,0.9695,0.4982,1.564,0.9372,2.1271 c-1.4063,0.0966-4.0316,0.2523-5.9668,1.4419c-1.8431,1.096-2.404,2.6914-2.404,3.8174c0,2.3175,2.1845,4.4763,6.7142,4.4763 c5.3714,0,8.2151-2.9722,8.2151-5.9145C27.2628,27.9228,26.0139,26.8586,24.6393,25.7007z M20.5481,22.1015 c-2.6871,0-3.9044-3.4738-3.9044-5.5698c0-0.816,0.1546-1.6586,0.6861-2.3167c0.501-0.6267,1.3735-1.0333,2.1881-1.0333 c2.5905,0,3.9341,3.5049,3.9341,5.7591c0,0.564-0.0622,1.5634-0.7804,2.2859C22.1691,21.7279,21.3285,22.1015,20.5481,22.1015z M20.5789,34.6875c-3.3415,0-5.4963-1.5984-5.4963-3.821c0-2.222,1.998-2.9737,2.6854-3.2226 c1.3111-0.4411,2.9982-0.5027,3.2797-0.5027c0.3122,0,0.4685,0,0.7171,0.0314c2.3755,1.6906,3.4065,2.5331,3.4065,4.1336 C25.1713,33.2442,23.578,34.6875,20.5789,34.6875z' }),
        React.createElement('polygon', { points: '32.5266,22.0537 32.5266,18.9244 30.981,18.9244 30.981,22.0537 27.8568,22.0537 27.8568,23.6166 30.981,23.6166  30.981,26.7651 32.5266,26.7651 32.5266,23.6166 35.6667,23.6166 35.6667,22.0537 \t' })
      )
    );
  }

});

module.exports = Icon;