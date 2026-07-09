import styled from 'styled-components';
import { focusStyle, styledComponentsConfig } from '../../utils';

// Root wizard container. Uses box-model driven layout so vertical and
// horizontal directions can share the same styled element.
export const StyledWizard = styled.div.withConfig(styledComponentsConfig)`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  width: 100%;
  min-height: 100%;

  ${(props) => props.theme.wizard?.container?.extend}
`;

// Body region holds either [Progress | Content] side-by-side (vertical
// direction) or Content only (horizontal direction has Progress in a header).
export const StyledWizardBody = styled.div.withConfig(styledComponentsConfig)`
  display: flex;
  flex-direction: ${(props) =>
    props.direction === 'vertical' ? 'row' : 'column'};
  flex: 1 1 auto;
  min-height: 0;
`;

// Content column holds StepHeader + Content + Footer.
export const StyledWizardContentColumn = styled.div.withConfig(
  styledComponentsConfig,
)`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-width: 0;
`;

// Focus anchor for step transitions. Not visible until it receives
// keyboard focus, at which point the theme focus ring shows.
export const StyledWizardFocusAnchor = styled.div.withConfig(
  styledComponentsConfig,
)`
  outline: none;

  &:focus {
    ${focusStyle({ justBorder: true })}
  }
`;
