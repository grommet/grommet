var _excluded = ["a11yTitle", "background", "border", "disabled", "id", "plain", "renderFile", "messages", "margin", "multiple", "name", "onChange", "pad", "value"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useContext, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { MessageContext } from '../../contexts/MessageContext';
import { defaultProps } from '../../default-props';
import { disabledStyle, parseMetricToNum, useForwardedRef } from '../../utils';
import { Anchor } from '../Anchor';
import { Box } from '../Box';
import { Button } from '../Button';
import { FormContext } from '../Form/FormContext';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { StyledFileInput } from './StyledFileInput';
import { FileInputPropTypes } from './propTypes'; // We want the interaction of <input type="file" /> but none of its styling.
// So, we put what we want to show underneath and
// position the <input /> on top with an opacity of zero.
// If there are any files selected, we need to show the buttons to remove them.
// So, we offset the <input /> from the right by the appropriate width.
// We don't use Stack because of how we need to control the positioning.

var ContentsBox = styled(Box).withConfig({
  displayName: "FileInput__ContentsBox",
  componentId: "sc-1jzq7im-0"
})(["position:relative;", " ", ";", ";", ";"], function (props) {
  return props.disabled && disabledStyle();
}, function (props) {
  return props.theme.fileInput && props.theme.fileInput.extend;
}, function (props) {
  return props.hover && props.theme.fileInput && props.theme.fileInput.hover && props.theme.fileInput.hover.extend;
}, function (props) {
  return props.dragOver && props.theme.fileInput && props.theme.fileInput.dragOver && props.theme.fileInput.dragOver.extend;
});
var Label = styled(Text).withConfig({
  displayName: "FileInput__Label",
  componentId: "sc-1jzq7im-1"
})(["", ";"], function (props) {
  return props.theme.fileInput && props.theme.fileInput.label && props.theme.fileInput.label.extend;
});
var Message = styled(Text).withConfig({
  displayName: "FileInput__Message",
  componentId: "sc-1jzq7im-2"
})(["", ";"], function (props) {
  return props.theme.fileInput && props.theme.fileInput.message && props.theme.fileInput.message.extend;
});
var FileInput = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var a11yTitle = _ref.a11yTitle,
      background = _ref.background,
      border = _ref.border,
      disabled = _ref.disabled,
      id = _ref.id,
      plain = _ref.plain,
      renderFile = _ref.renderFile,
      messages = _ref.messages,
      margin = _ref.margin,
      multiple = _ref.multiple,
      name = _ref.name,
      _onChange = _ref.onChange,
      pad = _ref.pad,
      valueProp = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var theme = useContext(ThemeContext);

  var _useContext = useContext(MessageContext),
      format = _useContext.format;

  var formContext = useContext(FormContext);

  var _formContext$useFormI = formContext.useFormInput(name, valueProp, []),
      files = _formContext$useFormI[0],
      setFiles = _formContext$useFormI[1];

  var _React$useState = React.useState(),
      hover = _React$useState[0],
      setHover = _React$useState[1];

  var _React$useState2 = React.useState(),
      dragOver = _React$useState2[0],
      setDragOver = _React$useState2[1];

  var aggregateThreshold = multiple && multiple.aggregateThreshold || 10;
  var inputRef = useForwardedRef(ref);
  var controlRef = useRef();
  var removeRef = useRef();
  var RemoveIcon = theme.fileInput.icons.remove;

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
    if (dragOver && dragOverThemeProp) if (typeof dragOverThemeProp !== 'object') {
      if (defaultKey) result[defaultKey] = dragOverThemeProp;else result = dragOverThemeProp;
    } else result = _extends({}, result, dragOverThemeProp);
    return typeof result === 'object' && Object.keys(result).length === 0 ? undefined : result;
  };

  var rightPad;

  if (mergeTheme('pad')) {
    var _mergeTheme = mergeTheme('pad'),
        horizontal = _mergeTheme.horizontal,
        right = _mergeTheme.right;

    if (right) {
      rightPad = theme.global.edgeSize[right] || right;
    } else if (horizontal) {
      rightPad = theme.global.edgeSize[horizontal] || horizontal;
    }
  } // rightPad needs to be included in the rightOffset
  // otherwise input may cover the RemoveButton, making it
  // unreachable by mouse click.
  // If browse anchor or button is greater than remove button then
  // rightoffset will take the larger width


  var rightOffset;

  if (removeRef.current && controlRef.current) {
    var rightOffsetBrowse = controlRef.current.getBoundingClientRect().width;
    var rightOffsetRemove = removeRef.current.getBoundingClientRect().width;
    if (rightPad && typeof rightPad === 'string') rightOffset = rightOffsetRemove + parseMetricToNum(rightPad);

    if (files.length === 1 || files.length > aggregateThreshold) {
      rightOffset = rightOffsetBrowse + rightOffsetRemove + parseMetricToNum(theme.global.edgeSize.small) * 2;
    } else if (rightOffsetBrowse > rightOffsetRemove) {
      rightOffset = rightOffsetBrowse + parseMetricToNum(theme.global.edgeSize.small) * 2;
    } else rightOffset = rightOffsetRemove;
  } else if (!files.length && controlRef.current) {
    rightOffset = controlRef.current.getBoundingClientRect().width + parseMetricToNum(theme.global.edgeSize.small) * 2;
  } // Show the number of files when more than one


  var message;

  if (!files.length) {
    message = format({
      id: multiple ? 'fileInput.dropPromptMultiple' : 'fileInput.dropPrompt',
      messages: messages
    });
  } else message = files.length + " items";

  return /*#__PURE__*/React.createElement(ContentsBox, {
    theme: theme,
    flex: false,
    disabled: disabled,
    background: mergeTheme('background', 'color'),
    border: !plain ? mergeTheme('border', 'side') : undefined,
    margin: mergeTheme('margin'),
    pad: mergeTheme('pad'),
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
    dragOver: dragOver
  }, (!files.length || files.length > 1) && /*#__PURE__*/React.createElement(Box, {
    align: "center",
    fill: "horizontal",
    direction: "row",
    justify: "between"
  }, files.length <= aggregateThreshold && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Message, theme.fileInput.message, message), /*#__PURE__*/React.createElement(Keyboard, {
    onSpace: function onSpace(event) {
      if (controlRef.current === event.target) inputRef.current.click();
    },
    onEnter: function onEnter(event) {
      if (controlRef.current === event.target) inputRef.current.click();
    }
  }, theme.fileInput.button ? /*#__PURE__*/React.createElement(Button, {
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
  }) : /*#__PURE__*/React.createElement(Anchor, {
    tabIndex: 0,
    alignSelf: "center",
    ref: controlRef,
    margin: "small",
    onClick: function onClick() {
      inputRef.current.click();
      inputRef.current.focus();
    },
    label: format({
      id: 'fileInput.browse',
      messages: messages
    })
  })))), files.length > aggregateThreshold && /*#__PURE__*/React.createElement(Box, {
    justify: "between",
    direction: "row",
    align: "center"
  }, /*#__PURE__*/React.createElement(Label, theme.fileInput.label, files.length, ' ', format({
    id: 'fileInput.files',
    messages: messages
  })), /*#__PURE__*/React.createElement(Box, {
    flex: false,
    direction: "row",
    align: "center"
  }, /*#__PURE__*/React.createElement(Button, {
    ref: removeRef,
    a11yTitle: format({
      id: 'fileInput.removeAll',
      messages: messages
    }),
    icon: /*#__PURE__*/React.createElement(RemoveIcon, null),
    hoverIndicator: true,
    onClick: function onClick(event) {
      event.stopPropagation();
      if (_onChange) _onChange(event, {
        files: []
      });
      setFiles([]);
      inputRef.current.focus();
    }
  }), /*#__PURE__*/React.createElement(Keyboard, {
    onSpace: function onSpace(event) {
      if (controlRef.current === event.target) inputRef.current.click();
    },
    onEnter: function onEnter(event) {
      if (controlRef.current === event.target) inputRef.current.click();
    }
  }, theme.fileInput.button ? /*#__PURE__*/React.createElement(Button, {
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
  }) : /*#__PURE__*/React.createElement(Anchor, {
    tabIndex: 0,
    alignSelf: "center",
    ref: controlRef,
    margin: "small",
    onClick: function onClick() {
      inputRef.current.click();
      inputRef.current.focus();
    },
    label: format({
      id: 'fileInput.browse',
      messages: messages
    })
  })))), files.length > 0 && files.length <= aggregateThreshold && files.map(function (file, index) {
    return /*#__PURE__*/React.createElement(Box, {
      key: file.name,
      justify: "between",
      direction: "row",
      align: "center"
    }, renderFile ? renderFile(file) : /*#__PURE__*/React.createElement(Label, _extends({
      weight: theme.global.input.weight || theme.global.input.font.weight,
      truncate: true
    }, theme.fileInput.label), file.name), /*#__PURE__*/React.createElement(Box, {
      flex: false,
      direction: "row",
      align: "center"
    }, /*#__PURE__*/React.createElement(Button, {
      ref: index ? undefined : removeRef,
      a11yTitle: format({
        id: 'fileInput.remove',
        messages: messages
      }) + " " + file.name,
      icon: /*#__PURE__*/React.createElement(RemoveIcon, null),
      hoverIndicator: true,
      onClick: function onClick(event) {
        event.stopPropagation();
        var nextFiles = [].concat(files);
        nextFiles.splice(index, 1);
        setFiles(nextFiles);
        if (_onChange) _onChange(event, {
          files: nextFiles
        });
        if (nextFiles.length === 0) inputRef.current.value = '';
        inputRef.current.focus();
      }
    }), files.length === 1 && /*#__PURE__*/React.createElement(Keyboard, {
      onSpace: function onSpace(event) {
        if (controlRef.current === event.target) inputRef.current.click();
      },
      onEnter: function onEnter(event) {
        if (controlRef.current === event.target) inputRef.current.click();
      }
    }, theme.fileInput.button ? /*#__PURE__*/React.createElement(Button, {
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
    }) : /*#__PURE__*/React.createElement(Anchor, {
      tabIndex: 0,
      ref: controlRef,
      margin: "small",
      onClick: function onClick() {
        inputRef.current.click();
        inputRef.current.focus();
      },
      label: format({
        id: 'fileInput.browse',
        messages: messages
      })
    }))));
  }), /*#__PURE__*/React.createElement(StyledFileInput, _extends({
    ref: inputRef,
    type: "file",
    id: id,
    name: name,
    multiple: multiple,
    disabled: disabled,
    plain: true,
    rightOffset: rightOffset
  }, rest, {
    onDragOver: function onDragOver() {
      return setDragOver(true);
    },
    onDragLeave: function onDragLeave() {
      return setDragOver(false);
    },
    onChange: function onChange(event) {
      event.persist();
      var fileList = event.target.files;
      var nextFiles = multiple ? [].concat(files) : [];

      var _loop = function _loop(i) {
        // avoid duplicates
        var existing = nextFiles.filter(function (file) {
          return file.name === fileList[i].name && file.size === fileList[i].size;
        }).length > 0;
        if (!existing) nextFiles.push(fileList[i]);
      };

      for (var i = 0; i < fileList.length; i += 1) {
        _loop(i);
      }

      setFiles(nextFiles);
      setDragOver(false);
      if (_onChange) _onChange(event, {
        files: nextFiles
      });
    }
  })));
});
FileInput.defaultProps = {};
Object.setPrototypeOf(FileInput.defaultProps, defaultProps);
FileInput.displayName = 'FileInput';
FileInput.propTypes = FileInputPropTypes;
export { FileInput };