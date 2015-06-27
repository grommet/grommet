// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Top = require('./icons/Top');

var CLASS_ROOT = "footer";

var Footer = React.createClass({

  propTypes: {
    centered: React.PropTypes.bool,
    colorIndex: React.PropTypes.string,
    flush: React.PropTypes.bool,
    large: React.PropTypes.bool,
    primary: React.PropTypes.bool,
    scrollTop: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      flush: true
    };
  },

  _updateState: function () {
    this.setState({scrolled: this._scrollable.scrollTop > 0});
  },

  _onClickTop: function() {
    this._scrollable.scrollTop = 0;
  },

  _onScroll: function() {
    // debounce
    clearTimeout(this._scrollTimer);
    this._scrollTimer = setTimeout(this._updateState, 10);
  },

  getInitialState: function () {
    return {scrolled: false};
  },

  componentDidMount: function () {
    this._scrollable = this.refs.footer.getDOMNode().parentNode.parentNode;
    this._scrollable.addEventListener("scroll", this._onScroll);
  },

  componentWillUnmount: function () {
    this._scrollable.removeEventListener("scroll", this._onScroll);
  },

  componentWillReceiveProps: function() {
    this.setState({scrolled: false});
  },

  componentDidUpdate: function() {
    if (!this.state.scrolled) {
      this._scrollable.scrollTop = 0;
    }
  },

  render: function() {
    var classes = [CLASS_ROOT];
    if (this.props.primary) {
      classes.push(CLASS_ROOT + "--primary");
    }
    if (this.props.centered) {
      classes.push(CLASS_ROOT + "--centered");
    }
    if (this.props.flush) {
      classes.push(CLASS_ROOT + "--flush");
    }
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("background-color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var top = null;
    if (this.props.scrollTop && this.state.scrolled) {
      top = (
        <div className={CLASS_ROOT + "__top control-icon"}
          onClick = {this._onClickTop}>
          <Top />
        </div>
      );
    }

    return (
      <div ref="footer" className={classes.join(' ')}>
        <div className={CLASS_ROOT + "__content"}>
          {this.props.children}
          {top}
        </div>
      </div>
    );
  }

});

module.exports = Footer;
