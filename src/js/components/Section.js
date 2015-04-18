// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Section = React.createClass({

  propTypes: {
    compact: React.PropTypes.bool,
    colorIndex: React.PropTypes.number,
    texture: React.PropTypes.string
  },

  render: function() {
    var classes = ["section"];
    var contentClasses = ["section__content"];

    if (this.props.compact) {
      classes.push("section--compact");
    }
    if (this.props.colorIndex) {
      classes.push("background-color-index-" + this.props.colorIndex);
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
