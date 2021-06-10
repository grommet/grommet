"use strict";

exports.__esModule = true;
exports["default"] = exports.ControlledInputLazy = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ControlledInputLazy = function ControlledInputLazy() {
  var _useState = (0, _react.useState)(''),
      name = _useState[0],
      setName = _useState[1];

  var _useState2 = (0, _react.useState)(''),
      email = _useState2[0],
      setEmail = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      subscribe = _useState3[0],
      setSubscribe = _useState3[1];

  var _useState4 = (0, _react.useState)(''),
      ampm = _useState4[0],
      setAmpm = _useState4[1];

  var _useState5 = (0, _react.useState)(''),
      size = _useState5[0],
      setSize = _useState5[1];

  var _useState6 = (0, _react.useState)(''),
      comments = _useState6[0],
      setComments = _useState6[1];

  var _useState7 = (0, _react.useState)(''),
      age = _useState7[0],
      setAge = _useState7[1];

  (0, _react.useEffect)(function () {
    setName('initial');
    setEmail('initial@my.com');
    setSubscribe(true);
    setAmpm('evening');
    setSize('large');
    setComments('initial');
    setAge(60);
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
    onChange: function onChange(value) {
      return console.log('Change', value);
    },
    onReset: function onReset() {
      setName('');
      setEmail('');
      setSubscribe(false);
      setAmpm('');
      setSize('');
      setComments('');
      setAge('');
    },
    onSubmit: function onSubmit(event) {
      return console.log('Submit', event.value, event.touched);
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Name",
    name: "name"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    name: "name",
    value: name,
    onChange: function onChange(event) {
      return setName(event.target.value);
    }
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Email",
    name: "email",
    required: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.MaskedInput, {
    name: "email",
    mask: [{
      regexp: /^[\w\-_.]+$/,
      placeholder: 'example'
    }, {
      fixed: '@'
    }, {
      regexp: /^[\w]+$/,
      placeholder: 'my'
    }, {
      fixed: '.'
    }, {
      regexp: /^[\w]+$/,
      placeholder: 'com'
    }],
    value: email,
    onChange: function onChange(event) {
      return setEmail(event.target.value);
    }
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    name: "subscribe"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
    name: "subscribe",
    label: "Subscribe?",
    checked: subscribe,
    onChange: function onChange(event) {
      return setSubscribe(event.target.checked);
    }
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    name: "ampm"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.RadioButtonGroup, {
    name: "ampm",
    options: ['morning', 'evening'],
    value: ampm,
    onChange: function onChange(event) {
      return setAmpm(event.target.value);
    }
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Size",
    name: "size"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
    name: "size",
    options: ['small', 'medium', 'large'],
    value: size,
    onChange: function onChange(event) {
      return setSize(event.option);
    }
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Comments",
    name: "comments"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextArea, {
    name: "comments",
    value: comments,
    onChange: function onChange(event) {
      return setComments(event.target.value);
    }
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Age",
    name: "age",
    pad: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.RangeInput, {
    name: "age",
    min: 15,
    max: 75,
    value: age,
    onChange: function onChange(event) {
      return setAge(event.target.value);
    }
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    justify: "between",
    margin: {
      top: 'medium'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Cancel"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    type: "reset",
    label: "Reset"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    type: "submit",
    label: "Update",
    primary: true
  }))))));
};

exports.ControlledInputLazy = ControlledInputLazy;
ControlledInputLazy.storyName = 'Controlled input lazy';
var _default = {
  title: 'Input/Form/Controlled input lazy'
};
exports["default"] = _default;