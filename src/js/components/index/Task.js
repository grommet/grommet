// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var StatusIcon = require('../icons/Status');
var IntlMixin = require('../../mixins/GrommetIntlMixin');

var Task = React.createClass({

  propTypes: {
    associatedResource: React.PropTypes.node,
    resource: React.PropTypes.object.isRequired
  },

  mixins: [IntlMixin],

  render: function () {
    var resource = this.props.resource;
    var status = resource.status || this.getGrommetIntlMessage('Unknown');
    return (
      <div>
        <div>
          <StatusIcon value={status.toLowerCase()} large={true} />
          <h3>{resource.name}</h3>
        </div>
        <h4>{this.getGrommetFormattedDate(resource.created)}</h4>
        {this.props.associatedResource}
      </div>
    );
  }

});

module.exports = Task;
