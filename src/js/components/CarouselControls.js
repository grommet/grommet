// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var React = require('react');
var Box = require('./Box');

var CLASS_ROOT = "carousel-controls";

var CarouselControls = React.createClass({

  propTypes: {
    count: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func,
    selected: React.PropTypes.number
  },

  _onClick: function (index) {
    if (this.props.onChange) {
      this.props.onChange(index);
    }
  },

  render: function () {
    var controls = [];
    for (var index=1; index<=this.props.count; index++) {
      var controlClasses = [CLASS_ROOT + "__control"];
      if (index === this.props.selected) {
        controlClasses.push(CLASS_ROOT + "__control--active");
      }
      controls.push(
        <svg key={index} className={controlClasses.join(' ')} version="1.1"
          viewBox="0 0 24 24" width="24px" height="24px"
          onClick={this._onClick.bind(this, index)}>
          <circle cx={12} cy={12} r={6}></circle>
        </svg>
      );
    }

    return (
      <Box className={CLASS_ROOT} direction="row" justify="center" responsive={false}>
        {controls}
      </Box>
    );
  }

});

module.exports = CarouselControls;
