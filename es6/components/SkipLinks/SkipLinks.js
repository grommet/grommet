import React, { Children, cloneElement, useContext, useRef, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { Text } from '../Text';
import { Layer } from '../Layer';
import { defaultProps } from '../../default-props';
import { MessageContext } from '../../contexts/MessageContext';
import { SkipLinksPropTypes } from './propTypes';

var SkipLinks = function SkipLinks(_ref) {
  var children = _ref.children,
      id = _ref.id,
      messages = _ref.messages;
  var theme = useContext(ThemeContext) || defaultProps.theme;

  var _useState = useState(false),
      showLayer = _useState[0],
      setShowLayer = _useState[1];

  var _useContext = useContext(MessageContext),
      format = _useContext.format;

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

      if (layerNode && !layerNode.contains(document.activeElement)) {
        // close the layer when the activeElement isn't contained in the layer
        removeLayer();
      }
    }, 0);
  };

  return /*#__PURE__*/React.createElement(Layer, {
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
  }, /*#__PURE__*/React.createElement(Box, theme.skipLinks.container, /*#__PURE__*/React.createElement(Text, theme.skipLinks.label, format({
    id: 'skipLinks.skipTo',
    messages: messages
  })), /*#__PURE__*/React.createElement(Box, {
    align: "center",
    gap: "medium"
  }, Children.map(children, function (child, index) {
    return /*#__PURE__*/cloneElement(child, {
      key: "skip-link-" + index,
      onClick: removeLayer
    });
  }))));
};

SkipLinks.defaultProps = {};
SkipLinks.propTypes = SkipLinksPropTypes;
export { SkipLinks };