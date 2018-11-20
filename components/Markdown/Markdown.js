"use strict";

exports.__esModule = true;
exports.Markdown = void 0;

var _react = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _markdownToJsx = _interopRequireDefault(require("markdown-to-jsx"));

var _utils = require("../../utils");

var _Heading = require("../Heading");

var _Paragraph = require("../Paragraph");

var _hocs = require("../hocs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var GrommetMarkdown =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(GrommetMarkdown, _Component);

  function GrommetMarkdown() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = GrommetMarkdown.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        components = _this$props.components,
        theme = _this$props.theme,
        rest = _objectWithoutPropertiesLoose(_this$props, ["components", "theme"]);

    var heading = [1, 2, 3, 4].reduce(function (obj, level) {
      var result = _extends({}, obj);

      result["h" + level] = {
        component: _Heading.Heading,
        props: {
          level: level
        }
      };
      return result;
    }, {});
    var overrides = (0, _utils.deepMerge)({
      p: {
        component: _Paragraph.Paragraph
      }
    }, heading, components);
    return _react.default.createElement(_markdownToJsx.default, _extends({
      options: {
        overrides: overrides
      }
    }, rest));
  };

  return GrommetMarkdown;
}(_react.Component);

var GrommetMarkdownDoc;

if (process.env.NODE_ENV !== 'production') {
  GrommetMarkdownDoc = require('./doc').doc(GrommetMarkdown); // eslint-disable-line global-require
}

var GrommetMarkdownWrapper = (0, _recompose.compose)(_hocs.withTheme)(GrommetMarkdownDoc || GrommetMarkdown);
exports.Markdown = GrommetMarkdownWrapper;