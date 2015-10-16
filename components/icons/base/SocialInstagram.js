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
      a11yTitleId: 'social-instagram-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-social-instagram'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "social-instagram");

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
        { id: 'social-instagram' },
        React.createElement('rect', { id: '_x2E_svg_305_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fillRule: 'evenodd', clipRule: 'evenodd', fill: '#FFFFFF', stroke: '#000000', strokeWidth: '2.7273', strokeMiterlimit: '10', d: ' M32,34H16c-1.1046,0-2-0.8954-2-2V16c0-1.1046,0.8954-2,2-2h16c1.1046,0,2,0.8954,2,2v16C34,33.1046,33.1046,34,32,34z' }),
        React.createElement('path', { fillRule: 'evenodd', clipRule: 'evenodd', d: 'M34,22H14v-6c0-1.1046,0.8954-2,2-2h16c1.1046,0,2,0.8954,2,2V22z' }),
        React.createElement('circle', { fillRule: 'evenodd', clipRule: 'evenodd', fill: '#FFFFFF', stroke: '#000000', strokeWidth: '2.5', strokeMiterlimit: '10', cx: '24', cy: '24', r: '5' }),
        React.createElement('path', { fillRule: 'evenodd', clipRule: 'evenodd', fill: '#FFFFFF', d: 'M31.5,19.399h-2c-0.5523,0-1-0.4477-1-1v-2c0-0.5523,0.4477-1,1-1 h2c0.5523,0,1,0.4477,1,1v2C32.5,18.9513,32.0523,19.399,31.5,19.399z' })
      )
    );
  }

});

module.exports = Icon;