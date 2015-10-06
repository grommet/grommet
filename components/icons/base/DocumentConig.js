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
      a11yTitleId: 'document-conig-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-document-conig';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "document-conig");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="document-conig"><rect id="_x2E_svg_198_" x="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M15,23V13h13.0002L33,17.9999V35h-8 M27,13v6h6&#xA;&#x9;&#x9; M26,19 M21,30c0-1.6542-1.3455-3-3-3s-3,1.3458-3,3s1.3455,3,3,3S21,31.6542,21,30z M21,30.0001L24,30 M20.1212,32.1214&#xA;&#x9;&#x9;l2.1214,2.1212 M18,36l-0.0001-3 M15.8786,32.1212l-2.1212,2.1214 M12,30h3 M15.8787,27.8787l-2.1213-2.1213 M18,27v-3&#xA;&#x9;&#x9; M22.2426,25.7574l-2.1213,2.1213"/></g></svg>
    );
  }

});

module.exports = Icon;
