import { describe } from 'react-desc';

export const doc = CardBody => {
  const DocumentedAccordionPanel = describe(CardBody)
    .description('The Card Body.')
    .intrinsicElement('div');
  return DocumentedAccordionPanel;
};
