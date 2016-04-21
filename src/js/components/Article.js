// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes, Children } from 'react';
import ReactDOM from 'react-dom';
import Box from './Box';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';
import DOMUtils from '../utils/DOM';
import Props from '../utils/Props';
import Scroll from '../utils/Scroll';
import Responsive from '../utils/Responsive';
// import CarouselControls from './CarouselControls';
import Button from './Button';
import NextIcon from './icons/base/LinkNext';
import PreviousIcon from './icons/base/LinkPrevious';
import UpIcon from './icons/base/Up';
import DownIcon from './icons/base/Down';

const CLASS_ROOT = 'article';
const DEFAULT_PLAY_INTERVAL = 10000; // 10s

export default class Article extends Component {

  constructor(props) {
    super(props);

    this._onFocusChange = this._onFocusChange.bind(this);
    this._onScroll = this._onScroll.bind(this);
    this._onWheel = this._onWheel.bind(this);
    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onResize = this._onResize.bind(this);
    this._onNext = this._onNext.bind(this);
    this._onPrevious = this._onPrevious.bind(this);
    this._onTogglePlay = this._onTogglePlay.bind(this);
    this._onSelect = this._onSelect.bind(this);
    this._checkControls = this._checkControls.bind(this);
    this._checkPreviousNextControls = this._checkPreviousNextControls.bind(this);
    this._onResponsive = this._onResponsive.bind(this);

    this.state = {
      activeIndex: 0,
      playing: false,
      showControls: this.props.controls
    };
  }

  componentDidMount () {
    if (this.props.scrollStep) {
      this._keys = {up: this._onPrevious, down: this._onNext};
      if ('row' === this.props.direction) {
        this._keys = {left: this._onPrevious, right: this._onNext};
      }
      //keys.space = this._onTogglePlay;
      KeyboardAccelerators.startListeningToKeyboard(this, this._keys);

      document.addEventListener('wheel', this._onWheel);
      window.addEventListener('resize', this._onResize);

      this._scrollParent = ReactDOM.findDOMNode(this.refs.component);

      this._checkControls();

      if ('row' === this.props.direction && this.props.scrollStep) {
        this._responsive = Responsive.start(this._onResponsive);
      }
    }
  }

  componentWillUnmount () {
    if (this.props.scrollStep) {
      KeyboardAccelerators.stopListeningToKeyboard(this, this._keys);
      document.removeEventListener('wheel', this._onWheel);
      window.removeEventListener('resize', this._onResize);
    }
    if (this._responsive) {
      this._responsive.stop();
    }
  }

  _checkPreviousNextControls (currentScroll, nextProp, prevProp) {
    if (currentScroll > 0) {
      const nextStepNode = ReactDOM.findDOMNode(
        this.refs[this.state.activeIndex + 1]
      );

      const previousStepNode = ReactDOM.findDOMNode(
        this.refs[this.state.activeIndex - 1]
      );

      if (nextStepNode) {
        const nextStepPosition = (
          nextStepNode.getBoundingClientRect()[nextProp]
        ) * (this.state.activeIndex + 1);

        if (currentScroll > nextStepPosition) {
          this.setState({activeIndex: this.state.activeIndex + 1});
        }
      }

      if (previousStepNode) {
        const previousStepPosition = (
          previousStepNode.getBoundingClientRect()[prevProp]
        ) * this.state.activeIndex;

        if (currentScroll < previousStepPosition) {
          this.setState({activeIndex: this.state.activeIndex - 1});
        }
      }
    }
  }

  _checkControls () {
    if (this.props.direction === 'row') {
      const currentScroll = this.refs.component.refs.boxContainer.scrollLeft;
      this._checkPreviousNextControls(currentScroll, 'left', 'right');
    } else {
      const currentScroll = this.refs.component.refs.boxContainer.scrollTop;
      this._checkPreviousNextControls(currentScroll, 'top', 'bottom');
    }
  }

  _visibleIndexes () {
    const { children, direction } = this.props;
    let result = [];
    const childCount = React.Children.count(children);
    const limit = ('row' === direction) ? window.innerWidth : window.innerHeight;
    for (let index = 0; index < childCount; index += 1) {
      const childElement = ReactDOM.findDOMNode(this.refs[index]);
      const rect = childElement.getBoundingClientRect();
      // ignore small drifts of 10 pixels on either end
      if ('row' === direction) {
        if (rect.right > 10 && rect.left < (limit - 10)) {
          result.push(index);
        } else if (result.length > 0) {
          break;
        }
      } else {
        if (rect.bottom > 10 && rect.top < (limit - 10)) {
          result.push(index);
        } else if (result.length > 0) {
          break;
        }
      }
    }
    return result;
  }

  _shortTimer (name, duration) {
    if (! this[name]) {
      this[name] = true;
    }
    const timerName = `${this[name]}Timer`;
    clearTimeout(this[timerName]);
    this[timerName] = setTimeout(() => {
      this[name] = false;
    }, duration);
  }

