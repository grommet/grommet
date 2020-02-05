"use strict";

exports.__esModule = true;
exports.DropButton = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Button = require("../Button");

var _Drop = require("../Drop");

var _utils = require("../../utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var DropButton = (0, _react.forwardRef)(function (_ref, ref) {
  var _ref$a11yTitle = _ref.a11yTitle,
      a11yTitle = _ref$a11yTitle === void 0 ? 'Open Drop' : _ref$a11yTitle,
      disabled = _ref.disabled,
      _ref$dropAlign = _ref.dropAlign,
      dropAlign = _ref$dropAlign === void 0 ? {
    top: 'top',
    left: 'left'
  } : _ref$dropAlign,
      dropProps = _ref.dropProps,
      dropContent = _ref.dropContent,
      dropTarget = _ref.dropTarget,
      id = _ref.id,
      open = _ref.open,
      onClick = _ref.onClick,
      onClose = _ref.onClose,
      onOpen = _ref.onOpen,
      rest = _objectWithoutPropertiesLoose(_ref, ["a11yTitle", "disabled", "dropAlign", "dropProps", "dropContent", "dropTarget", "id", "open", "onClick", "onClose", "onOpen"]);

  var _useState = (0, _react.useState)(),
      closed = _useState[0],
      setClosed = _useState[1];

  var _useState2 = (0, _react.useState)(open),
      show = _useState2[0],
      setShow = _useState2[1];

  (0, _react.useEffect)(function () {
    if (open !== undefined && open !== show) {
      setShow(open);
      if (!open) setClosed(true);
    }
  }, [open, show]);
  var buttonRef = (0, _react.useRef)(); // show the drop initially if open and refs are ready

  (0, _react.useEffect)(function () {
    if (closed === undefined && open && (ref || buttonRef).current) {
      setClosed(false);
    }
  }, [closed, open, ref, buttonRef]);
  (0, _react.useEffect)(function () {
    // focus on the button if the drop is closed
    if (closed) {
      (0, _utils.setFocusWithoutScroll)((ref || buttonRef).current);
      setClosed(false);
    }
  }, [closed, ref]);

  var onDropClose = function onDropClose() {
    setShow(false);
    if (onClose) onClose();
    setClosed(true);
  };

  var onToggle = function onToggle(event) {
    setShow(!show);

    if (show) {
      if (onClose) onClose();
      setClosed(true);
    } else if (onOpen) onOpen();

    if (onClick) onClick(event);
  };

  var drop;

  if (show && (ref || buttonRef).current) {
    drop = _react["default"].createElement(_Drop.Drop, _extends({
      id: id ? id + "__drop" : undefined,
      restrictFocus: true,
      align: dropAlign,
      target: dropTarget || (ref || buttonRef).current,
      onClickOutside: onDropClose,
      onEsc: onDropClose
    }, dropProps), dropContent);
  }

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_Button.Button, _extends({
    id: id,
    ref: ref || buttonRef,
    a11yTitle: a11yTitle,
    disabled: disabled
  }, rest, {
    onClick: onToggle
  })), drop);
});
DropButton.displayName = 'DropButton';
var DropButtonDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  DropButtonDoc = require('./doc').doc(DropButton);
}

var DropButtonWrapper = DropButtonDoc || DropButton;
exports.DropButton = DropButtonWrapper;