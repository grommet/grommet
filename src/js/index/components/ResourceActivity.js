// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var ResourceStore = require('../stores/ResourceStore');
var IndexActions = require('../actions/IndexActions');
var Timestamp = require('react-time');
var Meter = require('../../components/Meter');
var StatusIcon = require('../../components/icons/Status');

var ResourceActivity = React.createClass({

  _onChange: function() {
    var data = ResourceStore.getAll();
    if (data.uri === this.props.uri) {
      this.setState(data);
    }
  },

  getInitialState: function() {
    return ResourceStore.getAll();
  },

  componentDidMount: function() {
    ResourceStore.addChangeListener(this._onChange);
    // get data
    if (this.props.uri) {
      IndexActions.getResourceActivity(this.props.category, this.props.uri);
    }
  },

  componentWillUnmount: function() {
    ResourceStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var classes = ['resource-activity', 'list-block'];
    var messages = '';
    if (this.state.activity && this.state.activity.members &&
      this.state.activity.members.length > 0) {
      classes.push('resource-activity--active');
      messages = this.state.activity.members.map(function (activity) {
        var activityClasses = ['resource-activity__item', 'list-item',
          'resource-activity__item--' + activity.status.toLowerCase()];
        var progress = '';
        var status = null;
        if ('tasks' === activity.category) {
          if ('Running' === activity.state) {
            status = (
              <span className={'resource-activity__changing'}>
                <ChangingIcon />
              </span>
            );
          }
          progress = (
            <span className={'resource-activity__progress'}>
              <Meter total="100" value="80" units="%" />
            </span>
          );
        }
        if (! status) {
          status = (
           <span className={'resource-activity__status'}>
             <StatusIcon value={activity.status.toLowerCase()} />
           </span>
         );
        }
        return (
          <li key={activity.uri} className={activityClasses.join(' ')}>
            {status}
            <span className={'resource-activity__name'}>
              {activity.name}
            </span>
            {progress}
            <span className={'resource-activity__state'}>
              {activity.state}
            </span>
            <span className={'resource-activity__timestamp'}>
              <Timestamp value={new Date(activity.created)} format="M/D/YY h:mm:ss a" />
            </span>
          </li>
        );
      });
    }

    return (
      <ol className={classes.join(' ')}>
        {messages}
      </ol>
    );
  }

});

module.exports = ResourceActivity;
