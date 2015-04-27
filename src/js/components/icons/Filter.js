// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Filter = React.createClass({

  render: function() {
    var className = 'control-icon control-icon-filter';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1">
        <g strokeWidth="1" fillRule="evenodd">
          <path d="M12,12 L21,23 L21,34 L27,36 L27,23 L36,12 L12,12 Z"></path>
        </g>
      </svg>
    );
  }

});

module.exports = Filter;
