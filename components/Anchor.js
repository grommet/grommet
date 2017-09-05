'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactDesc = require('react-desc');

var _reactRouter = require('react-router');

var _LinkNext = require('./icons/base/LinkNext');

var _LinkNext2 = _interopRequireDefault(_LinkNext);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.ANCHOR;

var Anchor = function (_Component) {
  _inherits(Anchor, _Component);

  function Anchor(props, context) {
    _classCallCheck(this, Anchor);

    var _this = _possibleConstructorReturn(this, (Anchor.__proto__ || Object.getPrototypeOf(Anchor)).call(this, props, context));

    _this._onClick = _this._onClick.bind(_this);
    _this._onLocationChange = _this._onLocationChange.bind(_this);
    _this._attachUnlisten = _this._attachUnlisten.bind(_this);
    _this._isRouteActive = _this._isRouteActive.bind(_this);
    var path = props.path;
    var router = context.router;


    var active = _this._isRouteActive(path, router);

    _this.state = { active: active };
    return _this;
  }

  _createClass(Anchor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var path = this.props.path;
      var router = this.context.router;


      if (path) {
        this._attachUnlisten(router.history || router);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var path = nextProps.path;
      var router = this.context.router;


      if (path && path !== this.props.path) {
        this._attachUnlisten(router.history || router);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var path = this.props.path;

      if (path) {
        this._unlisten();
      }
      this._unmounted = true;
    }
  }, {
    key: '_isRouteActive',
    value: function _isRouteActive(path, router) {
      if (!path) {
        return false;
      }
      var active = void 0;
      if (router && router.isActive) {
        active = router && router.isActive && path && router.isActive({
          pathname: path.path || path,
          query: { indexLink: path.index }
        });
      } else if (router && _reactRouter.matchPath) {
        active = !!(0, _reactRouter.matchPath)(router.history.location.pathname, { path: path.path || path, exact: !!path.index });
      }

      return active;
    }
  }, {
    key: '_attachUnlisten',
    value: function _attachUnlisten(router) {
      this._unlisten = router.listen(this._onLocationChange);
    }
  }, {
    key: '_onLocationChange',
    value: function _onLocationChange(location) {
      // sometimes react router is still calling the listen callback even
      // if we called unlisten. So we added this check here to prevent
      // calling setState in a unmounted component
      if (!this._unmounted) {
        var path = this.props.path;
        var router = this.context.router;

        var active = _reactRouter.matchPath ? !!(0, _reactRouter.matchPath)(location.pathname, { path: path.path || path, exact: !!path.index }) : router && location.pathname === (path.path || path);
        this.setState({ active: active });
      }
    }
  }, {
    key: '_onClick',
    value: function _onClick(event) {
      var _props = this.props,
          method = _props.method,
          onClick = _props.onClick,
          path = _props.path,
          disabled = _props.disabled;
      var router = this.context.router;

      var modifierKey = event.ctrlKey || event.metaKey;

      if (modifierKey && !disabled && !onClick) {
        return true;
      }

      event.preventDefault();

      if (!disabled) {
        if (path) {
          if ('push' === method) {
            (router.history || router).push(path.path || path);
          } else if ('replace' === method) {
            (router.history || router).replace(path.path || path);
          }
        }

        if (onClick) {
          onClick.apply(undefined, arguments);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var _props2 = this.props,
          a11yTitle = _props2.a11yTitle,
          align = _props2.align,
          animateIcon = _props2.animateIcon,
          children = _props2.children,
          className = _props2.className,
          disabled = _props2.disabled,
          href = _props2.href,
          icon = _props2.icon,
          label = _props2.label,
          onClick = _props2.onClick,
          path = _props2.path,
          primary = _props2.primary,
          reverse = _props2.reverse,
          tag = _props2.tag,
          props = _objectWithoutProperties(_props2, ['a11yTitle', 'align', 'animateIcon', 'children', 'className', 'disabled', 'href', 'icon', 'label', 'onClick', 'path', 'primary', 'reverse', 'tag']);

      delete props.method;
      var active = this.state.active;
      var router = this.context.router;


      var anchorIcon = void 0;
      if (icon) {
        anchorIcon = icon;
      } else if (primary) {
        anchorIcon = _react2.default.createElement(_LinkNext2.default, { a11yTitle: 'link next' });
      }

      if (anchorIcon && !primary && !label) {
        anchorIcon = _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__icon' },
          anchorIcon
        );
      }

      var hasIcon = anchorIcon !== undefined;
      var anchorChildren = _react.Children.map(children, function (child) {
        if (child && child.type && child.type.icon) {
          hasIcon = true;
          child = _react2.default.createElement(
            'span',
            { className: CLASS_ROOT + '__icon' },
            child
          );
        }
        return child;
      });

      var target = path ? path.path || path : undefined;
      var adjustedHref = void 0;
      if (router && router.createPath) {
        adjustedHref = path && router ? router.createPath(target) : href;
      } else {
        adjustedHref = path && router && router.history ? router.history.createHref(typeof target === 'string' ? { pathname: target } : target) : href;
      }

      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--animate-icon', hasIcon && animateIcon !== false), _defineProperty(_classnames, CLASS_ROOT + '--disabled', disabled), _defineProperty(_classnames, CLASS_ROOT + '--icon', anchorIcon || hasIcon), _defineProperty(_classnames, CLASS_ROOT + '--icon-label', hasIcon && label), _defineProperty(_classnames, CLASS_ROOT + '--align-' + align, align), _defineProperty(_classnames, CLASS_ROOT + '--primary', primary), _defineProperty(_classnames, CLASS_ROOT + '--reverse', reverse), _defineProperty(_classnames, CLASS_ROOT + '--active', active), _classnames), className);

      var adjustedOnClick = path && router ? this._onClick : onClick;
      if (!anchorChildren) {
        anchorChildren = label;
      }

      var first = reverse ? anchorChildren : anchorIcon;
      var second = reverse ? anchorIcon : anchorChildren;

      var Component = tag;

      return _react2.default.createElement(
        Component,
        _extends({}, props, { href: adjustedHref, className: classes,
          'aria-label': a11yTitle, onClick: function onClick(event) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }

            if (disabled) {
              event.preventDefault();
            } else if (adjustedOnClick) {
              adjustedOnClick.apply(undefined, [event].concat(args));
            }
          } }),
        first,
        second
      );
    }
  }]);

  return Anchor;
}(_react.Component);

