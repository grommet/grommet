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
      a11yTitleId: 'social-linkedin-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-social-linkedin'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "social-linkedin");

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
        { id: 'social-linkedin' },
        React.createElement('rect', { id: '_x2E_svg_309_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { d: 'M19.352,33.3818h-4.1462V20.0466h4.1462V33.3818z M17.2789,18.2235c-1.3278,0-2.4021-1.0766-2.4021-2.4024 c0-1.3276,1.0743-2.4049,2.4021-2.4049c1.3254,0,2.402,1.0773,2.402,2.4049C19.681,17.1468,18.6043,18.2235,17.2789,18.2235z M34.8768,33.3818H30.734v-6.4857c0-1.5466-0.0272-3.5358-2.1533-3.5358c-2.1573,0-2.486,1.6858-2.486,3.4247v6.5968h-4.1434 V20.0466h3.9756v1.8232h0.0568c0.5536-1.0492,1.9055-2.1546,3.9219-2.1546c4.1971,0,4.9714,2.7619,4.9714,6.352V33.3818z' })
      )
    );
  }

});

module.exports = Icon;