// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var CLASS_ROOT = "header";

var Header = React.createClass({

  propTypes: {
    colorIndex: React.PropTypes.string,
    fixed: React.PropTypes.bool,
    float: React.PropTypes.bool,
    flush: React.PropTypes.bool,
    large: React.PropTypes.bool,
    primary: React.PropTypes.bool,
    small: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      flush: true,
      large: false,
      primary: false,
      small: false
    };
  },

  _onResize: function () {
    this._alignMirror();
  },

  _alignMirror: function () {
    var contentElement = this.refs.content.getDOMNode();
    var mirrorElement = this.refs.mirror.getDOMNode();

    // constrain fixed content to the width of the mirror
    var mirrorRect = mirrorElement.getBoundingClientRect();
    contentElement.style.width = '' + Math.floor(mirrorRect.width) + 'px';

    // align the mirror height with the content's height
    var contentRect = contentElement.getBoundingClientRect();
    mirrorElement.style.height = '' + Math.floor(contentRect.height) + 'px';
  },

  componentDidMount: function () {
    if (this.props.fixed) {
      this._alignMirror();
      window.addEventListener('resize', this._onResize);
    }
  },

  componentDidUpdate: function () {
    if (this.props.fixed) {
      this._alignMirror();
    }
  },

  componentWillUnmount: function () {
    if (this.props.fixed) {
      window.removeEventListener('resize', this._onResize);
    }
  },

  render: function() {
    var classes = [CLASS_ROOT];
    if (this.props.primary) {
      classes.push(CLASS_ROOT + "--primary");
    }
    if (this.props.fixed) {
      classes.push(CLASS_ROOT + "--fixed");
    }
    if (this.props.float) {
      classes.push(CLASS_ROOT + "--float");
    }
    if (this.props.flush) {
      classes.push(CLASS_ROOT + "--flush");
    }
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.small) {
      classes.push(CLASS_ROOT + "--small");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var mirror = null;
    if (this.props.fixed) {
      mirror = <div ref="mirror" className={CLASS_ROOT + "__mirror"}></div>;
    }

    var content = (
      <div ref="content" className={CLASS_ROOT + "__content"}>
        {this.props.children}
      </div>
    );
    if (this.props.colorIndex || this.props.fixed) {
      var wrapperClasses = [CLASS_ROOT + "__wrapper"];
      if (this.props.colorIndex) {
        wrapperClasses.push("background-color-index-" +
          this.props.colorIndex);
      }

      content = (
        <div className={wrapperClasses.join(' ')}>
          {content}
        </div>
      );
    }

    return (
      <header className={classes.join(' ')}>
        {mirror}
        {content}
      </header>
    );
  }

});

module.exports = Header;
