// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var StatusIcon = require('../icons/Status');
var Timestamp = require('react-time');

var Alert = React.createClass({

  propTypes: {
    associatedResource: React.PropTypes.node,
    resource: React.PropTypes.object.isRequired
  },

  render: function () {
    var resource = this.props.resource;
    var status = resource.status || 'unknown';
    return (
      <div className="alert">
        <div>
          <StatusIcon value={status.toLowerCase()} large={true} />
          <h3>{resource.name}</h3>
        </div>
        <h4><Timestamp value={new Date(resource.created)} format="MM/DD/YY h:mm:ssa" /></h4>
        {this.props.associatedResource}
      </div>
    );
  }

});

module.exports = Alert;
