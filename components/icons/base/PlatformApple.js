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
      a11yTitleId: 'platform-apple-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-platform-apple'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "platform-apple");

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
        { id: 'platform-apple' },
        React.createElement('rect', { id: '_x2E_svg_303_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { d: 'M30.5499,24.7496c0.0337,3.632,3.1862,4.8406,3.2211,4.856c-0.0267,0.0852-0.5037,1.7224-1.6609,3.4135 c-1.0003,1.462-2.0385,2.9187-3.674,2.9489c-1.607,0.0296-2.1237-0.953-3.961-0.953c-1.8367,0-2.4108,0.9228-3.932,0.9826 c-1.5786,0.0597-2.7807-1.581-3.7894-3.0377c-2.061-2.9797-3.636-8.4198-1.5212-12.092c1.0506-1.8236,2.9282-2.9784,4.9661-3.008 c1.5502-0.0296,3.0134,1.0429,3.961,1.0429c0.947,0,2.7251-1.2897,4.5943-1.1003c0.7825,0.0326,2.9791,0.3161,4.3895,2.3807 C33.0299,20.2535,30.5226,21.7131,30.5499,24.7496 M27.5297,15.8311c0.8381-1.0145,1.4022-2.4268,1.2483-3.832 c-1.2081,0.0486-2.6689,0.805-3.5354,1.819c-0.7766,0.8979-1.4567,2.335-1.2732,3.7124 C25.316,17.6347,26.6916,16.8462,27.5297,15.8311' })
      )
    );
  }

});

module.exports = Icon;