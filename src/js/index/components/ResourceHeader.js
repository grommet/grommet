// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var FixedHeader = require('../../components/FixedHeader');
var Menu = require('../../components/Menu');
var StatusIcon = require('../../components/icons/Status');

var CLASS_ROOT = 'resource-header';

var ResourceHeader = React.createClass({

  render: function() {
    var classes = [CLASS_ROOT];
    var resource = this.props.resource;
    var status = null;
    var name = '--';
    if (resource) {
      if (resource.status) {
        status = resource.status.toLowerCase();
      }
      name = resource.name;
      document.title = name;
    }

    var statusComponent = '';
    if (status) {
      statusComponent = (
        <div className={CLASS_ROOT + "__status"}>
          <StatusIcon key={status} className={CLASS_ROOT + '__status-icon'}
            value={status.toLowerCase()} />
        </div>
      );
      classes.push(CLASS_ROOT + "--status-" + status);
    }

    return (
      <FixedHeader className={this.props.className}>
        <div className={CLASS_ROOT}>
          {statusComponent}
          <div className={CLASS_ROOT + "__name"}>{name}</div>
          <div className={CLASS_ROOT + "__actions"}>
            <Menu label="Actions" items={this.props.actions}/>
          </div>
        </div>
      </FixedHeader>
    );
  }

});

module.exports = ResourceHeader;
