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
      a11yTitleId: 'circular-view-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-circular-view';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "circular-view");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="circular-view"><rect id="_x2E_svg_168_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M26.7574,15.5c0,1.3807-1.1193,2.5-2.5,2.5&#xA;&#x9;&#x9;c-1.3807,0-2.5-1.1193-2.5-2.5s1.1193-2.5,2.5-2.5C25.6381,13,26.7574,14.1193,26.7574,15.5z M32.2574,17&#xA;&#x9;&#x9;c-1.3807,0-2.5,1.1193-2.5,2.5s1.1193,2.5,2.5,2.5c1.3807,0,2.5-1.1193,2.5-2.5S33.6381,17,32.2574,17z M32.2574,26&#xA;&#x9;&#x9;c-1.3807,0-2.5,1.1193-2.5,2.5s1.1193,2.5,2.5,2.5c1.3807,0,2.5-1.1193,2.5-2.5S33.6381,26,32.2574,26z M16.2574,17&#xA;&#x9;&#x9;c-1.3807,0-2.5,1.1193-2.5,2.5s1.1193,2.5,2.5,2.5s2.5-1.1193,2.5-2.5S17.6381,17,16.2574,17z M16.2574,26&#xA;&#x9;&#x9;c-1.3807,0-2.5,1.1193-2.5,2.5s1.1193,2.5,2.5,2.5s2.5-1.1193,2.5-2.5S17.6381,26,16.2574,26z M24.2574,30&#xA;&#x9;&#x9;c-1.3807,0-2.5,1.1193-2.5,2.5c0,1.3807,1.1193,2.5,2.5,2.5c1.3807,0,2.5-1.1193,2.5-2.5C26.7574,31.1193,25.6381,30,24.2574,30z"/></g></svg>
    );
  }

});

module.exports = Icon;
