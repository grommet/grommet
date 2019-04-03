"use strict";

exports.__esModule = true;
exports.RoutedAnchor = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Anchor = require("../Anchor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RoutedAnchor =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(RoutedAnchor, _Component);

  function RoutedAnchor() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = RoutedAnchor.prototype;

  _proto.render = function render() {
    var _this = this;

    var _this$props = this.props,
        path = _this$props.path,
        method = _this$props.method,
        rest = _objectWithoutPropertiesLoose(_this$props, ["path", "method"]);

    if (process.env.NODE_ENV !== 'production') {
      console.warn("This component will be deprecated in the upcoming releases. Please refer to https://github.com/grommet/grommet/issues/2855 for more information.");
    }

    return _react.default.createElement(_Anchor.Anchor, _extends({}, rest, {
      href: path,
      onClick: function onClick(event) {
        var onClick = _this.props.onClick;
        var router = _this.context.router;

        if (event) {
          var modifierKey = event.ctrlKey || event.metaKey; // if the user right-clicked in the Anchor we should let it go

          if (modifierKey) {
            return;
          }
        }

        if (router) {
          event.preventDefault();
          (router.history || router)[method](path);
        }

        if (onClick) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          onClick.apply(void 0, [event].concat(args));
        }
      }
    }));
  };

  return RoutedAnchor;
}(_react.Component);

_defineProperty(RoutedAnchor, "contextTypes", {
  router: _propTypes.default.shape({}).isRequired
});

_defineProperty(RoutedAnchor, "defaultProps", {
  method: 'push'
});

var RoutedAnchorDoc;

if (process.env.NODE_ENV !== 'production') {
  RoutedAnchorDoc = require('./doc').doc(RoutedAnchor); // eslint-disable-line global-require
}

var RoutedAnchorWrapper = RoutedAnchorDoc || RoutedAnchor;
exports.RoutedAnchor = RoutedAnchorWrapper;