// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Help = React.createClass({

  render: function() {
    var className = 'control-icon control-icon-help';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1">
        <g fillRule="evenodd">
          <path d="M19.77539062,20.07275391 C19.77539062,16.74462891 23.7446289,16.9309082 23.7446289,16.9309082 C23.7446289,16.9309082 27.7138672,16.74462891 27.7138672,20.16113281 C27.7138672,23.5776367 24.9487305,23.5878902 23.7446289,25.1347656 C23.696818,25.1961869 23.7446289,26.1657715 23.7446289,27.3300781"
            strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"></path>
          <circle stroke="none" cx="24" cy="31.5" r="1.5"></circle>
        </g>
      </svg>
    );
  }

});

module.exports = Help;
