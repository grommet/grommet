"use strict";

exports.__esModule = true;
exports["default"] = exports.All = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
var _excluded = ["id"],
  _excluded2 = ["color"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var Node = function Node(_ref) {
  var id = _ref.id,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, _extends({
    id: id,
    basis: "xxsmall",
    margin: "small",
    pad: "medium",
    round: "small",
    background: "light-4"
  }, rest));
};
var connection = function connection(fromTarget, toTarget, _temp) {
  var _ref2 = _temp === void 0 ? {} : _temp,
    color = _ref2.color,
    rest = _objectWithoutPropertiesLoose(_ref2, _excluded2);
  return _extends({
    fromTarget: fromTarget,
    toTarget: toTarget,
    color: color || 'graph-0',
    thickness: 'xsmall',
    round: true,
    type: 'rectilinear'
  }, rest);
};
var Components = function Components() {
  var _useState = (0, _react.useState)(true),
    checkBox = _useState[0],
    setCheckBox = _useState[1];
  var _useState2 = (0, _react.useState)(''),
    textInput = _useState2[0],
    setTextInput = _useState2[1];
  var _useState3 = (0, _react.useState)(''),
    maskedInput = _useState3[0],
    setMaskedInput = _useState3[1];
  var _useState4 = (0, _react.useState)('RadioButton 1'),
    radioButton = _useState4[0],
    setRadioButton = _useState4[1];
  var _useState5 = (0, _react.useState)([1, 2]),
    rangeSelector = _useState5[0],
    setRangeSelector = _useState5[1];
  var _useState6 = (0, _react.useState)(0),
    tabIndex = _useState6[0],
    setTabIndex = _useState6[1];
  var content = [/*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    key: "type",
    align: "start",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    margin: {
      top: 'none'
    }
  }, "Heading"), /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Paragraph"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Text"), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    href: ""
  }, "Anchor"), /*#__PURE__*/_react["default"].createElement(_grommet.Menu, {
    label: "Menu",
    items: [{
      label: 'One',
      onClick: function onClick() {},
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.FormNext, null),
      reverse: true
    }, {
      label: 'Two'
    }, {
      label: 'Thirty Three and 1/3'
    }]
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Button",
    onClick: function onClick() {}
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    plain: true,
    onClick: function onClick() {}
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "plain button"))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    key: "input",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
    placeholder: "Select",
    options: ['One', 'Two'],
    onChange: function onChange() {}
  }), /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
    name: "check",
    checked: checkBox,
    label: "CheckBox",
    onChange: function onChange(event) {
      return setCheckBox(event.target.checked);
    }
  }), /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
    name: "toggle",
    toggle: true,
    checked: checkBox,
    label: "CheckBox toggle",
    onChange: function onChange(event) {
      return setCheckBox(event.target.checked);
    }
  }), /*#__PURE__*/_react["default"].createElement(_grommet.RadioButtonGroup, {
    name: "radio",
    options: ['RadioButton 1', 'RadioButton 2'],
    value: radioButton,
    onChange: function onChange(event) {
      return setRadioButton(event.target.value);
    }
  }), /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    placeholder: "TextInput",
    suggestions: ['a', 'b', 'c'],
    value: textInput,
    onChange: function onChange(event) {
      return setTextInput(event.target.value);
    },
    onSelect: function onSelect(_ref3) {
      var suggestion = _ref3.suggestion;
      return setTextInput(suggestion);
    }
  }), /*#__PURE__*/_react["default"].createElement(_grommet.MaskedInput, {
    mask: [{
      length: [1, 4],
      options: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024],
      regexp: /^\d{1,4}$/,
      placeholder: 'nnn'
    }, {
      fixed: ' '
    }, {
      length: 2,
      options: ['MB', 'GB', 'TB'],
      regexp: /^[mgt]b$|^[MGT]B$|^[mMgGtT]$/,
      placeholder: 'gb'
    }],
    value: maskedInput,
    onChange: function onChange(event) {
      return setMaskedInput(event.target.value);
    }
  }), /*#__PURE__*/_react["default"].createElement(_grommet.TextArea, {
    placeholder: "TextArea"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.RangeInput, {
    value: 24,
    onChange: function onChange() {}
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Stack, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    justify: "between"
  }, [0, 1, 2, 3].map(function (value) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      key: value,
      pad: "small"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      style: {
        fontFamily: 'monospace'
      }
    }, value));
  })), /*#__PURE__*/_react["default"].createElement(_grommet.RangeSelector, {
    direction: "horizontal",
    invert: false,
    min: 0,
    max: 3,
    size: "full",
    round: "small",
    values: rangeSelector,
    onChange: function onChange(values) {
      return setRangeSelector(values);
    }
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "FormField"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    placeholder: "TextInput"
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    key: "time",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
    size: "small"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Clock, {
    type: "digital",
    className: "chromatic-ignore"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Clock, {
    className: "chromatic-ignore"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    key: "measure",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Chart, {
    type: "bar",
    round: true,
    size: "small",
    values: [{
      value: [10, 20]
    }, {
      value: [20, 30]
    }, {
      value: [30, 15]
    }]
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Meter, {
    type: "bar",
    round: true,
    size: "small",
    background: "light-3",
    values: [{
      value: 30
    }]
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    key: "visualize",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Distribution, {
    basis: "small",
    values: [{
      value: 50,
      color: 'light-3'
    }, {
      value: 30,
      color: 'graph-0'
    }, {
      value: 20,
      color: 'light-4'
    }, {
      value: 10,
      color: 'light-3'
    }, {
      value: 5,
      color: 'light-4'
    }]
  }, function (value) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "xsmall",
      background: value.color,
      fill: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "large"
    }, value.value));
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Stack, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row"
  }, [1, 2].map(function (id) {
    return /*#__PURE__*/_react["default"].createElement(Node, {
      key: id,
      id: id
    });
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row"
  }, [3, 4].map(function (id) {
    return /*#__PURE__*/_react["default"].createElement(Node, {
      key: id,
      id: id
    });
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Diagram, {
    connections: [connection('1', '4')]
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    key: "dataTable",
    alignSelf: "start"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
    columns: [{
      property: 'name',
      header: 'Name'
    }, {
      property: 'color',
      header: 'Color'
    }],
    data: [{
      name: 'Alan',
      color: 'blue'
    }, {
      name: 'Chris',
      color: 'purple'
    }, {
      name: 'Eric',
      color: 'orange'
    }],
    sortable: true
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    key: "accordion"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Accordion, null, /*#__PURE__*/_react["default"].createElement(_grommet.AccordionPanel, {
    label: "Accordion Panel 1"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Accordion panel 1 content"))), /*#__PURE__*/_react["default"].createElement(_grommet.AccordionPanel, {
    label: "Accordion Panel 2"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Accordion panel 2 content"))))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    key: "tabs"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Tabs, {
    activeIndex: tabIndex,
    onActive: function onActive(index) {
      return setTabIndex(index);
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: "Tab 1"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Tab 1 content"))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: "Tab 2"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Tab 2 content"))))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    key: "video",
    alignSelf: "start"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Video, null, /*#__PURE__*/_react["default"].createElement("source", {
    src: "small.mp4",
    type: "video/mp4"
  }), /*#__PURE__*/_react["default"].createElement("source", {
    src: "http://techslides.com/demos/sample-videos/small.webm",
    type: "video/webm"
  }), /*#__PURE__*/_react["default"].createElement("source", {
    src: "http://techslides.com/demos/sample-videos/small.ogv",
    type: "video/ogg"
  }), /*#__PURE__*/_react["default"].createElement("source", {
    src: "http://techslides.com/demos/sample-videos/small.3gp",
    type: "video/3gp"
  })))];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    pad: "medium",
    overflow: "auto"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
    columns: "small",
    gap: "medium"
  }, content));
};
var All = exports.All = function All() {
  return /*#__PURE__*/_react["default"].createElement(Components, null);
};
var _default = exports["default"] = {
  title: 'All'
};