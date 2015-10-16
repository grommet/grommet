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
      a11yTitleId: 'user-settings-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-user-settings'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "user-settings");

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
        { id: 'user-settings' },
        React.createElement('rect', { id: '_x2E_svg_129_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M32,33c-1.6545,0-3-1.3458-3-3s1.3455-3,3-3 s3,1.3458,3,3S33.6545,33,32,33z M38,30l-3,0.0001 M34.1212,32.1214l2.1214,2.1212 M32,36l-0.0001-3 M27.7573,34.2426 l2.1212-2.1214 M26,30h3 M29.8787,27.8787l-2.1213-2.1213 M32,27v-3 M34.1213,27.8787l2.1213-2.1213 M21,13c-2.7614,0-5,2.2386-5,5 s2.2386,5,5,5s5-2.2386,5-5S23.7614,13,21,13z M26.0002,24.7548C24.6306,23.6568,22.892,23,21,23h0c-4.4183,0-8,3.5817-8,8v4h12.4' })
      )
    );
  }

});

module.exports = Icon;