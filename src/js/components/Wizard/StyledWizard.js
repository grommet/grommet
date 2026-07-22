import styled from 'styled-components';
import { focusStyle, styledComponentsConfig } from '../../utils';

// Root wizard container: flex column so header/middle/footer stack.
export const StyledWizard = styled.div.withConfig(styledComponentsConfig)`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  min-height: 0;

  ${(props) => props.theme.wizard?.container?.extend}
`;

// Middle region between header and footer. `overflow: hidden` clips
// overflow exactly at the footer edge.
export const StyledWizardMiddle = styled.div.withConfig(styledComponentsConfig)`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  overflow: hidden;
`;

// Centered column between header and footer that hosts the step body.
export const StyledWizardCenter = styled.div.withConfig(styledComponentsConfig)`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
`;

// [Progress | Content] (vertical) or Content only (horizontal).
export const StyledWizardBody = styled.div.withConfig(styledComponentsConfig)`
  display: flex;
  flex-direction: ${(props) =>
    props.direction === 'vertical' ? 'row' : 'column'};
  flex: 1 1 auto;
  min-height: 0;
`;

// Content column holds StepHeader + WizardContent.
export const StyledWizardContentColumn = styled.div.withConfig(
  styledComponentsConfig,
)`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
`;

// Focus target for step transitions; shows focus ring only when focused.
export const StyledWizardFocusAnchor = styled.div.withConfig(
  styledComponentsConfig,
)`
  outline: none;

  &:focus {
    ${focusStyle({ justBorder: true })}
  }
`;
