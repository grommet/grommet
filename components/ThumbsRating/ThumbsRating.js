"use strict";

exports.__esModule = true;
exports.ThumbsRating = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = require("styled-components");
var _Like = require("grommet-icons/icons/Like");
var _LikeFill = require("grommet-icons/icons/LikeFill");
var _Dislike = require("grommet-icons/icons/Dislike");
var _DislikeFill = require("grommet-icons/icons/DislikeFill");
var _RadioButtonGroup = require("../RadioButtonGroup");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var ThumbsRating = exports.ThumbsRating = function ThumbsRating(_ref) {
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext);
  return /*#__PURE__*/_react["default"].createElement(_RadioButtonGroup.RadioButtonGroup, _extends({
    direction: "row",
    options: ['like', 'dislike']
  }, rest), function (option, _ref2) {
    var _theme$thumbsRating3, _theme$thumbsRating4;
    var checked = _ref2.checked;
    if (option === 'like') {
      var _theme$thumbsRating, _theme$thumbsRating2;
      return checked ? /*#__PURE__*/_react["default"].createElement(_LikeFill.LikeFill, {
        color: (_theme$thumbsRating = theme.thumbsRating) == null || (_theme$thumbsRating = _theme$thumbsRating.like) == null ? void 0 : _theme$thumbsRating.color
      }) : /*#__PURE__*/_react["default"].createElement(_Like.Like, {
        color: (_theme$thumbsRating2 = theme.thumbsRating) == null || (_theme$thumbsRating2 = _theme$thumbsRating2.like) == null ? void 0 : _theme$thumbsRating2.color
      });
    }
    return checked ? /*#__PURE__*/_react["default"].createElement(_DislikeFill.DislikeFill, {
      color: (_theme$thumbsRating3 = theme.thumbsRating) == null || (_theme$thumbsRating3 = _theme$thumbsRating3.dislike) == null ? void 0 : _theme$thumbsRating3.color
    }) : /*#__PURE__*/_react["default"].createElement(_Dislike.Dislike, {
      color: (_theme$thumbsRating4 = theme.thumbsRating) == null || (_theme$thumbsRating4 = _theme$thumbsRating4.dislike) == null ? void 0 : _theme$thumbsRating4.color
    });
  });
};
ThumbsRating.displayName = 'ThumbsRating';