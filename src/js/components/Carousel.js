// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var React = require('react');
var ReactDOM = require('react-dom');
var Box = require('./Box');

var CLASS_ROOT = "carousel";

var Carousel = React.createClass({

  getInitialState: function () {
    return {
      activeIndex: 0,
      priorIndex: 0,
      sequence: 1,
      width: 0
    };
  },

  componentDidMount: function() {
    this.setState({ width: ReactDOM.findDOMNode(this.refs.carousel).offsetWidth });
  },

  _onSelect: function (index) {
    if (index !== this.state.activeIndex) {
      console.log(index);
      this.setState({ activeIndex: index });
    }
  },

  // children should be an array of Tile
  render: function () {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var index = -1;
    const children = this.props.children.slice();
    // var slides = this.props.children.slice();
    // slides.unshift(React.cloneElement(children[children.length - 1], {
    //   key: -1
    // }));
    // slides.push(React.cloneElement(children[1], {
    //   key: children.length
    // }));

    var width = this.state.width;
    var trackWidth = width * children.length;

    var trackPosition = -(width * this.state.activeIndex);

    var controls = React.Children.map(this.props.children, function (child) {
      index += 1;
      var controlClasses = [CLASS_ROOT + "__control"];
      if (index === this.state.activeIndex) {
        controlClasses.push(CLASS_ROOT + "__control--active");
      }

      return (
        <svg className={controlClasses.join(' ')} viewBox="0 0 24 24" version="1.1"
          onClick={this._onSelect.bind(this, index)}>
          <circle cx={12} cy={12} r={6}></circle>
        </svg>
      );
    }, this);

    return (
      <Box ref="carousel" className={classes.join(' ')}>
        <div className={CLASS_ROOT + "__track"} style={{ width: trackWidth, left: trackPosition }}>
          {children}
        </div>
        <Box className={CLASS_ROOT + "__controls"} direction="row" justify="center">
          {controls}
        </Box>
      </Box>
    );
  }

});

module.exports = Carousel;
