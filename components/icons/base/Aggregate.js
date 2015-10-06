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
      a11yTitleId: 'aggregate-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-aggregate';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "aggregate");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="aggregate"><rect id="_x2E_svg_83_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M20.5,28c-4.1438,0-7.5-3.3562-7.5-7.5&#xA;&#x9;&#x9;c0-4.1437,3.3562-7.5,7.5-7.5c4.1437,0,7.5,3.3563,7.5,7.5 M28,20h-8v8h8V20z M20,27.5c0,4.1437,3.3563,7.5,7.5,7.5&#xA;&#x9;&#x9;s7.5-3.3563,7.5-7.5S31.6438,20,27.5,20 M28,20h-8v8h8V20z M28,20h-8v8h8V20z"/></g></svg>
    );
  }

});

module.exports = Icon;
