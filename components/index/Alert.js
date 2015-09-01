// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Section = require('../Section');
var Header = require('../Header');
var StatusIcon = require('../icons/Status');
var IntlMixin = require('../../mixins/GrommetIntlMixin');

var Alert = React.createClass({

  propTypes: {
    associatedResource: React.PropTypes.node,
    resource: React.PropTypes.object.isRequired
  },

  mixins: [IntlMixin],

  render: function () {
    var resource = this.props.resource;
    var status = resource.status || 'unknown';
    var createdDate;
    if (resource.created) {
      createdDate = this.getGrommetFormattedDate(resource.created);
    }

    return (
      <Section className="alert" pad={{horizontal: "medium"}}>
        <Header>
          <span>
            <StatusIcon value={status.toLowerCase()} large={true} />
            <h3>{resource.name}</h3>
          </span>
        </Header>
        <span className="alert__timestamp">{createdDate}</span>
        {this.props.associatedResource}
      </Section>
    );
  }

});

module.exports = Alert;
