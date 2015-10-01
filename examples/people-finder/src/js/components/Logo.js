// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Logo = React.createClass({

  propTypes: {
    reverse: React.PropTypes.bool
  },

  render: function() {
    var className = 'logo-icon';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    var stroke = '#00B388';
    if (this.props.reverse) {
      stroke = '#ffffff';
    }

    return (
      <svg className={className} viewBox="0 0 130 108" version="1.1">
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(2.000000, 3.000000)" stroke={stroke} strokeWidth="5">
            <ellipse cx="63.1" cy="36.8" rx="20.8" ry="21"></ellipse>
            <path d="M94.4,105 L94.4,88.8 C94.4,70.9 80.7,57.8 62.9,57.8 L63.6,57.8 C45.8,57.8 31.9,70.9 31.9,88.8 L31.9,105"></path>
            <path d="M77.5,105 L77.5,88.8"></path>
            <path d="M48.8,88.8 L48.8,105"></path>
            <path d="M83.8,39.1 C83.9,39.1 83.9,39.2 83.9,39.2 C86.9,41 90.5,42.1 94.2,42.1 L94.5,42.1 C106,42.1 115.3,32.7 115.3,21.1 C115.3,9.5 106,0.1 94.5,0.1 C83.8,0.1 74.9,8.3 73.8,18.8"></path>
            <path d="M52.6,18.8 C51.5,8.3 42.7,0.1 31.9,0.1 C20.4,0.1 11.1,9.5 11.1,21.1 C11.1,32.7 20.4,42.1 31.9,42.1 L32.2,42.1 C35.9,42 39.4,41 42.5,39.2 C42.6,39.2 42.6,39.1 42.6,39.1"></path>
            <path d="M125.6,89.3 L125.6,73.1 C125.6,55.2 111.9,42.1 94.1,42.1 L94.3,42.1"></path>
            <path d="M108.7,89.3 L108.7,73.1"></path>
            <path d="M31.9,42.1 L32.2,42.1 C35.9,42 39.4,41 42.5,39.2 C42.6,39.2 42.6,39.1 42.6,39.1"></path>
            <path d="M31.9,42.1 L32.1,42.1 C14.3,42.1 0.6,55.2 0.6,73.1 L0.6,89.3"></path>
            <path d="M17.5,73.1 L17.5,89.3"></path>
            <path d="M114.9,24.6 C107.8,24.5 101.5,20.8 97.8,15.2 C94.1,20.9 87.7,24.6 80.4,24.6"></path>
            <path d="M25.8,15.8 L25.8,1.3"></path>
            <path d="M38,15.8 L38,1.3"></path>
            <path d="M4,15.8 L63.2,15.8"></path>
          </g>
        </g>
      </svg>
    );
  }

});

module.exports = Logo;
