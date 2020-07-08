import { describe } from 'react-desc';

export const doc = CardHeader => {
  const DocumentedAccordionPanel = describe(CardHeader)
    .description('The Card Header.')
    .intrinsicElement('div');
  return DocumentedAccordionPanel;
};
