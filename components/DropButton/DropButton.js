"use strict";

exports.__esModule = true;
exports.DropButton = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Button = require("../Button");

var _Drop = require("../Drop");

var _utils = require("../../utils");

var _propTypes = require("./propTypes");

var _excluded = ["a11yTitle", "onAlign", "disabled", "dropAlign", "dropProps", "dropContent", "dropTarget", "id", "open", "onClick", "onClose", "onOpen"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var defaultDropAlign = {
  top: 'top',
  left: 'left'
};
var DropButton = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _ref$a11yTitle = _ref.a11yTitle,
      a11yTitle = _ref$a11yTitle === void 0 ? 'Open Drop' : _ref$a11yTitle,
      onAlign = _ref.onAlign,
      disabled = _ref.disabled,
      _ref$dropAlign = _ref.dropAlign,
      dropAlign = _ref$dropAlign === void 0 ? defaultDropAlign : _ref$dropAlign,
      dropProps = _ref.dropProps,
      dropContent = _ref.dropContent,
      dropTarget = _ref.dropTarget,
      id = _ref.id,
      open = _ref.open,
      onClick = _ref.onClick,
      onClose = _ref.onClose,
      onOpen = _ref.onOpen,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var buttonRef = (0, _utils.useForwardedRef)(ref);

  var _useState = (0, _react.useState)(),
      show = _useState[0],
      setShow = _useState[1];

  (0, _react.useEffect)(function () {
    if (open !== undefined && open !== show) {
      setShow(open);
    }
  }, [open, show]);
  var onDropClose = (0, _react.useCallback)(function (event) {
    // if the user has clicked on our Button, don't do anything here,
    // handle that in onClickInternal() below.
    var node = event.target;

    while (node !== document && node !== buttonRef.current) {
      node = node.parentNode;
    }

    if (node !== buttonRef.current) {
      // don't change internal state if caller is driving
      if (open === undefined) setShow(false);
      if (onClose) onClose(event);
    }
  }, [buttonRef, onClose, open]);
  var onClickInternal = (0, _react.useCallback)(function (event) {
    if (!show) {
      setShow(true);
      if (onOpen) onOpen(event);
    } else {
      setShow(false);
      if (onClose) onClose(event);
    }

    if (onClick) onClick(event);
  }, [onClick, onClose, onOpen, show]);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Button.Button, _extends({
    id: id,
    ref: buttonRef,
    a11yTitle: a11yTitle,
    disabled: disabled
  }, rest, {
    onClick: onClickInternal
  })), show && buttonRef.current && /*#__PURE__*/_react["default"].createElement(_Drop.Drop, _extends({
    id: id ? id + "__drop" : undefined,
    onAlign: onAlign,
    restrictFocus: true,
    align: dropAlign,
    target: dropTarget || buttonRef.current,
    onClickOutside: onDropClose,
    onEsc: onDropClose
  }, dropProps), dropContent));
});
exports.DropButton = DropButton;
DropButton.displayName = 'DropButton';
DropButton.propTypes = _propTypes.DropButtonPropTypes;