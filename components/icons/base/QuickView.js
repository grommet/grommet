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
      a11yTitleId: 'quick-view-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-quick-view'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "quick-view");

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
        { id: 'quick-view' },
        React.createElement('rect', { id: '_x2E_svg_244_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M22,28.5c0,2.4853-2.0147,4.5-4.5,4.5 S13,30.9853,13,28.5s2.0147-4.5,4.5-4.5S22,26.0147,22,28.5z M30.5,24c-2.4853,0-4.5,2.0147-4.5,4.5s2.0147,4.5,4.5,4.5 s4.5-2.0147,4.5-4.5S32.9853,24,30.5,24z M26,28c0-1.1046-0.8954-2-2-2c-1.1046,0-2,0.8954-2,2 M18,15L18,15 c-2.7614,0-5,2.2386-5,5v8 M35,28v-8c0-2.7614-2.2386-5-5-5h0' })
      )
    );
  }

});

module.exports = Icon;