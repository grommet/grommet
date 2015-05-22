// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var StatusIcon = require('../icons/Status');
var IntlMixin = require('../../mixins/GrommetIntlMixin');
var ReactIntl = require('react-intl');
var FormattedDate = ReactIntl.FormattedDate;

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
      createdDate = (<FormattedDate ref="dateCreated"
            value={new Date(resource.created)}
            day="numeric"
            month="numeric"
            year="numeric"
            hour="numeric"
            minute="numeric"
            second="numeric" />);
    }

    return (
      <div className="alert">
        <div>
          <StatusIcon value={status.toLowerCase()} large={true} />
          <h3>{resource.name}</h3>
        </div>
        {createdDate}
        {this.props.associatedResource}
      </div>
    );
  }

});

module.exports = Alert;
