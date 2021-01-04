import { describe } from 'react-desc';

export const doc = CardFooter => {
  const DocumentedAccordionPanel = describe(CardFooter)
    .description(
      `The Card Footer. Works best as the latter sibling of CardBody or any 
      other flex container.`,
    )
    .intrinsicElement('div');
  return DocumentedAccordionPanel;
};
