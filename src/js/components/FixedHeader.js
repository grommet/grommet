// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var CLASS_ROOT = "fixed-header";

var FixedHeader = React.createClass({

  _onResize: function () {
    this.componentDidUpdate();
  },

  componentDidMount: function() {
    window.addEventListener("resize", this._onResize);
  },

  componentWillUnmount: function() {
    window.removeEventListener("resize", this._onResize);
  },

  componentDidUpdate: function() {
    // align fixed header width to its container
    var headerContainerElement = this.refs.headerContainer.getDOMNode();
    var headerElement = this.refs.header.getDOMNode();
    var rect = headerContainerElement.getBoundingClientRect();
    headerElement.style.width = '' + Math.floor(rect.right - rect.left) + 'px';
  },

  render: function() {
    var classes = [CLASS_ROOT + "__container"];
    if (this.props.className) {
      classes.push(this.props.className);
    }
    return (
      <div ref="headerContainer" className={classes.join(' ')}>
        <div ref="header" className={CLASS_ROOT}>
          {this.props.children}
        </div>
      </div>
    );
  }

});

module.exports = FixedHeader;
