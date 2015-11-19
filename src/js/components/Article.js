// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var React = require('react');
var ReactDOM = require('react-dom');
var merge = require('lodash/object/merge');
var pick = require('lodash/object/pick');
var keys = require('lodash/object/keys');
var Box = require('./Box');
var KeyboardAccelerators = require('../utils/KeyboardAccelerators');
var DOM = require('../utils/DOM');
var Scroll = require('../utils/Scroll');
var SkipLinkAnchor = require('./SkipLinkAnchor');

var CLASS_ROOT = "article";

var Article = React.createClass({

  propTypes: merge({
    scrollStep: React.PropTypes.bool,
    primary: React.PropTypes.bool
  }, Box.propTypes),

  getDefaultProps: function () {
    return {
      pad: 'none',
      direction: 'column'
    };
  },

  componentDidMount: function () {
    if (this.props.scrollStep) {
      var articleElement = ReactDOM.findDOMNode(this.refs.component);
      this._scrollParent = DOM.findScrollParents(articleElement)[0];
      document.addEventListener('wheel', this._onWheel);
      KeyboardAccelerators.startListeningToKeyboard(this, {
        up: this._onUp,
        down: this._onDown
      });
    }
  },

  componentWillUnmount: function () {
    if (this.props.scrollStep) {
      document.removeEventListener('wheel', this._onWheel);
      KeyboardAccelerators.stopListeningToKeyboard(this, {
        up: this._onUp,
        down: this._onDown
      });
    }
  },

  _onWheel: function (event) {
    if (Math.abs(event.deltaY) > 100) {
      // The user is expressing a resolute interest in controlling the
      // scrolling behavior. Stop doing any of our scroll step aligning
      // until he stops expressing such interest.
      clearInterval(this._wheelTimer);
      clearInterval(this._wheelLongTimer);
      this._wheelLongTimer = setTimeout(function () {
        this._wheelLongTimer = null;
      }.bind(this), 2000);
    } else if (! this._wheelLongTimer) {
      if (event.deltaY > 5) {
        clearInterval(this._wheelTimer);
        this._wheelTimer = setTimeout(this._onDown, 50);
      } else if (event.deltaY < -5) {
        clearInterval(this._wheelTimer);
        this._wheelTimer = setTimeout(this._onUp, 50);
      }
    }
  },

  _onDown: function (event) {
    if (event) {
      event.preventDefault();
    }
    var articleElement = ReactDOM.findDOMNode(this.refs.component);
    var sections = articleElement.querySelectorAll('.section.box--full');
    for (var i = 0; i < sections.length; i += 1) {
      var section = sections[i];
      var rect = section.getBoundingClientRect();
      // 10 is for fuzziness
      if (rect.bottom > 10 && (event || rect.bottom < window.innerHeight)) {
        Scroll.scrollBy(this._scrollParent, 'scrollTop', rect.bottom);
        break;
      }
    }
  },

  _onUp: function (event) {
    if (event) {
      event.preventDefault();
    }
    var articleElement = ReactDOM.findDOMNode(this.refs.component);
    var sections = articleElement.querySelectorAll('.section.box--full');
    for (var i = 0; i < sections.length; i += 1) {
      var section = sections[i];
      var rect = section.getBoundingClientRect();
      // -10 is for fuzziness
      if ((rect.top >= -10 || i === (sections.length - 1)) &&
        (event || rect.top < window.innerHeight)) {
        if (i > 0) {
          section = sections[i - 1];
          rect = section.getBoundingClientRect();
          Scroll.scrollBy(this._scrollParent, 'scrollTop', rect.top);
        }
        break;
      }
    }
  },

  render: function() {
    var classes = [CLASS_ROOT];
    var other = pick(this.props, keys(Box.propTypes));
    if (this.props.scrollStep) {
      classes.push(CLASS_ROOT + "--scroll-step");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var skipLinkAnchor = null;
    if (this.props.primary) {
      skipLinkAnchor = <SkipLinkAnchor label="Main Content" />;
    }
    return (
      <Box ref="component" tag="article" {...other} className={classes.join(' ')}>
        {skipLinkAnchor}
        {this.props.children}
      </Box>
    );
  }
});

module.exports = Article;
