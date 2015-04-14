// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Logo = React.createClass({

  render: function() {
    return (
      <svg width="46px" height="40px" viewBox="0 0 46 40" version="1.1">
        <g strokeLinecap="round" fill="none" fillRule="evenodd">
          <circle stroke="#666666" strokeWidth="2" cx="38" cy="31" r="6"></circle>
          <circle stroke="#999999" strokeWidth="6" cx="9" cy="9" r="6"></circle>
          <circle stroke="#CCCCCC" strokeWidth="5" cx="31" cy="20" r="12"></circle>
          <circle stroke="#000000" strokeWidth="3" cx="14" cy="20" r="12"></circle>
        </g>
      </svg>
    );
  }

});

module.exports = Logo;
