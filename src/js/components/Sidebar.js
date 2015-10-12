// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var merge = require('lodash/object/merge');
var pick = require('lodash/object/pick');
var keys = require('lodash/object/keys');
var Box = require('./Box');

var CLASS_ROOT = "sidebar";

var Sidebar = React.createClass({

  propTypes: merge({
    fixed: React.PropTypes.bool,
    primary: React.PropTypes.bool, // Deprecated
    size: React.PropTypes.oneOf(['small', 'medium', 'large']),
    small: React.PropTypes.bool // Deprecated
  }, Box.propTypes),

  getDefaultProps: function () {
    return {
      direction: 'column',
      primary: false
    };
  },

  getInitialState: function() {
    return this._stateFromProps(this.props);
  },

  componentWillReceiveProps: function (newProps) {
    this.setState(this._stateFromProps(newProps));
  },

  _stateFromProps: function (props) {
    return {size: props.size || (props.small ? 'small' : (props.large ? 'large' : null))};
  },

  render: function() {
    var classes = [CLASS_ROOT];
    var other = pick(this.props, keys(Box.propTypes));
    if (this.props.primary) {
      classes.push(CLASS_ROOT + "--primary");
    }
    if (this.props.fixed) {
      classes.push(CLASS_ROOT + "--fixed");
    }
    if (this.state.size) {
      classes.push(CLASS_ROOT + "--" + this.state.size);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <Box {...other} className={classes.join(' ')}>
        {this.props.children}
      </Box>
    );
  }

});

module.exports = Sidebar;
