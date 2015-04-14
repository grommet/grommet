// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Help = React.createClass({

  render: function() {
    var className = 'icon-edit';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 24 24" version="1.1">
        <g fillRule="evenodd">
          <path d="M7.77539062,8.07275391 C7.77539062,4.74462891 11.7446289,4.9309082 11.7446289,4.9309082 C11.7446289,4.9309082 15.7138672,4.74462891 15.7138672,8.16113281 C15.7138672,11.5776367 12.9487305,11.5878902 11.7446289,13.1347656 C11.696818,13.1961869 11.7446289,14.1657715 11.7446289,15.3300781"
            strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"></path>
          <circle stroke="none" cx="12" cy="19.5" r="1.5"></circle>
        </g>
      </svg>
    );
  }

});

module.exports = Help;
