// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import pick from 'lodash/object/pick';
import keys from 'lodash/object/keys';
import Box from './Box';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';
import Scroll from '../utils/Scroll';
import SkipLinkAnchor from './SkipLinkAnchor';
// import CarouselControls from './CarouselControls';
import Button from './Button';
import NextIcon from './icons/base/Next';
import PreviousIcon from './icons/base/Previous';
import UpIcon from './icons/base/Up';
import DownIcon from './icons/base/Down';

const CLASS_ROOT = "article";
const DEFAULT_PLAY_INTERVAL = 10000; // 10s

class Article extends Component {

  constructor() {
    super();

    this._onWheel = this._onWheel.bind(this);
    this._onNext = this._onNext.bind(this);
    this._onPrevious = this._onPrevious.bind(this);
    this._onTogglePlay = this._onTogglePlay.bind(this);
    this._onSelect = this._onSelect.bind(this);

    this.state = {
      activeIndex: 1,
      playing: false
    };
  }

  componentDidMount () {
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
  }

  componentWillUnmount () {
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
  }

  _onWheel (event) {
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
  }

  _onNext (event, wrap) {
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
        if (rect.right > 10 && (i + 2) !== this.state.activeIndex &&
          (event || wrap || rect.right < window.innerWidth)) {
          this._onSelect(i + 2);
          advanced = true;
          break;
        }
      } else {
        if (rect.bottom > 10 && (i + 2) !== this.state.activeIndex &&
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
  }

  _onPrevious (event) {
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
            this.setState({activeIndex: i});
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
            this.setState({activeIndex: i});
          }
          break;
        }
      }
    }
  }

  _start () {
    this._playTimer = setInterval(function () {
      this._onNext(null, true);
    }.bind(this), DEFAULT_PLAY_INTERVAL);
    this.setState({playing: true});
  }

  _stop () {
    clearInterval(this._playTimer);
    this.setState({playing: false});
  }

  _onTogglePlay (event) {
    event.preventDefault();
    if (this.state.playing) {
      this._stop();
    } else {
      this._start();
    }
  }

  _onSelect (activeIndex) {
    var articleElement = ReactDOM.findDOMNode(this.refs.component);
    var children = articleElement.children;
    var child = children[activeIndex - 1];
    var rect = child.getBoundingClientRect();
    if ('row' === this.props.direction) {
      Scroll.scrollBy(this._scrollParent, 'scrollLeft', rect.left);
    } else {
      Scroll.scrollBy(this._scrollParent, 'scrollTop', rect.top);
    }
    this.setState({activeIndex: activeIndex});
  }

  _renderControls () {
    const CONTROL_CLASS_PREFIX =
      CLASS_ROOT + "__control " + CLASS_ROOT + "__control-";
    const CHILD_COUNT = React.Children.count(this.props.children);
    var controls = [
      // Don't use CarouselControls for now
      // <CarouselControls key="carousel"
      //   className={CONTROL_CLASS_PREFIX + "carousel"}
      //   count={CHILD_COUNT}
      //   direction={this.props.direction}
      //   selected={this.state.activeIndex} onChange={this._onSelect} />
    ];
    if ('row' === this.props.direction) {
      if (this.state.activeIndex > 1) {
        controls.push(
          <Button key="previous" type="icon"
            className={CONTROL_CLASS_PREFIX + "left"}
            onClick={this._onPrevious}><PreviousIcon /></Button>
        );
      }
      if (this.state.activeIndex < CHILD_COUNT) {
        controls.push(
          <Button key="next" type="icon"
            className={CONTROL_CLASS_PREFIX + "right"}
            onClick={this._onNext}><NextIcon /></Button>
        );
      }
    } else {
      if (this.state.activeIndex > 1) {
        controls.push(
          <Button key="previous" type="icon"
            className={CONTROL_CLASS_PREFIX + "up"}
            onClick={this._onPrevious}><UpIcon /></Button>
        );
      }
      if (this.state.activeIndex < CHILD_COUNT) {
        controls.push(
          <Button key="next" type="icon"
            className={CONTROL_CLASS_PREFIX + "down"}
            onClick={this._onNext}><DownIcon /></Button>
        );
      }
    }

    return controls;
  }

  render () {
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

    var controls;
    if (this.props.controls) {
      controls = this._renderControls();
    }

    return (
      <Box ref="component" tag="article" {...other} className={classes.join(' ')}>
        {skipLinkAnchor}
        {this.props.children}
        {controls}
      </Box>
    );
  }
}

Article.propTypes = {
  controls: PropTypes.bool,
  primary: PropTypes.bool,
  scrollStep: PropTypes.bool,
  ...Box.propTypes
};

Article.defaultProps = {
  pad: 'none',
  direction: 'column'
};

module.exports = Article;
