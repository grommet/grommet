// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var StatusIcon = require('../icons/Status');
var IntlMixin = require('../../mixins/GrommetIntlMixin');

var Alert = React.createClass({

  mixins: [IntlMixin],

  propTypes: {
    associatedResource: React.PropTypes.node,
    resource: React.PropTypes.object.isRequired
  },

  render: function () {
    var resource = this.props.resource;
    var status = resource.status || 'unknown';
    var createdDate;
    if (resource.created) {
      createdDate = this.getGrommetFormattedDate(resource.created);
    }

    return (
      <div className="alert">
        <div>
          <StatusIcon value={status.toLowerCase()} large={true} />
          <h3>{resource.name}</h3>
        </div>
        <span className="alert__timestamp">{createdDate}</span>
        {this.props.associatedResource}
      </div>
    );
  }

});

module.exports = Alert;
