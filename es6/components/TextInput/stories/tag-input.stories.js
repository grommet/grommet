function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { createRef, Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, Grommet, Keyboard, Text, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
import { FormClose } from "grommet-icons/es6/icons/FormClose";
var allSuggestions = ['sony', 'sonar', 'foo', 'bar'];

var Tag = function Tag(_ref) {
  var children = _ref.children,
      onRemove = _ref.onRemove,
      rest = _objectWithoutPropertiesLoose(_ref, ["children", "onRemove"]);

  var tag = React.createElement(Box, _extends({
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
  }, rest), React.createElement(Text, {
    size: "xsmall",
    margin: {
      right: 'xxsmall'
    }
  }, children), onRemove && React.createElement(FormClose, {
    size: "small",
    color: "white"
  }));

  if (onRemove) {
    return React.createElement(Button, {
      onClick: onRemove
    }, tag);
  }

  return tag;
};

var TagInput =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(TagInput, _Component);

  function TagInput() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      currentTag: ''
    });

    _defineProperty(_assertThisInitialized(_this), "boxRef", createRef());

    _defineProperty(_assertThisInitialized(_this), "updateCurrentTag", function (event) {
      var onChange = _this.props.onChange;

      _this.setState({
        currentTag: event.target.value
      });

      if (onChange) {
        onChange(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onAddTag", function (tag) {
      var onAdd = _this.props.onAdd;

      if (onAdd) {
        onAdd(tag);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onEnter", function () {
      var currentTag = _this.state.currentTag;

      if (currentTag.length) {
        _this.onAddTag(currentTag);

        _this.setState({
          currentTag: ''
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderValue", function () {
      var _this$props = _this.props,
          value = _this$props.value,
          _onRemove = _this$props.onRemove;
      /* eslint-disable react/no-array-index-key */

      return value.map(function (v, index) {
        return React.createElement(Tag, {
          margin: "xxsmall",
          key: "" + v + index,
          onRemove: function onRemove() {
            return _onRemove(v);
          }
        }, v);
      });
      /* eslint-enable react/no-array-index-key */
    });

    return _this;
  }

  var _proto = TagInput.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.forceUpdate();
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        _this$props2$value = _this$props2.value,
        value = _this$props2$value === void 0 ? [] : _this$props2$value,
        onAdd = _this$props2.onAdd,
        onRemove = _this$props2.onRemove,
        onChange = _this$props2.onChange,
        rest = _objectWithoutPropertiesLoose(_this$props2, ["value", "onAdd", "onRemove", "onChange"]);

    var currentTag = this.state.currentTag;
    return React.createElement(Keyboard, {
      onEnter: this.onEnter
    }, React.createElement(Box, {
      direction: "row",
      align: "center",
      pad: {
        horizontal: 'xsmall'
      },
      border: "all",
      ref: this.boxRef,
      wrap: true
    }, value.length > 0 && this.renderValue(), React.createElement(Box, {
      flex: true,
      style: {
        minWidth: '120px'
      }
    }, React.createElement(TextInput, _extends({
      type: "search",
      plain: true,
      dropTarget: this.boxRef.current
    }, rest, {
      onChange: this.updateCurrentTag,
      value: currentTag,
      onSelect: function onSelect(event) {
        event.stopPropagation();

        _this2.onAddTag(event.suggestion);
      }
    })))));
  };

  return TagInput;
}(Component);

var TagTextInput =
/*#__PURE__*/
function (_Component2) {
  _inheritsLoose(TagTextInput, _Component2);

  function TagTextInput() {
    var _this3;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = _Component2.call.apply(_Component2, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this3), "state", {
      selectedTags: ['foo', 'sony'],
      suggestions: allSuggestions
    });

    _defineProperty(_assertThisInitialized(_this3), "onRemoveTag", function (tag) {
      var selectedTags = _this3.state.selectedTags;
      var removeIndex = selectedTags.indexOf(tag);
      var newTags = [].concat(selectedTags);

      if (removeIndex >= 0) {
        newTags.splice(removeIndex, 1);
      }

      _this3.setState({
        selectedTags: newTags
      });
    });

    _defineProperty(_assertThisInitialized(_this3), "onAddTag", function (tag) {
      var selectedTags = _this3.state.selectedTags;

      _this3.setState({
        selectedTags: [].concat(selectedTags, [tag])
      });
    });

    _defineProperty(_assertThisInitialized(_this3), "onFilterSuggestion", function (value) {
      return _this3.setState({
        suggestions: allSuggestions.filter(function (suggestion) {
          return suggestion.toLowerCase().indexOf(value.toLowerCase()) >= 0;
        })
      });
    });

    return _this3;
  }

  var _proto2 = TagTextInput.prototype;

  _proto2.render = function render() {
    var _this4 = this;

    var _this$state = this.state,
        selectedTags = _this$state.selectedTags,
        suggestions = _this$state.suggestions;
    return React.createElement(Grommet, {
      full: true,
      theme: grommet
    }, React.createElement(Box, {
      pad: "small"
    }, React.createElement(TagInput, {
      placeholder: "Search for aliases...",
      suggestions: suggestions,
      value: selectedTags,
      onRemove: this.onRemoveTag,
      onAdd: this.onAddTag,
      onChange: function onChange(_ref2) {
        var value = _ref2.target.value;
        return _this4.onFilterSuggestion(value);
      }
    })));
  };

  return TagTextInput;
}(Component);

storiesOf('TextInput', module).add('Tag TextInput', function () {
  return React.createElement(TagTextInput, null);
});