"use strict";

exports.__esModule = true;
exports.FileInput = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _CircleAlert = require("grommet-icons/icons/CircleAlert");
var _useIsomorphicLayoutEffect = require("../../utils/use-isomorphic-layout-effect");
var _MessageContext = require("../../contexts/MessageContext");
var _utils = require("../../utils");
var _Anchor = require("../Anchor");
var _Box = require("../Box");
var _Button = require("../Button");
var _FormContext = require("../Form/FormContext");
var _Keyboard = require("../Keyboard");
var _Text = require("../Text");
var _StyledFileInput = require("./StyledFileInput");
var _propTypes = require("./propTypes");
var _formatBytes = require("./utils/formatBytes");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["a11yTitle", "background", "border", "confirmRemove", "disabled", "id", "plain", "renderFile", "maxSize", "messages", "margin", "multiple", "name", "onChange", "pad", "value"]; // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
// We want the interaction of <input type="file" /> but none of its styling.
// So, we put what we want to show underneath and
// position the <input /> on top with an opacity of zero.
// If there are any files selected, we need to show the buttons to remove them.
// So, we offset the <input /> from the right by the appropriate width.
// We don't use Stack because of how we need to control the positioning.

var ContentsBox = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "FileInput__ContentsBox",
  componentId: "sc-1jzq7im-0"
})(["cursor:pointer;position:relative;", " ", ";", " ", " ", ";", ";", ";", ";"], function (props) {
  return props.disabled && (0, _utils.disabledStyle)();
}, function (props) {
  return (0, _utils.inputAppearanceStyle)(props, {
    wrapper: true,
    skipBasePadding: true
  });
}, function (props) {
  var _shared$hover, _shared$focus, _shared$hover2, _shared$focus2, _props$responsive, _props$theme$fileInpu, _props$theme$fileInpu2, _props$theme$fileInpu3;
  var shared = props.theme.global.input;
  var sharedBackground = shared.background !== undefined || ((_shared$hover = shared.hover) == null ? void 0 : _shared$hover.background) !== undefined || ((_shared$focus = shared.focus) == null ? void 0 : _shared$focus.background) !== undefined;
  var sharedBorder = shared.border !== undefined || ((_shared$hover2 = shared.hover) == null ? void 0 : _shared$hover2.border) !== undefined || ((_shared$focus2 = shared.focus) == null ? void 0 : _shared$focus2.border) !== undefined;
  var background = props.$fileBackground !== undefined && !props.disabled && (props.$backgroundState || sharedBackground) && (0, _utils.backgroundStyle)(props.$fileBackground, props.theme, false);
  var border = props.$fileBorder === false ? 'border: none;' : props.$fileBorder !== undefined && !props.disabled && (props.$borderState || sharedBorder) && (0, _utils.borderStyle)(props.$fileBorder, (_props$responsive = props.responsive) != null ? _props$responsive : true, props.theme);
  return (0, _styledComponents.css)(["", ""], (background || border) && (0, _styledComponents.css)(["&&{", " ", " ", " ", " ", "}"], background, border, (_props$theme$fileInpu = props.theme.fileInput) == null ? void 0 : _props$theme$fileInpu.extend, props.hover && ((_props$theme$fileInpu2 = props.theme.fileInput) == null || (_props$theme$fileInpu2 = _props$theme$fileInpu2.hover) == null ? void 0 : _props$theme$fileInpu2.extend), props.dragOver && ((_props$theme$fileInpu3 = props.theme.fileInput) == null || (_props$theme$fileInpu3 = _props$theme$fileInpu3.dragOver) == null ? void 0 : _props$theme$fileInpu3.extend)));
}, function (props) {
  var _props$theme$fileInpu4;
  return (_props$theme$fileInpu4 = props.theme.fileInput) == null ? void 0 : _props$theme$fileInpu4.extend;
}, function (props) {
  return props.hover && props.theme.fileInput && props.theme.fileInput.hover && props.theme.fileInput.hover.extend;
}, function (props) {
  return props.dragOver && props.theme.fileInput && props.theme.fileInput.dragOver && props.theme.fileInput.dragOver.extend;
}, function (props) {
  return props.focus && (0, _styledComponents.css)(["&&{", "}"], (0, _utils.focusStyle)());
}, function (props) {
  return !props.focus && (0, _utils.unfocusStyle)();
});
var Label = (0, _styledComponents["default"])(_Text.Text).withConfig({
  displayName: "FileInput__Label",
  componentId: "sc-1jzq7im-1"
})(["", ";"], function (props) {
  return props.theme.fileInput && props.theme.fileInput.label && props.theme.fileInput.label.extend;
});
var Message = (0, _styledComponents["default"])(_Text.Text).withConfig({
  displayName: "FileInput__Message",
  componentId: "sc-1jzq7im-2"
})(["", ";"], function (props) {
  return props.theme.fileInput && props.theme.fileInput.message && props.theme.fileInput.message.extend;
});
var defaultPendingRemoval = {
  event: undefined,
  index: undefined
};
var FileInput = exports.FileInput = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _theme$fileInput, _mergeTheme, _theme$fileInput$anch;
  var a11yTitle = _ref.a11yTitle,
    background = _ref.background,
    border = _ref.border,
    confirmRemove = _ref.confirmRemove,
    disabled = _ref.disabled,
    id = _ref.id,
    plain = _ref.plain,
    renderFile = _ref.renderFile,
    maxSize = _ref.maxSize,
    messages = _ref.messages,
    margin = _ref.margin,
    multiple = _ref.multiple,
    name = _ref.name,
    _onChange = _ref.onChange,
    pad = _ref.pad,
    valueProp = _ref.value,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext.format;
  var formContext = (0, _react.useContext)(_FormContext.FormContext);
  var _React$useState = _react["default"].useState(),
    hover = _React$useState[0],
    setHover = _React$useState[1];
  var _React$useState2 = _react["default"].useState(),
    dragOver = _React$useState2[0],
    setDragOver = _React$useState2[1];
  var _React$useState3 = _react["default"].useState(),
    focus = _React$useState3[0],
    setFocus = _React$useState3[1];
  var _useState = (0, _react.useState)(false),
    showRemoveConfirmation = _useState[0],
    setShowRemoveConfirmation = _useState[1];
  var _useState2 = (0, _react.useState)(defaultPendingRemoval),
    pendingRemoval = _useState2[0],
    setPendingRemoval = _useState2[1];
  var aggregateThreshold = multiple && multiple.aggregateThreshold || 10;
  var max = multiple == null ? void 0 : multiple.max;
  var inputRef = (0, _utils.useForwardedRef)(ref);
  var containerRef = (0, _react.useRef)();
  var controlRef = (0, _react.useRef)();
  var removeRef = (0, _react.useRef)();
  var _useState3 = (0, _react.useState)(),
    measuredRightOffset = _useState3[0],
    setMeasuredRightOffset = _useState3[1];
  var ConfirmRemove = confirmRemove;
  var RemoveIcon = theme.fileInput.icons.remove;
  var ErrorIcon = ((_theme$fileInput = theme.fileInput) == null || (_theme$fileInput = _theme$fileInput.icons) == null ? void 0 : _theme$fileInput.error) || _CircleAlert.CircleAlert;
  var usingKeyboard = (0, _utils.useKeyboard)();
  var _formContext$useFormI = formContext.useFormInput({
      name: name,
      value: valueProp,
      initialValue: [],
      validate: [typeof maxSize === 'number' ? function () {
        var fileList = [].concat(files);
        var message = '';
        var numOfInvalidFiles = fileList.filter(function (_ref2) {
          var size = _ref2.size;
          return size > maxSize;
        }).length;
        if (numOfInvalidFiles) {
          var _fileList$find;
          var messageId = 'fileInput.maxSizeSingle';
          if (multiple) {
            messageId = "fileInput.maxSizeMultiple." + (numOfInvalidFiles === 1 ? 'singular' : 'plural');
          }
          message = format({
            id: messageId,
            messages: messages,
            values: {
              fileName: (_fileList$find = fileList.find(function (_ref3) {
                var size = _ref3.size;
                return size > maxSize;
              })) == null ? void 0 : _fileList$find.name,
              maxSize: (0, _formatBytes.formatBytes)(maxSize),
              numOfFiles: numOfInvalidFiles
            }
          });
        }
        return message;
      } : '', max ? function () {
        var fileList = [].concat(files);
        var message = '';
        if (fileList.length > max) {
          message = format({
            id: 'fileInput.maxFile',
            messages: messages,
            values: {
              max: max
            }
          });
        }
        return message;
      } : '']
    }),
    files = _formContext$useFormI[0],
    setFiles = _formContext$useFormI[1];

  // Measure after layout so shared/state padding is included before paint.
  // Keep the transparent file input off the action controls as bounds change,
  // otherwise it intercepts Remove clicks and opens the file picker instead.
  (0, _useIsomorphicLayoutEffect.useLayoutEffect)(function () {
    var container = containerRef.current;
    var controls = [removeRef.current, files.length <= 1 ? controlRef.current : undefined].filter(Boolean);
    var measure = function measure() {
      var containerBounds = container.getBoundingClientRect();
      var bounds = controls.map(function (control) {
        return control.getBoundingClientRect();
      }).filter(function (rect) {
        return rect.width > 0;
      });
      if (containerBounds.width > 0 && bounds.length > 0) setMeasuredRightOffset(Math.max(0, containerBounds.right - Math.min.apply(Math, bounds.map(function (rect) {
        return rect.left;
      }))));else setMeasuredRightOffset(undefined);
    };
    measure();
    var observer = typeof window.ResizeObserver !== 'undefined' ? new window.ResizeObserver(measure) : undefined;
    observer == null || observer.observe(container);
    controls.forEach(function (control) {
      return observer == null ? void 0 : observer.observe(control);
    });
    window.addEventListener('resize', measure);
    return function () {
      observer == null || observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [files, theme, hover, dragOver, focus, disabled, plain, multiple]);
  var mergeTheme = function mergeTheme(propertyName, defaultKey) {
    var result = {};
    var themeProp = theme.fileInput[propertyName];
    if (themeProp) if (typeof themeProp !== 'object') {
      if (defaultKey) result[defaultKey] = themeProp;else result = themeProp;
    } else result = _extends({}, themeProp);
    var hoverThemeProp = theme.fileInput.hover[propertyName];
    if (hover && hoverThemeProp) if (typeof hoverThemeProp !== 'object') {
      if (defaultKey) result[defaultKey] = hoverThemeProp;else result = hoverThemeProp;
    } else result = _extends({}, result, hoverThemeProp);
    var dragOverThemeProp = theme.fileInput.dragOver[propertyName];
    if (propertyName === 'border' && dragOver && dragOverThemeProp === 'none') return false;
    if (dragOver && dragOverThemeProp) if (typeof dragOverThemeProp !== 'object') {
      if (defaultKey) result[defaultKey] = dragOverThemeProp;else result = dragOverThemeProp;
    } else result = _extends({}, result, dragOverThemeProp);
    return typeof result === 'object' && Object.keys(result).length === 0 ? undefined : result;
  };

  // Show the number of files when more than one

  var message;
  if (!files.length) {
    message = format({
      id: multiple ? 'fileInput.dropPromptMultiple' : 'fileInput.dropPrompt',
      messages: messages
    });
  } else message = files.length + " items";
  var removeFile = function removeFile(index) {
    var nextFiles;
    if (index === 'all') {
      nextFiles = [];
    } else {
      nextFiles = [].concat(files);
      nextFiles.splice(index, 1);
    }
    setFiles(nextFiles);

    // Need to have a way to track the files other than an array
    // since inputRef.current.files is a read-only FileList
    // https://stackoverflow.com/a/64019766
    /* eslint-disable no-undef */
    var dt = new DataTransfer();
    var curFiles = inputRef.current.files;
    if (index === 'all' || nextFiles.length === 0) inputRef.current.value = '';
    for (var i = 0; i < curFiles.length; i += 1) {
      var curfile = curFiles[i];
      if (index !== i) dt.items.add(curfile);
    }
    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'files').set;
    nativeInputValueSetter.call(inputRef.current, dt.files);
    var event = new Event('input', {
      bubbles: true
    });
    inputRef.current.dispatchEvent(event);
    if (_onChange) _onChange(event, {
      files: nextFiles
    });
    inputRef.current.focus();
  };
  var fileInputPad = (_mergeTheme = mergeTheme('pad')) != null ? _mergeTheme : theme.global.input.pad;
  var fileBackground = mergeTheme('background', 'color');
  var fileBorder = !plain ? mergeTheme('border', 'side') : undefined;

  // rightPad needs to be included in the rightOffset
  // otherwise input may cover the RemoveButton, making it
  // unreachable by mouse click.
  var rightPad = '0px';
  var rightPadValue = typeof fileInputPad === 'string' ? fileInputPad : (fileInputPad == null ? void 0 : fileInputPad.right) || (fileInputPad == null ? void 0 : fileInputPad.horizontal);
  if (rightPadValue) {
    rightPad = theme.global.edgeSize[rightPadValue] || rightPadValue;
  }
  var removeWidth = removeRef.current ? removeRef.current.getBoundingClientRect().width : 0;
  var controlWidth = controlRef.current ? controlRef.current.getBoundingClientRect().width : 0;
  if (controlRef.current && (_theme$fileInput$anch = theme.fileInput.anchor) != null && _theme$fileInput$anch.margin) {
    if (typeof theme.fileInput.anchor.margin === 'string') {
      controlWidth += parseInt(theme.global.edgeSize[theme.fileInput.anchor.margin] || theme.fileInput.anchor.margin, 10) * 2;
    } else if (typeof theme.fileInput.anchor.margin === 'object') {
      var _theme$fileInput$anch2, _theme$fileInput$anch3, _theme$fileInput$anch4;
      if ((_theme$fileInput$anch2 = theme.fileInput.anchor.margin) != null && _theme$fileInput$anch2.horizontal) {
        controlWidth += parseInt(theme.global.edgeSize[theme.fileInput.anchor.margin.horizontal] || theme.fileInput.anchor.margin.horizontal, 10) * 2;
      }
      if ((_theme$fileInput$anch3 = theme.fileInput.anchor.margin) != null && _theme$fileInput$anch3.right) {
        controlWidth += parseInt(theme.global.edgeSize[theme.fileInput.anchor.margin.right] || theme.fileInput.anchor.margin.right, 10);
      }
      if ((_theme$fileInput$anch4 = theme.fileInput.anchor.margin) != null && _theme$fileInput$anch4.left) {
        controlWidth += parseInt(theme.global.edgeSize[theme.fileInput.anchor.margin.left] || theme.fileInput.anchor.margin.left, 10);
      }
    }
  }
  var rightOffset = files.length > 1 ? removeWidth + parseInt(rightPad, 10) : removeWidth + controlWidth + parseInt(rightPad, 10);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(ContentsBox, _extends({
    ref: containerRef,
    $inputPlain: plain,
    theme: theme,
    flex: false,
    disabled: disabled,
    background: fileBackground,
    border: fileBorder,
    $fileBackground: fileBackground,
    $fileBorder: fileBorder,
    $backgroundState: dragOver && theme.fileInput.dragOver.background !== undefined || hover && theme.fileInput.hover.background !== undefined,
    $borderState: dragOver && theme.fileInput.dragOver.border !== undefined || hover && theme.fileInput.hover.border !== undefined,
    margin: mergeTheme('margin'),
    pad: fileInputPad,
    round: mergeTheme('round', 'size'),
    align: files.length ? 'stretch' : 'center',
    justify: "center",
    hover: hover,
    onMouseOver: disabled ? undefined : function () {
      return setHover(true);
    },
    onMouseOut: disabled ? undefined : function () {
      return setHover(false);
    },
    dragOver: dragOver,
    focus: usingKeyboard && focus
  }, passThemeFlag), /*#__PURE__*/_react["default"].createElement(_StyledFileInput.StyledFileInput, _extends({
    ref: inputRef,
    type: "file",
    id: id,
    name: name,
    maxSize: maxSize,
    multiple: multiple,
    disabled: disabled,
    plain: true,
    "aria-invalid": maxSize && files.some(function (f) {
      return f.size > maxSize;
    }) || max != null && files.length > max,
    rightOffset: measuredRightOffset != null ? measuredRightOffset : rightOffset || undefined
  }, passThemeFlag, rest, {
    onDragOver: function onDragOver() {
      if (!disabled) setDragOver(true);
    },
    onDragLeave: function onDragLeave() {
      return setDragOver(false);
    },
    onDrop: function onDrop(event) {
      setDragOver(false);
      if (rest.onDrop) rest.onDrop(event);
    },
    onChange: function onChange(event) {
      event.persist();
      var fileList = event.target.files;
      // If the user cancelled the file picker, fileList will be empty
      // and we should not clear any previously selected files.
      if (!fileList.length && files.length) return;
      var nextFiles = multiple ? [].concat(files) : [];
      var _loop = function _loop(i) {
        // avoid duplicates
        var existing = nextFiles.filter(function (file) {
          return file.name === fileList[i].name && file.size === fileList[i].size;
        }).length > 0;
        if (!existing) {
          nextFiles.push(fileList[i]);
        }
      };
      for (var i = 0; i < fileList.length; i += 1) {
        _loop(i);
      }
      setFiles(nextFiles);
      setDragOver(false);
      if (_onChange) _onChange(event, {
        files: nextFiles
      });
    },
    onBlur: function onBlur() {
      return setFocus(false);
    },
    onFocus: function onFocus() {
      return setFocus(true);
    }
  })), (!files.length || files.length > 1) && /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    align: "center",
    fill: "horizontal",
    direction: "row",
    justify: "between"
  }, files.length <= aggregateThreshold && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(Message, _extends({}, theme.fileInput.message, passThemeFlag), message), /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    onSpace: function onSpace(event) {
      event.preventDefault();
      if (controlRef.current === event.target) inputRef.current.click();
    },
    onEnter: function onEnter(event) {
      if (controlRef.current === event.target) inputRef.current.click();
    }
  }, theme.fileInput.button ? /*#__PURE__*/_react["default"].createElement(_Button.Button
  // The focus here is redundant for keyboard users
  , {
    tabIndex: -1,
    disabled: disabled,
    ref: controlRef,
    kind: theme.fileInput.button,
    label: format({
      id: 'fileInput.browse',
      messages: messages
    }),
    onClick: function onClick() {
      inputRef.current.click();
      inputRef.current.focus();
    }
  }) : /*#__PURE__*/_react["default"].createElement(_Anchor.Anchor
  // The focus here is redundant for keyboard users
  , {
    tabIndex: -1,
    alignSelf: "center",
    disabled: disabled,
    ref: controlRef,
    margin: theme.fileInput.anchor.margin,
    onClick: function onClick() {
      inputRef.current.click();
      inputRef.current.focus();
    },
    label: format({
      id: 'fileInput.browse',
      messages: messages
    })
  })))), files.length > aggregateThreshold && /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    justify: "between",
    direction: "row",
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(Label, _extends({}, theme.fileInput.label, passThemeFlag), files.length, ' ', format({
    id: 'fileInput.files',
    messages: messages
  })), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    flex: false,
    direction: "row",
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    ref: removeRef,
    a11yTitle: format({
      id: 'fileInput.removeAll',
      messages: messages
    }),
    icon: /*#__PURE__*/_react["default"].createElement(RemoveIcon, null),
    hoverIndicator: true,
    disabled: disabled,
    onClick: function onClick(event) {
      if (confirmRemove) {
        event.persist(); // necessary for when React < v17
        setPendingRemoval({
          event: event,
          index: 'all'
        });
        setShowRemoveConfirmation(true);
      } else removeFile('all');
    }
  }), /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    onSpace: function onSpace(event) {
      if (controlRef.current === event.target) inputRef.current.click();
    },
    onEnter: function onEnter(event) {
      if (controlRef.current === event.target) inputRef.current.click();
    }
  }, theme.fileInput.button ? /*#__PURE__*/_react["default"].createElement(_Button.Button
  // The focus here is redundant for keyboard users
  , {
    tabIndex: -1,
    disabled: disabled,
    ref: controlRef,
    kind: theme.fileInput.button,
    label: format({
      id: 'fileInput.browse',
      messages: messages
    }),
    onClick: function onClick() {
      inputRef.current.click();
      inputRef.current.focus();
    }
  }) : /*#__PURE__*/_react["default"].createElement(_Anchor.Anchor
  // The focus here is redundant for keyboard users
  , {
    tabIndex: -1,
    alignSelf: "center",
    disabled: disabled,
    ref: controlRef,
    margin: theme.fileInput.anchor.margin,
    onClick: function onClick() {
      inputRef.current.click();
      inputRef.current.focus();
    },
    label: format({
      id: 'fileInput.browse',
      messages: messages
    })
  })))), files.length > 0 && files.length <= aggregateThreshold && files.map(function (file, index) {
    var messageId = '';
    if (maxSize && file.size > maxSize) {
      messageId = 'fileInput.alert.maxSize';
    } else if (max && index >= max) {
      messageId = 'fileInput.alert.maxFile';
    }
    return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      key: file.name,
      justify: "between",
      direction: "row",
      align: "center"
    }, renderFile ? renderFile(file) : /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({}, theme.fileInput.label, {
      align: "center",
      direction: "row"
    }), (typeof maxSize === 'number' && file.size > maxSize || typeof max === 'number' && index >= max) && /*#__PURE__*/_react["default"].createElement(ErrorIcon, {
      a11yTitle: format({
        id: messageId,
        messages: messages,
        values: {
          maxFile: max,
          fileName: file.name,
          maxSize: (0, _formatBytes.formatBytes)(maxSize)
        }
      })
    }), /*#__PURE__*/_react["default"].createElement(Label, _extends({
      weight: theme.global.input.weight || theme.global.input.font.weight,
      truncate: true
    }, passThemeFlag), file.name)), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      flex: false,
      direction: "row",
      align: "center"
    }, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
      ref: index ? undefined : removeRef,
      a11yTitle: format({
        id: 'fileInput.remove',
        messages: messages,
        values: {
          fileName: file.name
        }
      }),
      icon: /*#__PURE__*/_react["default"].createElement(RemoveIcon, null),
      hoverIndicator: true,
      disabled: disabled,
      onClick: function onClick(event) {
        if (confirmRemove) {
          event.persist(); // necessary for when React < v17
          setPendingRemoval({
            event: event,
            index: index
          });
          setShowRemoveConfirmation(true);
        } else removeFile(index);
      }
    }), files.length === 1 && /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
      onSpace: function onSpace(event) {
        if (controlRef.current === event.target) inputRef.current.click();
      },
      onEnter: function onEnter(event) {
        if (controlRef.current === event.target) inputRef.current.click();
      }
    }, theme.fileInput.button ? /*#__PURE__*/_react["default"].createElement(_Button.Button
    // The focus here is redundant for keyboard users
    , {
      tabIndex: -1,
      disabled: disabled,
      ref: controlRef,
      kind: theme.fileInput.button,
      label: format({
        id: 'fileInput.browse',
        messages: messages
      }),
      onClick: function onClick() {
        inputRef.current.click();
        inputRef.current.focus();
      }
    }) : /*#__PURE__*/_react["default"].createElement(_Anchor.Anchor
    // The focus here is redundant for keyboard users
    , {
      tabIndex: -1,
      disabled: disabled,
      ref: controlRef,
      margin: theme.fileInput.anchor.margin,
      onClick: function onClick() {
        inputRef.current.click();
        inputRef.current.focus();
      },
      label: format({
        id: 'fileInput.browse',
        messages: messages
      })
    }))));
  })), showRemoveConfirmation && /*#__PURE__*/_react["default"].createElement(ConfirmRemove, {
    onConfirm: function onConfirm() {
      removeFile(pendingRemoval.index);
      setPendingRemoval(defaultPendingRemoval);
      setShowRemoveConfirmation(false);
    },
    onCancel: function onCancel() {
      return setShowRemoveConfirmation(false);
    }
  }));
});
FileInput.displayName = 'FileInput';
FileInput.propTypes = _propTypes.FileInputPropTypes;