var _excluded = ["label"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import styled from 'styled-components';
import { Anchor } from '../Anchor';
var HiddenAnchor = styled(Anchor).withConfig({
  displayName: "SkipLinkTarget__HiddenAnchor",
  componentId: "sc-16wjfgk-0"
})(["width:0;height:0;overflow:hidden;position:absolute;"]);
export var SkipLinkTarget = function SkipLinkTarget(_ref) {
  var label = _ref.label,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  return /*#__PURE__*/React.createElement(HiddenAnchor, _extends({}, rest, {
    tabIndex: "-1",
    "aria-hidden": "true"
  }), label);
};