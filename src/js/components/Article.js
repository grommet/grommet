// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var React = require('react');
var ReactDOM = require('react-dom');
var merge = require('lodash/object/merge');
var pick = require('lodash/object/pick');
var keys = require('lodash/object/keys');
var Box = require('./Box');
var KeyboardAccelerators = require('../utils/KeyboardAccelerators');
var Scroll = require('../utils/Scroll');
var SkipLinkAnchor = require('./SkipLinkAnchor');
var CarouselControls = require('./CarouselControls');
// var NextIcon = require('./icons/base/Next');
// var PreviousIcon = require('./icons/base/Previous');
// var UpIcon = require('./icons/base/Up');
// var DownIcon = require('./icons/base/Down');

var CLASS_ROOT = "article";
var DEFAULT_PLAY_INTERVAL = 10000; // 10s

var Article = React.createClass({

  propTypes: merge({
    controls: React.PropTypes.bool,
    primary: React.PropTypes.bool,
    scrollStep: React.PropTypes.bool
  }, Box.propTypes),

  getDefaultProps: function () {
    return {
      pad: 'none',
      direction: 'column'
    };
  },

  getInitialState: function () {
    return {selected: 1, playing: false};
  },

  componentDidMount: function () {
    if (this.props.scrollStep) {
      var keys;
      if ('row' === this.props.direction) {
        keys = {left: this._onPrevious, right: this._onNext};
      } else {
        keys = {up: this._onPrevious, down: this._onNext};
      }
      keys.space = this._onTogglePlay;
      KeyboardAccelerators.startListeningToKeyboard(this, keys);

      document.addEventListener('wheel', this._onWheel);

      this._scrollParent = ReactDOM.findDOMNode(this.refs.component);
    }
  },

  componentWillUnmount: function () {
    if (this.props.scrollStep) {
      var keys;
      if ('row' === this.props.direction) {
        keys = {left: this._onPrevious, right: this._onNext};
      } else {
        keys = {up: this._onPrevious, down: this._onNext};
      }
      keys.space = this._onTogglePlay;
      KeyboardAccelerators.stopListeningToKeyboard(this, keys);

      document.removeEventListener('wheel', this._onWheel);
    }
  },

  _onWheel: function (event) {
    var delta = ('row' === this.props.direction ? event.deltaX : event.deltaY);
    if (Math.abs(delta) > 100) {
      // The user is expressing a resolute interest in controlling the
      // scrolling behavior. Stop doing any of our scroll step aligning
      // until he stops expressing such interest.
      clearInterval(this._wheelTimer);
      clearInterval(this._wheelLongTimer);
      this._wheelLongTimer = setTimeout(function () {
        this._wheelLongTimer = null;
      }.bind(this), 2000);
    } else if (! this._wheelLongTimer) {
      if (delta > 10) {
        clearInterval(this._wheelTimer);
        this._wheelTimer = setTimeout(this._onNext, 200);
      } else if (delta < -10) {
        clearInterval(this._wheelTimer);
        this._wheelTimer = setTimeout(this._onPrevious, 200);
      }
    }
  },

  _onNext: function (event, wrap) {
    if (event) {
      this._stop();
      event.preventDefault();
    }
    var articleElement = ReactDOM.findDOMNode(this.refs.component);
    var children = articleElement.children;
    var advanced = false;
    for (var i = 0; i < (children.length - 1); i += 1) {
      var child = children[i];
      var rect = child.getBoundingClientRect();
      // 10 is for fuzziness
      if ('row' === this.props.direction) {
        if (rect.right > 10 && (i + 2) !== this.state.selected &&
          (event || wrap || rect.right < window.innerWidth)) {
          this._onSelect(i + 2);
          advanced = true;
          break;
        }
      } else {
        if (rect.bottom > 10 && (i + 2) !== this.state.selected &&
          (event || wrap || rect.bottom < window.innerHeight)) {
          this._onSelect(i + 2);
          advanced = true;
          break;
        }
      }
    }
    if (wrap && ! advanced) {
      this._onSelect(1);
    }
  },

  _onPrevious: function (event) {
    if (event) {
      this._stop();
      event.preventDefault();
    }
    var articleElement = ReactDOM.findDOMNode(this.refs.component);
    var children = articleElement.children;
    for (var i = 0; i < children.length; i += 1) {
      var child = children[i];
      var rect = child.getBoundingClientRect();
      // -10 is for fuzziness
      if ('row' === this.props.direction) {
        if ((rect.left >= -10 || i === (children.length - 1)) &&
          (event || rect.left < window.innerWidth)) {
          if (i > 0) {
            child = children[i - 1];
            rect = child.getBoundingClientRect();
            Scroll.scrollBy(this._scrollParent, 'scrollLeft', rect.left);
            this.setState({selected: i});
          }
          break;
        }
      } else {
        if ((rect.top >= -10 || i === (children.length - 1)) &&
          (event || rect.top < window.innerHeight)) {
          if (i > 0) {
            child = children[i - 1];
            rect = child.getBoundingClientRect();
            Scroll.scrollBy(this._scrollParent, 'scrollTop', rect.top);
            this.setState({selected: i});
          }
          break;
        }
      }
    }
  },

  _start: function () {
    this._playTimer = setInterval(function () {
      this._onNext(null, true);
    }.bind(this), DEFAULT_PLAY_INTERVAL);
    this.setState({playing: true});
  },

  _stop: function () {
    clearInterval(this._playTimer);
    this.setState({playing: false});
  },

  _onTogglePlay: function (event) {
    event.preventDefault();
    if (this.state.playing) {
      this._stop();
    } else {
      this._start();
    }
  },

  _onSelect: function (selected) {
    var articleElement = ReactDOM.findDOMNode(this.refs.component);
    var children = articleElement.children;
    var child = children[selected - 1];
    var rect = child.getBoundingClientRect();
    if ('row' === this.props.direction) {
      Scroll.scrollBy(this._scrollParent, 'scrollLeft', rect.left);
    } else {
      Scroll.scrollBy(this._scrollParent, 'scrollTop', rect.top);
    }
    this.setState({selected: selected});
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

    var childCount = React.Children.count(this.props.children);
    var controls;
    if (this.props.controls) {
      controls = (
        <CarouselControls className={CLASS_ROOT + "__controls"}
          count={childCount}
          selected={this.state.selected} onChange={this._onSelect} />
      );
    }

    return (
      <Box ref="component" tag="article" {...other} className={classes.join(' ')}>
        {skipLinkAnchor}
        {this.props.children}
        {controls}
      </Box>
    );
  }
});

module.exports = Article;
