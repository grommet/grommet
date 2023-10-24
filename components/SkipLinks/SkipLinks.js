"use strict";

exports.__esModule = true;
exports.SkipLinks = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = require("styled-components");
var _Box = require("../Box");
var _Text = require("../Text");
var _Layer = require("../Layer");
var _defaultProps = require("../../default-props");
var _MessageContext = require("../../contexts/MessageContext");
var _propTypes = require("./propTypes");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var SkipLinks = exports.SkipLinks = function SkipLinks(_ref) {
  var children = _ref.children,
    id = _ref.id,
    messages = _ref.messages;
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;
  var _useState = (0, _react.useState)(false),
    showLayer = _useState[0],
    setShowLayer = _useState[1];
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext.format;
  var layerRef = (0, _react.useRef)(null);
  var onFocus = function onFocus() {
    setShowLayer(true);
  };
  var removeLayer = function removeLayer() {
    setShowLayer(false);
  };
  var onBlur = function onBlur() {
    // timeout needed so it gives enough time for activeElement to be updated
    setTimeout(function () {
      var layerNode = layerRef.current;
      if (layerNode && !layerNode.contains(document.activeElement)) {
        // close the layer when the activeElement isn't contained in the layer
        removeLayer();
      }
    }, 0);
  };
  return /*#__PURE__*/_react["default"].createElement(_Layer.Layer, {
    id: id,
    position: showLayer ? theme.skipLinks.position : 'hidden',
    ref: layerRef,
    onFocus: onFocus,
    onBlur: onBlur,
    modal: false
    // Prepend the Layer so any SkipLink will be the first element that
    // pressing the Tab key reaches, targetChildPosition triggers prepend.
    ,
    targetChildPosition: "first"
    // Non-modal Layer's will take the full screen at small breakpoints
    // by default, which isn't what we want, hence setting responsive false
    ,
    responsive: false
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, theme.skipLinks.container, /*#__PURE__*/_react["default"].createElement(_Text.Text, theme.skipLinks.label, format({
    id: 'skipLinks.skipTo',
    messages: messages
  })), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    align: "center",
    gap: "medium"
  }, _react.Children.map(children, function (child, index) {
    return child && /*#__PURE__*/(0, _react.cloneElement)(child, {
      // eslint-disable-next-line react/no-array-index-key
      key: "skip-link-" + index,
      onClick: removeLayer
    });
  }))));
};
SkipLinks.defaultProps = {};
SkipLinks.propTypes = _propTypes.SkipLinksPropTypes;