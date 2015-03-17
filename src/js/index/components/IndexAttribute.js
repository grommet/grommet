// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var _ = require('lodash');
var React = require('react');
var IndexActivity = require('../components/IndexActivity');
var StatusIcon = require('../../components/icons/Status');
var Timestamp = require('react-time');

var IndexAttribute = React.createClass({

  render: function() {
    var member = this.props.member;
    var attribute = this.props.attribute;
    var content = (<span>'?'</span>);
    var value;

    //console.log('!!! IndexAttribute render', attribute.name, attribute);
    if (attribute.hasOwnProperty('render')) {

      content = attribute.render(member);

    } else {

      if (member.hasOwnProperty(attribute.name)) {
        value = member[attribute.name];
      } else if (member.attributes &&
        member.attributes.hasOwnProperty(attribute.name)) {
        value = member.attributes[attribute.name];
      }

      if ('status' === attribute.name) {
        content = (
          <StatusIcon className={'index-attribute__status-icon'}
            value={value.toLowerCase()} small={true} />
        );
      } else if ('created' === attribute.name || 'modified' === attribute.name) {
        content = (
          <Timestamp value={new Date(value)} format="MM/DD/YY h:mm:ss a" />
        );
      } else if ('_activity' === attribute.name) {
        content = (
          <IndexActivity member={member}/>
        )
      } else {
        content = (<span>{value}</span>);
      }
    }

    return content;
  }

});

module.exports = IndexAttribute;
