"use strict";

exports.__esModule = true;
exports["default"] = exports.WithTags = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommetIcons = require("grommet-icons");
var _grommet = require("grommet");
var _excluded = ["children", "onRemove"],
  _excluded2 = ["value", "onAdd", "onChange", "onRemove"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var allSuggestions = ['sony', 'sonar', 'foo', 'bar'];
var Tag = function Tag(_ref) {
  var children = _ref.children,
    onRemove = _ref.onRemove,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var tag = /*#__PURE__*/_react["default"].createElement(_grommet.Box, _extends({
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
  }, rest), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "xsmall",
    margin: {
      right: 'xxsmall'
    }
  }, children), onRemove && /*#__PURE__*/_react["default"].createElement(_grommetIcons.FormClose, {
    size: "small",
    color: "white"
  }));
  if (onRemove) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
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
    rest = _objectWithoutPropertiesLoose(_ref2, _excluded2);
  var _React$useState = _react["default"].useState(''),
    currentTag = _React$useState[0],
    setCurrentTag = _React$useState[1];
  var boxRef = _react["default"].useRef();
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
      return /*#__PURE__*/_react["default"].createElement(Tag, {
        margin: "xxsmall",
        key: "" + v + (index + 0),
        onRemove: function onRemove() {
          return _onRemove(v);
        }
      }, v);
    });
  };
  return /*#__PURE__*/_react["default"].createElement(_grommet.Keyboard, {
    onEnter: onEnter
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    align: "center",
    pad: {
      horizontal: 'xsmall'
    },
    border: "all",
    ref: boxRef,
    wrap: true
  }, value.length > 0 && renderValue(), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    flex: true,
    style: {
      minWidth: '120px'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, _extends({
    type: "search",
    plain: true,
    dropTarget: boxRef.current
  }, rest, {
    onChange: updateCurrentTag,
    value: currentTag,
    onSuggestionSelect: function onSuggestionSelect(event) {
      return onAddTag(event.suggestion);
    }
  })))));
};
var WithTags = exports.WithTags = function WithTags() {
  var _React$useState2 = _react["default"].useState(['foo', 'sony']),
    selectedTags = _React$useState2[0],
    setSelectedTags = _React$useState2[1];
  var _React$useState3 = _react["default"].useState(allSuggestions),
    suggestions = _React$useState3[0],
    setSuggestions = _React$useState3[1];
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
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      pad: "small"
    }, /*#__PURE__*/_react["default"].createElement(TagInput, {
      id: "grommet-tag-input",
      placeholder: "Search for aliases...",
      suggestions: suggestions,
      value: selectedTags,
      onRemove: onRemoveTag,
      onAdd: onAddTag,
      onChange: function onChange(_ref3) {
        var value = _ref3.target.value;
        return onFilterSuggestion(value);
      }
    }))
    // </Grommet>
  );
};
WithTags.storyName = 'With tags';
var _default = exports["default"] = {
  title: 'Input/TextInput/With tags'
};