"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

require("jest-styled-components");

var _Grommet = require("../../Grommet");

var _Form = require("../../Form");

var _ = require("..");

var _TextInput = require("../../TextInput");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CustomFormField = (0, _styledComponents["default"])(_.FormField).withConfig({
  displayName: "FormField-test__CustomFormField",
  componentId: "sc-1ddfx0c-0"
})(["font-size:40px;"]);
describe('FormField', function () {
  test('default', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.FormField, null), /*#__PURE__*/_react["default"].createElement(_.FormField, null, /*#__PURE__*/_react["default"].createElement(_TextInput.TextInput, null))));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('label', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.FormField, {
      label: "test label"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('help', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.FormField, {
      help: "test help"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('error', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.FormField, {
      error: "test error"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('info', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.FormField, {
      info: "test info"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('htmlFor', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.FormField, {
      htmlFor: "test-id"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('margin', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.FormField, {
      margin: "medium"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('empty margin', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.FormField, {
      margin: "none"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('pad', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.FormField, {
      pad: true
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('abut', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, {
      theme: {
        formField: {
          border: {
            color: 'border',
            error: {
              color: {
                dark: 'white',
                light: 'status-critical'
              }
            },
            size: 'large',
            position: 'outer',
            side: 'all'
          },
          margin: {
            bottom: 'small'
          }
        }
      }
    }, /*#__PURE__*/_react["default"].createElement(_.FormField, {
      htmlFor: "test-id"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('abut with margin', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, {
      theme: {
        formField: {
          border: {
            color: 'border',
            error: {
              color: {
                dark: 'white',
                light: 'status-critical'
              }
            },
            size: 'large',
            position: 'outer',
            side: 'all'
          },
          margin: {
            bottom: 'small'
          }
        }
      }
    }, /*#__PURE__*/_react["default"].createElement(_.FormField, {
      margin: "medium",
      htmlFor: "test-id"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('custom formfield', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(CustomFormField, {
      htmlFor: "test-id"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('disabled', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.FormField, {
      disabled: true
    }), " ", /*#__PURE__*/_react["default"].createElement(_Form.Form, null, /*#__PURE__*/_react["default"].createElement(_.FormField, {
      disabled: true
    }))));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('required', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.FormField, {
      required: true
    }), " ", /*#__PURE__*/_react["default"].createElement(_Form.Form, null, /*#__PURE__*/_react["default"].createElement(_.FormField, {
      required: true
    }))));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('custom label', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, {
      theme: {
        formField: {
          label: {
            color: 'red',
            size: 'small',
            margin: 'xsmall',
            weight: 600
          }
        }
      }
    }, /*#__PURE__*/_react["default"].createElement(_Form.Form, null, /*#__PURE__*/_react["default"].createElement(_.FormField, {
      label: "label"
    }))));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('disabled with custom label', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, {
      theme: {
        formField: {
          label: {
            color: 'red',
            size: 'small',
            margin: 'xsmall',
            weight: 600
          },
          disabled: {
            label: {
              color: 'teal'
            }
          }
        }
      }
    }, /*#__PURE__*/_react["default"].createElement(_Form.Form, null, /*#__PURE__*/_react["default"].createElement(_.FormField, {
      disabled: true,
      label: "label"
    }))));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});