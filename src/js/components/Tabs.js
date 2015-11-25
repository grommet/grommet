// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var React = require('react');
var Intl = require('../utils/Intl');
var Box = require('./Box');

var CLASS_ROOT = "tabs";

var Tabs = React.createClass({

  propTypes: {
    activeIndex: React.PropTypes.number
  },

  contextTypes: {
    intl: React.PropTypes.object
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

    var tabContentTitle = Intl.getMessage(this.context.intl, 'Tab Contents', {
      activeTitle: activeTitle
    });

    // TODO: Since there could be multiple Tabs on the page, we need a more
    // robust means of identifying the association between title and aria label.
    return (
      <div role="tablist">
        <ul className={classes.join(' ')}>
          {tabs}
        </ul>
        <div ref="tabContent" tabIndex="0" aria-label={tabContentTitle}
          role="tabpanel">
          <Box className={CLASS_ROOT + '__content'}
            aria-label={tabContentTitle}>
            {activeContainer}
          </Box>
        </div>
      </div>
    );
  }

});

module.exports = Tabs;
