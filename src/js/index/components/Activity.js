// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Index = require('../components/Index');
var IndexRouter = require('../utils/IndexRouter');
var Link = require('../../components/Link');

var Activity = React.createClass({

  render: function() {
    return (
      <Index category={['alerts', 'tasks']}
        sort={"created:desc"}
        hideAttributes={['associatedResourceUri', 'associatedResourceCategory']}
        attributes={[
          {name: 'status', label: 'Status', filter: true},
          {name: 'name', label: 'Name'},
          {
            name: 'associatedResourceName',
            label: 'Resource',
            hasLink: true,
            render: function (item) {
              var href = IndexRouter.resourceHref(
                item.attributes.associatedResourceCategory,
                item.attributes.associatedResourceUri);
              var content;
              if (href) {
                content = (
                  <Link href={href}>
                    {item.attributes.associatedResourceName}
                  </Link>
                );
              } else {
                content = (
                  <a>{item.attributes.associatedResourceName}</a>
                );
              }
              return content;
            }
          },
          {name: 'created', label: 'Time'},
          {name: 'state', label: 'State', filter: true}
        ]}
        />
    );
  }

});

module.exports = Activity;
