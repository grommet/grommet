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
      a11yTitleId: 'volume-mute-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-volume-mute';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "volume-mute");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="volume-mute"><rect id="_x2E_svg_268_" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M13,24v-4h5l6-5v18l-6-5h-5V24"/><line fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" x1="28" y1="27.5" x2="35" y2="20.5"/><line fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" x1="28" y1="20.5" x2="35" y2="27.5"/></g></svg>
    );
  }

});

module.exports = Icon;
