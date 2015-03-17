// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Timestamp = require('react-time');
var Meter = require('../../components/Meter');

var IndexActivity = React.createClass({

  render: function() {
    var member = this.props.member;
    var content;
    var progress;

    if (member._activity) {
      if (member._activity.members.length > 0) {
        var activity = member._activity.members[0];
        var classes = ['index-activity',
          'index-activity--' + activity.status.toLowerCase()];

        if ('tasks' === activity.category) {
          progress = (
            <span className={'index-activity__progress'}>
              <Meter total="100" value="80" units="%" />
            </span>
          );
        }

        content = (
          <div className={classes.join(' ')}>
            <span className={'index-activity__name'}>
              {activity.name}
            </span>
            {progress}
            <span className={'index-activity__timestamp'}>
              <Timestamp value={new Date(activity.created)} format="M/D/YY h:mm:ss a" />
            </span>
          </div>
        );
      } else {
        // we've checked and there is no activity to show
        content = (<span></span>);
      }
    } else {
      // we're not sure if we have activity yet, show awaiting data style
      content = (<span>{'--'}</span>);
    }
    return content;
  }

});

module.exports = IndexActivity;
