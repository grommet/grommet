// (C) Copyright 2014-2015 Hewlett-Packard Development Company

var React = require('react');
var IntlMixin = require('../../../mixins/GrommetIntlMixin');

var Icon = React.createClass({

  propTypes: {
    a11yTitle: React.PropTypes.string,
    a11yTitleId: React.PropTypes.string
  },

  mixins: [IntlMixin],

  getDefaultProps: function () {
    return {
      a11yTitleId: 'threats-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-threats';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "threats");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="threats"><rect id="_x2E_svg_94_" x="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M21,20v-2h6v2v0.58c2.93,1.19,5,4.06,5,7.42&#xA;&#x9;&#x9;c0,4.42-3.58,8-8,8s-8-3.58-8-8c0-3.36,2.07-6.23,5-7.42V20z M34,13v1c0,1.1046-0.8954,2-2,2h-1c-1.1046,0-2-0.8954-2-2v0&#xA;&#x9;&#x9;c0-1.1046-0.8954-2-2-2h-1c-1.1046,0-2,0.8954-2,2v4 M27,31l-6-6 M21,31l6-6"/></g></svg>
    );
  }

});

module.exports = Icon;
