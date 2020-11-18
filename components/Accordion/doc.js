"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _propTypes = require("../../utils/prop-types");

var _mixins = require("../../utils/mixins");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var doc = function doc(Accordion) {
  var DocumentedAccordion = (0, _reactDesc.describe)(Accordion).availableAt((0, _mixins.getAvailableAtBadge)('Accordion', 'Controls')).description('An accordion containing collapsible panels.').usage("import { Accordion, AccordionPanel } from 'grommet';\n<Accordion>\n  <AccordionPanel label='Panel 1'>...</AccordionPanel>\n  <AccordionPanel label='Panel 2'>...</AccordionPanel>\n</Accordion>").intrinsicElement('div');
  DocumentedAccordion.propTypes = _extends({}, _propTypes.genericProps, {
    activeIndex: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.number, _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.number)]).description("Active panel index. If specified, Accordion will be a controlled \ncomponent. This means that future panel changes will not work unless you\nsubscribe to onActive function and update activeIndex accordingly.").defaultValue(0),
    animate: _reactDesc.PropTypes.bool.description('Transition content in & out with a slide down animation.').defaultValue(true),
    children: _reactDesc.PropTypes.node.description('Array of AccordionPanels.'),
    onActive: _reactDesc.PropTypes.func.description("Function that will be called when the active index changes.\nIt will always send an array with currently active panel indexes."),
    multiple: _reactDesc.PropTypes.bool.description('Allow multiple panels to be opened at once.').defaultValue(false),
    messages: _reactDesc.PropTypes.shape({
      tabContents: _reactDesc.PropTypes.string
    }).description('Custom messages for Tabs. Used for accessibility by screen readers.').defaultValue({
      tabContents: 'Tab Contents'
    })
  });
  return DocumentedAccordion;
};

exports.doc = doc;