// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Box = require('./Box');

var CLASS_ROOT = "tabs";

var Tabs = React.createClass({

  propTypes: {
    activeIndex: React.PropTypes.number
  },

  contextTypes: {
    intl: React.PropTypes.object.isRequired
  },

  getDefaultProps: function () {
    return {
      initialIndex: 0
    };
  },

  getInitialState: function () {
    return {
      activeIndex: this.props.initialIndex
    };
  },

  _activateTab: function (index) {
    this.setState({activeIndex: index});
  },

  render: function() {
    var classes = [CLASS_ROOT];

    var activeContainer;
    var activeTitle;

    var tabs = React.Children.map(this.props.children, function(tab, index) {

      var tabProps = tab.props || tab._store.props || {};

      var isTabActive = index === this.state.activeIndex;

      if (isTabActive) {
        activeContainer = tabProps.children;
        activeTitle = tabProps.title;
      }

      return React.cloneElement(tab, {
        active: isTabActive,
        id: 'tab-' + index,
        onRequestForActive: function () {
          this._activateTab(index);
        }.bind(this)
      });
    }.bind(this));

    var tabContentsLabel = this.context.intl.formatMessage({
      id: "Tab Contents", defaultMessage: "Tab Contents"
    });

    return (
      <div role="tablist">
        <ul className={classes.join(' ')}>
          {tabs}
        </ul>
        <div ref="tabContent" tabIndex="0" aria-labelledby="content_description"
          role="tabpanel">
          <title id="content_description">
            {activeTitle + ' ' + tabContentsLabel}
          </title>
          <Box className={CLASS_ROOT + '__content'} aria-labelledby="content_description">
            {activeContainer}
          </Box>
        </div>
      </div>
    );
  }

});

module.exports = Tabs;
