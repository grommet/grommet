import styled from 'styled-components';
import { styledComponentsConfig } from '../../utils';

// Kept as a styled component so consumers can theme the wizard root via
// `theme.wizard.container.extend`. Grommet Box does not expose a
// per-instance `extend` prop, so this escape hatch requires styled CSS.
export const StyledWizard = styled.div.withConfig(styledComponentsConfig)`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  min-height: 0;

  ${(props) => props.theme.wizard?.container?.extend}
`;

// Programmatic focus target for step transitions (tabIndex={-1}); no visible
// focus indication — screen readers announce via aria-live on this element.
export const StyledWizardFocusAnchor = styled.div.withConfig(
  styledComponentsConfig,
)`
  outline: none;
`;
