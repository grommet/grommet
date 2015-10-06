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
      a11yTitleId: 'deliver-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-deliver';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "deliver");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="deliver"><rect id="_x2E_svg_85_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M15.6875,29h-2V15h14v4v10h-7 M27.6875,29&#xA;&#x9;&#x9;L27.6875,29 M32.6875,29h3v-6l-4-4h-4 M18.1875,27c-1.3807,0-2.5,1.1193-2.5,2.5s1.1193,2.5,2.5,2.5c1.3807,0,2.5-1.1193,2.5-2.5&#xA;&#x9;&#x9;S19.5682,27,18.1875,27z M30.1875,27c-1.3807,0-2.5,1.1193-2.5,2.5s1.1193,2.5,2.5,2.5c1.3807,0,2.5-1.1193,2.5-2.5&#xA;&#x9;&#x9;S31.5682,27,30.1875,27z"/></g></svg>
    );
  }

});

module.exports = Icon;
