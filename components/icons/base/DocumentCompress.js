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
      a11yTitleId: 'document-compress-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-document-compress';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "document-compress");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="document-compress"><rect id="_x2E_svg_199_" x="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M15.5,21v-8h13.0002L33.5,17.9999V35h-19 M27.5,13&#xA;&#x9;&#x9;v6h6 M26.5,19 M11.5,24h5v1l-4,4v1h5 M20.5,23v8 M24.5,24v7 M27.5,28c1.1046,0,2-0.8954,2-2s-0.8954-2-2-2h-3v4H27.5z"/></g></svg>
    );
  }

});

module.exports = Icon;
