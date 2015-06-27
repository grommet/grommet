// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var CLASS_ROOT = "section";

var Section = React.createClass({

  propTypes: {
    centered: React.PropTypes.bool,
    compact: React.PropTypes.bool,
    colorIndex: React.PropTypes.string,
    direction: React.PropTypes.oneOf(['up', 'down', 'left', 'right']),
    flush: React.PropTypes.bool,
    full: React.PropTypes.bool,
    texture: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      colored: false,
      direction: 'down',
      flush: true,
      small: false
    };
  },

  render: function() {
    var classes = [CLASS_ROOT];
    var contentClasses = [CLASS_ROOT + "__content"];

    if (this.props.compact) {
      classes.push(CLASS_ROOT + "--compact");
    }
    if (this.props.centered) {
      classes.push(CLASS_ROOT + "--centered");
    }
    if (this.props.flush) {
      classes.push(CLASS_ROOT + "--flush");
    }
    if (this.props.full) {
      classes.push(CLASS_ROOT + "--full");
    }
    if (this.props.direction) {
      classes.push(CLASS_ROOT + "--" + this.props.direction);
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
