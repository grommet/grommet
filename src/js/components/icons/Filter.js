// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var IntlMixin = require('../../mixins/GrommetIntlMixin');
var uuid = require('node-uuid');

var Filter = React.createClass({

  propTypes: {
    a11yTitle: React.PropTypes.string,
    notifications: React.PropTypes.number
  },

  mixins: [IntlMixin],

  render: function() {
    var className = 'control-icon control-icon-filter';
    var a11yTitle = this.getGrommetIntlMessage(this.props.a11yTitle);
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    if (typeof this.props.a11yTitle === "undefined") {
      // this.props.a11yTitle emplty string is an acceptable value only if undefined
      // should it use the default title value
      a11yTitle = this.getGrommetIntlMessage('Filter');
    }
    var filterTitleId = 'ok-title-' + uuid.v1();

    var badge = null;
    if (this.props.notifications) {
      badge = (
        <g className="control-icon__badge">
          <circle stroke="none" cx="37" cy="11" r="10"/>
          <text x="33.5" y="16" fontSize={16}>{this.props.notifications}</text>
        </g>
      );
    }

    return (
      <svg role="image" className={className} aria-labelledby={filterTitleId} viewBox="0 0 48 48" version="1.1">
        <title id={filterTitleId}>{a11yTitle}</title>
        <g fill="none">
          <polygon role="presentation" strokeWidth="2" points="14,15 24,27 34,15 	"/>
          <line strokeWidth="2" x1="24" y1="27" x2="24" y2="34"/>
        </g>
        {badge}
      </svg>
    );
  }

});

module.exports = Filter;
