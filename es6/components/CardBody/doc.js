import { describe } from 'react-desc';
export var doc = function doc(CardBody) {
  var DocumentedAccordionPanel = describe(CardBody).description('The body of the card. Mostly used for placing content.').intrinsicElement('div');
  return DocumentedAccordionPanel;
};