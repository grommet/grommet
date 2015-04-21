// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Section = React.createClass({

  propTypes: {
    compact: React.PropTypes.bool,
    colorIndex: React.PropTypes.string,
    direction: React.PropTypes.oneOf(['up', 'down', 'left', 'right']),
    centered: React.PropTypes.bool,
    texture: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      colored: false,
      direction: 'down',
      small: false
    };
  },

  render: function() {
    var classes = ["section"];
    var contentClasses = ["section__content"];

    if (this.props.compact) {
      classes.push("section--compact");
    }
    if (this.props.centered) {
      classes.push("section--centered");
    }
    if (this.props.direction) {
      classes.push("section--" + this.props.direction);
    }
    if (this.props.colorIndex) {
      classes.push("background-color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var style = {};
    if (this.props.texture) {
      style.backgroundImage = this.props.texture;
    }

    return (
      <div className={classes.join(' ')} style={style}>
        <div className={contentClasses.join(' ')}>
          {this.props.children}
        </div>
      </div>
    );
  }

});

module.exports = Section;
