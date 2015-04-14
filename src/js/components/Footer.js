// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Top = require('./icons/Top');

var Footer = React.createClass({

  propTypes: {
    centerColumn: React.PropTypes.bool,
    primary: React.PropTypes.bool,
    scrollTop: React.PropTypes.bool
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
    var classes = ["footer"];
    var contentClasses = ["footer__content"];
    if (this.props.centerColumn) {
      classes.push("center-column");
      contentClasses.push("center-column__content");
    }
    if (this.props.primary) {
      classes.push("footer--primary");
    }

    var top = null;
    if (this.props.scrollTop && this.state.scrolled) {
      top = (
        <div className="footer__top control-icon"
          onClick = {this._onClickTop}>
          <Top />
        </div>
      );
    }

    return (
      <div ref="footer" className={classes.join(' ')}>
        <div className={contentClasses.join(' ')}>
          {this.props.children}
          {top}
        </div>
      </div>
    );
  }

});

module.exports = Footer;
