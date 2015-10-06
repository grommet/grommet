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
      a11yTitleId: 'dislike-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-dislike';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "dislike");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="dislike"><rect id="_x2E_svg_269_" x="0" fill="none" width="48" height="48"/><path id="thumb" fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M29,13h6v12h-6V13z M29,13H16&#xA;&#x9;&#x9;c-1.6569,0-3,1.3431-3,3v10h7v6c0,1.6569,1.2431,3,2.9,3H25v-7.1c0-1.6569,1.3431-2.9,3-2.9h1"/></g></svg>
    );
  }

});

module.exports = Icon;
