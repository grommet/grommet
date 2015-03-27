// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var React = require('react');

var Hero = React.createClass({

  propTypes: {
    texture: React.PropTypes.string
  },

  render: function() {
    var classes = ["hero"];
    var style = {};
    if (this.props.texture) {
      style['background-image'] = this.props.texture;
    }

    return (
      <div className={classes.join(' ')} style={style}>
        <div className="hero__container">
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = Hero;
