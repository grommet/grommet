"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var doc = function doc(Tab) {
  var DocumentedTab = (0, _reactDesc.describe)(Tab).description('One tab within Tabs.').usage("import { Tab } from 'grommet';\n<Tab />");
  DocumentedTab.propTypes = {
    plain: _reactDesc.PropTypes.bool.description('Whether this is a plain tab with no style.').defaultValue(false),
    title: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.node]).description('The title of the tab.')
  };
  return DocumentedTab;
};

exports.doc = doc;