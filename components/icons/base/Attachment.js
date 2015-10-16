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
      a11yTitleId: 'attachment-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-attachment'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "attachment");

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
        { id: 'attachment' },
        React.createElement('rect', { id: '_x2E_svg_29_', x: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M33.8566,24.0113l-9.488,9.488 c-2.3197,2.3197-6.0807,2.3197-8.4004,0l-0.0849-0.0849c-2.3197-2.3197-2.3197-6.0807,0-8.4004l10.6732-10.6732 c1.5465-1.5465,4.0538-1.5465,5.6003,0l0.0566,0.0566c1.5465,1.5465,1.5465,4.0538,0,5.6003L21.5684,30.6427 c-0.7732,0.7732-2.0269,0.7732-2.8001,0L18.74,30.6144c-0.7732-0.7732-0.7732-2.0269,0-2.8001l9.4598-9.4598' })
      )
    );
  }

});

module.exports = Icon;