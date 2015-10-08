// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var merge = require('lodash/object/merge');
var pick = require('lodash/object/pick');
var keys = require('lodash/object/keys');
var Box = require('./Box');
var KeyboardAccelerators = require('../mixins/KeyboardAccelerators');
var DOM = require('../utils/DOM');
var Scroll = require('../utils/Scroll');
var SkipLinkAnchor = require('./SkipLinkAnchor');

var CLASS_ROOT = "article";

var Article = React.createClass({
  displayName: 'Article',

  propTypes: merge({
    scrollStep: React.PropTypes.bool,
    primary: React.PropTypes.bool
  }, Box.propTypes),

  mixins: [KeyboardAccelerators],

  getDefaultProps: function getDefaultProps() {
    return {
      pad: 'none',
      direction: 'column'
    };
  },

  componentDidMount: function componentDidMount() {
    if (this.props.scrollStep) {
      this._markInactive();
      var articleElement = this.refs.component.getDOMNode();
      this._scrollParent = DOM.findScrollParents(articleElement)[0];
      document.addEventListener('wheel', this._onWheel);
      this._scrollParent.addEventListener('scroll', this._onScroll);
      this.startListeningToKeyboard({
        up: this._onUp,
        down: this._onDown
      });
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    if (this.props.scrollStep) {
      document.removeEventListener('wheel', this._onWheel);
      clearInterval(this._scrollToTimer);
      this._scrollParent.removeEventListener('scroll', this._onScroll);
      clearTimeout(this._scrollTimer);
      this.stopListeningToKeyboard({
        up: this._onUp,
        down: this._onDown
      });
    }
  },

  _markInactive: function _markInactive() {
    var articleElement = this.refs.component.getDOMNode();
    var sections = articleElement.querySelectorAll('.section.box--full');
    for (var i = 0; i < sections.length; i += 1) {
      var section = sections[i];
      var rect = section.getBoundingClientRect();
      if (rect.top > window.innerHeight - 10) {
        section.classList.add('section--inactive');
      } else {
        section.classList.remove('section--inactive');
      }
    }
  },

  _onScroll: function _onScroll(event) {
    clearTimeout(this._scrollTimer);
    this._scrollTimer = setTimeout(this._markInactive, 50);
  },

  _onWheel: function _onWheel(event) {
    if (Math.abs(event.deltaY) > 100) {
      clearInterval(this._scrollTimer);
    } else if (event.deltaY > 5) {
      this._onDown();
    } else if (event.deltaY < -5) {
      this._onUp();
    }
  },

  _onDown: function _onDown(event) {
    if (event) {
      event.preventDefault();
    }
    var articleElement = this.refs.component.getDOMNode();
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

  _onUp: function _onUp(event) {
    if (event) {
      event.preventDefault();
    }
    var articleElement = this.refs.component.getDOMNode();
    var sections = articleElement.querySelectorAll('.section.box--full');
    for (var i = 0; i < sections.length; i += 1) {
      var section = sections[i];
      var rect = section.getBoundingClientRect();
      // -10 is for fuzziness
      if ((rect.top >= -10 || i === sections.length - 1) && (event || rect.top < window.innerHeight)) {
        if (i > 0) {
          section = sections[i - 1];
          rect = section.getBoundingClientRect();
          Scroll.scrollBy(this._scrollParent, 'scrollTop', rect.top);
        }
        break;
      }
    }
  },

  render: function render() {
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
      skipLinkAnchor = React.createElement(SkipLinkAnchor, { label: 'Main Content' });
    }
    return React.createElement(
      Box,
      _extends({ ref: 'component', tag: 'article' }, other, { className: classes.join(' ') }),
      skipLinkAnchor,
      this.props.children
    );
  }
});

module.exports = Article;