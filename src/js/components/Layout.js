// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Layout = React.createClass({

  propTypes: {
    centerColumn: React.PropTypes.bool,
    compact: React.PropTypes.bool,
    accentIndex: React.PropTypes.number,
    texture: React.PropTypes.string
  },

  render: function() {
    var classes = ["layout"];
    var contentClasses = ["layout__content"];

    if (this.props.centerColumn) {
      classes.push("center-column");
      contentClasses.push("center-column__content");
    }
    if (this.props.compact) {
      classes.push("layout--compact");
    }
    if (this.props.accentIndex) {
      classes.push("accent-background-" + this.props.accentIndex);
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

module.exports = Layout;
