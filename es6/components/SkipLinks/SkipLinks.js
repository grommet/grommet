import React, { cloneElement, useRef, useState } from 'react';
import { Box } from '../Box';
import { Heading } from '../Heading';
import { Layer } from '../Layer';

var SkipLinks = function SkipLinks(_ref) {
  var children = _ref.children,
      id = _ref.id,
      messages = _ref.messages;

  var _useState = useState(false),
      showLayer = _useState[0],
      setShowLayer = _useState[1];

  var layerRef = useRef(null);

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

      if (layerNode && layerNode.layerContainer && layerNode.layerContainer.contains && !layerNode.layerContainer.contains(document.activeElement)) {
        removeLayer();
      }
    }, 0);
  };

  return /*#__PURE__*/React.createElement(Layer, {
    id: id,
    position: showLayer ? 'top' : 'hidden',
    ref: layerRef,
    onFocus: onFocus,
    onBlur: onBlur
  }, /*#__PURE__*/React.createElement(Box, {
    pad: {
      horizontal: 'medium'
    }
  }, /*#__PURE__*/React.createElement(Heading, {
    level: 2
  }, messages.skipTo, ":"), /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    align: "center",
    pad: {
      bottom: 'medium'
    }
  }, children.map(function (element, index) {
    return /*#__PURE__*/cloneElement(element, {
      key: "skip-link-" + index,
      onClick: removeLayer
    });
  }))));
};

SkipLinks.defaultProps = {
  messages: {
    skipTo: 'Skip To'
  }
};
var SkipLinksDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  SkipLinksDoc = require('./doc').doc(SkipLinks);
}

var SkipLinksWrapper = SkipLinksDoc || SkipLinks;
export { SkipLinksWrapper as SkipLinks };