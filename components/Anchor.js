'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactDesc = require('react-desc');

var _LinkNext = require('./icons/base/LinkNext');

var _LinkNext2 = _interopRequireDefault(_LinkNext);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.ANCHOR; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var Anchor = function (_Component) {
  (0, _inherits3.default)(Anchor, _Component);

  function Anchor() {
    (0, _classCallCheck3.default)(this, Anchor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Anchor.__proto__ || (0, _getPrototypeOf2.default)(Anchor)).call(this));

    _this._onClick = _this._onClick.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Anchor, [{
    key: '_onClick',
    value: function _onClick(event) {
      var _props = this.props,
          method = _props.method,
          onClick = _props.onClick,
          path = _props.path;
      var router = this.context.router;


      event.preventDefault();

      if ('push' === method) {
        router.push(path);
      } else if ('replace' === method) {
        router.replace(path);
      }

      if (onClick) {
        onClick();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var _props2 = this.props,
          a11yTitle = _props2.a11yTitle,
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
          props = (0, _objectWithoutProperties3.default)(_props2, ['a11yTitle', 'animateIcon', 'children', 'className', 'disabled', 'href', 'icon', 'label', 'onClick', 'path', 'primary', 'reverse', 'tag']);

      delete props.method;
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

      var adjustedHref = path && router ? router.createPath(path) : href;

      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--animate-icon', hasIcon && animateIcon !== false), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--disabled', disabled), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--icon', anchorIcon || hasIcon), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--icon-label', hasIcon && label), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--primary', primary), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--reverse', reverse), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--active', router && path && router.isActive(path)), _classnames), className);

      var adjustedOnClick = path && router ? this._onClick : onClick;

      if (!anchorChildren) {
        anchorChildren = label;
      }

      var first = reverse ? anchorChildren : anchorIcon;
      var second = reverse ? anchorIcon : anchorChildren;

      var Component = tag;
      return _react2.default.createElement(
        Component,
        (0, _extends3.default)({}, props, { href: adjustedHref, className: classes,
          'aria-label': a11yTitle, onClick: adjustedOnClick }),
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

var description = 'A text link. We have a separate component from the browser\nbase so we can style it. You can either set the icon and/or label properties\nor just use children.';
var usage = 'import Anchor from \'grommet/components/Anchor\';\n<Anchor href={location} label="Label" />\n';
(0, _reactDesc.docComponent)(description, Anchor, {
  usage: usage
});

Anchor.propTypes = {
  a11yTitle: (0, _reactDesc.docPropType)('Accessibility title.', _reactDesc.PropTypes.string),
  animateIcon: (0, _reactDesc.docPropType)('Whether to animate the icon on hover.', _reactDesc.PropTypes.bool),
  disabled: (0, _reactDesc.docPropType)('Whether to disable the anchor.', _reactDesc.PropTypes.bool),
  href: (0, _reactDesc.docPropType)('Hyperlink reference to place in the anchor.', _reactDesc.PropTypes.string),
  icon: (0, _reactDesc.docPropType)('Icon element to place in the anchor.', _reactDesc.PropTypes.element),
  id: (0, _reactDesc.docPropType)('Anchor identifier.', _reactDesc.PropTypes.string),
  label: (0, _reactDesc.docPropType)('Label text to place in the anchor.', _reactDesc.PropTypes.node),
  method: (0, _reactDesc.docPropType)('Valid only when used with path. Indicates whether the browser history' + ' should be appended to or replaced.', _reactDesc.PropTypes.oneOf(['push', 'replace'])),
  onClick: (0, _reactDesc.docPropType)('Click handler.', _reactDesc.PropTypes.func),
  path: (0, _reactDesc.docPropType)('React-router path to navigate to when clicked.', _reactDesc.PropTypes.string),
  primary: (0, _reactDesc.docPropType)('Whether this is a primary anchor.', _reactDesc.PropTypes.bool),
  reverse: (0, _reactDesc.docPropType)('Whether an icon and label should be reversed so that the icon is at the' + 'end of the anchor.', _reactDesc.PropTypes.bool),
  tag: (0, _reactDesc.docPropType)('The DOM tag to use for the element. The default is <a>. This should be' + ' used in conjunction with components like Link from React Router. In' + ' this case, Link controls the navigation while Anchor controls the' + ' styling.', _reactDesc.PropTypes.string),
  target: (0, _reactDesc.docPropType)('Target of the link.', _reactDesc.PropTypes.string)
};

Anchor.defaultProps = {
  method: 'push',
  tag: 'a'
};

Anchor.contextTypes = {
  router: _react2.default.PropTypes.object
};
module.exports = exports['default'];