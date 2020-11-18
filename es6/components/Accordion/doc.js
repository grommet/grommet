function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { genericProps } from '../../utils/prop-types';
import { getAvailableAtBadge } from '../../utils/mixins';
export var doc = function doc(Accordion) {
  var DocumentedAccordion = describe(Accordion).availableAt(getAvailableAtBadge('Accordion', 'Controls')).description('An accordion containing collapsible panels.').usage("import { Accordion, AccordionPanel } from 'grommet';\n<Accordion>\n  <AccordionPanel label='Panel 1'>...</AccordionPanel>\n  <AccordionPanel label='Panel 2'>...</AccordionPanel>\n</Accordion>").intrinsicElement('div');
  DocumentedAccordion.propTypes = _extends({}, genericProps, {
    activeIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]).description("Active panel index. If specified, Accordion will be a controlled \ncomponent. This means that future panel changes will not work unless you\nsubscribe to onActive function and update activeIndex accordingly.").defaultValue(0),
    animate: PropTypes.bool.description('Transition content in & out with a slide down animation.').defaultValue(true),
    children: PropTypes.node.description('Array of AccordionPanels.'),
    onActive: PropTypes.func.description("Function that will be called when the active index changes.\nIt will always send an array with currently active panel indexes."),
    multiple: PropTypes.bool.description('Allow multiple panels to be opened at once.').defaultValue(false),
    messages: PropTypes.shape({
      tabContents: PropTypes.string
    }).description('Custom messages for Tabs. Used for accessibility by screen readers.').defaultValue({
      tabContents: 'Tab Contents'
    })
  });
  return DocumentedAccordion;
};