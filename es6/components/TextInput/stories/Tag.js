function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, Grommet, Keyboard, Text, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
import { FormClose } from "grommet-icons/es6/icons/FormClose";
var allSuggestions = ['sony', 'sonar', 'foo', 'bar'];

var Tag = function Tag(_ref) {
  var children = _ref.children,
      onRemove = _ref.onRemove,
      rest = _objectWithoutPropertiesLoose(_ref, ["children", "onRemove"]);

  var tag = /*#__PURE__*/React.createElement(Box, _extends({
    direction: "row",
    align: "center",
    background: "brand",
    pad: {
      horizontal: 'xsmall',
      vertical: 'xxsmall'
    },
    margin: {
      vertical: 'xxsmall'
    },
    round: "medium"
  }, rest), /*#__PURE__*/React.createElement(Text, {
    size: "xsmall",
    margin: {
      right: 'xxsmall'
    }
  }, children), onRemove && /*#__PURE__*/React.createElement(FormClose, {
    size: "small",
    color: "white"
  }));

  if (onRemove) {
    return /*#__PURE__*/React.createElement(Button, {
      onClick: onRemove
    }, tag);
  }

  return tag;
};

var TagInput = function TagInput(_ref2) {
  var _ref2$value = _ref2.value,
      value = _ref2$value === void 0 ? [] : _ref2$value,
      onAdd = _ref2.onAdd,
      onChange = _ref2.onChange,
      _onRemove = _ref2.onRemove,
      rest = _objectWithoutPropertiesLoose(_ref2, ["value", "onAdd", "onChange", "onRemove"]);

  var _React$useState = React.useState(''),
      currentTag = _React$useState[0],
      setCurrentTag = _React$useState[1];

  var _React$useState2 = React.useState(),
      box = _React$useState2[0],
      setBox = _React$useState2[1];

  var boxRef = React.useCallback(setBox, []);

  var updateCurrentTag = function updateCurrentTag(event) {
    setCurrentTag(event.target.value);

    if (onChange) {
      onChange(event);
    }
  };

  var onAddTag = function onAddTag(tag) {
    if (onAdd) {
      onAdd(tag);
    }
  };

  var onEnter = function onEnter() {
    if (currentTag.length) {
      onAddTag(currentTag);
      setCurrentTag('');
    }
  };

  var renderValue = function renderValue() {
    return value.map(function (v, index) {
      return /*#__PURE__*/React.createElement(Tag, {
        margin: "xxsmall",
        key: "" + v + (index + 0),
        onRemove: function onRemove() {
          return _onRemove(v);
        }
      }, v);
    });
  };

  return /*#__PURE__*/React.createElement(Keyboard, {
    onEnter: onEnter
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    align: "center",
    pad: {
      horizontal: 'xsmall'
    },
    border: "all",
    ref: boxRef,
    wrap: true
  }, value.length > 0 && renderValue(), /*#__PURE__*/React.createElement(Box, {
    flex: true,
    style: {
      minWidth: '120px'
    }
  }, /*#__PURE__*/React.createElement(TextInput, _extends({
    type: "search",
    plain: true,
    dropTarget: box
  }, rest, {
    onChange: updateCurrentTag,
    value: currentTag,
    onSelect: function onSelect(event) {
      event.stopPropagation();
      onAddTag(event.suggestion);
    }
  })))));
};

var TagTextInput = function TagTextInput() {
  var _React$useState3 = React.useState(['foo', 'sony']),
      selectedTags = _React$useState3[0],
      setSelectedTags = _React$useState3[1];

  var _React$useState4 = React.useState(allSuggestions),
      suggestions = _React$useState4[0],
      setSuggestions = _React$useState4[1];

  var onRemoveTag = function onRemoveTag(tag) {
    var removeIndex = selectedTags.indexOf(tag);
    var newTags = [].concat(selectedTags);

    if (removeIndex >= 0) {
      newTags.splice(removeIndex, 1);
    }

    setSelectedTags(newTags);
  };

  var onAddTag = function onAddTag(tag) {
    return setSelectedTags([].concat(selectedTags, [tag]));
  };

  var onFilterSuggestion = function onFilterSuggestion(value) {
    return setSuggestions(allSuggestions.filter(function (suggestion) {
      return suggestion.toLowerCase().indexOf(value.toLowerCase()) >= 0;
    }));
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "small"
  }, /*#__PURE__*/React.createElement(TagInput, {
    placeholder: "Search for aliases...",
    suggestions: suggestions,
    value: selectedTags,
    onRemove: onRemoveTag,
    onAdd: onAddTag,
    onChange: function onChange(_ref3) {
      var value = _ref3.target.value;
      return onFilterSuggestion(value);
    }
  })));
};

storiesOf('TextInput', module).add('Tag', function () {
  return /*#__PURE__*/React.createElement(TagTextInput, null);
});