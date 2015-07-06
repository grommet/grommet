// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Logo = React.createClass({

  render: function() {
    var className = 'logo-icon';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1">
        <rect y="0" fill="#08AA83" width="48" height="48"/>
        <circle fill="none" stroke="#FFFFFF" strokeWidth="2" strokeMiterlimit="10" cx="24" cy="18" r="5"/>
        <path fill="none" stroke="#FFFFFF" strokeWidth="2" strokeMiterlimit="10" d="M32,35H16v-4c0-4.4,3.6-8,8-8h0c4.4,0,8,3.6,8,8V35z"/>
      </svg>
    );
  }

});

module.exports = Logo;
