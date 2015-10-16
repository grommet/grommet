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
      a11yTitleId: 'social-facebook-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-social-facebook'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "social-facebook");

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
        { id: 'social-facebook' },
        React.createElement('rect', { id: '_x2E_svg_308_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { id: 'f', d: 'M25.1218,34.399V24.3634h3.3689l0.504-3.9107h-3.8729v-2.4975c0-1.1321,0.3145-1.9037,1.9383-1.9037l2.0709-0.0006 v-3.4984c-0.3581-0.0472-1.5874-0.1534-3.0177-0.1534c-2.9857,0-5.03,1.822-5.03,5.1694v2.8843h-3.3772v3.9107h3.3772V34.399 H25.1218z' })
      )
    );
  }

});

module.exports = Icon;