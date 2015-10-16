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
      a11yTitleId: 'document-locked-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-document-locked'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "document-locked");

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
        { id: 'document-locked' },
        React.createElement('rect', { id: '_x2E_svg_286_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('polyline', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', points: '16,20 16,13 29.0002,13 34,17.9999 34,35  27,35 \t' }),
        React.createElement('polyline', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', points: '28,14 28,19 34,19 \t' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M24,35H14v-8h10V35z M19,32v-2' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M22,27h-6v-2c0-1.6569,1.3431-3,3-3h0 c1.6569,0,3,1.3431,3,3V27z' })
      )
    );
  }

});

module.exports = Icon;