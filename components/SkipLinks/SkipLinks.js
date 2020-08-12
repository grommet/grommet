"use strict";

exports.__esModule = true;
exports.SkipLinks = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("styled-components");

var _Box = require("../Box");

var _Text = require("../Text");

var _Layer = require("../Layer");

var _defaultProps = require("../../default-props");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var SkipLinks = function SkipLinks(_ref) {
  var children = _ref.children,
      id = _ref.id,
      messages = _ref.messages;

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;

  var _useState = (0, _react.useState)(false),
      showLayer = _useState[0],
      setShowLayer = _useState[1];

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
    modal: false // Prepend the Layer so any SkipLink will be the first element that
    // pressing the Tab key reaches, targetChildPosition triggers prepend.
    ,
    targetChildPosition: "first" // Non-modal Layer's will take the full screen at small breakpoints
    // by default, which isn't what we want, hence setting responsive false
    ,
    responsive: false
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, theme.skipLinks.container, messages.skipTo && /*#__PURE__*/_react["default"].createElement(_Text.Text, theme.skipLinks.label, messages.skipTo), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    align: "center",
    gap: "medium"
  }, children.map(function (element, index) {
    return /*#__PURE__*/(0, _react.cloneElement)(element, {
      key: "skip-link-" + index,
      onClick: removeLayer
    });
  }))));
};

SkipLinks.defaultProps = {
  messages: {
    skipTo: 'Skip To:'
  }
};
var SkipLinksDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  SkipLinksDoc = require('./doc').doc(SkipLinks);
}

var SkipLinksWrapper = SkipLinksDoc || SkipLinks;
exports.SkipLinks = SkipLinksWrapper;