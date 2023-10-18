"use strict";

exports.__esModule = true;
exports["default"] = exports.FormLayer = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommetIcons = require("grommet-icons");
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var FormLayer = exports.FormLayer = function FormLayer() {
  var _React$useState = _react["default"].useState(false),
    open = _React$useState[0],
    setOpen = _React$useState[1];
  var onOpen = function onOpen() {
    return setOpen(true);
  };
  var onClose = function onClose() {
    return setOpen(undefined);
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Add, null),
      label: "Add",
      onClick: onOpen
    }), open && /*#__PURE__*/_react["default"].createElement(_grommet.Layer, {
      position: "right",
      full: "vertical",
      modal: true,
      onClickOutside: onClose,
      onEsc: onClose
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: "vertical",
      overflow: "auto",
      width: "medium",
      pad: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
      validate: "blur",
      onReset: function onReset(event) {
        return console.log(event);
      },
      onSubmit: function onSubmit(_ref) {
        var value = _ref.value;
        return console.log('Submit', value);
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      flex: false,
      direction: "row",
      justify: "between"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
      level: 2,
      margin: "none"
    }, "Add"), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Close, null),
      onClick: onClose
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Name",
      "aria-label": "name",
      name: "name",
      required: true,
      validate: [{
        regexp: /^[a-z]/i
      }, function (name) {
        if (name && name.length === 1) return 'must be >1 character';
        return undefined;
      }, function (name) {
        if (name === 'good') return {
          message: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
            align: "end"
          }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.StatusGood, null)),
          status: 'info'
        };
        return undefined;
      }]
    }), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Email",
      name: "email",
      required: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      name: "email",
      "aria-label": "email",
      type: "email"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Size",
      name: "select-size",
      htmlFor: "select-size__input",
      required: true,
      validate: function validate(val) {
        if (val === 'small') {
          return {
            message: 'Only 10 left in stock!',
            status: 'info'
          };
        }
        return undefined;
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
      name: "select-size",
      id: "select-size",
      options: ['small', 'medium', 'large']
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      flex: false,
      as: "footer",
      align: "start"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      type: "submit",
      label: "Submit",
      onClick: onClose,
      primary: true
    }))))))
    // </Grommet>
  );
};

FormLayer.storyName = 'Form';
FormLayer.parameters = {
  chromatic: {
    disable: true
  }
};
FormLayer.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Layout/Layer/Form'
};