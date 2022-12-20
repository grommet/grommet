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
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var ThumbsRating = function ThumbsRating(_ref) {
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext);
  return /*#__PURE__*/_react["default"].createElement(_RadioButtonGroup.RadioButtonGroup, _extends({
    direction: "row",
    options: ['like', 'dislike']
  }, rest), function (option, _ref2) {
    var _theme$thumbsRating3, _theme$thumbsRating3$, _theme$thumbsRating4, _theme$thumbsRating4$;
    var checked = _ref2.checked;
    if (option === 'like') {
      var _theme$thumbsRating, _theme$thumbsRating$l, _theme$thumbsRating2, _theme$thumbsRating2$;
      return checked ? /*#__PURE__*/_react["default"].createElement(_LikeFill.LikeFill, {
        color: (_theme$thumbsRating = theme.thumbsRating) == null ? void 0 : (_theme$thumbsRating$l = _theme$thumbsRating.like) == null ? void 0 : _theme$thumbsRating$l.color
      }) : /*#__PURE__*/_react["default"].createElement(_Like.Like, {
        color: (_theme$thumbsRating2 = theme.thumbsRating) == null ? void 0 : (_theme$thumbsRating2$ = _theme$thumbsRating2.like) == null ? void 0 : _theme$thumbsRating2$.color
      });
    }
    return checked ? /*#__PURE__*/_react["default"].createElement(_DislikeFill.DislikeFill, {
      color: (_theme$thumbsRating3 = theme.thumbsRating) == null ? void 0 : (_theme$thumbsRating3$ = _theme$thumbsRating3.dislike) == null ? void 0 : _theme$thumbsRating3$.color
    }) : /*#__PURE__*/_react["default"].createElement(_Dislike.Dislike, {
      color: (_theme$thumbsRating4 = theme.thumbsRating) == null ? void 0 : (_theme$thumbsRating4$ = _theme$thumbsRating4.dislike) == null ? void 0 : _theme$thumbsRating4$.color
    });
  });
};
exports.ThumbsRating = ThumbsRating;
ThumbsRating.displayName = 'ThumbsRating';