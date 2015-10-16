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
      a11yTitleId: 'star-half-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-star-half'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "star-half");

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
        { id: 'star-half' },
        React.createElement('rect', { id: '_x2E_svg_263_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement(
          'g',
          null,
          React.createElement('path', { fill: '#231F20', d: 'M24,16.4721l2.2112,4.4223L26.7639,22H28h3.3418l-2.7919,2.9393l-0.7563,0.7962l0.2659,1.0654 l1.2409,4.9725l-4.2639-2.5836L24,28.5618l-1.0364,0.628l-4.2639,2.5836l1.2409-4.9725l0.2659-1.0654l-0.7563-0.7962L16.6582,22 H20h1.2361l0.5528-1.1056L24,16.4721 M24,12l-4,8h-8l6,6.3167L15.5836,36L24,30.9003L32.4164,36L30,26.3167L36,20h-8L24,12L24,12z ' })
        ),
        React.createElement('polygon', { fill: '#231F20', points: '24,30.9003 15.5836,36 18,26.3167 12,20 20,20 24,12 \t' })
      )
    );
  }

});

module.exports = Icon;