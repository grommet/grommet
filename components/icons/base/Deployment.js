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
      a11yTitleId: 'deployment-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-deployment'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "deployment");

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
        { id: 'deployment' },
        React.createElement('rect', { id: '_x2E_svg_162_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M28.6159,31.7646 c0,0.8825-0.3506,1.7289-0.9746,2.3529l-2.6321,2.6321c-0.4698,0.4698-1.2737,0.2264-1.404-0.4251l-0.674-3.3702 c-0.1288-0.6442-0.4455-1.2358-0.91-1.7004l-1.6405-1.6405L18.74,27.973c-0.4645-0.4645-1.0562-0.7812-1.7004-0.91l-3.3702-0.674 c-0.6515-0.1303-0.8949-0.9342-0.4251-1.404l2.6321-2.6321c0.624-0.624,1.4704-0.9746,2.3529-0.9746h3.5777 c0.7522-0.9043,1.6371-1.8872,2.6911-2.9412c5.239-5.239,10-2.9412,10-2.9412s2.2978,4.761-2.9412,10 c-1.054,1.054-2.0369,1.9389-2.9412,2.6911V31.7646z M18.1661,31.8339c-1.1119-1.1119-2.9147-1.1119-4.0266,0 c-1.1119,1.1119-1.3212,4.7187-1.0067,5.0333c0.2936,0.2936,3.9213,0.1053,5.0333-1.0066 C19.278,34.7486,19.278,32.9459,18.1661,31.8339z' }),
        React.createElement('circle', { fill: '#231F20', cx: '29', cy: '21', r: '2' })
      )
    );
  }

});

module.exports = Icon;