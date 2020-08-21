import { describe } from 'react-desc';

export const doc = CardBody => {
  const DocumentedAccordionPanel = describe(CardBody)
    .description('The body of the card. Mostly used for placing content.')
    .intrinsicElement('div');
  return DocumentedAccordionPanel;
};
