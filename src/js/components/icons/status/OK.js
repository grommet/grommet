// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var OK = React.createClass({

  render: function() {
    var className = 'status-icon-ok';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 384 384" version="1.1">
      	<g className={"status-icon__base"} fill="#43A547">
          <path d="M22,83.6v216.7c0,29.8,33.8,61.6,65.6,61.6h206.8c31.8,0,63.6-29.8,63.6-61.6V83.6
	c0-29.8-31.8-61.6-63.6-61.6H87.6C53.8,22,22,51.8,22,83.6z"/>
        </g>
        <g className={"status-icon__detail"} fill="#FFFFFF">
          <polygon points="81.6,167.1 81.6,220.8 177.1,290.4 300.3,139.3 300.3,71.7 167.1,230.8 "/>
      	</g>
      </svg>
    );
  }

});

module.exports = OK;
