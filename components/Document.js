// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var KeyboardAccelerators = require('../mixins/KeyboardAccelerators');
var DOM = require('../utils/DOM');

var CLASS_ROOT = "document";
var SCROLL_STEPS = 25;

var GrommetDocument = React.createClass({

  propTypes: {
    flush: React.PropTypes.bool,
    full: React.PropTypes.bool
  },

  mixins: [KeyboardAccelerators],

  getDefaultProps: function () {
    return {
      flush: true
    };
  },

  getInitialState: function () {
    return {scrollTop: 0};
  },

  componentDidMount: function () {
    console.warn('Warning: Grommet Document is deprecated. It has been superceded by Grommet Article.');
    if (this.props.full) {
      this._markInactive();
      var doc = this.refs.document.getDOMNode();
      this._scrollParent = DOM.findScrollParents(doc)[0];
      document.addEventListener('wheel', this._onWheel);
      this._scrollParent.addEventListener('scroll', this._onScroll);
      this.startListeningToKeyboard({
        up: this._onUp,
        down: this._onDown
      });
    }
  },

  componentWillUnmount: function () {
    if (this.props.full) {
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

  _easeInOutQuad: function (t) {
    return (t < .5 ?  2 * t * t : -1 + (4 - 2 * t) * t);
  },

  _scrollTo: function (delta) {
    clearInterval(this._scrollToTimer);
    var start = this._scrollParent.scrollTop;
    var position = start + delta;
    var step = 1;
    this._scrollToTimer = setInterval(function () {
      var next;
      var easing = this._easeInOutQuad(step / SCROLL_STEPS);
      if (position > start) {
        next = Math.min(position, Math.max(this._scrollParent.scrollTop,
          Math.round(start + ((position - start) * easing))));
      } else {
        next = Math.max(position, Math.min(this._scrollParent.scrollTop,
          Math.round(start - ((start - position) * easing))));
      }
      this._scrollParent.scrollTop = next;
      step += 1;
      if (step > SCROLL_STEPS) {
        // we're done
        clearInterval(this._scrollToTimer);
      }
    }.bind(this), 8);
  },

  _markInactive: function () {
    var doc = this.refs.document.getDOMNode();
    var sections = doc.querySelectorAll('.section--full');
    for (var i = 0; i < sections.length; i += 1) {
      var section = sections[i];
      var rect = section.getBoundingClientRect();
      if (rect.top > (window.innerHeight - 10)) {
        section.classList.add('section--inactive');
      } else {
        section.classList.remove('section--inactive');
      }
    }
  },

  _onScroll: function (event) {
    clearTimeout(this._scrollTimer);
    this._scrollTimer = setTimeout(this._markInactive, 50);
  },

  _onWheel: function (event) {
    if (Math.abs(event.deltaY) > 100) {
      clearInterval(this._scrollTimer);
    } else if (event.deltaY > 5) {
      this._onDown();
    } else if (event.deltaY < -5) {
      this._onUp();
    }
  },

  _onDown: function (event) {
    if (event) {
      event.preventDefault();
    }
    var doc = this.refs.document.getDOMNode();
    var sections = doc.querySelectorAll('.section--full');
    for (var i = 0; i < sections.length; i += 1) {
      var section = sections[i];
      var rect = section.getBoundingClientRect();
      if (rect.bottom > 0 && (event || rect.bottom < window.innerHeight)) {
        this._scrollTo(rect.bottom);
        break;
      }
    }
  },

  _onUp: function (event) {
    if (event) {
      event.preventDefault();
    }
    var doc = this.refs.document.getDOMNode();
    var sections = doc.querySelectorAll('.section--full');
    for (var i = 0; i < sections.length; i += 1) {
      var section = sections[i];
      var rect = section.getBoundingClientRect();
      if ((rect.top >= 0 || i === (sections.length - 1)) &&
        (event || rect.top < window.innerHeight)) {
        section = sections[i - 1];
        rect = section.getBoundingClientRect();
        this._scrollTo(rect.top);
        break;
      }
    }
  },

  render: function() {
    var classes = [CLASS_ROOT];
    if (this.props.flush) {
      classes.push(CLASS_ROOT + "--flush");
    }
    if (this.props.full) {
      classes.push(CLASS_ROOT + "--full");
    }

    return (
      <div ref="document" className={classes.join(' ')}>
        <div className={CLASS_ROOT + "__content"}>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = GrommetDocument;
