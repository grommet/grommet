"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var doc = function doc(FormField) {
  var DocumentedFormField = (0, _reactDesc.describe)(FormField).availableAt((0, _utils.getAvailableAtBadge)('FormField')).description('A field in a form.').usage("import { FormField } from 'grommet';\n<FormField />");
  DocumentedFormField.propTypes = {
    error: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.node]).description('Any error text describing issues with the field'),
    help: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.node]).description('Any help text describing how the field works'),
    htmlFor: _reactDesc.PropTypes.string.description('The id of the input element contained in this field'),
    label: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.node]).description('A short label describing the field')
  };
  return DocumentedFormField;
};

exports.doc = doc;