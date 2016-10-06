// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes, Children } from 'react';
import {findDOMNode} from 'react-dom';
import classnames from 'classnames';
import Box from './Box';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';
import DOMUtils from '../utils/DOM';
import Props from '../utils/Props';
import Scroll from '../utils/Scroll';
import Responsive from '../utils/Responsive';
import Button from './Button';
import NextIcon from './icons/base/LinkNext';
import PreviousIcon from './icons/base/LinkPrevious';
import UpIcon from './icons/base/Up';
import DownIcon from './icons/base/Down';

import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.ARTICLE;
const DEFAULT_PLAY_INTERVAL = 10000; // 10s

export default class Article extends Component {

  constructor(props, context) {
    super(props, context);

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
    this._checkPreviousNextControls =
      this._checkPreviousNextControls.bind(this);
    this._onResponsive = this._onResponsive.bind(this);
    this._updateHiddenElements = this._updateHiddenElements.bind(this);
    this._updateProgress = this._updateProgress.bind(this);

    // Necessary to detect for Firefox or Edge to implement accessibility
    // tabbing
    const accessibilityTabbingCompatible =
      typeof navigator !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1 &&
      navigator.userAgent.indexOf('Edge') === -1;

    this.state = {
      selectedIndex: props.selected || 0,
      playing: false,
      showControls: this.props.controls,
      accessibilityTabbingCompatible: accessibilityTabbingCompatible
    };

    this.childRef = {};
  }

  componentDidMount () {

    if (this.props.scrollStep) {
      this._keys = {up: this._onPrevious, down: this._onNext};
      if ('row' === this.props.direction) {
        this._keys = {
          left: this._onPrevious,
          right: this._onNext
        };

        if (this.state.accessibilityTabbingCompatible) {
          this._updateHiddenElements();
        }
      }
      //keys.space = this._onTogglePlay;
      KeyboardAccelerators.startListeningToKeyboard(this, this._keys);

      document.addEventListener('wheel', this._onWheel);
      window.addEventListener('resize', this._onResize);

      this._scrollParent = findDOMNode(this.componentRef);

      this._checkControls();

      if ('row' === this.props.direction && this.props.scrollStep) {
        this._responsive = Responsive.start(this._onResponsive);
      }
    }

    if (this.props.onProgress) {
      window.addEventListener('scroll', this._updateProgress);

      if (this.props.direction === 'row') {
        this._responsive = Responsive.start(this._onResponsive);
      }
    }

    this._onSelect(this.state.selectedIndex);
  }

