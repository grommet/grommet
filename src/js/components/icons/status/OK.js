// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var OK = React.createClass({

  render: function() {
    var className = 'status-icon status-icon-ok';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 24 24" version="1.1">
        <g className={"status-icon__base"} fill="#43A547">
          <path d="M0,4.4058651 L0,19.657478 C0,21.7548387 2.41428571,23.9929619 4.68571429,23.9929619 L19.4571429,23.9929619 C21.7285714,23.9929619 24,21.8956012 24,19.657478 L24,4.4058651 C24,2.3085044 21.7285714,0.0703812317 19.4571429,0.0703812317 L4.68571429,0.0703812317 C2.27142857,0.0703812317 0,2.16774194 0,4.4058651 L0,4.4058651 Z"></path>
        </g>
        <g className={"status-icon__detail"} fill="#FFFFFF" transform="translate(4.214286, 3.519062)">
          <path d="M0.0428571429,6.76363636 L0.0428571429,10.5431085 L6.86428571,15.4416422 L15.6642857,4.80703812 L15.6642857,0.0492668622 L6.15,11.2469208 L0.0428571429,6.76363636 Z"></path>
        </g>
      </svg>
    );
  }

});

module.exports = OK;
