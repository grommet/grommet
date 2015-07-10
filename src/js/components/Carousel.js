// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var CLASS_ROOT = "carousel";

var Carousel = React.createClass({

  propTypes: {
    auto: React.PropTypes.bool,
    single: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {single: true};
  },

  _onSelect: function (index) {
    this.setState({activeIndex: index});
  },

  getInitialState: function () {
    return {activeIndex: 0};
  },

  // children should be an array of Tile
  render: function () {
    var classes = [CLASS_ROOT];
    if (this.props.single) {
      classes.push(CLASS_ROOT + "--single");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var index = -1;
    var activeChild;
    var controls = React.Children.map(this.props.children, function (child) {
      index += 1;
      var controlClasses = [CLASS_ROOT + "__control"];
      if (index === this.state.activeIndex) {
        controlClasses.push(CLASS_ROOT + "__control--active");
        activeChild = child;
      }
      return (
        <svg className={controlClasses.join(' ')} viewBox="0 0 24 24" version="1.1"
          onClick={this._onSelect.bind(this, index)}>
          <circle cx={12} cy={12} r={6}></circle>
        </svg>
      );
    }, this);

    return (
      <div className={classes.join(' ')}>
        {activeChild}
        <div className={CLASS_ROOT + "__controls"}>
          {controls}
        </div>
      </div>
    );
  }

});

module.exports = Carousel;
