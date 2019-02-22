"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var doc = function doc(Tabs) {
  var DocumentedTabs = (0, _reactDesc.describe)(Tabs).availableAt((0, _utils.getAvailableAtBadge)('Tabs')).description('A container with controls to show one Tab at a time.').usage("import { Tabs, Tab } from 'grommet';\n<Tabs>\n  <Tab title='Tab 1'>...</Tab>\n  <Tab title='Tab 2'>...</Tab>\n</Tabs>").intrinsicElement('div');
  DocumentedTabs.propTypes = _extends({}, _utils.genericProps, {
    activeIndex: _reactDesc.PropTypes.number.description("Active tab index. If specified, Tabs will be a controlled component.\nThis means that future tab changes will not work unless you subscribe to\nonActive function and update activeIndex accordingly."),
    children: _reactDesc.PropTypes.node.description('Array of Tab.').isRequired,
    flex: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['grow', 'shrink']), _reactDesc.PropTypes.bool]).description('Whether flex-grow and/or flex-shrink is true.'),
    justify: _reactDesc.PropTypes.oneOf(['start', 'center', 'end']).description('How to align the tabs along the main axis.').defaultValue('center'),
    messages: _reactDesc.PropTypes.shape({
      tabContents: _reactDesc.PropTypes.string
    }).description('Custom messages for Tabs. Used for accessibility by screen readers.').defaultValue({
      tabContents: 'Tab Contents'
    }),
    onActive: _reactDesc.PropTypes.func.description("Function that will be called with the active tab index when the\ncurrently active tab changes.")
  });
  return DocumentedTabs;
};

exports.doc = doc;
var themeDoc = {
  'tabs.background': {
    description: 'background styling of Tabs.',
    type: 'object',
    defaultValue: undefined
  },
  'tabs.extend': {
    description: 'Any additional style for Tabs.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'tabs.gap': {
    description: 'The gap size between the Tabs.',
    type: 'string',
    defaultValue: undefined
  },
  'tabs.header.background': {
    description: 'The background styles of Tabs header.',
    type: '',
    defaultValue: undefined
  },
  'tabs.header.extend': {
    description: 'Any additional style for Tabs header.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'tabs.panel.extend': {
    description: 'Any additional style for Tabs panel.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  }
};
exports.themeDoc = themeDoc;