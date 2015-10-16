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
      a11yTitleId: 'document-cloud-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-document-cloud'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "document-cloud");

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
        { id: 'document-cloud' },
        React.createElement('rect', { id: '_x2E_svg_271_', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('polyline', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', points: '16,18 16,13 29.0002,13 34,17.9999 34,35  27,35 \t' }),
        React.createElement('polyline', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', points: '28,14 28,19 34,19 \t' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M15.375,24.8537v-1c0-1.6569,1.3431-3,3-3h4 c1.6569,0,3,1.3431,3,3v1h1c1.6569,0,3,1.3431,3,3v0c0,1.6569-1.3431,3-3,3h-6.3754' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M24,30.8537v1c0,1.6569-1.3431,3-3,3h-3 c-1.6569,0-3-1.3431-3-3v-1h-1c-1.6569,0-3-1.3431-3-3v0c0-1.6569,1.3431-3,3-3h6.375' })
      )
    );
  }

});

module.exports = Icon;