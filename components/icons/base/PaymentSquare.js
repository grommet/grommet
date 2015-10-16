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
      a11yTitleId: 'payment-square-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-payment-square'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "payment-square");

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
        { id: 'payment-square' },
        React.createElement('rect', { id: '_x2E_svg_292_', x: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#000000', strokeWidth: '4', strokeMiterlimit: '10', d: 'M29,32.8844H19c-2.2091,0-4-1.7909-4-4v-10 c0-2.2091,1.7909-4,4-4h10c2.2091,0,4,1.7909,4,4v10C33,31.0936,31.2091,32.8844,29,32.8844z' }),
        React.createElement('path', { d: 'M26,20.8844h-4c-0.5523,0-1,0.4477-1,1v4c0,0.5523,0.4477,1,1,1h4c0.5523,0,1-0.4477,1-1v-4 C27,21.3322,26.5523,20.8844,26,20.8844z' })
      )
    );
  }

});

module.exports = Icon;