Anchor.displayName = 'Anchor';
exports.default = Anchor;
;

(0, _reactDesc.schema)(Anchor, {
  description: 'A text link. We have a separate component from the browser\n  base so we can style it. You can either set the icon and/or label properties\n  or just use children.',
  usage: 'import Anchor from \'grommet/components/Anchor\';\n  <Anchor href={location} label="Label" />',
  props: {
    a11yTitle: [_reactDesc.PropTypes.string, 'Accessibility title.'],
    align: [_reactDesc.PropTypes.oneOf(['start', 'center', 'end']), 'Text alignment.'],
    animateIcon: [_reactDesc.PropTypes.bool, 'Whether to animate the icon on hover.', {
      defaultProp: true
    }],
    disabled: [_reactDesc.PropTypes.bool, 'Whether to disable the anchor.'],
    href: [_reactDesc.PropTypes.string, 'Hyperlink reference to place in the anchor. If' + ' `path` prop is provided, `href` prop will be ignored.'],
    icon: [_reactDesc.PropTypes.element, 'Icon element to place in the anchor.'],
    id: [_reactDesc.PropTypes.string, 'Anchor identifier.'],
    label: [_reactDesc.PropTypes.node, 'Label text to place in the anchor.'],
    method: [_reactDesc.PropTypes.oneOf(['push', 'replace']), 'Valid only when used with path. Indicates whether the browser history' + ' should be appended to or replaced.', {
      defaultProp: 'push'
    }],
    onClick: [_reactDesc.PropTypes.func, 'Click handler.'],
    path: [_reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.object, _reactDesc.PropTypes.string]), 'React-router path to navigate to when clicked.' + ' Use path={{ path: \'/\', index: true }} if you want the Anchor to be' + ' active only when the index route is current.'],
    primary: [_reactDesc.PropTypes.bool, 'Whether this is a primary anchor.'],
    reverse: [_reactDesc.PropTypes.bool, 'Whether an icon and label should be reversed so that the icon is at ' + 'the end of the anchor.'],
    tag: [_reactDesc.PropTypes.string, 'The DOM tag to use for the element. The default is <a>. This should be' + ' used in conjunction with components like Link from React Router. In' + ' this case, Link controls the navigation while Anchor controls the' + ' styling.', {
      defaultProp: 'a'
    }],
    target: [_reactDesc.PropTypes.string, 'Target of the link.']
  }
});

Anchor.contextTypes = {
  router: _propTypes2.default.object
};
module.exports = exports['default'];