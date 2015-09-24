// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var KeyboardAccelerators = require('../mixins/KeyboardAccelerators');
var Box = require('./Box');

var CLASS_ROOT = "tabs";

var Tabs = React.createClass({

  propTypes: {
    activeIndex: React.PropTypes.number
  },

  mixins: [KeyboardAccelerators],

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

  componentDidMount: function () {
    this.startListeningToKeyboard({
      enter: this._processTab
    });
  },

  componentWillUnmount: function () {
    this.stopListeningToKeyboard({
      enter: this._processTab
    });
  },

  _processTab: function(event) {
    var tabs = this.refs.tabs.getDOMNode().childNodes;
    Array.prototype.forEach.call(tabs, function (currentTab, index) {
      if (currentTab === event.target) {
        this._activateTab(index);
      }
    }.bind(this));
  },

  _activateTab: function (index) {
    this.setState({activeIndex: index});
  },

  render: function() {
    var classes = [CLASS_ROOT];

    var activeContainer;

    var tabs = React.Children.map(this.props.children, function(tab, index) {

      var tabProps = tab.props || tab._store.props || {};

      var isTabActive = index === this.state.activeIndex;

      if (isTabActive) {
        activeContainer = tabProps.children;
      }

      return React.cloneElement(tab, {
        active: isTabActive,
        id: 'tab-' + index,
        onRequestForActive: function () {
          this._activateTab(index);
        }.bind(this)
      });
    }.bind(this));

    return (
      <div role="tablist">
        <ul ref="tabs" className={classes.join(' ')}>
          {tabs}
        </ul>
        <div ref="tabContent" aria-labelledby={"tabs-" + this.state.activeIndex}
          role="tabpanel" tabIndex="0">
          <Box className={CLASS_ROOT + '__content'} >
            {activeContainer}
          </Box>
        </div>
      </div>
    );
  }

});

module.exports = Tabs;
