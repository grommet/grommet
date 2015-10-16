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
      a11yTitleId: 'launch-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-launch'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "launch");

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
        { id: 'launch' },
        React.createElement('rect', { id: '_x2E_svg_209_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('circle', { fill: '#231F20', cx: '24', cy: '21', r: '2' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M31.1848,29.4137 C31.8089,30.0219,32,30.8468,32,31.707v3.6281c0,0.6476-0.581,0.8821-1.1339,0.5229l-2.7003-2.0099 C27.6193,33.493,26.977,33,26.3201,33H24h-2.3201c-0.6569,0-1.2195,0.493-1.7661,0.8481l-2.78,2.1616 C16.581,36.369,16,35.9827,16,35.3351V31.707c0-0.8602,0.1911-1.6851,0.8152-2.2933l2.3703-2.4657 c-0.1076-1.1416-0.1768-2.4289-0.1768-3.8817c0-7.2213,4.9914-8.919,4.9914-8.919s4.9914,1.6976,4.9914,8.919 c0,1.4528-0.0693,2.7401-0.1768,3.8817L31.1848,29.4137z M20,33l2,3h4l2-3' })
      )
    );
  }

});

module.exports = Icon;