  componentWillReceiveProps (nextProps) {
    // allow updates to selected props to trigger new chapter select
    if ((typeof nextProps.selected !== 'undefined') &&
      (nextProps.selected !== null) &&
      (nextProps.selected !== this.state.selectedIndex)) {
      this._onSelect(nextProps.selected);
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
    if (this.props.onProgress) {
      window.removeEventListener('scroll', this._updateProgress);
    }
  }

  _checkPreviousNextControls (currentScroll, nextProp, prevProp) {
    if (currentScroll > 0) {
      const nextStepNode = findDOMNode(
        this.childRef[this.state.selectedIndex + 1]
      );

      const previousStepNode = findDOMNode(
        this.childRef[this.state.selectedIndex - 1]
      );

      if (nextStepNode) {
        const nextStepPosition = (
          nextStepNode.getBoundingClientRect()[nextProp]
        ) * (this.state.selectedIndex + 1);

        if (currentScroll > nextStepPosition) {
          this.setState({selectedIndex: this.state.selectedIndex + 1});
        }
      }

      if (previousStepNode) {
        const previousStepPosition = (
          previousStepNode.getBoundingClientRect()[prevProp]
        ) * this.state.selectedIndex;

        if (currentScroll < previousStepPosition) {
          this.setState({selectedIndex: this.state.selectedIndex - 1});
        }
      }
    }
  }

  _checkControls () {
    if (this.props.direction === 'row') {
      const currentScroll = this.componentRef.boxContainerRef.scrollLeft;
      this._checkPreviousNextControls(currentScroll, 'left', 'right');
    } else {
      const currentScroll = this.componentRef.boxContainerRef.scrollTop;
      this._checkPreviousNextControls(currentScroll, 'top', 'bottom');
    }
  }

  _visibleIndexes () {
    const { children, direction } = this.props;
    let result = [];
    const childCount = React.Children.count(children);
    const limit = ('row' === direction) ? window.innerWidth :
      window.innerHeight;
    for (let index = 0; index < childCount; index += 1) {
      const childElement = findDOMNode(this.childRef[index]);
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
        if (Math.abs(event.deltaY * 2) > Math.abs(event.deltaX)) {
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
          this._wheelLongTimer = undefined;
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
      const { selectedIndex } = this.state;
      const childElement = findDOMNode(this.childRef[selectedIndex]);
      let rect = childElement.getBoundingClientRect();
      if (event.target === this._scrollParent) {
        // scrolling Article
        if (this._scrollingVertically) {
          // prevent Article horizontal scrolling while scrolling vertically
          this._scrollParent.scrollLeft += rect.left;
        } else {
          const scrollingRight =
            this._priorScrollLeft < this._scrollParent.scrollLeft;
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
        if (this.state.accessibilityTabbingCompatible) {
          // only use lastGrandChild logic if we're not using Firefox or IE.
          // causes flashing in Firefox, but required for Safari scrolling.
          const grandchildren = event.target.children;
          const lastGrandChild = grandchildren[grandchildren.length - 1];
          rect = lastGrandChild.getBoundingClientRect();
        }
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
      this._onSelect(this.state.selectedIndex);
      this._shortTimer('_resizing', 1000);
    }, 50);
  }

  _onNext (event, wrap) {
    // only process if the focus is NOT in a form element
    if (!DOMUtils.isFormElement(document.activeElement)) {
      const { children } = this.props;
      const { selectedIndex } = this.state;
      const childCount = React.Children.count(children);
      if (event) {
        this._stop();
        event.preventDefault();
      }
      const targetIndex = this._visibleIndexes()[0] + 1;
      if (targetIndex !== selectedIndex) {
        if (targetIndex < childCount) {
          this._onSelect(Math.min(childCount - 1, targetIndex));
        } else if (wrap) {
          this._onSelect(1);
        }
      }
    }
  }

  _onPrevious (event) {
    // only process if the focus is NOT in a form element
    if (!DOMUtils.isFormElement(document.activeElement)) {
      const { selectedIndex } = this.state;
      if (event) {
        this._stop();
        event.preventDefault();
      }
      const targetIndex = this._visibleIndexes()[0] - 1;
      if (targetIndex !== selectedIndex) {
        this._onSelect(Math.max(0, targetIndex));
      }
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

  _onSelect (selectedIndex) {
    const childElement = findDOMNode(this.childRef[selectedIndex]);
    const windowHeight = window.innerHeight + 24;

    if (childElement) {
      const parentElement = childElement.parentNode;
      const atBottom =
        (Math.round(parentElement.scrollTop) >=
          parentElement.scrollHeight - parentElement.clientHeight);

      if (selectedIndex !== this.state.selectedIndex) {
        // scroll child to top
        childElement.scrollTop = 0;
        // ensures controls are displayed when selecting a new index and
        // scrollbar is at bottom of article
        this.setState({
          selectedIndex: selectedIndex,
          atBottom: atBottom
        }, () => {
          if (this.props.onSelect) {
            this.props.onSelect(selectedIndex);
          }

          // Necessary to detect for Firefox or Edge to implement accessibility
          // tabbing
          if (this.props.direction === 'row' &&
            this.state.accessibilityTabbingCompatible) {
            this.anchorStepRef.focus();
            this._updateHiddenElements();
          }
        });
      } else if (childElement.scrollHeight <= windowHeight) {
        // on initial chapter load, ensure arrows are rendered
        // when there are no scrollbars
        this.setState({ atBottom: true });
      }

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
    }
  }

  _onFocusChange (e) {
    React.Children.forEach(this.props.children, (element, index) => {
      let parent = findDOMNode(this.childRef[index]);
      if (parent && parent.contains(e.target)) {
        this._onSelect(index);
        return false;
      }
    });
  }

  _onResponsive (small) {
    this.setState({ narrow: small });
  }

  _toggleDisableChapter (chapter, disabled) {
    const elements = DOMUtils.filterByFocusable(
      chapter.getElementsByTagName('*')
    );

    if (elements) {
      elements.forEach((element) => {
        if (disabled) {
          element.setAttribute('disabled', 'disabled');
        } else {
          element.removeAttribute('disabled');
        }

        element.setAttribute('tabindex', disabled ? '-1' : '0');
      });
    }
  }

  _updateHiddenElements () {
    const component = findDOMNode(this.componentRef);
    const children = component.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.getAttribute('aria-hidden')) {
        this._toggleDisableChapter(child, true);
      } else {
        this._toggleDisableChapter(child, false);
      }
    }
  }

  _updateProgress(event) {
    const article = findDOMNode(this.componentRef);
    const articleRect = article.getBoundingClientRect();

    let offset = (this.props.direction === 'column')
      ? Math.abs(articleRect.top)
      : Math.abs(articleRect.left);
    let totalDistance = (this.props.direction === 'column')
      ? window.innerHeight
      : this._getChildrenWidth(
          this.componentRef.boxContainerRef.childNodes
        );
    let objectDistance = (this.props.direction === 'column')
      ? articleRect.height
      : articleRect.width;

    // Covers row responding to column layout.
    if (this.props.direction === 'row' && this.state.narrow
      && this.props.responsive !== false) {
      offset = Math.abs(articleRect.top);
      totalDistance = window.innerHeight;
      objectDistance = articleRect.height;
    }

    const progress = Math.abs(offset / (objectDistance - totalDistance));
    const scrollPercentRounded = Math.round(progress * 100);
    this.props.onProgress(scrollPercentRounded);
  }

  _renderControls () {
    const CONTROL_CLASS_PREFIX =
      `${CLASS_ROOT}__control ${CLASS_ROOT}__control`;
    const childCount = React.Children.count(this.props.children);
    let controls = [];

    const a11yTitle = this.props.a11yTitle || {};
    if ('row' === this.props.direction) {
      if (! this.state.narrow || this.state.atBottom) {
        if (this.state.selectedIndex > 0) {
          controls.push(
            <Button key='previous'
              plain={true} a11yTitle={a11yTitle.previous}
              className={`${CONTROL_CLASS_PREFIX}-left`}
              onClick={this._onPrevious} icon={<PreviousIcon
                a11yTitle='article-previous-title' size='large' />
              } />
          );
        }
        if (this.state.selectedIndex < (childCount - 1)) {
          controls.push(
            <Button key='next'
              plain={true} a11yTitle={a11yTitle.next}
              className={`${CONTROL_CLASS_PREFIX}-right`}
              onClick={this._onNext} icon={<NextIcon size='large'
                a11yTitle='article-next-title' />
              } />
          );
        }
      }
    } else {
      if (this.state.selectedIndex > 0) {
        controls.push(
          <Button key='previous'
            plain={true} a11yTitle={a11yTitle.previous}
            className={`${CONTROL_CLASS_PREFIX}-up`}
            onClick={this._onPrevious}><UpIcon /></Button>
        );
      }
      if (this.state.selectedIndex < (childCount - 1)) {
        controls.push(
          <Button key='next' plain={true} a11yTitle={a11yTitle.next}
            className={`${CONTROL_CLASS_PREFIX}-down`} onClick={this._onNext}>
            <DownIcon a11yTitle='article-down'/ >
          </Button>
        );
      }
    }

    return controls;
  }

  render () {
    const classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--scroll-step`]: this.props.scrollStep
      },
      this.props.className
    );

    const boxProps = Props.pick(this.props, Object.keys(Box.propTypes));
    const restProps = Props.omit(this.props, Object.keys(Article.propTypes));

    let controls;
    if (this.props.controls) {
      controls = this._renderControls();
    }

    let anchorStepNode;
    if (this.state.accessibilityTabbingCompatible) {
      anchorStepNode = (
        <a tabIndex='-1' aria-hidden='true'
          ref={ref => this.anchorStepRef = ref} />
      );
    }

    let children = this.props.children;
    if (this.props.scrollStep || this.props.controls) {
      children = Children.map(this.props.children, (element, index) => {
        if (element) {
          const elementClone = React.cloneElement(element, {
            ref: (ref) => this.childRef[index] =ref
          });

          let elementNode = elementClone;

          let ariaHidden;
          if (this.state.selectedIndex !== index &&
            this.state.accessibilityTabbingCompatible) {
            ariaHidden = 'true';
          }

          if (this.props.controls) {
            elementNode = (
              <div aria-hidden={ariaHidden}>
                {elementClone}
              </div>
            );
          }

          return elementNode;
        }

        return undefined;
      }, this);
    }

    delete boxProps.a11yTitle;

    return (
      <Box {...restProps} {...boxProps} ref={ref => this.componentRef = ref}
        tag='article' className={classes} primary={this.props.primary}
        onFocus={this._onFocusChange} onScroll={this._onScroll}
        onTouchStart={this._onTouchStart} onTouchMove={this._onTouchMove}>
        {anchorStepNode}
        {children}
        {controls}
      </Box>
    );
  }
}

Article.propTypes = {
  controls: PropTypes.bool,
  ...Box.propTypes,
  a11yTitle: PropTypes.shape({
    next: PropTypes.string,
    previous: PropTypes.string
  }),
  onProgress: PropTypes.func,
  onSelect: PropTypes.func,
  scrollStep: PropTypes.bool,
  selected: PropTypes.number
};

Article.defaultProps = {
  pad: 'none',
  direction: 'column'
};
