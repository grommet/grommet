"use strict";

exports.__esModule = true;
exports["default"] = exports.DynamicFields = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var DynamicFields = exports.DynamicFields = function DynamicFields() {
  var _useState = (0, _react.useState)(),
    haveAlias = _useState[0],
    setHaveAlias = _useState[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      width: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
      validate: "blur",
      onReset: function onReset(event) {
        return console.log(event);
      },
      onValidate: function onValidate(event) {
        return console.log('Validate', event);
      },
      onSubmit: function onSubmit(_ref) {
        var value = _ref.value;
        return console.log('Submit', value);
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Name",
      name: "name",
      required: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      name: "name",
      "aria-label": "name"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      name: "haveAlias"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
      name: "haveAlias",
      label: "alias?",
      checked: haveAlias,
      onChange: function onChange() {
        return setHaveAlias(!haveAlias);
      }
    })), haveAlias && /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Alias",
      name: "alias",
      required: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      name: "alias"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      direction: "row",
      justify: "between",
      margin: {
        top: 'medium'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      type: "reset",
      label: "Reset"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      type: "submit",
      label: "Update",
      primary: true
    })))))
    // </Grommet>
  );
};

DynamicFields.storyName = 'Dynamic fields';
DynamicFields.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Input/Form/Dynamic fields'
};