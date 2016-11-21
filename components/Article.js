'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _KeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

var _DOM = require('../utils/DOM');

var _DOM2 = _interopRequireDefault(_DOM);

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

var _Scroll = require('../utils/Scroll');

var _Scroll2 = _interopRequireDefault(_Scroll);

var _Responsive = require('../utils/Responsive');

var _Responsive2 = _interopRequireDefault(_Responsive);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _LinkNext = require('./icons/base/LinkNext');

var _LinkNext2 = _interopRequireDefault(_LinkNext);

var _LinkPrevious = require('./icons/base/LinkPrevious');

var _LinkPrevious2 = _interopRequireDefault(_LinkPrevious);

var _Up = require('./icons/base/Up');

var _Up2 = _interopRequireDefault(_Up);

var _Down = require('./icons/base/Down');

var _Down2 = _interopRequireDefault(_Down);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.ARTICLE; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var DEFAULT_PLAY_INTERVAL = 10000; // 10s

var Article = function (_Component) {
  (0, _inherits3.default)(Article, _Component);

  function Article(props, context) {
    (0, _classCallCheck3.default)(this, Article);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Article.__proto__ || (0, _getPrototypeOf2.default)(Article)).call(this, props, context));

    _this._onFocusChange = _this._onFocusChange.bind(_this);
    _this._onScroll = _this._onScroll.bind(_this);
    _this._onWheel = _this._onWheel.bind(_this);
    _this._onTouchStart = _this._onTouchStart.bind(_this);
    _this._onTouchMove = _this._onTouchMove.bind(_this);
    _this._onResize = _this._onResize.bind(_this);
    _this._onNext = _this._onNext.bind(_this);
    _this._onPrevious = _this._onPrevious.bind(_this);
    _this._onTogglePlay = _this._onTogglePlay.bind(_this);
    _this._onSelect = _this._onSelect.bind(_this);
    _this._checkControls = _this._checkControls.bind(_this);
    _this._checkPreviousNextControls = _this._checkPreviousNextControls.bind(_this);
    _this._onResponsive = _this._onResponsive.bind(_this);
    _this._updateHiddenElements = _this._updateHiddenElements.bind(_this);
    _this._updateProgress = _this._updateProgress.bind(_this);

    // Necessary to detect for Firefox or Edge to implement accessibility
    // tabbing
    var accessibilityTabbingCompatible = typeof navigator !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1 && navigator.userAgent.indexOf('Edge') === -1;

    _this.state = {
      selectedIndex: props.selected || 0,
      playing: false,
      showControls: _this.props.controls,
      accessibilityTabbingCompatible: accessibilityTabbingCompatible
    };

    _this.childRef = {};
    return _this;
  }

  (0, _createClass3.default)(Article, [{
    key: 'componentDidMount',
    value: function componentDidMount() {

      if (this.props.scrollStep) {
        this._keys = { up: this._onPrevious, down: this._onNext };
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
        _KeyboardAccelerators2.default.startListeningToKeyboard(this, this._keys);

        document.addEventListener('wheel', this._onWheel);
        window.addEventListener('resize', this._onResize);

        this._scrollParent = (0, _reactDom.findDOMNode)(this.componentRef);

        this._checkControls();

        if ('row' === this.props.direction && this.props.scrollStep) {
          this._responsive = _Responsive2.default.start(this._onResponsive);
        }
      }

      if (this.props.onProgress) {
        window.addEventListener('scroll', this._updateProgress);

        if (this.props.direction === 'row') {
          this._responsive = _Responsive2.default.start(this._onResponsive);
        }
      }

      this._onSelect(this.state.selectedIndex);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // allow updates to selected props to trigger new chapter select
      if (typeof nextProps.selected !== 'undefined' && nextProps.selected !== null && nextProps.selected !== this.state.selectedIndex) {
        this._onSelect(nextProps.selected);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.scrollStep) {
        _KeyboardAccelerators2.default.stopListeningToKeyboard(this, this._keys);
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
  }, {
    key: '_checkPreviousNextControls',
    value: function _checkPreviousNextControls(currentScroll, nextProp, prevProp) {
      if (currentScroll > 0) {
        var nextStepNode = (0, _reactDom.findDOMNode)(this.childRef[this.state.selectedIndex + 1]);

        var previousStepNode = (0, _reactDom.findDOMNode)(this.childRef[this.state.selectedIndex - 1]);

        if (nextStepNode) {
          var nextStepPosition = nextStepNode.getBoundingClientRect()[nextProp] * (this.state.selectedIndex + 1);

          if (currentScroll > nextStepPosition) {
            this.setState({ selectedIndex: this.state.selectedIndex + 1 });
          }
        }

        if (previousStepNode) {
          var previousStepPosition = previousStepNode.getBoundingClientRect()[prevProp] * this.state.selectedIndex;

          if (currentScroll < previousStepPosition) {
            this.setState({ selectedIndex: this.state.selectedIndex - 1 });
          }
        }
      }
    }
  }, {
    key: '_checkControls',
    value: function _checkControls() {
      if (this.props.direction === 'row') {
        var currentScroll = this.componentRef.boxContainerRef.scrollLeft;
        this._checkPreviousNextControls(currentScroll, 'left', 'right');
      } else {
        var _currentScroll = this.componentRef.boxContainerRef.scrollTop;
        this._checkPreviousNextControls(_currentScroll, 'top', 'bottom');
      }
    }
  }, {
    key: '_visibleIndexes',
    value: function _visibleIndexes() {
      var _props = this.props,
          children = _props.children,
          direction = _props.direction;

      var result = [];
      var childCount = _react2.default.Children.count(children);
      var limit = 'row' === direction ? window.innerWidth : window.innerHeight;
      for (var index = 0; index < childCount; index += 1) {
        var childElement = (0, _reactDom.findDOMNode)(this.childRef[index]);
        var rect = childElement.getBoundingClientRect();
        // ignore small drifts of 10 pixels on either end
        if ('row' === direction) {
          if (rect.right > 10 && rect.left < limit - 10) {
            result.push(index);
          } else if (result.length > 0) {
            break;
          }
        } else {
          if (rect.bottom > 10 && rect.top < limit - 10) {
            result.push(index);
          } else if (result.length > 0) {
            break;
          }
        }
      }
      return result;
    }
  }, {
    key: '_shortTimer',
    value: function _shortTimer(name, duration) {
      var _this2 = this;

      if (!this[name]) {
        this[name] = true;
      }
      var timerName = this[name] + 'Timer';
      clearTimeout(this[timerName]);
      this[timerName] = setTimeout(function () {
        _this2[name] = false;
      }, duration);
    }
  }, {
    key: '_onWheel',
    value: function _onWheel(event) {
      var _this3 = this;

      if ('row' === this.props.direction) {
        if (this._scrollingHorizontally) {
          // no-op
        } else if (!this._scrollingVertically) {
          if (Math.abs(event.deltaY * 2) > Math.abs(event.deltaX)) {
            // user is scrolling vertically
            this._shortTimer('_scrollingVertically', 1000);
          }
        }
      } else {
        // Give the user lots of control.
        var delta = event.deltaY;
        if (Math.abs(delta) > 100) {
          // The user is expressing a resolute interest in controlling the
          // scrolling behavior. Stop doing any of our scroll step aligning
          // until he stops expressing such interest.
          clearInterval(this._wheelTimer);
          clearInterval(this._wheelLongTimer);
          this._wheelLongTimer = setTimeout(function () {
            _this3._wheelLongTimer = undefined;
          }, 2000);
        } else if (!this._wheelLongTimer) {
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
  }, {
    key: '_onScroll',
    value: function _onScroll(event) {
      var _this4 = this;

      if ('row' === this.props.direction) {
        var selectedIndex = this.state.selectedIndex;

        var childElement = (0, _reactDom.findDOMNode)(this.childRef[selectedIndex]);
        var rect = childElement.getBoundingClientRect();
        if (event.target === this._scrollParent) {
          // scrolling Article
          if (this._scrollingVertically) {
            // prevent Article horizontal scrolling while scrolling vertically
            this._scrollParent.scrollLeft += rect.left;
          } else {
            (function () {
              var scrollingRight = _this4._priorScrollLeft < _this4._scrollParent.scrollLeft;
              // once we stop scrolling, align with child boundaries
              clearTimeout(_this4._scrollTimer);
              _this4._scrollTimer = setTimeout(function () {
                if (!_this4._resizing) {
                  var indexes = _this4._visibleIndexes();
                  if (indexes.length > 1 && scrollingRight) {
                    _this4._onSelect(indexes[1]);
                  } else {
                    _this4._onSelect(indexes[0]);
                  }
                }
              }, 100);
              _this4._priorScrollLeft = _this4._scrollParent.scrollLeft;
            })();
          }
        } else if (event.target.parentNode === this._scrollParent) {
          // scrolling child
          // Has it scrolled near the bottom?
          if (this.state.accessibilityTabbingCompatible) {
            // only use lastGrandChild logic if we're not using Firefox or IE.
            // causes flashing in Firefox, but required for Safari scrolling.
            var grandchildren = event.target.children;
            var lastGrandChild = grandchildren[grandchildren.length - 1];
            rect = lastGrandChild.getBoundingClientRect();
          }
          if (rect.bottom <= window.innerHeight + 24) {
            // at the bottom
            this.setState({ atBottom: true });
          } else {
            // not at the bottom
            this.setState({ atBottom: false });
          }
        }
      }
    }
  }, {
    key: '_onTouchStart',
    value: function _onTouchStart(event) {
      var touched = event.changedTouches[0];
      this._touchStartX = touched.clientX;
      this._touchStartY = touched.clientY;
    }
  }, {
    key: '_onTouchMove',
    value: function _onTouchMove(event) {
      if (!this.state.ignoreScroll) {
        var touched = event.changedTouches[0];
        var deltaX = touched.clientX - this._touchStartX;
        var deltaY = touched.clientY - this._touchStartY;
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
  }, {
    key: '_onResize',
    value: function _onResize() {
      var _this5 = this;

      clearTimeout(this._resizeTimer);
      this._resizeTimer = setTimeout(function () {
        _this5._onSelect(_this5.state.selectedIndex);
        _this5._shortTimer('_resizing', 1000);
      }, 50);
    }
  }, {
    key: '_onNext',
    value: function _onNext(event, wrap) {
      // only process if the focus is NOT in a form element
      if (!_DOM2.default.isFormElement(document.activeElement)) {
        var children = this.props.children;
        var selectedIndex = this.state.selectedIndex;

        var childCount = _react2.default.Children.count(children);
        if (event) {
          this._stop();
          event.preventDefault();
        }
        var targetIndex = this._visibleIndexes()[0] + 1;
        if (targetIndex !== selectedIndex) {
          if (targetIndex < childCount) {
            this._onSelect(Math.min(childCount - 1, targetIndex));
          } else if (wrap) {
            this._onSelect(1);
          }
        }
      }
    }
  }, {
    key: '_onPrevious',
    value: function _onPrevious(event) {
      // only process if the focus is NOT in a form element
      if (!_DOM2.default.isFormElement(document.activeElement)) {
        var selectedIndex = this.state.selectedIndex;

        if (event) {
          this._stop();
          event.preventDefault();
        }
        var targetIndex = this._visibleIndexes()[0] - 1;
        if (targetIndex !== selectedIndex) {
          this._onSelect(Math.max(0, targetIndex));
        }
      }
    }
  }, {
    key: '_start',
    value: function _start() {
      var _this6 = this;

      this._playTimer = setInterval(function () {
        _this6._onNext(null, true);
      }, DEFAULT_PLAY_INTERVAL);
      this.setState({ playing: true });
    }
  }, {
    key: '_stop',
    value: function _stop() {
      clearInterval(this._playTimer);
      this.setState({ playing: false });
    }
  }, {
    key: '_onTogglePlay',
    value: function _onTogglePlay(event) {
      event.preventDefault();
      if (this.state.playing) {
        this._stop();
      } else {
        this._start();
      }
    }
  }, {
    key: '_onSelect',
    value: function _onSelect(selectedIndex) {
      var _this7 = this;

      var childElement = (0, _reactDom.findDOMNode)(this.childRef[selectedIndex]);
      var windowHeight = window.innerHeight + 24;

      if (childElement) {
        var parentElement = childElement.parentNode;
        var atBottom = Math.round(parentElement.scrollTop) >= parentElement.scrollHeight - parentElement.clientHeight;

        if (selectedIndex !== this.state.selectedIndex) {
          // scroll child to top
          childElement.scrollTop = 0;
          // ensures controls are displayed when selecting a new index and
          // scrollbar is at bottom of article
          this.setState({
            selectedIndex: selectedIndex,
            atBottom: atBottom
          }, function () {
            if (_this7.props.onSelect) {
              _this7.props.onSelect(selectedIndex);
            }

            // Necessary to detect for Firefox or Edge to implement accessibility
            // tabbing
            if (_this7.props.direction === 'row' && _this7.state.accessibilityTabbingCompatible) {
              _this7.anchorStepRef.focus();
              _this7._updateHiddenElements();
            }
          });
        } else if (childElement.scrollHeight <= windowHeight) {
          // on initial chapter load, ensure arrows are rendered
          // when there are no scrollbars
          this.setState({ atBottom: true });
        }

        var rect = childElement.getBoundingClientRect();
        if ('row' === this.props.direction) {
          if (rect.left !== 0) {
            this._scrollingHorizontally = true;
            _Scroll2.default.scrollBy(this._scrollParent, 'scrollLeft', rect.left, function () {
              _this7._scrollingHorizontally = false;
            });
          }
        } else {
          if (rect.top !== 0) {
            this._scrollingVertically = true;
            _Scroll2.default.scrollBy(this._scrollParent, 'scrollTop', rect.top, function () {
              _this7._scrollingVertically = false;
            });
          }
        }
      }
    }
  }, {
    key: '_onFocusChange',
    value: function _onFocusChange(e) {
      var _this8 = this;

      _react2.default.Children.forEach(this.props.children, function (element, index) {
        var parent = (0, _reactDom.findDOMNode)(_this8.childRef[index]);
        if (parent && parent.contains(e.target)) {
          _this8._onSelect(index);
          return false;
        }
      });
    }
  }, {
    key: '_onResponsive',
    value: function _onResponsive(small) {
      this.setState({ narrow: small });
    }
  }, {
    key: '_toggleDisableChapter',
    value: function _toggleDisableChapter(chapter, disabled) {
      var elements = _DOM2.default.filterByFocusable(chapter.getElementsByTagName('*'));

      if (elements) {
        elements.forEach(function (element) {
          if (disabled) {
            element.setAttribute('disabled', 'disabled');
          } else {
            element.removeAttribute('disabled');
          }

          element.setAttribute('tabindex', disabled ? '-1' : '0');
        });
      }
    }
  }, {
    key: '_updateHiddenElements',
    value: function _updateHiddenElements() {
      var component = (0, _reactDom.findDOMNode)(this.componentRef);
      var children = component.children;
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (child.getAttribute('aria-hidden')) {
          this._toggleDisableChapter(child, true);
        } else {
          this._toggleDisableChapter(child, false);
        }
      }
    }
  }, {
    key: '_updateProgress',
    value: function _updateProgress(event) {
      var article = (0, _reactDom.findDOMNode)(this.componentRef);
      var articleRect = article.getBoundingClientRect();

      var offset = this.props.direction === 'column' ? Math.abs(articleRect.top) : Math.abs(articleRect.left);
      var totalDistance = this.props.direction === 'column' ? window.innerHeight : this._getChildrenWidth(this.componentRef.boxContainerRef.childNodes);
      var objectDistance = this.props.direction === 'column' ? articleRect.height : articleRect.width;

      // Covers row responding to column layout.
      if (this.props.direction === 'row' && this.state.narrow && this.props.responsive !== false) {
        offset = Math.abs(articleRect.top);
        totalDistance = window.innerHeight;
        objectDistance = articleRect.height;
      }

      var progress = Math.abs(offset / (objectDistance - totalDistance));
      var scrollPercentRounded = Math.round(progress * 100);
      this.props.onProgress(scrollPercentRounded);
    }
  }, {
    key: '_renderControls',
    value: function _renderControls() {
      var CONTROL_CLASS_PREFIX = CLASS_ROOT + '__control ' + CLASS_ROOT + '__control';
      var childCount = _react2.default.Children.count(this.props.children);
      var controls = [];

      var a11yTitle = this.props.a11yTitle || {};
      if ('row' === this.props.direction) {
        if (!this.state.narrow || this.state.atBottom) {
          if (this.state.selectedIndex > 0) {
            controls.push(_react2.default.createElement(_Button2.default, { key: 'previous',
              plain: true, a11yTitle: a11yTitle.previous,
              className: CONTROL_CLASS_PREFIX + '-left',
              onClick: this._onPrevious, icon: _react2.default.createElement(_LinkPrevious2.default, {
                a11yTitle: 'article-previous-title', size: 'large' }) }));
          }
          if (this.state.selectedIndex < childCount - 1) {
            controls.push(_react2.default.createElement(_Button2.default, { key: 'next',
              plain: true, a11yTitle: a11yTitle.next,
              className: CONTROL_CLASS_PREFIX + '-right',
              onClick: this._onNext, icon: _react2.default.createElement(_LinkNext2.default, { size: 'large',
                a11yTitle: 'article-next-title' }) }));
          }
        }
      } else {
        if (this.state.selectedIndex > 0) {
          controls.push(_react2.default.createElement(
            _Button2.default,
            { key: 'previous',
              plain: true, a11yTitle: a11yTitle.previous,
              className: CONTROL_CLASS_PREFIX + '-up',
              onClick: this._onPrevious },
            _react2.default.createElement(_Up2.default, null)
          ));
        }
        if (this.state.selectedIndex < childCount - 1) {
          controls.push(_react2.default.createElement(
            _Button2.default,
            { key: 'next', plain: true, a11yTitle: a11yTitle.next,
              className: CONTROL_CLASS_PREFIX + '-down', onClick: this._onNext },
            _react2.default.createElement(_Down2.default, { a11yTitle: 'article-down' })
          ));
        }
      }

      return controls;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this9 = this;

      var classes = (0, _classnames3.default)(CLASS_ROOT, (0, _defineProperty3.default)({}, CLASS_ROOT + '--scroll-step', this.props.scrollStep), this.props.className);

      var boxProps = _Props2.default.pick(this.props, (0, _keys2.default)(_Box2.default.propTypes));
      var restProps = _Props2.default.omit(this.props, (0, _keys2.default)(Article.propTypes));

      var controls = void 0;
      if (this.props.controls) {
        controls = this._renderControls();
      }

      var anchorStepNode = void 0;
      if (this.state.accessibilityTabbingCompatible) {
        anchorStepNode = _react2.default.createElement('a', { tabIndex: '-1', 'aria-hidden': 'true',
          ref: function ref(_ref) {
            return _this9.anchorStepRef = _ref;
          } });
      }

      var children = this.props.children;
      if (this.props.scrollStep || this.props.controls) {
        children = _react.Children.map(this.props.children, function (element, index) {
          if (element) {
            var elementClone = _react2.default.cloneElement(element, {
              ref: function ref(_ref2) {
                return _this9.childRef[index] = _ref2;
              }
            });

            var elementNode = elementClone;

            var ariaHidden = void 0;
            if (_this9.state.selectedIndex !== index && _this9.state.accessibilityTabbingCompatible) {
              ariaHidden = 'true';
            }

            if (_this9.props.controls) {
              elementNode = _react2.default.createElement(
                'div',
                { 'aria-hidden': ariaHidden },
                elementClone
              );
            }

            return elementNode;
          }

          return undefined;
        }, this);
      }

      delete boxProps.a11yTitle;

      return _react2.default.createElement(
        _Box2.default,
        (0, _extends3.default)({}, restProps, boxProps, { ref: function ref(_ref3) {
            return _this9.componentRef = _ref3;
          },
          tag: 'article', className: classes, primary: this.props.primary,
          onFocus: this._onFocusChange, onScroll: this._onScroll,
          onTouchStart: this._onTouchStart, onTouchMove: this._onTouchMove }),
        anchorStepNode,
        children,
        controls
      );
    }
  }]);
  return Article;
}(_react.Component);

Article.displayName = 'Article';
exports.default = Article;


Article.propTypes = (0, _extends3.default)({
  controls: _react.PropTypes.bool
}, _Box2.default.propTypes, {
  a11yTitle: _react.PropTypes.shape({
    next: _react.PropTypes.string,
    previous: _react.PropTypes.string
  }),
  onProgress: _react.PropTypes.func,
  onSelect: _react.PropTypes.func,
  scrollStep: _react.PropTypes.bool,
  selected: _react.PropTypes.number
});

Article.defaultProps = {
  pad: 'none',
  direction: 'column'
};
module.exports = exports['default'];