// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Logo = React.createClass({

  render: function() {
    var className = [];
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} height="27" viewBox="0 0 30 27" version="1.1">
        <g strokeWidth="4" fill="none" fillRule="evenodd">
          <rect stroke="#4A4A4A" x="9" y="10" width="19" height="15"></rect>
          <g className="doc-brand">
            <rect x="2" y="2" width="19" height="15"></rect>
          </g>
        </g>
      </svg>
    );
  }

});

module.exports = Logo;