  _onWheel (event) {
    if ('row' === this.props.direction) {
      if (this._scrollingHorizontally) {
        // no-op
      } else if (! this._scrollingVertically) {
        if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
          // user is scrolling vertically
          this._shortTimer('_scrollingVertically', 1000);
        }
      }
    } else {
      // Give the user lots of control.
      const delta = event.deltaY;
      if (Math.abs(delta) > 100) {
        // The user is expressing a resolute interest in controlling the
        // scrolling behavior. Stop doing any of our scroll step aligning
        // until he stops expressing such interest.
        clearInterval(this._wheelTimer);
        clearInterval(this._wheelLongTimer);
        this._wheelLongTimer = setTimeout(() => {
          this._wheelLongTimer = null;
        }, 2000);
      } else if (! this._wheelLongTimer) {
        if (delta > 10) {
          clearInterval(this._wheelTimer);
          this._wheelTimer = setTimeout(this._onNext, 200);
        } else if (delta < -10) {
          clearInterval(this._wheelTimer);
          this._wheelTimer = setTimeout(this._onPrevious, 200);
        } else {
          clearInterval(this._controlTimer);
          this._controlTimer = setTimeout(this._checkControls, 200);
        }
      }
    }
  }

  _onScroll (event) {
    if ('row' === this.props.direction) {
      if (event.target === this._scrollParent) {
        // scrolling Article
        if (this._scrollingVertically) {
          // prevent Article horizontal scrolling while scrolling vertically
          const { activeIndex } = this.state;
          const childElement = ReactDOM.findDOMNode(this.refs[activeIndex]);
          const rect = childElement.getBoundingClientRect();
          this._scrollParent.scrollLeft += rect.left;
        } else {
          const scrollingRight = this._priorScrollLeft < this._scrollParent.scrollLeft;
          // once we stop scrolling, align with child boundaries
          clearTimeout(this._scrollTimer);
          this._scrollTimer = setTimeout(() => {
            if (! this._resizing) {
              const indexes = this._visibleIndexes();
              if (indexes.length > 1 && scrollingRight) {
                this._onSelect(indexes[1]);
              } else {
                this._onSelect(indexes[0]);
              }
            }
          }, 100);
          this._priorScrollLeft = this._scrollParent.scrollLeft;
        }
      } else if (event.target.parentNode === this._scrollParent) {
        // scrolling child
        // Has it scrolled near the bottom?
        const grandchildren = event.target.children;
        const lastGrandChild = grandchildren[grandchildren.length - 1];
        const rect = lastGrandChild.getBoundingClientRect();
        if (rect.bottom <= (window.innerHeight + 24)) {
          // at the bottom
          this.setState({ atBottom: true });
        } else {
          // not at the bottom
          this.setState({ atBottom: false });
        }
      }
    }
  }

  _onTouchStart (event) {
    const touched = event.changedTouches[0];
    this._touchStartX = touched.clientX;
    this._touchStartY = touched.clientY;
  }

  _onTouchMove (event) {
    if (! this.state.ignoreScroll) {
      const touched = event.changedTouches[0];
      const deltaX = touched.clientX - this._touchStartX;
      const deltaY = touched.clientY - this._touchStartY;
      // Only step if the user isn't scrolling vertically, bias vertically
      if (Math.abs(deltaY) < Math.abs(deltaX * 2)) {
        if (deltaX < 0) {
          this._onNext();
        } else {
          this._onPrevious();
        }
      }
    }
  }

  _onResize () {
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(() => {
      this._onSelect(this.state.activeIndex);
      this._shortTimer('_resizing', 1000);
    }, 50);
  }

  _onNext (event, wrap) {
    const { children } = this.props;
    const { activeIndex } = this.state;
    const childCount = React.Children.count(children);
    if (event) {
      this._stop();
      event.preventDefault();
    }
    const targetIndex = this._visibleIndexes()[0] + 1;
    if (targetIndex !== activeIndex) {
      if (targetIndex < childCount) {
        this._onSelect(Math.min(childCount - 1, targetIndex));
      } else if (wrap) {
        this._onSelect(1);
      }
    }
  }

  _onPrevious (event) {
    const { activeIndex } = this.state;
    if (event) {
      this._stop();
      event.preventDefault();
    }
    const targetIndex = this._visibleIndexes()[0] - 1;
    if (targetIndex !== activeIndex) {
      this._onSelect(Math.max(0, targetIndex));
    }
  }

  _start () {
    this._playTimer = setInterval(() => {
      this._onNext(null, true);
    }, DEFAULT_PLAY_INTERVAL);
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
    const childElement = ReactDOM.findDOMNode(this.refs[activeIndex]);
    if (childElement) {
      // scroll child to top
      childElement.scrollTop = 0;
      const rect = childElement.getBoundingClientRect();
      if ('row' === this.props.direction) {
        if (rect.left !== 0) {
          this._scrollingHorizontally = true;
          Scroll.scrollBy(this._scrollParent, 'scrollLeft', rect.left, () => {
            this._scrollingHorizontally = false;
          });
        }
      } else {
        if (rect.top !== 0) {
          this._scrollingVertically = true;
          Scroll.scrollBy(this._scrollParent, 'scrollTop', rect.top, () => {
            this._scrollingVertically = false;
          });
        }
      }

      this.setState({
        activeIndex: activeIndex,
        atBottom: false
      }, () => {
        var items = childElement.getElementsByTagName('*');
        var firstFocusable = DOMUtils.getBestFirstFocusable(items);
        if (!firstFocusable) {
          this.refs[`anchor_step_${activeIndex}`].focus();
        }

        if (this.props.onFocusChange) {
          this.props.onFocusChange(activeIndex);
        }
      });
    }
  }

  _onFocusChange (e) {
    React.Children.forEach(this.props.children, (element, index) => {
      let parent = ReactDOM.findDOMNode(this.refs[index]);
      if (parent && parent.contains(e.target)) {
        this._onSelect(index);
        return false;
      }
    });
  }

  _onResponsive (small) {
    this.setState({ narrow: small });
  }

  _renderControls () {
    const CONTROL_CLASS_PREFIX =
      `${CLASS_ROOT}__control ${CLASS_ROOT}__control`;
    const childCount = React.Children.count(this.props.children);
    let controls = [
      // Don't use CarouselControls for now
      // <CarouselControls key="carousel"
      //   className={CONTROL_CLASS_PREFIX + "carousel"}
      //   count={childCount}
      //   direction={this.props.direction}
      //   selected={this.state.activeIndex} onChange={this._onSelect} />
    ];

    const a11yTitle = this.props.a11yTitle || {};
    if ('row' === this.props.direction) {
      if (! this.state.narrow || this.state.atBottom) {
        if (this.state.activeIndex > 0) {
          controls.push(
            <Button key="previous" plain={true} a11yTitle={a11yTitle.previous}
              className={`${CONTROL_CLASS_PREFIX}-left`}
              onClick={this._onPrevious} icon={<PreviousIcon size="large" />} />
          );
        }
        if (this.state.activeIndex < (childCount - 1)) {
          controls.push(
            <Button key="next" plain={true} a11yTitle={a11yTitle.next}
              className={`${CONTROL_CLASS_PREFIX}-right`}
              onClick={this._onNext} icon={<NextIcon size="large" />} />
          );
        }
      }
    } else {
      if (this.state.activeIndex > 0) {
        controls.push(
          <Button key="previous" plain={true} a11yTitle={a11yTitle.previous}
            className={`${CONTROL_CLASS_PREFIX}-up`}
            onClick={this._onPrevious}><UpIcon /></Button>
        );
      }
      if (this.state.activeIndex < (childCount - 1)) {
        controls.push(
          <Button key="next" plain={true} a11yTitle={a11yTitle.next}
            className={`${CONTROL_CLASS_PREFIX}-down`}
            onClick={this._onNext}><DownIcon /></Button>
        );
      }
    }

    return controls;
  }

  render () {
    let classes = [CLASS_ROOT];
    const other = Props.pick(this.props, Object.keys(Box.propTypes));
    if (this.props.scrollStep) {
      classes.push(`${CLASS_ROOT}--scroll-step`);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    let controls;
    if (this.props.controls) {
      controls = this._renderControls();
    }

    let children = this.props.children;
    if (this.props.scrollStep || this.props.controls) {
      children = Children.map(this.props.children, (element, index) => {
        if (element) {
          const elementClone = React.cloneElement(element, {
            ref: index
          });
          let elementNode = elementClone;

          // let ariaHidden;
          // if (this.state.activeIndex !== index) {
          //   ariaHidden = 'true';
          // }

          // if (this.props.controls) {
          //   elementNode = (
          //     <div aria-hidden={ariaHidden}>
          //       <a tabIndex='-1' aria-hidden='true'
          //         ref={`anchor_step_${index}`} onFocus={element.props.onFocus} />
          //       {elementClone}
          //     </div>
          //   );
          // }

          return elementNode;
        }
      });
    }

    delete other.a11yTitle;

    return (
      <Box ref="component" tag="article" {...other}
        className={classes.join(' ')} onFocus={this._onFocusChange}
        onScroll={this._onScroll} onTouchStart={this._onTouchStart}
        onTouchMove={this._onTouchMove}
        primary={this.props.primary}>
        {children}
        {controls}
      </Box>
    );
  }
}

Article.propTypes = {
  controls: PropTypes.bool,
  primary: PropTypes.bool,
  scrollStep: PropTypes.bool,
  ...Box.propTypes,
  a11yTitle: PropTypes.shape({
    next: Props.string,
    previous: Props.string
  }),
  onFocusChange: PropTypes.func
};

Article.defaultProps = {
  pad: 'none',
  direction: 'column'
};
